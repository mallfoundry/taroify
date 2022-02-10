const menus = [
  {
    title: "开发指南",
    children: [
      {
        title: "介绍",
        to: "/introduce/",
      },
      {
        title: "快速上手",
        to: "/quickstart/",
      },
      {
        title: "开发指南",
        to: "/contribution/",
      },
      {
        title: "更新日志",
        to: "/changelog/",
      },
    ],
  },
  {
    title: "基础组件",
    subpackage: "basic",
    children: [
      {
        title: "Button 按钮",
        to: "/components/button/",
      },
      {
        title: "Cell 单元格",
        to: "/components/cell/",
      },
      {
        title: "ConfigProvider 全局配置",
        to: "/components/config-provider/",
      },
      {
        title: "Icon 图标",
        to: "/components/icon/",
      },
      {
        title: "Image 图片",
        to: "/components/image/",
      },
      {
        title: "Flex 布局",
        to: "/components/flex/",
      },
      {
        title: "Popup 弹出层",
        to: "/components/popup/",
      },
      {
        title: "Style 内置样式",
        to: "/components/style/",
      },
      {
        title: "Toast 轻提示",
        to: "/components/toast/",
      },
      {
        title: "Space 间距",
        to: "/components/space/",
      },
      {
        title: "SafeArea 安全区域",
        to: "/components/safe-area/",
      },
    ],
  },
  {
    title: "表单组件",
    subpackage: "form",
    children: [
      {
        title: "AreaPicker 省市区选择",
        to: "/components/area-picker/",
      },
      {
        title: "Cascader 级联选择",
        to: "/components/cascader/",
      },
      {
        title: "Calendar 日历",
        to: "/components/calendar/",
      },
      {
        title: "Checkbox 复选框",
        to: "/components/checkbox/",
      },
      {
        title: "DatetimePicker 时间选择",
        to: "/components/datetime-picker/",
      },
      {
        title: "Field 输入框",
        to: "/components/field/",
      },
      {
        title: "Form 表单",
        to: "/components/form/",
      },
      {
        title: "NumberKeyboard 数字键盘",
        to: "/components/number-keyboard/",
      },
      {
        title: "PasswordInput 密码输入框",
        to: "/components/password-input/",
      },
      {
        title: "Picker 选择器",
        to: "/components/picker/",
      },
      {
        title: "Radio 单选框",
        to: "/components/radio/",
      },
      {
        title: "Rate 评分",
        to: "/components/rate/",
      },
      {
        title: "Search 搜索",
        to: "/components/search/",
      },
      {
        title: "Slider 滑块",
        to: "/components/slider/",
      },
      {
        title: "Stepper 步进器",
        to: "/components/stepper/",
      },
      {
        title: "Switch 开关",
        to: "/components/switch/",
      },
      {
        title: "Uploader 文件上传",
        to: "/components/uploader/",
      },
    ],
  },
  {
    title: "反馈组件",
    subpackage: "action",
    children: [
      {
        title: "ActionSheet 动作面板",
        to: "/components/action-sheet/",
      },
      {
        title: "Dialog 弹出框",
        to: "/components/dialog/",
      },
      {
        title: "DropdownMenu 下拉菜单",
        to: "/components/dropdown-menu/",
      },
      {
        title: "Loading 加载",
        to: "/components/loading/",
      },
      {
        title: "Notify 消息提示",
        to: "/components/notify/",
      },
      {
        title: "Backdrop 背景板",
        to: "/components/backdrop/",
      },
      {
        title: "PullRefresh 下拉刷新",
        to: "/components/pull-refresh/",
      },
      {
        title: "ShareSheet 分享面板",
        to: "/components/share-sheet/",
      },
      {
        title: "SwipeCell 滑动单元格",
        to: "/components/swipe-cell/",
      },
    ],
  },
  {
    title: "展示组件",
    subpackage: "display",
    children: [
      {
        title: "Avatar 头像",
        to: "/components/avatar/",
      },
      {
        title: "Badge 徽标",
        to: "/components/badge/",
      },
      {
        title: "Circle 环形进度条",
        to: "/components/circle/",
      },
      {
        title: "Collapse 折叠面板",
        to: "/components/collapse/",
      },
      {
        title: "Countdown 倒计时",
        to: "/components/countdown/",
      },
      {
        title: "Divider 分割线",
        to: "/components/divider/",
      },
      {
        title: "Empty 空状态",
        to: "/components/empty/",
      },
      {
        title: "List 列表",
        to: "/components/list/",
      },
      {
        title: "NoticeBar 通知栏",
        to: "/components/notice-bar/",
      },
      {
        title: "Progress 进度条",
        to: "/components/progress/",
      },
      {
        title: "Skeleton 骨架屏",
        to: "/components/skeleton/",
      },
      {
        title: "Steps 步骤条",
        to: "/components/steps/",
      },
      {
        title: "Sticky 粘性布局",
        to: "/components/sticky/",
      },
      {
        title: "Swiper 轮播",
        to: "/components/swiper/",
      },
      {
        title: "Tag 标签",
        to: "/components/tag/",
      },
    ],
  },
  {
    title: "导航组件",
    subpackage: "navigation",
    children: [
      {
        title: "Grid 宫格",
        to: "/components/grid/",
      },
      {
        title: "IndexList 索引栏",
        to: "/components/index-list/",
      },
      {
        title: "Navbar 导航栏",
        to: "/components/navbar/",
      },
      {
        title: "Pagination 分页",
        to: "/components/pagination/",
      },
      {
        title: "Sidebar 侧边导航",
        to: "/components/sidebar/",
      },
      {
        title: "Tabs 标签页",
        name: "Tabs",
        to: "/components/tabs/",
      },
      {
        title: "Tabbar 标签栏",
        to: "/components/tabbar/",
      },
      {
        title: "TreeSelect 分类选择",
        to: "/components/tree-select/",
      },
    ],
  },
  {
    title: "电商组件",
    subpackage: "commerce",
    children: [
      {
        title: "ActionBar 动作栏",
        to: "/components/action-bar/",
      },
    ],
  },
  {
    title: "Hooks",
    subpackage: "hooks",
    children: [
      {
        title: "介绍",
        to: "/hooks/",
      },
      {
        title: "useCascader",
        to: "/hooks/use-cascader/",
      },
    ],
  },
]

export default menus
