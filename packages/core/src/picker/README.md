# Picker 选择器

### 介绍

提供多个选项集合供用户选择，支持单列选择和多列级联，通常与[弹出层](/components/popup/)组件配合使用。

### 引入

```tsx
import { Picker } from "@taroify/core";
```

## 代码演示

### 基础用法

#### 选项配置

Picker 组件通过 `Picker.Option` 属性配置选项数据。

#### 顶部栏

顶部栏包含标题、确认按钮和取消按钮，点击确认按钮触发 `onConfirm` 事件，点击取消按钮触发 `onCancel` 事件。

```tsx
function BasicPicker() {
  return (
    <>
      <Toast id="toast" />
      <Picker onChange={(value) => Toast.open(`当前值：${value}`)}>
        <Picker.Toolbar>
          <Picker.Button>取消</Picker.Button>
          <Picker.Title>标题</Picker.Title>
          <Picker.Button>确认</Picker.Button>
        </Picker.Toolbar>
        <Picker.Column>
          <Picker.Option>杭州</Picker.Option>
          <Picker.Option>宁波</Picker.Option>
          <Picker.Option>温州</Picker.Option>
          <Picker.Option>绍兴</Picker.Option>
          <Picker.Option>湖州</Picker.Option>
          <Picker.Option>嘉兴</Picker.Option>
          <Picker.Option>金华</Picker.Option>
        </Picker.Column>
      </Picker>
    </>
  )
}
```

### 默认选中项

单列选择时，可以通过 `defaultValue` 属性设置初始选中项的值。

```tsx
function DefaultPicker() {
  return (
    <>
      <Toast id="toast" />
      <Picker defaultValue="温州" onChange={(value) => Toast.open(`当前值：${value}`)}>
        <Picker.Toolbar>
          <Picker.Button>取消</Picker.Button>
          <Picker.Title>标题</Picker.Title>
          <Picker.Button>确认</Picker.Button>
        </Picker.Toolbar>
        <Picker.Column>
          <Picker.Option>杭州</Picker.Option>
          <Picker.Option>宁波</Picker.Option>
          <Picker.Option>温州</Picker.Option>
          <Picker.Option>绍兴</Picker.Option>
          <Picker.Option>湖州</Picker.Option>
          <Picker.Option>嘉兴</Picker.Option>
          <Picker.Option>金华</Picker.Option>
        </Picker.Column>
      </Picker>
    </>
  )
}
```

### 多列选择

```tsx
function PickerWithMultiColumns() {
  return (
    <>
      <Toast id="toast" />
      <Picker onConfirm={(values) => Toast.open(`当前值：${_.join(values, ",")}`)}>
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

### 禁用选项

通过设置 `disabled` 来禁用该选项。

```tsx
function DisabledPicker() {
  return (
    <Picker>
      <Picker.Toolbar>
        <Picker.Button>取消</Picker.Button>
        <Picker.Title>标题</Picker.Title>
        <Picker.Button>确认</Picker.Button>
      </Picker.Toolbar>
      <Picker.Column>
        <Picker.Option disabled>杭州</Picker.Option>
        <Picker.Option>宁波</Picker.Option>
        <Picker.Option>温州</Picker.Option>
      </Picker.Column>
    </Picker>
  )
}
```

### 加载状态

若选择器数据是异步获取的，可以通过 `loading` 属性显示加载提示。

```tsx
function LoadingPicker() {
  return (
    <Picker loading>
      <Picker.Toolbar>
        <Picker.Button>取消</Picker.Button>
        <Picker.Title>标题</Picker.Title>
        <Picker.Button>确认</Picker.Button>
      </Picker.Toolbar>
      <Picker.Column>
        <Picker.Option>浙江</Picker.Option>
        <Picker.Option>福建</Picker.Option>
      </Picker.Column>
      <Picker.Column>
        <Picker.Option>杭州</Picker.Option>
        <Picker.Option>宁波</Picker.Option>
        <Picker.Option>温州</Picker.Option>
        <Picker.Option>嘉兴</Picker.Option>
        <Picker.Option>湖州</Picker.Option>
      </Picker.Column>
    </Picker>
  )
}
```

### 搭配弹出层使用

在实际场景中，Picker 通常作为用于辅助表单填写，可以搭配 Popup 和 Field 实现该效果。

```tsx
function PickerPopup() {
  const [value, setValue] = useState("")
  const [openPicker, setOpenPicker] = useState(false)

  return (
    <>
      <Field label="城市" rightIcon={<ArrowRight />} onClick={() => setOpenPicker(true)}>
        <Input readonly placeholder="选择城市" value={value} />
      </Field>
      <Popup open={openPicker} rounded placement="bottom" onClose={setOpenPicker}>
        <Popup.Backdrop />
        <Picker
          onCancel={() => setOpenPicker(false)}
          onConfirm={(values) => {
            setValue(values)
            setOpenPicker(false)
          }}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Title>标题</Picker.Title>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option>杭州</Picker.Option>
            <Picker.Option>宁波</Picker.Option>
            <Picker.Option>温州</Picker.Option>
            <Picker.Option>绍兴</Picker.Option>
            <Picker.Option>湖州</Picker.Option>
            <Picker.Option>嘉兴</Picker.Option>
            <Picker.Option>金华</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>
    </>
  )
}
```

## API

### Picker Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的值 | _any \| any[]_ | - |
| value | 选中的值 | _any \| any[]_ | - |
| loading | 是否显示加载状态 | _boolean_ | `false` |
| readonly | 是否为只读状态，只读状态下无法切换选项 | _boolean_ | `false` |
| siblingCount | 可见的选项相邻个数 | _number_ | `3` |

### Picker Events

当选择器有多列时，事件回调参数会返回数组。

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onConfirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的选项对象<br>多列：所有列选中值，所有列选中值对应的选项对象 |
| onCancel | 点击取消按钮时触发 | 单列：选中值，选中值对应的选项对象<br>多列：所有列选中值，所有列选中值对应的选项对象 |
| onChange | 选项改变时触发 | 单列：选中值，选中值对应的选项对象<br>多列：所有列选中值，当前列对应的选项对象 |


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
| --picker-option-height                     | _44PX_                                    | -   |
| --picker-loading-icon-color                | _var(--primary-color)_                    | -   |
| --picker-loading-mask-color                | _rgba(255, 255, 255, 0.9)_                | -   |
