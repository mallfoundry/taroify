# 更新日志

### 介绍

Taroify 遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范。

**发布节奏**

- 修订号：每周发布，包含新特性和问题修复。
- 次版本号：每隔一至二个月发布，包含新特性和较大的功能更新，向下兼容。
- 主版本号：发布时间不定，包含不兼容更新。

## 更新内容

### v0.0.15-alpha.2

`2021-10-19`

**Bug Fixes**

- Transition
  - 修复因设置 unmountOnExit 属性，而导致小程序渲染错乱的问题[#42](https://github.com/mallfoundry/taroify/issues/42)

### v0.0.15-alpha.1

`2021-10-18`

**Feature**

- Tabs
  - 新增 bottomBar 的 css 变量[#40](https://github.com/mallfoundry/taroify/issues/40)

### v0.0.15-alpha.0

`2021-10-16`

**New Component**

- 新增 ConfigProvider 组件[#39](https://github.com/mallfoundry/taroify/issues/39)

### v0.0.14-alpha.2

`2021-10-13`

**Bug Fixes**

- SwipeCell
  - 修复动画卡顿和 rightRect 为空的问题[#37](https://github.com/mallfoundry/taroify/issues/37)

### v0.0.14-alpha.1

`2021-10-11`

**Bug Fixes**

- Tabbar
  - 修复图标为空时，Badge 组件未清理的问题[#35](https://github.com/mallfoundry/taroify/issues/35)

### v0.0.14-alpha.0

`2021-10-11`

**Breaking Changes**

- DropdownMenu
  - activeKey 属性重命名为 value[#34](https://github.com/mallfoundry/taroify/issues/34)
- Collapse
  - activeKey 属性重命名为 value[#34](https://github.com/mallfoundry/taroify/issues/34)
- Sidebar
  - activeKey 属性重命名为 value[#34](https://github.com/mallfoundry/taroify/issues/34)
- TreeSelect
  - activeTab 属性重命名为 tabValue[#34](https://github.com/mallfoundry/taroify/issues/34)
  - activeValue 属性重命名为 value[#34](https://github.com/mallfoundry/taroify/issues/34)

### v0.0.13-alpha.0

`2021-10-09`

**Feature**

- 完善 css var 自定义主题[#23](https://github.com/mallfoundry/taroify/issues/23)
- 新增所有的 vant 图标[#30](https://github.com/mallfoundry/taroify/issues/30)

### v0.0.12-alpha.18

`2021-09-30`

**Bug Fixes**

- Button
  - 修复细边框样式模糊问题[#29](https://github.com/mallfoundry/taroify/issues/29)

### v0.0.12-alpha.17

`2021-09-27`

**Bug Fixes**

- Tabs
  - 修复滑动切换时 Tab 没有效果的问题[#28](https://github.com/mallfoundry/taroify/issues/28)

### v0.0.12-alpha.16

`2021-09-27`

**Feature**

- Tabs.TabPane
  - 新增 value 属性[#26](https://github.com/mallfoundry/taroify/issues/26)

**Bug Fixes**

- Button
  - 修复 disabled 为 true 时，依然可以点击的问题[#27](https://github.com/mallfoundry/taroify/issues/27)

**Breaking Changes**

- Tabs
  - activeKey 属性重命名为 value[#26](https://github.com/mallfoundry/taroify/issues/26)
  
### v0.0.12-alpha.15

`2021-09-27`

**Bug Fixes**

- Tabs
    - 修复在微信小程序获得 navRect 为空的问题[#19](https://github.com/mallfoundry/taroify/pull/19)

### v0.0.12-alpha.14

`2021-09-26`

**Feature**

- @taroify/icons
    - 在使用 @taroify/core 组件时，自动导入图标样式[#24](https://github.com/mallfoundry/taroify/issues/24)

### v0.0.12-alpha.13

`2021-09-26`

**Bug Fixes**

- NoticeBar
    - 修复动态渲染时，useReady 不执行的问题[#20](https://github.com/mallfoundry/taroify/pull/20)

### v0.0.12-alpha.12

`2021-09-23`

**Bug Fixes**

- Sheet
    - 修复按需导入样式的问题[#18](https://github.com/mallfoundry/taroify/issues/18)
- Tabs
    - 修复 navOffset 为 null 导致报错的问题[#17](https://github.com/mallfoundry/taroify/pull/17)

### v0.0.12-alpha.11

`2021-09-23`

**Bug Fixes**

- Divider
    - 修复 className 放置错误问题[#16](https://github.com/mallfoundry/taroify/pull/16)

### v0.0.12-alpha.10

`2021-09-22`

**Feature**

- 所有组件新增 className 属性[#15](https://github.com/mallfoundry/taroify/issues/15)

### v0.0.12-alpha.9

`2021-09-22`

### v0.0.12-alpha.8

`2021-09-22`

**Feature**

- Field
    - 新增 name 属性[#11](https://github.com/mallfoundry/taroify/issues/11)

**Bug Fixes**

- Import on demand
    - 修复重复导入样式的问题[#13](https://github.com/mallfoundry/taroify/issues/13)
- NoticeBar
    - 修复 NoticeBar 全局样式引入问题[#14](https://github.com/mallfoundry/taroify/issues/14)

### v0.0.12-alpha.7

`2021-09-09`

### v0.0.12-alpha.6

`2021-09-09`

**Bug Fixes**

- NumberKeyboard
    - 修复 classNames 导入方式不正确的问题[#10](https://github.com/mallfoundry/taroify/issues/10)

### v0.0.12-alpha.5

`2021-09-08`

**Feature**

- Navbar
    - title 提升为 ReactNode 类型[#7](https://github.com/mallfoundry/taroify/issues/7)
- Sticky
    - 新增 onChange 事件[#6](https://github.com/mallfoundry/taroify/issues/6)

**Breaking Change**

- Tabbar
    - 重命名 Tabbar.Item 为 Tabbar.TabItem[#8](https://github.com/mallfoundry/taroify/issues/8)

### v0.0.12-alpha.4

`2021-09-04`

**Feature**

- Button
    - 新增小程序属性[#2](https://github.com/mallfoundry/taroify/issues/2)
- Tabbar
    - 新增 fixed 属性[#5](https://github.com/mallfoundry/taroify/issues/5)
    - Tabbar：新增 placeholder 属性[#5](https://github.com/mallfoundry/taroify/issues/5)
    - Tabbar：新增 bordered 属性[#5](https://github.com/mallfoundry/taroify/issues/5)
    - Tabbar.Item：新增 badge 属性[#5](https://github.com/mallfoundry/taroify/issues/5)

### v0.0.12-alpha.3

`2021-09-03`

### v0.0.12-alpha.2

`2021-09-03`

**Bug Fixes**

- List：修复 nextTick 在微信小程序不执行的问题[#3](https://github.com/mallfoundry/taroify/issues/3)

### v0.0.12-alpha.1

`2021-08-31`

**Feature**

- Search：新增 icon 属性
- Navbar：新增 NavLeft onClick 事件
- Navbar：新增 NavRight onClick 事件
- Navbar：使用 NavLeft.children 代替 NavLeft.text
- Navbar：使用 NavRight.children 代替 NavRight.text

**Bug Fixes**

- Tabs：修复 设置 sticky 时 container 为 undefined 的问题

### v0.0.12-alpha.0

`2021-08-25`

**New Component**

- 新增 Field 组件
- 新增 Search 组件

**Feature**

- Cell.Group: 新增 inset 属性

### v0.0.11-alpha.0

`2021-08-18`

**New Component**

- 新增 NumberKeyboard 组件
- 新增 Uploader 组件

**Feature**

- Tabs: 新增 animated 属性
- Tabs: 新增 swipeable 属性

### v0.0.10-alpha.0

`2021-07-30`

**New Component**

- 新增 Checkbox 组件
- 新增 Radio 组件
- 新增 PasswordInput 组件

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
