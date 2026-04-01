# Changelog

本文档记录 luci-theme-argon-2026 相对于上游 luci-theme-argon (v2.4.3) 的所有代码更改。

---

## [2026-04-01 / 1.0.2-hotfix]

- 修复“会话已过期”等弹窗问题：
  - 移除 `text-align: center`，恢复文字左对齐的默认样式。
  - 为弹窗容器添加 `display: flex; flex-direction: column; justify-content: center;`。
  - 移除弹窗内首尾元素的纵向 margin，解决由于全局 `*` 选择器导致的文字略微偏下的问题，实现完美的上下居中。
  - 弹窗宽度从静态的 `20rem` 修改为 `min-width: 20rem; width: max-content; max-width: 90vw;`，并增加 `word-break: break-all;` 和 `overflow-wrap: break-word;` 规则，解决长英文字符串（如 RPC 报错链接）直接溢出边框的缺陷。

- 修复深色模式下部分防火墙表格行依然为白色的问题：
  - 在 `dark.less` 及编译后的 `dark.css` 中，将 `#cbi-firewall-rule`、`#cbi-firewall-forwarding` 及 `[data-page="admin-status-nftables"] .cbi-section` 纳入深色背景的强制覆盖规则清单，统一配置 `#1e1e1e !important` 的容器背景，以确保所有的隔行（nth-of-type）背景色能正确地渲染为 `#252526` 深灰色，不再透出默认的光亮白色。


## [2026-04-01/1.0.2]
- 修正“会话已过期”通知框UI错位问题，通过重置 `.container .alert` 与 `.container .alert-message` 的绝对定位并设定 `left: 0; transform: none;` 以适配自适应宽度。
- 设定通知弹窗文字居中显示，在 `.alert, .alert-message` 中补充 `text-align: center;`。
- 修正浅色与深色模式下个别 table 缺失圆角问题，针对 `table` 和 `.table` 元素增加 `border-radius: var(--border-radius-md); overflow: hidden;`，使其与主题圆角规范一致。
- 修正深色模式下防火墙 "fw4" 等原生界面的交错行白色背景显示问题，通过在 `dark.less` 中全局声明 `table` 未编号行及奇数行（非 `:nth-of-type(2n)`）的底色为 `#1e1e1e`，避免了浅色模式中 `#ffffff` 造成的视觉冲突。

## [1.0.1] - 2026-03-24

### Bug 修复

#### 严重问题

- **修复 dark.css 和 cascade.css 文件路径错误**
  - 文件: `header.ut:48`, `header_login.ut:38`, `less/dark.less:1`, `less/cascade.less:1`
  - 原值: `/www/luci-static/argon/css/`
  - 修改: `/www/luci-static/argon-2026/css/`
  - 说明: 路径错误导致深色模式无法加载

- **修复 body class 模板语法错误**
  - 文件: `header.ut:129`
  - 原值: `` ` - ${striptags(node.title)}` `` (JavaScript 模板字符串)
  - 修改: `' - ' + striptags(node.title)` (ucode 兼容语法)
  - 说明: ucode 不支持 JavaScript 模板字符串语法

#### 中等问题

- **修复 CSS 变量重复定义**
  - 文件: `less/cascade.less:41-42, 46`
  - 删除: `--light: #adb5bd;` (重复定义)
  - 删除: `--white: #fff;` (重复定义)
  - 说明: 变量被定义两次，后值覆盖前值

- **修复拼写错误 "Agron" → "Argon"**
  - 文件: `footer.ut:13`, `footer_login.ut:13`, `less/cascade.less:15`, `less/dark.less:22`
  - 说明: 主题名称拼写错误

#### 轻微问题

- **修复变量名拼写错误 "keyboradHeight" → "keyboardHeight"**
  - 文件: `footer.ut:38,45`, `footer_login.ut:38,45`
  - 说明: 键盘高度检测变量名拼写错误

---

### 深色模式修复

