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

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 对象数组，配置每一列显示的数据 | _Column[]_ | `[]` |
| columns-field-names | 自定义 `columns` 结构中的字段 | _object_ | `{ text: 'text', values: 'values', children: 'children' }` |
| title | 顶部栏标题 | _string_ | - |
| confirm-button-text | 确认按钮文字 | _string_ | `确认` |
| cancel-button-text | 取消按钮文字 | _string_ | `取消` |
| toolbar-position | 顶部栏位置，可选值为 `bottom` | _string_ | `top` |
| loading | 是否显示加载状态 | _boolean_ | `false` |
| show-toolbar | 是否显示顶部栏 | _boolean_ | `true` |
| allow-html | 是否允许选项内容中渲染 HTML | _boolean_ | `false` |
| default-index | 单列选择时，默认选中项的索引 | _number \| string_ | `0` |
| item-height | 选项高度，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | _number \| string_ | `44` |
| visible-item-count | 可见的选项个数 | _number \| string_ | `6` |
| swipe-duration | 快速滑动时惯性滚动的时长，单位 `ms` | _number \| string_ | `1000` |

### Events

当选择器有多列时，事件回调参数会返回数组。

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的索引<br>多列：所有列选中值，所有列选中值对应的索引 |
| cancel | 点击取消按钮时触发 | 单列：选中值，选中值对应的索引<br>多列：所有列选中值，所有列选中值对应的索引 |
| change | 选项改变时触发 | 单列：选中值，选中值对应的索引<br>多列：所有列选中值，当前列对应的索引 |

### Slots

| 名称             | 说明                   | 参数                       |
| ---------------- | ---------------------- | -------------------------- |
| toolbar `v3.1.2` | 自定义整个顶部栏的内容 | -                          |
| title            | 自定义标题内容         | -                          |
| confirm          | 自定义确认按钮内容     | -                          |
| cancel           | 自定义取消按钮内容     | -                          |
| option           | 自定义选项内容         | _option: string \| object_ |
| columns-top      | 自定义选项上方内容     | -                          |
| columns-bottom   | 自定义选项下方内容     | -                          |

### Column 数据结构

当传入多列数据时，`columns` 为一个对象数组，数组中的每一个对象配置每一列，每一列有以下 `key`:

| 键名         | 说明                       | 类型                        |
| ------------ | -------------------------- | --------------------------- |
| values       | 列中对应的备选值           | _Array<string \| number>_   |
| defaultIndex | 初始选中项的索引，默认为 0 | _number_                    |
| className    | 为对应列添加额外的类名     | _string \| Array \| object_ |
| children     | 级联选项                   | _Column_                    |

### 方法

通过 ref 可以获取到 Picker 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| getValues | 获取所有列选中的值 | - | values |
| setValues | 设置所有列选中的值 | values | - |
| getIndexes | 获取所有列选中值对应的索引 | - | indexes |
| setIndexes | 设置所有列选中值对应的索引 | indexes | - |
| getColumnValue | 获取对应列选中的值 | columnIndex | value |
| setColumnValue | 设置对应列选中的值 | columnIndex, value | - |
| getColumnIndex | 获取对应列选中项的索引 | columnIndex | optionIndex |
| setColumnIndex | 设置对应列选中项的索引 | columnIndex, optionIndex | - |
| getColumnValues | 获取对应列中所有选项 | columnIndex | values |
| setColumnValues | 设置对应列中所有选项 | columnIndex, values | - |
| confirm | 停止惯性滚动并触发 confirm 事件 | - | - |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  PickerColumn,
  PickerOption,
  PickerInstance,
  PickerFieldNames,
  PickerObjectColumn,
  PickerObjectOption,
  PickerToolbarPosition,
} from 'vant';
```

`PickerInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue';
import type { PickerInstance } from 'vant';

const pickerRef = ref<PickerInstance>();

pickerRef.value?.confirm();
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                 | 默认值                       | 描述 |
| ------------------------------------ | ---------------------------- | ---- |
| --van-picker-background-color        | _var(--van-white)_           | -    |
| --van-picker-toolbar-height          | _44px_                       | -    |
| --van-picker-title-font-size         | _var(--van-font-size-lg)_    | -    |
| --van-picker-title-line-height       | _var(--van-line-height-md)_  | -    |
| --van-picker-action-padding          | _0 var(--van-padding-md)_    | -    |
| --van-picker-action-font-size        | _var(--van-font-size-md)_    | -    |
| --van-picker-confirm-action-color    | _var(--van-text-link-color)_ | -    |
| --van-picker-cancel-action-color     | _var(--van-gray-6)_          | -    |
| --van-picker-option-padding          | _0 var(--van-padding-base)_  | -    |
| --van-picker-option-font-size        | _var(--van-font-size-lg)_    | -    |
| --van-picker-option-text-color       | _var(--van-black)_           | -    |
| --van-picker-option-disabled-opacity | _0.3_                        | -    |
| --van-picker-loading-icon-color      | _var(--van-primary-color)_   | -    |
| --van-picker-loading-mask-color      | _rgba(255, 255, 255, 0.9)_   | -    |

## 常见问题

### 在桌面端无法操作组件？

参见[桌面端适配](#/zh-CN/advanced-usage#zhuo-mian-duan-gua-pei)。
