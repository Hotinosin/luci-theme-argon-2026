# Master 分支的更新日志

> **注意**：以下版本（v1.0.x）为 AI 修改版 `luci-theme-argon-2026` 的更新日志。

## v1.0.1 [ 2026-03-24 ]

### Bug 修复

#### 严重问题
- **修复 dark.css 和 cascade.css 文件路径错误**
  - 问题：路径仍指向旧的 `argon` 目录，导致暗色模式无法正常加载
  - 修复文件：
    - `ucode/template/themes/argon-2026/header.ut:39`
    - `ucode/template/themes/argon-2026/header_login.ut:38`
    - `less/dark.less:1`
    - `less/cascade.less:1`
  - 路径从 `/www/luci-static/argon/css/` 改为 `/www/luci-static/argon-2026/css/`

- **修复 body class 模板语法错误**
  - 问题：使用了 JavaScript 模板字符串语法，ucode 无法正确解析
  - 修复文件：`ucode/template/themes/argon-2026/header.ut:129`
  - 从 `` ` - ${striptags(node.title)}` `` 改为 `' - ' + striptags(node.title)`

#### 中等问题
- **修复 CSS 变量重复定义**
  - 问题：`--light` 和 `--white` 变量被重复定义，后面的值覆盖了前面的值
  - 修复文件：`less/cascade.less`
  - 移除了重复的变量定义

- **修复拼写错误 "Agron" → "Argon"**
  - 修复文件：
    - `ucode/template/themes/argon-2026/footer.ut:13`
    - `ucode/template/themes/argon-2026/footer_login.ut:13`
    - `less/cascade.less:15`
    - `less/dark.less:22`

#### 轻微问题
- **修复变量名拼写错误 "keyboradHeight" → "keyboardHeight"**
  - 修复文件：
    - `ucode/template/themes/argon-2026/footer.ut:38,45`
    - `ucode/template/themes/argon-2026/footer_login.ut:38,45`

---

### 兼容性说明

| OpenWrt 版本 | 兼容状态 | 说明 |
|-------------|---------|------|
| 25.12 | ✅ 完全兼容 | 最新稳定版，使用 ucode 模板系统 |
| 24.10 | ✅ 完全兼容 | LTS 版本，使用 ucode 模板系统 |
| 23.05 | ✅ 完全兼容 | 使用 ucode 模板系统 |
| 22.03 | ❌ 不兼容 | 使用 Lua 模板系统，需要 `.htm` 模板文件 |
| 21.02 及更早 | ❌ 不兼容 | 使用 Lua 模板系统，需要 `.htm` 模板文件 |

**注意**：本主题与原版 luci-theme-argon (v2.4.3) 的兼容性一致，仅支持 OpenWrt 23.05 及以上版本。

---

## v1.0.0 [ 2026-03-03 ]

### 首次发布
- 基于 luci-theme-argon (v2.4.3) 修改的 luci-theme-argon-2026 首次发布
- 重命名主题目录从 `argon` 到 `argon-2026`
- 新增 `postrm` 脚本，实现卸载时自动清理：
  - 删除 UCI 中的主题注册信息
  - 防砖机制：自动切换回默认 bootstrap 主题
  - 清除 LuCI 缓存
- 更新包名为 `luci-theme-argon-2026`

---

> **原版版本**：以下版本为原版 luci-theme-argon 的更新日志。

## v2.4.3 [ 2025.07.22 ]

- **重构**: 移除了对 jQuery 库的依赖，全面使用原生 JavaScript 替代
- **现代化**: 升级 HTML meta 标签，提升网页安全性和兼容性
- **安全增强**: 添加安全相关的 HTTP 头信息（CSP、XSS 防护、点击劫持防护等）
- **字体系统**: 现代化字体系统，新增 Google Sans 字体支持
- **字体优化**: 替换过时的字体格式（eot/svg/ttf）为 woff2，提升加载性能
- **CSS升级**: Pure CSS 升级到 v3.0.0 版本
- **菜单优化**: 改进菜单动画，移除 jQuery 依赖并同步动画时序
- **样式改进**: 新增 dockerman 相关样式支持
- **移动端优化**: 优化移动端和 PWA 相关的 meta 标签配置
- **图标整理**: 重新整理网站图标链接，按现代标准排序
- **无障碍性**: 改善网页无障碍性，允许用户缩放页面
- **代码结构**: 优化代码结构，添加逻辑分组注释

## v2.3.1 [ 2023.04.20 ]

- 修复了下拉菜单被裁切的问题
- 修复了退出图标变成了应用商店图标的问题
- 修复了暗色模式下个别颜色不受控制的问题
- 修复了启动项--本地启动脚本文本框不能滑动的问题
- 修复了Passwall节点列表按钮错位的问题
- 修复在dynlist中的文本溢出问题
- 登录页面 支持自来 Unsplash 的在线壁纸
- 修复在macOS的Chrome中,菜单的style异常
- 修复在登录页面中,主题图标变大的问题
- 登录页面 支持自来 wallhaven 的在线壁纸
  > 打开页脚链接时使用新标签页
- 重制主题图标

## v2.3 [ 2023.04.03 ]

- 更新了 Loading 的样式
- 修复了大量的 CSS 样式错误，整体更加统一
- 修复了暗色模式下个别颜色不受控制的问题

## v2.2.9

- 修复了在手机模式下无法弹出菜单的 bug
- 统一 css 间距的设置
- 重构了登录页面的代码
- 为导航菜单添加滑动效果

## v2.2.8

- 【v2.2.8】修复编译时打开 Minify Css 选项，导致磨砂玻璃效果无效，logo 字体丢失的问题

## v2.2.5

- 全新的设置 app.你可以设置 argon 主题的登录页面的模糊和透明度，并管理背景图片与视频。[建议使用 Chrome][点击下载](https://github.com/jerrykuku/luci-app-argon-config/releases/download/v0.8-beta/luci-app-argon-config_0.8-beta_all.ipk)
- 当编译固件时，将自动设置为默认主题。
- 修改文件结构，以适应 luci-app-argon-config，旧的开启暗色模式方法将不再适用，请搭配 luci-app-argon-config 使用。
- 适配 Koolshare lede 2.3.6。
- 修复了一些 Bug。

## v2.2.4

- 修复了在某些手机下图片背景第一次加载不能显示的问题。
- 取消 luasocket 的依赖，无需再担心依赖问题。

## v2.2.3

- 修正了在暗色模式下，固件刷写弹窗内的显示错误。
- 更新了图标库，为未定义的菜单增加了一个默认的图标。

## v2.2.2

- 背景文件策略调整为，同时接受 jpg png gif mp4, 自行上传文件至 /www/luci-static/argon/background 图片和视频同时随机。
- 增加强制暗色模式，进入 ssh 输入 "touch /etc/dark" 进行开启。
- 视频背景加了一个音量开关，喜欢带声音的可以自行点击开启，默认为静音模式。
- 修复了手机模式下，登录页面出现键盘时，文字覆盖按钮的问题。
- 修正了暗黑模式下下拉选项的背景颜色，同时修改了滚动条的样式。
- jquery 更新到 v3.5.1。
- 获取 Bing Api 的方法从 wget 更新到 luasocket 并添加依赖。

## v2.2.1

- 登录背景添加毛玻璃效果。
- 全新的登录界面,图片背景跟随 Bing.com，每天自动切换。
- 全新的主题 icon。
- 增加多个导航 icon。
- 细致的微调了 字号大小边距等等。
- 重构了 css 文件。
- 自动适应的暗黑模式。
