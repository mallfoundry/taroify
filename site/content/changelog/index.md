# 更新日志

### 介绍

Taroify 遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范。

**发布节奏**

- 修订号：每周发布，包含新特性和问题修复。
- 次版本号：每隔一至二个月发布，包含新特性和较大的功能更新，向下兼容。
- 主版本号：发布时间不定，包含不兼容更新。

## 更新内容

### v0.0.9-alpha.0

`2021-07-26`

**New Component**

- 新增 Rate 组件
- 新增 Slider 组件

### v0.0.8-alpha.0

`2021-07-22`

**New Component**

- 新增 Stepper 组件
- 新增 Switch 组件

### v0.0.7-alpha.0

`2021-07-21`

**New Component**

- 新增 DropdownMenu 组件
- 新增 PullRefresh 组件
- 新增 Circle 组件
- 新增 List 组件
- 新增 IndexList 组件

### v0.0.6-alpha.0

`2021-06-21`

**New Component**

- 新增 SwipeCell 组件
- 新增 Collapse 组件
- 新增 CountDown 组件
- 新增 NoticeBar 组件
- 新增 Skeleton 组件
- 新增 Steps 组件
- 新增 TreeSelect 组件

### v0.0.5-alpha.0

`2021-05-21`

**New Component**

- 新增 Notify 组件
- 新增 Progress 组件
- 新增 Sticky 组件
- 新增 Swiper 组件
- 新增 Pagination 组件

**Breaking Changes**

- Cell：重命名 subtitle 属性为 brief
- Toast：重命名 placement 属性为 position

### v0.0.4-alpha.0

`2021-05-07`

**New Component**

- 新增 ActionSheet 组件
- 新增 Dialog 组件
- 新增 ShareSheet 组件

**Breaking Changes**

- Cell.Group：重命名 CellGroup 组件为 Cell.Group
- Popup：去除 backdrop 属性，将 backdrop 属性设计为 Popup.Backdrop 组件

**Bug Fixes**

- Popup：修复点击关闭图标无反应的问题

### v0.0.3-alpha.0

`2021-04-30`

**New Component**

- 新增 Badge 组件
- 新增 Tag 组件
- 新增 Grid 组件
- 新增 Navbar 组件
- 新增 Sidebar 组件
- 新增 Tabs 组件
- 新增 Tabbar 组件

**Breaking Changes**

- Cell：label 属性重命名为 title
- Cell：description 属性重命名为 subtitle

**Bug Fixes**

- 修复使用 babel-plugin-import 无法导入依赖组件样式问题

### v0.0.1-alpha.0

`2021-04-19`

**New Component**

- 新增 Backdrop 组件
- 新增 Button 组件
- 新增 Cell 组件
- 新增 CellGroup 组件
- 新增 Col 组件
- 新增 Image 组件
- 新增 Loading 组件
- 新增 Popup 组件
- 新增 Row 组件
- 新增 Toast 组件
- 新增 Transition 组件
