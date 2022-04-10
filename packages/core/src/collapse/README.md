# Collapse 折叠面板

### 介绍

将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。

### 引入

```tsx
import { Collapse } from "@taroify/core"
```

## 代码演示

### 基础用法

通过 `value` 控制展开的面板列表，`value` 为数组格式。

```tsx
function BasicCollapse() {
  const [value, setValue] = useState([0])
  return (
    <Collapse value={value} onChange={setValue}>
      <Collapse.Item title="标题1">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="标题2">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="标题3">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
    </Collapse>
  )
}
```

### 手风琴

通过 `accordion` 可以设置为手风琴模式，最多展开一个面板，此时 `value` 为字符串格式。

```tsx
function AccordionCollapse() {
  const [value, setValue] = useState(0)
  return (
    <Collapse accordion value={value} onChange={setValue}>
      <Collapse.Item title="标题1">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="标题2">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="标题3">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
    </Collapse>
  )
}
```

### 只读状态和禁用状态

通过 `clickable=false` 属性禁止显示反馈动画，通过 `disabled` 属性来禁用单个面板。

```tsx
function CollapseWithDisabledWithReadonly() {
  return (
    <Collapse defaultValue={[0]}>
      <Collapse.Item title="正常状态">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="只读状态" clickable={false}>
        代码是写出来给人看的，附带能在机器上运行
      </Collapse.Item>
      <Collapse.Item title="禁用状态" disabled>
        代码是写出来给人看的，附带能在机器上运行
      </Collapse.Item>
    </Collapse>
  )
}
```

### 自定义标题内容

通过 `title` 属性可以自定义标题栏的内容。

```tsx
function CustomCollapse() {
  return (
    <Collapse defaultValue={[0]}>
      <Collapse.Item
        className="custom-collapse-item1"
        title={
          <>
            标题1
            <QuestionOutlined />
          </>
        }
      >
        代码是写出来给人看的，附带能在机器上运行
      </Collapse.Item>
      <Collapse.Item icon={<ShopOutlined />} title="标题2" extra="内容" clickable={false}>
        代码是写出来给人看的，附带能在机器上运行
      </Collapse.Item>
    </Collapse>
  )
}
```

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认展开面板的 value | 手风琴模式：_number \| string_<br>非手风琴模式：_(number \| string)[]_ | - |
| value | 当前展开面板的 value | 手风琴模式：_number \| string_<br>非手风琴模式：_(number \| string)[]_ | - |
| accordion | 是否开启手风琴模式 | _boolean_ | `false` |
| bordered | 是否显示外边框 | _boolean_ | `true` |

### Collapse Events

| 事件名 | 说明           | 回调参数                                 |
| ------ | -------------- | ---------------------------------------- |
| onChange | 切换面板时触发 | _value: any_ |

### Collapse.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 唯一标识符，默认为索引值 | _number \| string_ | `index` |
| icon | 标题栏左侧[图标](/components/icon)或[图片](/components/image) | _ReactNode_ | - |
| expandIcon | 标题栏右侧[图标](/components/icon)或[图片](/components/image) | _ReactNode_ | - |
| size | 标题栏大小，可选值为 `large` | _string_ | - |
| title | 标题栏左侧内容 | _number \| string_ | - |
| extra | 标题栏右侧内容 | _number \| string_ | - |
| brief | 标题栏描述信息 | _number \| string_ | - |
| bordered | 是否显示内边框 | _boolean_ | `true` |
| clickable| 是否开启点击反馈 | _boolean_ | `true` |
| disabled | 是否禁用面板 | _boolean_ | `false` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                       | 默认值                                   | 描述  |
|------------------------------------------|---------------------------------------|-----|
| --collapse-item-title-disabled-color     | _var(--gray-5)_                       | -   |
| --collapse-item-transition-duration      | _var(--animation-duration-base)_      | -   |
| --collapse-item-content-padding          | _var(--padding-sm) var(--padding-md)_ | -   |
| --collapse-item-content-font-size        | _var(--font-size-md)_                 | -   |
| --collapse-item-content-line-height      | _1.5_                                 | -   |
| --collapse-item-content-color            | _var(--gray-6)_                       | -   |
| --collapse-item-content-background-color | _var(--white)_                        | -   |
