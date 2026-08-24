<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false,
    "line_length":200
  },
  "MD033": false,
  "MD041": false
} -->

> **⚠️ AI 修改版本**
>
> 本项目基于 [jerrykuku/luci-theme-argon](https://github.com/jerrykuku/luci-theme-argon) 进行二次开发，由 AI 辅助修改完成。主题目录已从 `argon` 重命名为 `argon-2026`，支持与原版主题并行安装。
>
> 如有任何问题，欢迎提交 Issue 或 Pull Request。

### 新增截图

| | |
|:---:|:---:|
| ![screenshot_0](/Screenshots/screenshot_0.png) | ![screenshot_1](/Screenshots/screenshot_1.png) |
| ![screenshot_2](/Screenshots/screenshot_2.png) | ![screenshot_3](/Screenshots/screenshot_3.png) |

---

[license]: /LICENSE
[license-badge]: https://img.shields.io/github/license/jerrykuku/luci-theme-argon?style=flat-square&a=1
[prs]: https://github.com/jerrykuku/luci-theme-argon/pulls
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[issues]: https://github.com/jerrykuku/luci-theme-argon/issues/new
[issues-badge]: https://img.shields.io/badge/Issues-welcome-brightgreen.svg?style=flat-square
[release]: https://github.com/jerrykuku/luci-theme-argon/releases
[release-badge]: https://img.shields.io/github/v/release/jerrykuku/luci-theme-argon?style=flat-square
[download]: https://github.com/jerrykuku/luci-theme-argon/releases
[download-badge]: https://img.shields.io/github/downloads/jerrykuku/luci-theme-argon/total?style=flat-square
[contact]: https://t.me/jerryk6
[contact-badge]: https://img.shields.io/badge/Contact-telegram-blue?style=flat-square
[en-us-link]: /README.md
[zh-cn-link]: /README_ZH.md
[en-us-release-log]: /RELEASE.md
[zh-cn-release-log]: /RELEASE_ZH.md
[config-link]: https://github.com/jerrykuku/luci-app-argon-config/releases
[lede]: https://github.com/coolsnowwolf/lede
[official]: https://github.com/openwrt/openwrt
[immortalwrt]: https://github.com/immortalwrt/immortalwrt

<div align="center">
<img src="https://raw.githubusercontent.com/jerrykuku/staff/master/argon_title4.svg">

# 一个全新的 OpenWrt 主题

Argon 是**一款干净整洁的 OpenWrt LuCI 主题**，  
允许用户使用图片或视频自定义其登录界面。  
它还支持在浅色模式和深色模式之间自动或手动切换。

[![license][license-badge]][license]
[![prs][prs-badge]][prs]
[![issues][issues-badge]][issues]
[![release][release-badge]][release]
[![download][download-badge]][download]
[![contact][contact-badge]][contact]

[English][en-us-link] |
**简体中文**

[特色](#特色) •
[分支介绍](#分支介绍) •
[版本历史](#版本历史) •
[快速开始](#快速开始) •
[屏幕截图](#屏幕截图) •
[贡献者](#贡献者) •
[鸣谢](#鸣谢)

<img src="https://raw.githubusercontent.com/jerrykuku/staff/master/argon2.gif">
</div>

## 特色

- 干净整洁的布局。
- 适配移动端显示。
- 可自定义主题颜色。
- 支持使用 Bing 图片作为登录背景。
- 支持自定义上传图片或视频作为登录背景。
- 通过系统自动在明暗模式之间切换，也可设置为固定模式。
- 带有扩展功能的设置插件 [luci-app-argon-config][config-link]

## 分支介绍

目前有两个主要的分支，适应于不同版本的**OpenWrt**源代码。  
下表为详细的介绍：

| 分支   | 版本   | 介绍                        | 匹配源码                                              |
| ------ | ------ | --------------------------- | ----------------------------------------------------- |
| master | v2.x.x | 支持最新和比较新版本的 LuCI | [官方 OpenWrt][official] • [ImmortalWrt][immortalwrt] |
| 18.06  | v1.x.x | 支持 18.06 版本的 LuCI      | [Lean's LEDE][lede]                                     |

## 版本历史

当前上游 Argon 基线为 v2.4.7，[点击这里][zh-cn-release-log]查看完整的版本历史日志。

## 快速开始

### 使用 Lean's LEDE 构建

```bash
cd lede/package/lean
rm -rf luci-theme-argon
git clone -b 18.06 https://github.com/jerrykuku/luci-theme-argon.git luci-theme-argon
make menuconfig #choose LUCI->Theme->Luci-theme-argon
make -j1 V=s
```

### 使用官方 OpenWrt SnapShots 和 ImmortalWrt

```bash
cd openwrt/package
git clone https://github.com/jerrykuku/luci-theme-argon.git
make menuconfig #choose LUCI->Theme->Luci-theme-argon
make -j1 V=s
```

### 在 18.06 的 LuCI 上安装 ( Lean's LEDE )

```bash
wget --no-check-certificate https://github.com/jerrykuku/luci-theme-argon/releases/download/v1.8.2/luci-theme-argon_1.8.2-20230609_all.ipk
opkg install luci-theme-argon*.ipk
```

### 在官方和 ImmortalWrt 上安装

```bash
opkg install luci-compat
opkg install luci-lib-ipkg
wget --no-check-certificate https://github.com/jerrykuku/luci-theme-argon/releases/download/v2.3.2/luci-theme-argon_2.3.2-r20250207_all.ipk
opkg install luci-theme-argon*.ipk
```

### 安装 luci-app-argon-config

```bash
wget --no-check-certificate https://github.com/jerrykuku/luci-app-argon-config/releases/download/v0.9/luci-app-argon-config_0.9_all.ipk
opkg install luci-app-argon-config*.ipk
```

## 注意

- 强烈建议使用 Chrome 浏览器。这个主题中使用了一些新的 css3 功能，目前只有 Chrome 浏览器有最好的兼容性。
- 微软已正式退役 Internet Explorer，安息吧 IE🙏<del>目前，IE 系列的主线版本有需要解决的错误。</del>
- FireFox 默认不启用 backdrop-filter，[见这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter)的打开方法。

## 屏幕截图

![desktop](/Screenshots/screenshot_pc.jpg)
![mobile](/Screenshots/screenshot_phone.jpg)

## 贡献者

<a href="https://github.com/jerrykuku/luci-theme-argon/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jerrykuku/luci-theme-argon" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## 相关项目

- [luci-app-argon-config](https://github.com/jerrykuku/luci-app-argon-config): Argon 主题的设置插件
- [openwrt-package](https://github.com/jerrykuku/openwrt-package): 我的 OpenWrt Package
- [CasaOS](https://github.com/IceWhaleTech/CasaOS): 一个简单、易用且优雅的开源个人家庭云系统（我目前主要开发的项目）

## 鸣谢

[luci-theme-material](https://github.com/LuttyYang/luci-theme-material/)
