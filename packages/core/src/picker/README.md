# Picker 选择器

### 介绍

提供多个选项集合供用户选择，支持单列选择和多列级联，通常与[弹出层](/components/popup/)组件配合使用。

### 引入

```tsx
import { Picker } from "@taroify/core";
```

## 代码演示

### 基础用法
```tsx
function BasicPicker() {
  const columns = useMemo(() => [
    { label: "杭州", value: "Hangzhou" },
    { label: "宁波", value: "Ningbo" },
    { label: "温州", value: "Wenzhou" },
    { label: "绍兴", value: "Shaoxing" },
    { label: "湖州", value: "Huzhou" }
  ], [])

  return (
    <>
      <Toast id="toast" />
      <Picker
        title="标题"
        columns={columns}
        onChange={(value) => Toast.open(`当前值：${value}`)}
        onConfirm={(value) => Toast.open(`当前值：${value}`)}
      >
      </Picker>
    </>
  )
}
```

### 默认选中项

通过 `defaultValue` 属性设置初始选中项的值。

```tsx
function DefaultPicker() {
  const columns = useMemo(() => [
    { label: "杭州", value: "Hangzhou" },
    { label: "宁波", value: "Ningbo" },
    { label: "温州", value: "Wenzhou" },
    { label: "绍兴", value: "Shaoxing" },
    { label: "湖州", value: "Huzhou" }
  ], [])
  return (
    <>
      <Toast id="toast" />
      <Picker
        defaultValue="Wenzhou"
        title="标题"
        columns={columns}
        onChange={(value) => Toast.open(`当前值：${value}`)}
        onConfirm={(value) => Toast.open(`当前值：${value}`)}
      >
      </Picker>
    </>
  )
}
```

### 多列选择

```tsx
function PickerWithMultiColumns() {
  const columns = useMemo(() => [
    [
      { label: "周一", value: "Monday" },
      { label: "周二", value: "Tuesday" },
      { label: "周三", value: "Wednesday" },
      { label: "周四", value: "Thursday" },
      { label: "周五", value: "Friday" }
    ],
    [
      { label: "上午", value: "morning" },
      { label: "下午", value: "afternoon"},
      { label: "晚上", value: "evening"}
    ]
  ], [])
  return (
    <>
      <Toast id="toast" />
      <Picker
        defaultValue={["Monday", "evening"]}
        title="标题"
        columns={columns}
        onChange={(value) => Toast.open(`当前值：${value}`)}
        onConfirm={(value) => Toast.open(`当前值：${value}`)}
      >
      </Picker>
    </>
  )
}
```

### 禁用选项

通过设置 `disabled` 来禁用该选项。

```tsx
function DisabledPicker() {
  const columns = useMemo(() => [
    { label: "杭州", value: "Hangzhou" },
    { label: "宁波", value: "Ningbo" },
    { label: "温州", value: "Wenzhou", disabled: true },
    { label: "绍兴", value: "Shaoxing" },
    { label: "湖州", value: "Huzhou" }
  ], [])
  return (
    <Picker
      columns={columns}
      onChange={(value) => Toast.open(`当前值：${value}`)}
      onConfirm={(value) => Toast.open(`当前值：${value}`)}
    >
    </Picker>
  )
}
```
> Tips: 通过设置confirmText="",cancelText=""不显示顶部栏

### 加载状态

若选择器数据是异步获取的，可以通过 `loading` 属性显示加载提示。

```tsx
function LoadingPicker() {
  const columns = useMemo(() => [
    { label: "杭州", value: "Hangzhou" },
    { label: "宁波", value: "Ningbo" },
    { label: "温州", value: "Wenzhou" },
    { label: "绍兴", value: "Shaoxing" },
    { label: "湖州", value: "Huzhou" }
  ], [])

  return (
    <>
      <Toast id="toast" />
      <Picker
        loading
        title="标题"
        columns={columns}
        onChange={(value) => Toast.open(`当前值：${value}`)}
        onConfirm={(value) => Toast.open(`当前值：${value}`)}
      >
      </Picker>
    </>
  )
}
```

### 搭配弹出层使用

在实际场景中，Picker 通常作为用于辅助表单填写，可以搭配 Popup 和 Field 实现该效果。

```tsx
function PickerPopup() {
  const [value, setValue] = useState("")
  const [openPicker, setOpenPicker] = useState(false)
  const columns = useMemo(() => [
    { label: "杭州", value: "Hangzhou" },
    { label: "宁波", value: "Ningbo" },
    { label: "温州", value: "Wenzhou" },
    { label: "绍兴", value: "Shaoxing" },
    { label: "湖州", value: "Huzhou" }
  ], [])
  return (
    <>
      <Field label="城市" isLink onClick={() => setOpenPicker(true)}>
        <Input readonly placeholder="选择城市" value={value} />
      </Field>
      <Popup open={openPicker} rounded placement="bottom" onClose={setOpenPicker}>
        <Popup.Backdrop />
        <Picker
          title="搭配弹出层使用"
          cancelText="取消"
          confirmText="确认"
          columns={columns}
          onCancel={() => setOpenPicker(false)}
          onConfirm={(values) => {
            setValue(values as string)
            setOpenPicker(false)
          }}
        >
        </Picker>
      </Popup>
    </>
  )
}
```

