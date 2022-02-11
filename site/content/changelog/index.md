# 更新日志

### 介绍

Taroify 遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范。

**发布节奏**

- 修订号：每周发布，包含新特性和问题修复。
- 次版本号：每隔一至二个月发布，包含新特性和较大的功能更新，向下兼容。
- 主版本号：发布时间不定，包含不兼容更新。

## 更新内容

### v0.0.27-alpha.0

`2022-02-11`

**New Component**

- 新增 @taroify/commerce 包 [#84](https://github.com/mallfoundry/taroify/issues/84)
- 新增 ActionBar 组件 [#341](https://github.com/mallfoundry/taroify/pull/341)

**Bug Fixes**

- Tabs
  - 修复切换标签页会触发两次 onChange 事件的问题 [#336](https://github.com/mallfoundry/taroify/issues/336) [#339](https://github.com/mallfoundry/taroify/pull/339)
- Skeleton
  - 修复设置动画无效果的问题 [#334](https://github.com/mallfoundry/taroify/pull/334)

### v0.0.26-alpha.6

`2022-02-08`

**Bug Fixes**

- Badge
  - 修复独立模式 fixed 的问题 [#331](https://github.com/mallfoundry/taroify/pull/331)
- Button
  - 修复 loading 为 false 时，不能显示图标的问题 [#332](https://github.com/mallfoundry/taroify/pull/332) [@yifeishu-com](https://github.com/yifeishu-com)

### v0.0.26-alpha.5

`2022-01-28`

**Feature**

- ShareSheet.Option
  - 新增 value 属性 [#328](https://github.com/mallfoundry/taroify/pull/328)

### v0.0.26-alpha.4

`2022-01-28`

**Bug Fixes**

- Stepper
  - 修复获取手动输入值不正确的问题 [#326](https://github.com/mallfoundry/taroify/pull/326)
- Popup
  - 修复固定定位（fixed position）和动画（translate3d）联用的问题 [#327](https://github.com/mallfoundry/taroify/pull/327)

### v0.0.26-alpha.3

`2022-01-28`

**Bug Fixes**

- Input
  - 修复字号（font-size）、行高（line-height）继承父元素样式的问题 [#325](https://github.com/mallfoundry/taroify/pull/325)
  - 修复清除按钮点击无效果的问题 [#320](https://github.com/mallfoundry/taroify/pull/320)
- Textarea
  - 修复字号（font-size）、行高（line-height）继承父元素样式的问题 [#324](https://github.com/mallfoundry/taroify/pull/324)
- Form
  - 修复非表单环境下设置空字符串的问题 [#323](https://github.com/mallfoundry/taroify/pull/323)
  - 修复嵌套 Input 组件不能自定义颜色的问题 [#323](https://github.com/mallfoundry/taroify/pull/323)

### v0.0.26-alpha.2

`2022-01-27`

**Bug Fixes**

- ShareSheet
  - 修复 image 样式被覆盖的问题 [#316](https://github.com/mallfoundry/taroify/pull/316)
- Textarea
  - 修复设置 value 无效的问题 [#315](https://github.com/mallfoundry/taroify/pull/315)

### v0.0.26-alpha.1

`2022-01-26`

**Feature**

- Form
  - 补全 FormInstance 类型 [#311](https://github.com/mallfoundry/taroify/pull/311)

**Bug Fixes**

- useHeight
  - 修复 rect 为 undefined 的问题 [#312](https://github.com/mallfoundry/taroify/pull/312)

### v0.0.26-alpha.0

`2022-01-26`

**New Component**

- 新增 Textarea 组件 [#297](https://github.com/mallfoundry/taroify/pull/297)

**Feature**

- Field
  - 优化 label, feedback 属性 [#310](https://github.com/mallfoundry/taroify/issues/310) [#299](https://github.com/mallfoundry/taroify/pull/299) [@coderYarn](https://github.com/coderYarn)

**Bug Fixes**

- Avatar
  - 修复 className 无法传入的问题 [#308](https://github.com/mallfoundry/taroify/pull/308) [@coderYarn](https://github.com/coderYarn)
- Input
  - 修复独立于 Form 组件，无法赋值的问题 [#298](https://github.com/mallfoundry/taroify/pull/298)
- Button
  - 修复加载（loading）状态下还可以提交表单的问题 [#306](https://github.com/mallfoundry/taroify/pull/306)
- Grid.Item
  - 修复 badge 字号样式问题 [#309](https://github.com/mallfoundry/taroify/pull/309)
- Tabbar.Item
  - 修复 badge 字号样式问题 [#309](https://github.com/mallfoundry/taroify/pull/309)

### v0.0.25-alpha.1

`2022-01-24`

**Feature**

- IndexList
  - 新增 stickyOffsetTop 字符串（string）类型 [#287](https://github.com/mallfoundry/taroify/pull/287) [@bluescurry](https://github.com/bluescurry)
- ActionSheet
  - 新增按钮（Button）相关属性 [#292](https://github.com/mallfoundry/taroify/pull/292)

**Bug Fixes**

- Picker
  - 修复当子元素（children）改变时，索引（index）未更新的问题 [#289](https://github.com/mallfoundry/taroify/pull/289)

### v0.0.25-alpha.0

`2022-01-20`

**New Component**

- 新增 Avatar 组件 [#233](https://github.com/mallfoundry/taroify/issues/233) [#248](https://github.com/mallfoundry/taroify/pull/248) [@coderYarn](https://github.com/coderYarn)
- 新增 AreaPicker 组件 [#77](https://github.com/mallfoundry/taroify/issues/77) [#264](https://github.com/mallfoundry/taroify/pull/272) [#264](https://github.com/mallfoundry/taroify/pull/272)

**Feature**

- IndexList.Anchor
  - 新增全部属性 [#282](https://github.com/mallfoundry/taroify/pull/282) [@bluescurry](https://github.com/bluescurry)
- Picker
  - 新增 onChange 事件返回 column 对象 [#269](https://github.com/mallfoundry/taroify/blob/1b80d78ed8bd0150b83c1485a3a5b692975ce7d9/packages/core/src/picker/picker-columns.tsx#L37)
- SwipeCell
  - 优化微信小程序端的滑动动画效果 [#265](https://github.com/mallfoundry/taroify/pull/265)

**Bug Fixes**

- Toast
  - 修复页面切换返回后不能打开的问题 [#283](https://github.com/mallfoundry/taroify/issues/283) [#284](https://github.com/mallfoundry/taroify/pull/284)
- Notify
  - 修复页面切换返回后不能打开的问题 [#283](https://github.com/mallfoundry/taroify/issues/283) [#284](https://github.com/mallfoundry/taroify/pull/284)
- Dialog
  - 修复页面切换返回后不能打开的问题 [#283](https://github.com/mallfoundry/taroify/issues/283) [#284](https://github.com/mallfoundry/taroify/pull/284)
- Empty
  - 修复内部图片样式被覆盖的问题 [#268](https://github.com/mallfoundry/taroify/issues/268) [#271](https://github.com/mallfoundry/taroify/pull/271)

### v0.0.24-alpha.1

`2022-01-13`

**Feature**

- Form
  - 新增 onValuesChange 属性 [#258](https://github.com/mallfoundry/taroify/issues/258) [#261](https://github.com/mallfoundry/taroify/pull/261)

**Bug Fixes**

- Toast
  - 修复通过命令式调用重复打开的问题 [#259](https://github.com/mallfoundry/taroify/issues/259) [#260](https://github.com/mallfoundry/taroify/pull/260)
- Notify
  - 修复通过命令式调用重复打开的问题 [#259](https://github.com/mallfoundry/taroify/issues/259) [#260](https://github.com/mallfoundry/taroify/pull/260)
- Dialog
  - 修复通过命令式调用重复打开的问题 [#259](https://github.com/mallfoundry/taroify/issues/259) [#260](https://github.com/mallfoundry/taroify/pull/260)

### v0.0.24-alpha.0

`2022-01-12`

**Feature**

- Uploader
  - 新增 removable 属性 [#243](https://github.com/mallfoundry/taroify/issues/243) [#256](https://github.com/mallfoundry/taroify/pull/256)
- Picker
  - 监听返回完整的选项（Option）对象 [#239](https://github.com/mallfoundry/taroify/issues/239) [#242](https://github.com/mallfoundry/taroify/pull/242)

**Bug Fixes**

- Style
  - 修复 multi-ellipsis 无法省略的问题 [#245](https://github.com/mallfoundry/taroify/pull/245)
- DatetimePicker
  - 修复设置 defaultValue 无效的问题 [#238](https://github.com/mallfoundry/taroify/pull/238) [@Brain777777](https://github.com/Brain777777)
  - 修复 2 月存在 31 天的问题 [#240](https://github.com/mallfoundry/taroify/issues/240) [#254](https://github.com/mallfoundry/taroify/pull/254)

### v0.0.23-alpha.1

`2022-01-04`

**Bug Fixes**

- Field
  - 修复嵌套 Input 组件不能赋值 value 的问题 [#235](https://github.com/mallfoundry/taroify/issues/235)

### v0.0.23-alpha.0

`2022-01-04`

**New Component**

- 新增 Space 组件 [#228](https://github.com/mallfoundry/taroify/pull/228) [@coderYarn](https://github.com/coderYarn)

**Feature**

- ActionSheet.Action
  - 新增 value 属性 [#229](https://github.com/mallfoundry/taroify/pull/229) [@coderYarn](https://github.com/coderYarn)

**Bug Fixes**

- Checkbox.Group
  - 修复设置 value 为空数组时，Checkbox 组件的 checked 不为 false 的问题 [#231](https://github.com/mallfoundry/taroify/pull/231)

### v0.0.22-alpha.1

`2022-01-01`

**Feature**

- DatetimePicker
  - 新增 date-minute 类型（年月日时分） [#211](https://github.com/mallfoundry/taroify/issues/211) [#227](https://github.com/mallfoundry/taroify/pull/227)

**Bug Fixes**

- Input
  - 修复 readonly 状态下 placeholder 颜色为 --text-color-3 的问题 [#218](https://github.com/mallfoundry/taroify/pull/218)

### v0.0.22-alpha.0

`2022-01-01`

**New Component**

- 新增 Form 组件 [#118](https://github.com/mallfoundry/taroify/issues/118) [#224](https://github.com/mallfoundry/taroify/pull/224)

**Feature**

- Cell
  - 设置 icon 和 rightIcon 属性时，仅为图标组件添加单元格图标样式 [#214](https://github.com/mallfoundry/taroify/issues/214) [#225](https://github.com/mallfoundry/taroify/pull/225)
- Field
  - 新增 feedbackAlign 属性 [#224](https://github.com/mallfoundry/taroify/pull/224)
  - 新增 feedbackStatus 属性 [#224](https://github.com/mallfoundry/taroify/pull/224)
- Search
  - 新增 inputColor 属性 [#224](https://github.com/mallfoundry/taroify/pull/224)
  - 新增 feedbackAlign 属性 [#224](https://github.com/mallfoundry/taroify/pull/224)
  - 新增 feedbackStatus 属性 [#224](https://github.com/mallfoundry/taroify/pull/224)

**Breaking Changes**

- Field
  - 删除 Input 属性 [#224](https://github.com/mallfoundry/taroify/pull/224)
  - 将 message 属性重命名为 feedback [#224](https://github.com/mallfoundry/taroify/pull/224)
- Search
  - 将 message 属性重命名为 feedback [#224](https://github.com/mallfoundry/taroify/pull/224)

**Bug Fixes**

- Tabs
  - 修复 swipeable 不支持 lazyRender 的问题 [#218](https://github.com/mallfoundry/taroify/pull/218)

### v0.0.21-alpha.1

`2021-12-22`

**Feature**

- Countdown
  - 新增单符号（D, H, m, s）格式 [#206](https://github.com/mallfoundry/taroify/issues/206) [#208](https://github.com/mallfoundry/taroify/pull/208)

**Bug Fixes**

- Countdown
  - 修复 value 无法更新的问题 [#205](https://github.com/mallfoundry/taroify/issues/205) [#208](https://github.com/mallfoundry/taroify/pull/208)
- SafeArea
  - 修复 ios11 兼容性 constant(safe-area-inset-*) 的问题 [#199](https://github.com/mallfoundry/taroify/pull/199) [@Brain777777](https://github.com/Brain777777)

### v0.0.21-alpha.0

`2021-12-16`

**New Component**

- 新增 SafeArea 组件 [#195](https://github.com/mallfoundry/taroify/pull/195)

**Feature**

- Badge
  - 新增 position 属性 [#196](https://github.com/mallfoundry/taroify/pull/196)
- Button
  - 新增 loading.size 属性 [#192](https://github.com/mallfoundry/taroify/pull/192) [@zjwshisb](https://github.com/zjwshisb)
- ShareSheet.Option
  - 新增 openType 属性 [#194](https://github.com/mallfoundry/taroify/pull/194) [@kunkuntang](https://github.com/kunkuntang)

**Bug Fixes**

- Badge
  - 修复 content toString 的问题 [#196](https://github.com/mallfoundry/taroify/pull/196)

### v0.0.20-alpha.5

`2021-12-15`

**Bug Fixes**

- DatetimePicker
  - 修复 clampDate 和 useValue 的问题 [#190](https://github.com/mallfoundry/taroify/pull/190)

### v0.0.20-alpha.4

`2021-12-15`

**Feature**

- SwipeCell
  - 新增 defaultOpen 和 open 属性 [#172](https://github.com/mallfoundry/taroify/issues/172) [#186](https://github.com/mallfoundry/taroify/pull/186)

**Bug Fixes**

- Badge
  - 修复 content={0} 时，直接渲染 0 的问题 [#184](https://github.com/mallfoundry/taroify/pull/184) [@zjwshisb](https://github.com/zjwshisb)
- Field
  - 修复 H5 设置 inputAlign 为 right 无效的问题 [#182](https://github.com/mallfoundry/taroify/pull/182) [@zjwshisb](https://github.com/zjwshisb)
- Picker
  - 修复监听 onChange 事件为旧值的问题 [#189](https://github.com/mallfoundry/taroify/pull/189)
- DatetimePicker
  - 修复默认值为 undefined 的问题 [#188](https://github.com/mallfoundry/taroify/pull/188)

**Breaking Changes**

- Countdown
  - 将 useCountDown() 和 CountDown 合并在一起 [#176](https://github.com/mallfoundry/taroify/pull/176) [@Brain777777](https://github.com/Brain777777)
  - 将 CountDown 重命名为 Countdown [#179](https://github.com/mallfoundry/taroify/pull/179)
  - 将 current 属性重命名为 value [#179](https://github.com/mallfoundry/taroify/pull/179)
  - 将 millisecond 属性重命名为 interval={1} [#179](https://github.com/mallfoundry/taroify/pull/179)
  - 将 onFinish 事件重命名为 onComplete [#179](https://github.com/mallfoundry/taroify/pull/179)

### v0.0.20-alpha.3

`2021-12-11`

**Feature**

- Styles
  - 新增赋值 $hd 默认变量 [#173](https://github.com/mallfoundry/taroify/issues/173) [#174](https://github.com/mallfoundry/taroify/pull/174)

### v0.0.20-alpha.2

`2021-12-09`

**Bug Fixes**

- Pagination
  - 修复页码出现负数的问题 [#171](https://github.com/mallfoundry/taroify/pull/171) [@zjwshisb](https://github.com/zjwshisb)

### v0.0.20-alpha.1

`2021-12-09`

**Bug Fixes**

- Dialog
  - 修复点击确认按钮导致自动关闭 [#170](https://github.com/mallfoundry/taroify/issues/170) [#169](https://github.com/mallfoundry/taroify/pull/169)

### v0.0.20-alpha.0

`2021-12-08`

**Feature**

- Popup
  - 新增 defaultOpen 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Toast
  - 新增 defaultOpen 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Cascader
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Calendar
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Checkbox
  - 新增 defaultChecked 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- DatetimePicker
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Picker
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Radio
  - 新增 defaultChecked 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Rate
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Slider
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Stepper
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Switch
  - 新增 defaultChecked 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Uploader
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- ActionSheet
  - 新增 defaultOpen 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Dialog
  - 新增 defaultOpen 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- DropdownMenu
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Notify
  - 新增 defaultOpen 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Backdrop
  - 新增 defaultOpen 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- ShareSheet
  - 新增 defaultOpen 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Collapse
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Collapse
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Steps
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Swiper
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Sidebar
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Tabs
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- Tabbar
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)
- TreeSelect
  - 新增 defaultValue 属性 [#86](https://github.com/mallfoundry/taroify/issues/86) [#165](https://github.com/mallfoundry/taroify/pull/165)

### v0.0.19-alpha.3

`2021-12-04`

**Feature**

- NavBar
  - 新增 fixed & placeholder 属性 [#159](https://github.com/mallfoundry/taroify/pull/159)

**Bug Fixes**

- multi-ellipsis
  - 修复多行文本不省略的问题 [#160](https://github.com/mallfoundry/taroify/pull/160)

### v0.0.19-alpha.2

`2021-12-03`

**Bug Fixes**

- PullRefresh
  - 修复嵌套在 CustomWrapper 中不能触发 onRefresh 的问题 [#156](https://github.com/mallfoundry/taroify/pull/156)
- NumberKeyboard
  - 修复 Transition 组件未嵌套在真实元素上，而不能隐藏的的问题 [#154](https://github.com/mallfoundry/taroify/pull/154)

**Breaking Changes**

- PasswordInput
  - 将 focused 属性重命名为 focus 属性 [#155](https://github.com/mallfoundry/taroify/pull/155)

### v0.0.19-alpha.1

`2021-12-02`

**Feature**

- Transition
  - 新增 appear 、mountOnEnter 属性 [#148](https://github.com/mallfoundry/taroify/pull/148)

**Bug Fixes**

- createNodesRef
  - 修复获得嵌套在 CustomWrapper 内的 NodesRef 为 undefined 的问题 [#143](https://github.com/mallfoundry/taroify/pull/143) [@wowhy](https://github.com/wowhy)
- Circle
  - 修复重复获得 CanvasContext 导致无法初始化渲染的问题 [#145](https://github.com/mallfoundry/taroify/issues/145) [#146](https://github.com/mallfoundry/taroify/issues/146)
- Uploader
  - 修复在多选（multiple）模式下，不能显示上传的本地图片的问题 [#152](https://github.com/mallfoundry/taroify/issues/152) [#151](https://github.com/mallfoundry/taroify/pull/151)

**Performance**

- Backdrop
  - 使用 Transition 组件代替 css transition [#150](https://github.com/mallfoundry/taroify/issues/150) [#149](https://github.com/mallfoundry/taroify/issues/149)

### v0.0.19-alpha.0

`2021-11-26`

**Refactor**

- Swiper
  - 重构 Swiper 组件，增加 value 属性 [#120](https://github.com/mallfoundry/taroify/issues/120) [#137](https://github.com/mallfoundry/taroify/pull/137)

**Bug Fixes**

- Circle
  - 修复在低版本的小程序中不渲染的问题 [#139](https://github.com/mallfoundry/taroify/issues/139) [#140](https://github.com/mallfoundry/taroify/pull/140)

### v0.0.18-alpha.9

`2021-11-22`

**Feature**

- Icons
  - 修复在采用导入全部样式的方式时，存在图标样式被覆盖的问题 [#134](https://github.com/mallfoundry/taroify/issues/134) [#135](https://github.com/mallfoundry/taroify/issues/135)

### v0.0.18-alpha.8

`2021-11-19`

**Feature**

- Empty
  - 新增 children 属性 [#131](https://github.com/mallfoundry/taroify/issues/131) [#132](https://github.com/mallfoundry/taroify/pull/132)

### v0.0.18-alpha.7

`2021-11-19`

### v0.0.18-alpha.6

`2021-11-19`

**Bug Fixes**

- PullRefresh
  - 修复在小程序中 overflow 超出 100% 时，不能滚动下拉的问题 [#129](https://github.com/mallfoundry/taroify/issues/129) [#130](https://github.com/mallfoundry/taroify/issues/130)

### v0.0.18-alpha.5

`2021-11-17`

**Bug Fixes**

- Circle
  - 修复在 useReady 里获得 CanvasNode 为 undefined 的问题 [#127](https://github.com/mallfoundry/taroify/issues/127) [#128](https://github.com/mallfoundry/taroify/issues/128)

### v0.0.18-alpha.4

`2021-11-17`

**Bug Fixes**

- Field
  - 修复 calc(var(--padding-xs, #{$padding-xs}) * -1) 的问题 [#121](https://github.com/mallfoundry/taroify/issues/121) [#126](https://github.com/mallfoundry/taroify/issues/126)
- TreeSelect
  - 修复 calc(var(--padding-xs, #{$padding-xs}) * -1) 的问题 [#122](https://github.com/mallfoundry/taroify/issues/122) [#124](https://github.com/mallfoundry/taroify/issues/124)
- Slider
  - 修复 calc(var(--padding-xs, #{$padding-xs}) * -1) 的问题 [#123](https://github.com/mallfoundry/taroify/issues/123) [#125](https://github.com/mallfoundry/taroify/issues/125)

### v0.0.18-alpha.3

`2021-11-15`

**Feature**

- Uploader
  - 补全 Uploader.Image 属性 [#113](https://github.com/mallfoundry/taroify/issues/113) [#117](https://github.com/mallfoundry/taroify/pull/117)
- Icons
  - 补全 Icons 属性 [#113](https://github.com/mallfoundry/taroify/issues/113) [#115](https://github.com/mallfoundry/taroify/pull/115)

**Bug Fixes**

- List
  - 修复重复执行 onLoad 事件的问题 [#112](https://github.com/mallfoundry/taroify/issues/112) [#116](https://github.com/mallfoundry/taroify/pull/116)

### v0.0.18-alpha.2

`2021-11-14`

**Performance**

- 优化 Demo 示例项目打包体积 [#83](https://github.com/mallfoundry/taroify/pull/83) [@Ace Han](https://github.com/ace-han)

**Bug Fixes**

- Flex
  - 修复 Flex.Item 缺少 children 属性的问题 [#110](https://github.com/mallfoundry/taroify/issues/110) [#111](https://github.com/mallfoundry/taroify/pull/111)

### v0.0.18-alpha.1

`2021-11-14`

**Feature**

- 新增 @taroify/hooks 包 [#109](https://github.com/mallfoundry/taroify/issues/109)

### v0.0.18-alpha.0

`2021-11-14`

**New Component**

- 新增 Cascader 组件 [#96](https://github.com/mallfoundry/taroify/issues/96) [#106](https://github.com/mallfoundry/taroify/pull/106)

**Bug Fixes**

- Transition
  - 修复设置 in 属性默认为 true 时不执行动画的问题 [#100](https://github.com/mallfoundry/taroify/issues/100) [#101](https://github.com/mallfoundry/taroify/issues/101)
- Field
  - 修复 maxlength 默认为 -1 时，导致数字或整数无法输入的问题 [#99](https://github.com/mallfoundry/taroify/issues/99) [#102](https://github.com/mallfoundry/taroify/issues/102) [#105](https://github.com/mallfoundry/taroify/pull/105)

**Breaking Changes**

- Flex
  - 将 Row & Col 合并成 Flex 组件 [#103](https://github.com/mallfoundry/taroify/issues/103) [#104](https://github.com/mallfoundry/taroify/pull/104)

### v0.0.17-alpha.4

`2021-11-11`

**Bug Fixes**

- Sticky
  - 删除多余的 `console.log()` 打印 [#97](https://github.com/mallfoundry/taroify/issues/97) [#98](https://github.com/mallfoundry/taroify/pull/98)

### v0.0.17-alpha.3

`2021-11-11`

**Bug Fixes**

- Dialog
  - 修复在未按需加载内部使用 Button 组件样式的问题 [#90](https://github.com/mallfoundry/taroify/issues/90) [#93](https://github.com/mallfoundry/taroify/pull/93)
- Collapse
  - 修复因继承自 StandardProps 接口，而导致 value 为 undefined 的问题 [#89](https://github.com/mallfoundry/taroify/issues/89) [#94](https://github.com/mallfoundry/taroify/pull/94)

**Breaking Changes**

- PullRefresh
  - 将判断 reachTop 的逻辑移动到组件外部 [#92](https://github.com/mallfoundry/taroify/issues/92) [#95](https://github.com/mallfoundry/taroify/pull/95)

### v0.0.17-alpha.2

`2021-11-05`

**Feature**

- Toast
  - 新增命令式调用 `Toast.close()`、`Toast.setDefaultOptions()`、`Toast.resetDefaultOptions()` 方法 [#78](https://github.com/mallfoundry/taroify/issues/78)
- Notify
  - 新增命令式调用 `Notify.close()`、`Notify.setDefaultOptions()`、`Notify.resetDefaultOptions()` 方法 [#71](https://github.com/mallfoundry/taroify/issues/71)
- Dialog
  - 新增命令式调用 `Dialog.close()`、`Dialog.setDefaultOptions()`、`Dialog.resetDefaultOptions()` 方法 [#71](https://github.com/mallfoundry/taroify/issues/71)

**Bug Fixes**

- Image
  - 修复因 `display: none` 导致重复加载的问题 [#79](https://github.com/mallfoundry/taroify/pull/79) [@Pingren](https://github.com/Pingren)
- ShareSheet
  - 修复 ShareSheet.Option 在小程序上存在垂直展示的问题 [#82](https://github.com/mallfoundry/taroify/issues/82)
- PullRefresh
  - 修复在小程序真机下拉刷新时存在卡帧的问题 [#74](https://github.com/mallfoundry/taroify/issues/74)

### v0.0.17-alpha.1

`2021-11-04`

**Bug Fixes**

- Stepper
  - 修复第一次点击无反应的问题 [#76](https://github.com/mallfoundry/taroify/issues/76)

### v0.0.17-alpha.0

`2021-11-03`

**Feature**

- Search
  - 新增 focus 属性 [#73](https://github.com/mallfoundry/taroify/issues/73)
- Toast
  - 新增命令式调用 `Toast.open()`、`Toast.loading()`、`Toast.success()`、`Toast.fail()` 方法 [#71](https://github.com/mallfoundry/taroify/issues/71) [#69](https://github.com/mallfoundry/taroify/issues/69)
- Notify
  - 新增命令式调用 `Notify.open()` 方法 [#71](https://github.com/mallfoundry/taroify/issues/71) [#69](https://github.com/mallfoundry/taroify/issues/69)
- Dialog
  - 新增命令式调用 `Dialog.open()`、`Dialog.alert()`、`Dialog.confirm()` 方法 [#71](https://github.com/mallfoundry/taroify/issues/71) [#69](https://github.com/mallfoundry/taroify/issues/69)

**Bug Fixes**

- DatetimePicker
  - 修复在改变 value 导致缺少 columns 的问题 [#75](https://github.com/mallfoundry/taroify/issues/75)
- Popup
  - 修复在编译打包后因背景板（Backdrop）叠加显示在依赖 Popup 组件之上的问题 [#72](https://github.com/mallfoundry/taroify/issues/72)
- Search
  - 修复设置 autoFocus 属性无效的问题 [#73](https://github.com/mallfoundry/taroify/issues/73)

### v0.0.16-alpha.3

`2021-11-01`

**Bug Fixes**

- List
  - 修复因 children 改变未触发 onLoad 事件的问题 [#70](https://github.com/mallfoundry/taroify/issues/70)

### v0.0.16-alpha.2

`2021-11-01`

**Bug Fixes**

- Sticky
  - 修复因 offsetTop, offsetBottom 未显示解构而导致的设置属性错误的问题 [#68](https://github.com/mallfoundry/taroify/issues/68)

### v0.0.16-alpha.1

`2021-11-01`

**Bug Fixes**

- 修复`@taroify/icons`样式问题 [#67](https://github.com/mallfoundry/taroify/issues/67)

### v0.0.16-alpha.0

`2021-10-31`

**New Component**

- 新增 Calendar 组件 [#66](https://github.com/mallfoundry/taroify/issues/66)

**Feature**

- 提供完全属性集，为所有组件的属性继承自 StandardProps 接口 [#65](https://github.com/mallfoundry/taroify/issues/65)
- 使用 useMounted 代替 useReady 钩子 [#62](https://github.com/mallfoundry/taroify/issues/62)
- @taroify/icons 增强自动导入图标样式 [#63](https://github.com/mallfoundry/taroify/issues/63)

### v0.0.15-alpha.12

`2021-10-26`

**Breaking Changes**

- Cell.Group
  - title 属性的类型调整为 ReactNode [#60](https://github.com/mallfoundry/taroify/issues/60)

### v0.0.15-alpha.11

`2021-10-25`

**Bug Fixes**

- Popup
  - 修复导入`@taroify/~icons`的问题 [#59](https://github.com/mallfoundry/taroify/issues/59)

### v0.0.15-alpha.10

`2021-10-25`

**Feature**

- Tabs
  - 新增 TabsSticky 属性，用以设置 Tabs.sticky 属性 [#58](https://github.com/mallfoundry/taroify/issues/58)

**Breaking Changes**

- Sticky
  - 使用 offsetTop, offsetBottom 属性代替 { top, bottom } 属性 [#57](https://github.com/mallfoundry/taroify/issues/57)

### v0.0.15-alpha.9

`2021-10-25`

**Bug Fixes**

- Button
  - 修复文本按钮存在边框的问题 [#55](https://github.com/mallfoundry/taroify/issues/55)

**Breaking Changes**

- Button
  - 删除 color 自定义属性，使用 CSS className 和 style 代替 color 属性 [#56](https://github.com/mallfoundry/taroify/issues/56)

### v0.0.15-alpha.8

`2021-10-24`

**Feature**

- Sticky
  - 新增 onScroll 事件 [#51](https://github.com/mallfoundry/taroify/issues/51)
- Image
  - 新增 onClick 事件 [#54](https://github.com/mallfoundry/taroify/issues/54)

**Bug Fixes**

- Tabs
  - 修复设置 sticky 无法切换 Tab 的问题 [#52](https://github.com/mallfoundry/taroify/issues/52)
- Styles
  - 修复 tap-highlight-color 默认为淡蓝的问题 [#54](https://github.com/mallfoundry/taroify/issues/53)

### v0.0.15-alpha.7

`2021-10-22`

**Feature**

- 使用 esm 作为默认打包方式 [#50](https://github.com/mallfoundry/taroify/issues/50)

### v0.0.15-alpha.6

`2021-10-22`

**Feature**

- Toast
  - 新增 position 属性 [#49](https://github.com/mallfoundry/taroify/issues/49)

### v0.0.15-alpha.5

`2021-10-22`

**Bug Fixes**

- Transition
  - 修复 DOM 在 enter 之前已挂载的问题 [#48](https://github.com/mallfoundry/taroify/issues/48)

### v0.0.15-alpha.4

`2021-10-21`

**Feature**

- Tag
  - 新增 onClick 事件 [#46](https://github.com/mallfoundry/taroify/issues/46)

**Breaking Changes**

- Tag
  - 删除 textColor 属性，使用 CSS className 和 style 代替 textColor 属性 [#47](https://github.com/mallfoundry/taroify/issues/47)

### v0.0.15-alpha.3

`2021-10-20`

**Feature**

- Uploader.Image
  - 新增 mode, alt, round 属性 [#45](https://github.com/mallfoundry/taroify/issues/45)

### v0.0.15-alpha.2

`2021-10-19`

**Bug Fixes**

- Transition
  - 修复因设置 unmountOnExit 属性，而导致小程序渲染错乱的问题 [#42](https://github.com/mallfoundry/taroify/issues/42)

### v0.0.15-alpha.1

`2021-10-18`

**Feature**

- Tabs
  - 新增 bottomBar 的 css 变量 [#40](https://github.com/mallfoundry/taroify/issues/40)

### v0.0.15-alpha.0

`2021-10-16`

**New Component**

- 新增 ConfigProvider 组件 [#39](https://github.com/mallfoundry/taroify/issues/39)

### v0.0.14-alpha.2

`2021-10-13`

**Bug Fixes**

- SwipeCell
  - 修复动画卡顿和 rightRect 为空的问题 [#37](https://github.com/mallfoundry/taroify/issues/37)

### v0.0.14-alpha.1

`2021-10-11`

**Bug Fixes**

- Tabbar
  - 修复图标为空时，Badge 组件未清理的问题 [#35](https://github.com/mallfoundry/taroify/issues/35)

### v0.0.14-alpha.0

`2021-10-11`

**Breaking Changes**

- DropdownMenu
  - activeKey 属性重命名为 value [#34](https://github.com/mallfoundry/taroify/issues/34)
- Collapse
  - activeKey 属性重命名为 value [#34](https://github.com/mallfoundry/taroify/issues/34)
- Sidebar
  - activeKey 属性重命名为 value [#34](https://github.com/mallfoundry/taroify/issues/34)
- TreeSelect
  - activeTab 属性重命名为 tabValue [#34](https://github.com/mallfoundry/taroify/issues/34)
  - activeValue 属性重命名为 value [#34](https://github.com/mallfoundry/taroify/issues/34)

### v0.0.13-alpha.0

`2021-10-09`

**Feature**

- 完善 css var 自定义主题 [#23](https://github.com/mallfoundry/taroify/issues/23)
- 新增所有的 vant 图标 [#30](https://github.com/mallfoundry/taroify/issues/30)

### v0.0.12-alpha.18

`2021-09-30`

**Bug Fixes**

- Button
  - 修复细边框样式模糊问题 [#29](https://github.com/mallfoundry/taroify/issues/29)

### v0.0.12-alpha.17

`2021-09-27`

**Bug Fixes**

- Tabs
  - 修复滑动切换时 Tab 没有效果的问题 [#28](https://github.com/mallfoundry/taroify/issues/28)

### v0.0.12-alpha.16

`2021-09-27`

**Feature**

- Tabs.TabPane
  - 新增 value 属性 [#26](https://github.com/mallfoundry/taroify/issues/26)

**Bug Fixes**

- Button
  - 修复 disabled 为 true 时，依然可以点击的问题 [#27](https://github.com/mallfoundry/taroify/issues/27)

**Breaking Changes**

- Tabs
  - activeKey 属性重命名为 value [#26](https://github.com/mallfoundry/taroify/issues/26)

### v0.0.12-alpha.15

`2021-09-27`

**Bug Fixes**

- Tabs
  - 修复在微信小程序获得 navRect 为空的问题 [#19](https://github.com/mallfoundry/taroify/pull/19)

### v0.0.12-alpha.14

`2021-09-26`

**Feature**

- @taroify/icons
  - 在使用 @taroify/core 组件时，自动导入图标样式 [#24](https://github.com/mallfoundry/taroify/issues/24)

### v0.0.12-alpha.13

`2021-09-26`

**Bug Fixes**

- NoticeBar
  - 修复动态渲染时，useReady 不执行的问题 [#20](https://github.com/mallfoundry/taroify/pull/20)

### v0.0.12-alpha.12

`2021-09-23`

**Bug Fixes**

- Sheet
  - 修复按需导入样式的问题 [#18](https://github.com/mallfoundry/taroify/issues/18)
- Tabs
  - 修复 navOffset 为 null 导致报错的问题 [#17](https://github.com/mallfoundry/taroify/pull/17)

### v0.0.12-alpha.11

`2021-09-23`

**Bug Fixes**

- Divider
  - 修复 className 放置错误问题 [#16](https://github.com/mallfoundry/taroify/pull/16)

### v0.0.12-alpha.10

`2021-09-22`

**Feature**

- 所有组件新增 className 属性 [#15](https://github.com/mallfoundry/taroify/issues/15)

### v0.0.12-alpha.9

`2021-09-22`

### v0.0.12-alpha.8

`2021-09-22`

**Feature**

- Field
  - 新增 name 属性 [#11](https://github.com/mallfoundry/taroify/issues/11)

**Bug Fixes**

- Import on demand
  - 修复重复导入样式的问题 [#13](https://github.com/mallfoundry/taroify/issues/13)
- NoticeBar
  - 修复 NoticeBar 全局样式引入问题 [#14](https://github.com/mallfoundry/taroify/issues/14)

### v0.0.12-alpha.7

`2021-09-09`

### v0.0.12-alpha.6

`2021-09-09`

**Bug Fixes**

- NumberKeyboard
  - 修复 classNames 导入方式不正确的问题 [#10](https://github.com/mallfoundry/taroify/issues/10)

### v0.0.12-alpha.5

`2021-09-08`

**Feature**

- Navbar
  - title 提升为 ReactNode 类型 [#7](https://github.com/mallfoundry/taroify/issues/7)
- Sticky
  - 新增 onChange 事件 [#6](https://github.com/mallfoundry/taroify/issues/6)

**Breaking Change**

- Tabbar
  - 重命名 Tabbar.Item 为 Tabbar.TabItem [#8](https://github.com/mallfoundry/taroify/issues/8)

### v0.0.12-alpha.4

`2021-09-04`

**Feature**

- Button
  - 新增小程序属性 [#2](https://github.com/mallfoundry/taroify/issues/2)
- Tabbar
  - 新增 fixed 属性 [#5](https://github.com/mallfoundry/taroify/issues/5)
  - Tabbar：新增 placeholder 属性 [#5](https://github.com/mallfoundry/taroify/issues/5)
  - Tabbar：新增 bordered 属性 [#5](https://github.com/mallfoundry/taroify/issues/5)
  - Tabbar.Item：新增 badge 属性 [#5](https://github.com/mallfoundry/taroify/issues/5)

### v0.0.12-alpha.3

`2021-09-03`

### v0.0.12-alpha.2

`2021-09-03`

**Bug Fixes**

- List：修复 nextTick 在微信小程序不执行的问题 [#3](https://github.com/mallfoundry/taroify/issues/3)

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