- **修复表格行交替颜色失效**
  - 文件: `less/dark.less:874-880`
  - 原值:
    ```less
    .cbi-section-table-row {
        background-color: #1e1e1e !important;
    }
    ```
  - 修改:
    ```less
    .cbi-section-table-row {
        background-color: #1e1e1e;
    }
    .cbi-section-table-row:nth-of-type(2n) {
        background-color: #252526;
    }
    ```
  - 说明: `!important` 覆盖了交替颜色样式

- **新增防火墙/VLAN 表格深色模式样式**
  - 文件: `less/dark.less:1233-1262`
  - 新增选择器:
    ```less
    #cbi-firewall-redirect,
    #cbi-network-switch_vlan,
    #cbi-firewall-zone
    ```
  - 说明: 这些表格在深色模式下显示白色背景

---

## [1.0.0] - 2026-03-03

### 首次发布

基于 luci-theme-argon (v2.4.3) 的首次修改版本发布。

---

## 包定义 (Makefile)

| 修改项 | 原版值 | 修改值 | 文件位置 |
|--------|--------|--------|----------|
| `PKG_NAME` | 无 (默认 luci-theme-argon) | `luci-theme-argon-2026` | Makefile:18 |
| `LUCI_TITLE` | `Argon Theme` | `Argon Theme 2026 (Tailwind Mod)` | Makefile:19 |
| `PKG_VERSION` | `2.4.3` | `1.0.1` | Makefile:24 |
| `PKG_RELEASE` | `20250722` | `20260324` | Makefile:25 |

### 新增 postrm 卸载脚本

- 文件: `Makefile:29-52`
- 功能: 通过 `opkg remove` 卸载时自动执行
- 执行内容:
  1. 删除 UCI 中的主题注册: `uci -q delete luci.themes.Argon2026`
  2. 防砖机制: 如果当前使用该主题，自动切回 bootstrap
  3. 清除 LuCI 缓存: `rm -rf /tmp/luci-modulecache/ /tmp/luci-indexcache`

---

## CSS 变量修改 (cascade.css)

| 变量名 | 原版值 | 修改值 | 影响范围 | 文件位置 |
|--------|--------|--------|----------|----------|
| `--primary` | `#5e72e4` | `#8e9cf9` | 主题色 (蓝) | cascade.css:44 |
| `--dark-primary` | `#483d8b` | `#7580c7` | 深色主题色 | cascade.css:45 |
| `--info` | `#11cdef` | `#707fd7` | 通知/信息色 | cascade.css:63 |
| `--border-radius-md` | 无 | `0.6rem` | 圆角变量 (新增) | cascade.css:60 |

### 颜色对比

```
原版主题色: #5e72e4 ████████
修改主题色: #8e9cf9 ████████ (更亮的蓝紫色)

原版深色:   #483d8b ████████
修改深色:   #7580c7 ████████ (更亮)
```

---

## 样式修改

### 圆角统一调整

原版圆角为 `0.25rem`，修改版使用变量 `--border-radius-md: 0.6rem`

| 选择器 | 原版圆角 | 修改圆角 | 文件位置 |
|--------|----------|----------|----------|
| `h2` | `0.25rem` | `var(--border-radius-md)` | cascade.css:210 |
| `h3` | `0.25rem` | `var(--border-radius-md)` | cascade.css:224 |
| `.cbi-section` | `0.25rem` | `var(--border-radius-md)` | cascade.css:574 |
| `.cbi-button, .btn` | `0.25rem` | `var(--border-radius-md)` | cascade.css:248 |
| `.modal` | `0.25rem` | `var(--border-radius-md)` | cascade.css:1936 |
| `.tabs` | `0.25rem` | `var(--border-radius-md)` | cascade.css:1050 |
| `.cbi-tabmenu > li` | `0.25rem` | `var(--border-radius-md)` | cascade.css:1120 |
| `.ifacebox` | `4px` | `var(--border-radius-md)` | cascade.css:2600 |
| `.alert, .alert-message` | `0.25rem` | `var(--border-radius-md)` | cascade.css:382 |
| `select, input` | `0.25rem` | `var(--border-radius-md)` | cascade.css:248 |
| `.cbi-dropdown` | `0.25rem` | `var(--border-radius-md)` | cascade.css:248 |
| `.cbi-progressbar` | `0.5rem` | `0.5rem` (保持) | cascade.css:1890 |

