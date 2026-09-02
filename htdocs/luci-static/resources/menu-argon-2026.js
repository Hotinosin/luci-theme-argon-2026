'use strict';
'require baseclass';
'require ui';

function animateSlide(element, show) {
	element.getAnimations().forEach(function(animation) { animation.cancel(); });
	element.style.display = 'block';

	var height = element.scrollHeight + 'px';
	var animation = element.animate(
		show ? [{ height: '0', overflow: 'hidden' }, { height: height, overflow: 'hidden' }]
			: [{ height: height, overflow: 'hidden' }, { height: '0', overflow: 'hidden' }],
		{ duration: 200, easing: 'ease-out' }
	);

	animation.onfinish = function() {
		element.style.display = show ? 'block' : 'none';
	};
}

/**
 * Argon Theme Menu Module
 * Handles rendering and interaction of the main navigation menu and sidebar
 */
return baseclass.extend({
	/**
	 * Initialize the menu module
	 * Load menu data and trigger rendering
	 */
	__init__: function () {
		ui.menu.load().then(L.bind(this.render, this));
	},

	/**
	 * Main render function for the menu system
	 * @param {Object} tree - Menu tree structure from LuCI
	 */
	render: function (tree) {
		var node = tree;
		var url = '';

		this.renderModeMenu(node);

		// Render tab menu if we're deep enough in the navigation hierarchy
		if (L.env.dispatchpath.length >= 3) {
			for (var i = 0; i < 3 && node; i++) {
				node = node.children[L.env.dispatchpath[i]];
				url = url + (url ? '/' : '') + L.env.dispatchpath[i];
			}

			if (node) {
				this.renderTabMenu(node, url);
			}
		}

		// Attach event listeners for sidebar toggle functionality
		var sidebarToggle = document.querySelector('a.showSide');
		var darkMask = document.querySelector('.darkMask');
		
		if (sidebarToggle) {
			sidebarToggle.addEventListener('click', ui.createHandlerFn(this, 'handleSidebarToggle'));
		}
		if (darkMask) {
			darkMask.addEventListener('click', ui.createHandlerFn(this, 'handleSidebarToggle'));
		}
	},

	/**
	 * Handle menu expand/collapse functionality
	 * Manages the sliding animation and active states of menu items
	 * @param {Event} ev - Click event from menu item
	 */
	handleMenuExpand: function (ev) {
		var target = ev.target;
		var slide = target.parentNode;
		var slideMenu = target.nextElementSibling;
		var shouldCollapse = false;

		// Close all currently active submenus
		var activeMenus = document.querySelectorAll('.main .main-left .nav > li > ul.active');
		activeMenus.forEach(function (ul) {
			// Remove active classes immediately when starting slideUp animation
			ul.classList.remove('active');
			ul.previousElementSibling.classList.remove('active');
			animateSlide(ul, false);
			
			// Check if we're clicking on an already open menu (should collapse it)
			if (!shouldCollapse && ul === slideMenu) {
				shouldCollapse = true;
			}
		});

		// Exit if there's no submenu to show
		if (!slideMenu) {
			return;
		}

		// Open the submenu if it's not already open
		if (!shouldCollapse) {
			// Find the slide menu within the slide element
			var slideMenuElement = slide.querySelector(".slide-menu");
			if (slideMenuElement) {
				// Add active classes immediately when starting slideDown animation
				slideMenu.classList.add('active');
				target.classList.add('active');
				animateSlide(slideMenuElement, true);
			}
			target.blur(); // Remove focus from the clicked element
		}
		
		// Prevent default link behavior and event bubbling
		ev.preventDefault();
		ev.stopPropagation();
	},

	/**
	 * Render the main navigation menu
	 * Creates hierarchical menu structure with active states and click handlers
	 * @param {Object} tree - Menu tree node to render
	 * @param {string} url - Base URL for menu items
	 * @param {number} level - Current nesting level (0-based)
	 * @returns {Element} - Generated menu element
	 */
	renderMainMenu: function (tree, url, level) {
		var currentLevel = (level || 0) + 1;
		var menuContainer = E('ul', { 'class': level ? 'slide-menu' : 'nav' });
		var children = ui.menu.getChildren(tree);

		// Don't render empty menus or menus deeper than 2 levels
		if (children.length === 0 || currentLevel > 2) {
			return E([]);
		}

		// Generate menu items for each child
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			var isActive = (
				(L.env.dispatchpath[currentLevel] === child.name) && 
				(L.env.dispatchpath[currentLevel - 1] === tree.name)
			);
			
			// Recursively render submenu
			var submenu = this.renderMainMenu(child, url + '/' + child.name, currentLevel);
			var hasChildren = submenu.children.length > 0;
			
			// Determine CSS classes based on state
			var slideClass = hasChildren ? 'slide' : null;
			var menuClass = hasChildren ? 'menu' : 'food';
			
			if (isActive) {
				menuContainer.classList.add('active');
				slideClass += " active";
				menuClass += " active";
			}

			// Create menu item with link and submenu
			var menuItem = E('li', { 'class': slideClass }, [
				E('a', {
					'href': L.url(url, child.name),
					'click': (currentLevel === 1) ? ui.createHandlerFn(this, 'handleMenuExpand') : null,
					'class': menuClass,
					'data-title': child.title.replace(/ /g, "_"), // More robust space replacement
				}, [_(child.title)]),
				submenu
			]);
			
			menuContainer.appendChild(menuItem);
		}

		// Append to main menu container if this is the top level
		if (currentLevel === 1) {
			var mainMenuElement = document.querySelector('#mainmenu');
			if (mainMenuElement) {
				mainMenuElement.appendChild(menuContainer);
				mainMenuElement.style.display = '';
			}
		}
		
		return menuContainer;
	},

	renderModeMenu: function (tree) {
		var menu = document.querySelector('#modemenu');
		var children = ui.menu.getChildren(tree);

		for (var i = 0; i < children.length; i++) {
			var isActive = (L.env.requestpath.length ? children[i].name == L.env.requestpath[0] : i == 0);
			if (i > 0)
				menu.appendChild(E([], ['\u00a0|\u00a0']));
			menu.appendChild(E('li', {}, [
				E('a', {
					'href': L.url(children[i].name),
					'class': isActive ? 'active' : null
				}, [_(children[i].title)])
			]));
			if (isActive)
				this.renderMainMenu(children[i], children[i].name);
		}
		if (menu.children.length > 1)
			menu.style.display = '';
	},

	/**
	 * Render tab navigation menu
	 * Creates horizontal tab menu for deeper navigation levels
	 * @param {Object} tree - Menu tree node to render
	 * @param {string} url - Base URL for tab items
	 * @param {number} level - Current nesting level (0-based)
	 * @returns {Element} - Generated tab menu element
	 */
	renderTabMenu: function (tree, url, level) {
		var container = document.querySelector('#tabmenu');
		var currentLevel = (level || 0) + 1;
		var tabContainer = E('ul', { 'class': 'tabs' });
		var children = ui.menu.getChildren(tree);
		var activeNode = null;

		// Don't render empty tab menus
		if (children.length === 0) {
			return E([]);
		}

		// Generate tab items for each child
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			var isActive = (L.env.dispatchpath[currentLevel + 2] === child.name);
			var activeClass = isActive ? ' active' : '';
			var className = 'tabmenu-item-%s %s'.format(child.name, activeClass);

			var tabItem = E('li', { 'class': className }, [
				E('a', { 'href': L.url(url, child.name) }, [_(child.title)])
			]);
			
			tabContainer.appendChild(tabItem);

			// Store reference to active node for recursive rendering
			if (isActive) {
				activeNode = child;
			}
		}

		// Append tab container to main tab menu element
		if (container) {
			container.appendChild(tabContainer);
			container.style.display = '';

			// Recursively render nested tab menus if there's an active node
			if (activeNode) {
				var nestedTabs = this.renderTabMenu(activeNode, url + '/' + activeNode.name, currentLevel);
				if (nestedTabs.children.length > 0) {
					container.appendChild(nestedTabs);
				}
			}
		}

		return tabContainer;
	},

	/**
	 * Handle sidebar toggle functionality
	 * Toggles the mobile/responsive sidebar menu visibility
	 * @param {Event} ev - Click event from sidebar toggle button or dark mask
	 */
	handleSidebarToggle: function (ev) {
		var showSideButton = document.querySelector('a.showSide');
		var sidebar = document.querySelector('#mainmenu');
		var darkMask = document.querySelector('.darkMask');
		var scrollbarArea = document.querySelector('.main-right');

		// Check if any required elements are missing
		if (!showSideButton || !sidebar || !darkMask || !scrollbarArea) {
			console.warn('Sidebar toggle elements not found');
			return;
		}

		// Toggle sidebar visibility and related states
		if (showSideButton.classList.contains('active')) {
			// Close sidebar
			showSideButton.classList.remove('active');
			sidebar.classList.remove('active');
			scrollbarArea.classList.remove('active');
			darkMask.classList.remove('active');
		} else {
			// Open sidebar
			showSideButton.classList.add('active');
			sidebar.classList.add('active');
			scrollbarArea.classList.add('active');
			darkMask.classList.add('active');
		}
	}
});
