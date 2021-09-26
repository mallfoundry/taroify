# Picker 选择器

### 介绍

提供多个选项集合供用户选择，支持单列选择和多列级联，通常与[弹出层](#/components/popup/)组件配合使用。

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
  const [toastOpen, setToastOpen] = useState(false)
  const [value, setValue] = useState("")
  return (
    <>
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        当前值：{value}
      </Toast>
      <Picker
        value={value}
        onChange={(values) => {
          setToastOpen(true)
          setValue(values)
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
    </>
  )
}
```

### 默认选中项

单列选择时，可以通过 `value` 属性设置初始选中项的值。

```tsx
function DefaultPicker() {
  const [toastOpen, setToastOpen] = useState(false)
  const [value, setValue] = useState("温州")
  return (
    <>
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        当前值：{value}
      </Toast>
      <Picker
        value={value}
        onChange={(values) => {
          setToastOpen(true)
          setValue(values)
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
    </>
  )
}
```

### 多列选择

```tsx
function PickerWithMultiColumns() {
  const [toastOpen, setToastOpen] = useState(false)
  const [value, setValue] = useState([])

  return (
    <>
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        当前值：{_.join(value, ",")}
      </Toast>
      <Picker
        value={value}
        onChange={setValue}
        onConfirm={(values) => {
          setValue(values)
          setToastOpen(true)
        }}
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
      <Field
        value={value}
        label="城市"
        placeholder="选择城市"
        readonly
        rightIcon={<ArrowRight />}
        onClick={() => setOpenPicker(true)}
      />
      <Popup open={openPicker} rounded placement="bottom">
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

### Popup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选中的值 | _Date_ | - |
| loading | 是否显示加载状态 | _boolean_ | `false` |
| readonly | 是否为只读状态，只读状态下无法切换选项 | _boolean_ | `false` |
| siblingCount | 可见的选项相邻个数 | _number_ | `3` |

### Popup Events

当选择器有多列时，事件回调参数会返回数组。

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onConfirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的选项对象<br>多列：所有列选中值，所有列选中值对应的选项对象 |
| onCancel | 点击取消按钮时触发 | 单列：选中值，选中值对应的选项对象<br>多列：所有列选中值，所有列选中值对应的选项对象 |
| onChange | 选项改变时触发 | 单列：选中值，选中值对应的选项对象<br>多列：所有列选中值，当前列对应的选项对象 |