### 手动控制DOM
通过 `Picker.Toolbar` `Picker.Title` `Picker.Button` `Picker.Column` `Picker.Option` 手动控制DOM渲染

```tsx
function ManualPicker() {
  return (
    <>
      <Toast id="toast" />
      <Picker
        onChange={(value) => Toast.open(`当前值：${value}`)}
        onConfirm={(value) => Toast.open(`当前值：${value}`)}
      >
        <Picker.Toolbar>
          <Picker.Button>取消</Picker.Button>
          <Picker.Title>标题</Picker.Title>
          <Picker.Button>确认</Picker.Button>
        </Picker.Toolbar>
        <Picker.Column>
          <Picker.Option>周一</Picker.Option>
          <Picker.Option>周二</Picker.Option>
          <Picker.Option>周三</Picker.Option>
          <Picker.Option>周四</Picker.Option>
          <Picker.Option>周五</Picker.Option>
        </Picker.Column>
        <Picker.Column>
          <Picker.Option>上午</Picker.Option>
          <Picker.Option>下午</Picker.Option>
          <Picker.Option>晚上</Picker.Option>
        </Picker.Column>
      </Picker>
    </>
  )
}
```

## API

### Picker Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的值 | _string \| string[]_ | - |
| value | 选中的值 | _string \| string[]_ | - |
| title | 顶部栏标题 | _ReactNode_ | - |
| confirmText | 确认按钮文字 | _ReactNode_ | `确认` |
| cancelText | 取消按钮文字 | _ReactNode_| `取消` |
| columns | 对象数组，配置每一列显示的数据 | _PickerOptionData[] \| PickerOptionData[][]_ | - |
| columnsFieldNames | 自定义 columns 结构中的字段 | _{label?: string,value?: string}_ | `{label: "label",value: "value"}`
| loading | 是否显示加载状态 | _boolean_ | `false` |
| readonly | 是否为只读状态，只读状态下无法切换选项 | _boolean_ | `false` |
| siblingCount | 可见的选项相邻个数 | _number_ | `3` |
| optionHeight | 选项高度，支持 `px` `vw` `vh` `rem` `rpx` 单位，默认 `px` | _number\|string_ | `44` |

### Picker Events

当选择器有多列时，事件回调参数会返回数组。

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onConfirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的选项对象<br>多列：所有列选中值，所有列选中值对应的选项对象 |
| onCancel | 点击取消按钮时触发 | 单列：选中值，选中值对应的选项对象<br>多列：所有列选中值，所有列选中值对应的选项对象 |
| onChange | 选项改变时触发 | 单列：选中值，选中值对应的选项对象<br>多列：所有列选中值，当前列对应的选项对象 |


### Picker.Toolbar Props

| 参数       | 说明         | 类型        | 默认值 |
| --------- | ------------ | ----------- | --- |
| children  | 头部内容      | _ReactNoe_  | - |

### Picker.Title Props

| 参数         | 说明           | 类型          | 默认值 | 
| ----------- | ------------- | ------------- | --- |
| children    |   顶部栏标题    | _ReactNoe_    | - |

### Picker.Button Props

| 参数         | 说明           | 类型          | 默认值 | 
| ----------- | ------------- | ------------- | --- |
| children    |   按钮内容    | _ReactNoe_    | - |
| type | 按钮类型 | _"cancel" \| "confirm"_ | - |

### Picker.Column Props

| 参数         | 说明           | 类型          | 默认值 | 
| ----------- | ------------- | ------------- | --- |
| children    |   一列选项    | _ReactNoe_    | - |

### Picker.Option Props
| 参数         | 说明           | 类型          | 默认值 | 
| ----------- | ------------- | ------------- | --- |
| children    |   选项内容    | _ReactNoe_    | - |
| value    |   选项对应的值    | _string_    | - |
| label    |   选项内容    | _ReactNoe_    | - |
| disabled  | 是否禁用选项   | _boolean_   | `false` |


## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                         | 默认值                                       | 描述  |
|--------------------------------------------|-------------------------------------------|-----|
| --picker-background-color                  | _var(--white)_                            | -   |
| --picker-toolbar-height                    | _44px * $hd_                              | -   |
| --picker-title-font-size                   | _var(--font-size-lg)_                     | -   |
| --picker-title-line-height                 | _var(--line-height-md)_                   | -   |
| --picker-action-padding                    | _0 var(--padding-md)_                     | -   |
| --picker-action-font-size                  | _var(--font-size-md)_                     | -   |
| --picker-confirm-action-color              | _var(--text-link-color)_                  | -   |
| --picker-cancel-action-color               | _var(--gray-6)_                           | -   |
| --picker-swipe-transition-duration         | _800ms_                                   | -   |
| --picker-column-transition-zero-duration   | _0_                                       | -   |
| --picker-column-transition-switch-duration | _200ms_                                   | -   |
| --picker-column-transition-duration        | _var(--picker-swipe-transition-duration)_ | -   |
| --picker-option-color                      | _var(--black)_                            | -   |
| --picker-option-padding                    | _0 var(--padding-base)_                   | -   |
| --picker-option-font-size                  | _var(--font-size-lg)_                     | -   |
| --picker-option-disabled-opacity           | _0.3_                                     | -   |
| --picker-loading-icon-color                | _var(--primary-color)_                    | -   |
| --picker-loading-mask-color                | _rgba(255, 255, 255, 0.9)_                | -   |