---

## 目录重命名

| 原版路径 | 修改路径 |
|----------|----------|
| `htdocs/luci-static/argon/` | `htdocs/luci-static/argon-2026/` |
| `ucode/template/themes/argon/` | `ucode/template/themes/argon-2026/` |
| `menu-argon.js` | `menu-argon-2026.js` |
| `root/etc/uci-defaults/30_luci-theme-argon` | `root/etc/uci-defaults/30_luci-theme-argon-2026` |
| `root/usr/share/rpcd/acl.d/luci-theme-argon.json` | `root/usr/share/rpcd/acl.d/luci-theme-argon-2026.json` |
| `root/usr/share/uci-invoke-support/luci.argon_wallpaper` | `root/usr/share/uci-invoke-support/luci.argon2026_wallpaper` |

---

## 模板文件修改 (ucode)

### header.ut

| 修改项 | 文件位置 | 原值 | 修改值 | 说明 |
|--------|----------|------|--------|------|
| CSS 路径 | :48 | `/luci-static/argon/css/dark.css` | `/luci-static/argon-2026/css/dark.css` | 修复路径 |
| body class | :129 | `` ` - ${striptags(node.title)}` `` | `' - ' + striptags(node.title)` | ucode 语法兼容 |

### header_login.ut

| 修改项 | 文件位置 | 原值 | 修改值 | 说明 |
|--------|----------|------|--------|------|
| CSS 路径 | :38 | `/luci-static/argon/css/dark.css` | `/luci-static/argon-2026/css/dark.css` | 修复路径 |

### footer.ut

| 修改项 | 文件位置 | 原值 | 修改值 | 说明 |
|--------|----------|------|--------|------|
| 仓库链接 | :13 | `jerrykuku/luci-theme-argon` | `jerrykuku/luci-theme-argon-2026` | 更新链接 |
| 变量名 | :38,45 | `keyboradHeight` | `keyboardHeight` | 拼写修复 |
| JS 文件引用 | :55 | `menu-argon` | `menu-argon-2026` | 文件重命名 |

### footer_login.ut

| 修改项 | 文件位置 | 原值 | 修改值 | 说明 |
|--------|----------|------|--------|------|
| 仓库链接 | :13 | `jerrykuku/luci-theme-argon` | `jerrykuku/luci-theme-argon-2026` | 更新链接 |
| 变量名 | :38,45 | `keyboradHeight` | `keyboardHeight` | 拼写修复 |
| JS 文件引用 | :55 | `menu-argon` | `menu-argon-2026` | 文件重命名 |

### sysauth.ut

| 修改项 | 文件位置 | 原值 | 修改值 | 说明 |
|--------|----------|------|--------|------|
| CSS 路径 | :38 | `/luci-static/argon/css/dark.css` | `/luci-static/argon-2026/css/dark.css` | 修复路径 |

---

## 安装脚本修改

### uci-defaults (首次安装)

| 文件 | 原版 | 修改版 |
|------|------|--------|
| 路径 | `root/etc/uci-defaults/30_luci-theme-argon` | `root/etc/uci-defaults/30_luci-theme-argon-2026` |
| 行数 | 12 行 | 5 行 |

**原版功能**:
```bash
# 检查是否为升级，首次安装时设置为默认主题
if [ "$PKG_UPGRADE" != 1 ]; then
    uci get luci.themes.Argon >/dev/null 2>&1 || \
    uci batch <<-EOF
        set luci.themes.Argon=/luci-static/argon
        set luci.main.mediaurlbase=/luci-static/argon
        commit luci
    EOF
fi
```

**修改版功能**:
```bash
# 仅注册主题，不自动设置为默认
uci -q batch <<-EOF
    set luci.themes.Argon2026=/luci-static/argon-2026
    commit luci
EOF
```

### postrm (卸载清理)

- 文件: `Makefile:29-52`
- 原版: 无
- 新增: 卸载时自动执行清理脚本

