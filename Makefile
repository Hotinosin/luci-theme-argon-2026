# 版本: v1.0.4
# 文件路径: luci-theme-argon-2026/Makefile
# 修改时间: 2026-08-21
# 修改功能: 合并上游更新并恢复本地主题样式修复。

#
# Copyright (C) 2008-2019 Jerrykuku
# Modified for Tailwind Mod - 2026
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

# 强制声明你的专属包名
PKG_NAME:=luci-theme-argon-2026
LUCI_TITLE:=Argon Theme 2026 (Tailwind Mod)
LUCI_DEPENDS:=+USE_APK:wget-any +!USE_APK:wget +jsonfilter

# 更新版本号，便于识别
PKG_VERSION:=1.0.4
PKG_RELEASE:=20260821

CONFIG_LUCI_CSSTIDY:=

# =========================================================
# 核心钩子：在打包系统引入之前定义卸载后的执行动作
# =========================================================
define Package/luci-theme-argon-2026/postrm
#!/bin/sh
# 防护机制：确保只在路由器真实卸载时执行，防止在 SDK 编译构建根目录时误执行
[ -n "$${IPKG_INSTROOT}" ] && exit 0

# 1. 悄悄删除配置中的主题注册项
uci -q delete luci.themes.Argon2026

# 2. 防砖安全机制：如果卸载时用户正好在使用该主题，自动切回原厂默认的 bootstrap
if [ "$$(uci -q get luci.main.mediaurlbase)" = "/luci-static/argon-2026" ]; then
	uci -q set luci.main.mediaurlbase="/luci-static/bootstrap"
fi

uci commit luci

# 3. 自动清空缓存，让菜单即刻生效
rm -rf /tmp/luci-modulecache/
rm -rf /tmp/luci-indexcache
exit 0
endef

# 引入官方标准的 LuCI 编译框架 (必须放在 postrm 定义的下方)
include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
