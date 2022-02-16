<div class="taroify-docs-card">
  <div style="padding-top: 20px; text-align: center" >
    <img style="width: 120px; height: 120px; margin: 16px 0;" src="https://img.yzcdn.cn/vant/logo.png">
    <h2 style="margin: 0; font-size: 36px; line-height: 60px;">Taroify</h2>
    <p>轻量、可靠的小程序端 Taro React UI 组件库</p>
  </div>
</div>

### 介绍

Taroify 是移动端组件库 [Vant](https://github.com/youzan/vant) 的 Taro React 版本，两者基于相同的视觉规范，提供一致的 API 接口，助力开发者快速搭建小程序应用。

### 特性

- 🚀 性能极佳，组件平均体积小于 1KB（min+gzip）
- 💎 60+ 个高质量组件，覆盖移动端主流场景
- 💪 使用 TypeScript 编写，提供完整的类型定义
- 💪 单元测试覆盖率超过 90%，提供稳定性保障
- 📖 提供完善的中文文档和组件示例
- 🍭 支持 React
- 🍭 支持主题定制，内置 700+ 个主题变量
- 🍭 支持按需引入和 Tree Shaking
- 🌍 支持国际化和语言包定制

### 浏览器支持

支持现代浏览器以及 Chrome >= 51、iOS >= 10.0。

### 安装

在现有项目中使用 Taroify 时，可以通过 `npm` 进行安装

```bash
npm i @taroify/core
```

当然，你也可以通过 `yarn` 或 `pnpm` 进行安装

```bash
yarn add @taroify/core

pnpm add @taroify/core
```

### 快速上手

```tsx
import { Button } from "@taroify/core"
import "@taroify/core/button/style"

function Index() {
  return <Button color="primary">按钮</Button>
}
```

更多使用方式，请参考[快速上手](https://taroify.gitee.io/taroify.com/quickstart/)

### 贡献代码

修改代码请阅读我们的[开发指南](https://taroify.gitee.io/taroify.com/contribution/)。

使用过程中发现任何问题都可以提 [Issue](https://github.com/mallfoundry/taroify/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://github.com/mallfoundry/taroify/pulls)。

### 微信交流群

<img src="https://gitee.com/mallfoundry/taroify/raw/main/wechat-qrcode.png" width="200" style="margin: 0; width: 200px; height: 200px;"  />

<p>备注 "taroify" 加好友后邀请进群</p>

QQ 交流群：[861675189](https://jq.qq.com/?_wv=1027&k=G4Bvbk6B)

### 贡献者

<a href="https://github.com/mallfoundry/taroify/graphs/contributors">
  <img src="https://opencollective.com/taroify/contributors.svg?width=890&button=false"/>
</a>

- 部分图形设计来自 [@BiscuitCoder](https://uyyu.xyz/)

###  Vant 官方生态

由 Vant 官方团队维护的项目如下：

| 项目 | 描述 |
| --- | --- |
| [vant](https://github.com/youzan/vant) | Vant Vue 版 |
| [vant-weapp](https://github.com/youzan/vant-weapp) | Vant 微信小程序版 |
| [vant-demo](https://github.com/youzan/vant-demo) | Vant 官方示例合集 |
| [vant-cli](https://github.com/youzan/vant/tree/dev/packages/vant-cli) | 开箱即用的组件库搭建工具 |
| [vant-icons](https://github.com/youzan/vant/tree/dev/packages/vant-icons) | Vant 图标库 |
| [vant-touch-emulator](https://github.com/youzan/vant/tree/dev/packages/vant-touch-emulator) | 在桌面端使用 Vant 的辅助库 |

### 社区生态

由社区维护的项目如下，欢迎补充：

| 项目 | 描述 |
| --- | --- |
| [3lang3/react-vant](https://github.com/3lang3/react-vant) | 参照 Vant 打造的 React 移动端组件库 |
| [rc-ui-lib](https://github.com/rancui/rc-ui-lib) | 参照 Vant 打造的 React 框架移动端组件库 |
| [vant-aliapp](https://github.com/ant-move/Vant-Aliapp) | Vant 支付宝小程序版 |
| [taroify](https://gitee.com/mallfoundry/taroify) | Vant Taro React 版 |
| [vant-theme](https://github.com/Aisen60/vant-theme) | Vant 在线主题预览工具 |
| [@antmjs/vantui](https://github.com/antmjs/vantui) | 基于 Vant Weapp 开发的多端组件库，同时支持 Taro 和 React |

### 链接

- [仓库地址](https://github.com/mallfoundry/taroify)
- [意见反馈](https://github.com/mallfoundry/taroify/issues)
- [更新日志](https://taroify.gitee.io/taroify.com/changelog/)

### 赞助者

开发一个 UI 组件库是一项耗时的工作，尤其是要多端适配。Taroify 经常为此肝到深夜 ……

如果您认为 Taroify 帮助到了您的开发工作，您可以捐赠 Taroify 的研发工作，捐赠无门槛，哪怕是一杯可乐也好（相信这比打赏主播更有意义）。

<img src="https://gitee.com/mallfoundry/taroify/raw/main/wechatpay.png" width="260" style="width: 260px;" />

#### 支持者

<a href="https://github.com/Yorksh1re">@Yorksh1re</a>
<a href="https://github.com/akazwz">@akazwz</a>
<a href="https://github.com/programmer-yang">@Yang</a>

### 鸣谢

[Vant](https://github.com/youzan/vant) - 感谢 Vant 团队多年来的不断维护，让 Taroify 能够站在巨人的肩膀上。

[WebStorm](https://www.jetbrains.com) - 感谢 JetBrains 团队提供的集成开发环境，使得 Taroify 可以快速开发。

### 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。

###  友情推荐

| 项目 | 描述 |
| --- | --- |
| [mockm](https://github.com/wll8/mockm) | 一款优雅解决前端开发过程中各种接口问题的 nodejs 工具 |
| [taro-hooks](https://github.com/innocces/taro-hooks) | 为 Taro 而设计的 Hooks Library |
| [tarojs-router-next](https://github.com/lblblong/tarojs-router-next) | Taro 小程序路由库 / 自动生成带参数类型提示的路由方法 / 允许传递任意类型、任意大小的参数数据 / 同步的路由方法调用 / koa 体验一致的路由中间件 |