**执行逻辑**:
1. 检查 `IPKG_INSTROOT`，防止在 SDK 编译时误执行
2. 删除 UCI 主题注册: `uci -q delete luci.themes.Argon2026`
3. 防砖机制: 检查当前主题，如果是 argon-2026 则切回 bootstrap
4. 提交 UCI 更改: `uci commit luci`
5. 清除缓存: 删除 `/tmp/luci-modulecache/` 和 `/tmp/luci-indexcache`

---

## 资源文件变更

### 新增文件

| 文件 | 说明 |
|------|------|
| `htdocs/luci-static/argon-2026/favicon.ico` | 新的 favicon |
| `htdocs/luci-static/argon-2026/icon/favicon-16x16.png` | 16x16 图标 |
| `htdocs/luci-static/argon-2026/icon/favicon-32x32.png` | 32x32 图标 |
| `htdocs/luci-static/argon-2026/icon/favicon-96x96.png` | 96x96 图标 |
| `htdocs/luci-static/argon-2026/icon/android-icon-192x192.png` | Android 图标 |
| `htdocs/luci-static/argon-2026/icon/apple-icon-60x60.png` | Apple 60x60 图标 |
| `htdocs/luci-static/argon-2026/icon/apple-icon-72x72.png` | Apple 72x72 图标 |
| `htdocs/luci-static/argon-2026/icon/apple-icon-144x144.png` | Apple 144x144 图标 |
| `htdocs/luci-static/argon-2026/img/bg1.jpg` | 新的登录背景图 |
| `htdocs/luci-static/argon-2026/img/argon.svg` | 更新的 logo (12 行) |

### 删除文件

| 文件 | 说明 |
|------|------|
| `htdocs/luci-static/argon/` 目录下所有文件 | 原版目录 (迁移到 argon-2026) |
| `htdocs/luci-static/argon/img/argon.svg` | 原版 logo (37 行，更复杂) |
| `root/usr/share/rpcd/acl.d/luci-theme-argon.json` | 原版 ACL 配置 |

### 无变化文件 (仅迁移)

| 文件 | 说明 |
|------|------|
| `fonts/GoogleSans-Regular.woff` | 字体文件 |
| `fonts/GoogleSans-Regular.woff2` | 字体文件 |
| `fonts/TypoGraphica.woff` | 字体文件 |
| `fonts/TypoGraphica.woff2` | 字体文件 |
| `fonts/argon.woff` | 图标字体 |
| `fonts/argon.woff2` | 图标字体 |
| `icon/arrow.svg` | 箭头图标 |
| `icon/browserconfig.xml` | 浏览器配置 |
| `icon/manifest.json` | PWA 清单 |
| `icon/spinner.svg` | 加载动画 |
| `img/blank.png` | 空白占位图 |
| `img/volume_high.svg` | 音量高图标 |
| `img/volume_off.svg` | 静音图标 |
| `out_header_login.ut` | 模板文件 |

---

## 兼容性说明

### 与原版并存

本主题可与原版 luci-theme-argon 并行安装，因为：

1. **独立包名**: `luci-theme-argon-2026` vs `luci-theme-argon`
2. **独立目录**: `luci-static/argon-2026` vs `luci-static/argon`
3. **独立 UCI 注册**: `luci.themes.Argon2026` vs `luci.themes.Argon`
4. **独立 ACL**: `luci-theme-argon-2026.json` vs `luci-theme-argon.json`

### OpenWrt 版本兼容性

| OpenWrt 版本 | 兼容状态 | 说明 |
|-------------|---------|------|
| 25.12 | ✅ 完全兼容 | 最新稳定版，使用 ucode 模板系统 |
| 24.10 | ✅ 完全兼容 | LTS 版本，使用 ucode 模板系统 |
| 23.05 | ✅ 完全兼容 | 使用 ucode 模板系统 |
| 22.03 | ❌ 不兼容 | 使用 Lua 模板系统，需要 `.htm` 模板文件 |
| 21.02 及更早 | ❌ 不兼容 | 使用 Lua 模板系统，需要 `.htm` 模板文件 |

---

## 源码统计

```
修改文件: 53 个
代码行数变化: +1478 / -570
新增文件: 17 个
删除文件: 15 个
```
