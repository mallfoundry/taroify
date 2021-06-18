# Collapse 折叠面板

### 介绍

将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。

### 引入

```tsx
import { Collapse, CollapseItem } from "@taroify/core"
```

## 代码演示

### 基础用法

通过 `activeKey` 控制展开的面板列表，`activeKey` 为数组格式。

```tsx
function CollapseExemple() {
  const [activeKey, setActiveKey] = useState<number | number[] | string | string[]>([0])
  return (
    <Collapse activeKey={activeKey} onChange={setActiveKey}>
      <CollapseItem title="标题1">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
      <CollapseItem title="标题2">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
      <CollapseItem title="标题3">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
    </Collapse>
  )
}
```

### 手风琴

通过 `accordion` 可以设置为手风琴模式，最多展开一个面板，此时 `activeKey` 为字符串格式。

```tsx
function CollapseExemple() {
  const [activeKey, setActiveKey] = useState<number | number[] | string | string[]>(0)
  return (
    <Collapse accordion activeKey={activeKey} onChange={setActiveKey}>
      <CollapseItem title="标题1">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
      <CollapseItem title="标题2">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
      <CollapseItem title="标题3">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
    </Collapse>
  )
}
```

### 只读状态和禁用状态

通过 `clickable=false` 属性禁止显示反馈动画，通过 `disabled` 属性来禁用单个面板。

```tsx
function CollapseExemple() {
  const [activeKey, setActiveKey] = useState<number | number[] | string | string[]>([0])
  return (
    <Collapse activeKey={activeKey} onChange={setActiveKey}>
      <CollapseItem title="正常状态">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
      <CollapseItem title="只读状态" clickable={false}>
        代码是写出来给人看的，附带能在机器上运行
      </CollapseItem>
      <CollapseItem title="禁用状态" disabled>
        代码是写出来给人看的，附带能在机器上运行
      </CollapseItem>
    </Collapse>
  )
}
```

### 自定义标题内容

通过 `title` 属性可以自定义标题栏的内容。

```tsx
function CollapseExemple() {
  const [activeKey, setActiveKey] = useState<number | number[] | string | string[]>([0])
  return (
    <Collapse activeKey={activeKey} onChange={setActiveKey}>
      <CollapseItem
        title={
          <>
            标题1
            <QuestionOutlined />
          </>
        }
      >
        代码是写出来给人看的，附带能在机器上运行
      </CollapseItem>
      <CollapseItem icon={<ShopOutlined />} title="标题2" extra="内容" clickable={false}>
        代码是写出来给人看的，附带能在机器上运行
      </CollapseItem>
    </Collapse>
  )
}
```

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前展开面板的 key | 手风琴模式：_number \| string_<br>非手风琴模式：_(number \| string)[]_ | - |
| accordion | 是否开启手风琴模式 | _boolean_ | `false` |
| bordered | 是否显示外边框 | _boolean_ | `true` |

### Collapse Events

| 事件名 | 说明           | 回调参数                                 |
| ------ | -------------- | ---------------------------------------- |
| onChange | 切换面板时触发 | activeKey: 类型与 activeKey 绑定的值一致 |

### CollapseItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识符，默认为索引值 | _number \| string_ | `index` |
| icon | 标题栏左侧图标或图片 | _ReactNode_ | - |
| expandIcon | 标题栏右侧图标或图片 | _ReactNode_ | - |
| size | 标题栏大小，可选值为 `large` | _string_ | - |
| title | 标题栏左侧内容 | _number \| string_ | - |
| extra | 标题栏右侧内容 | _number \| string_ | - |
| brief | 标题栏描述信息 | _number \| string_ | - |
| bordered | 是否显示内边框 | _boolean_ | `true` |
| clickable| 是否开启点击反馈 | _boolean_ | `true` |
| disabled | 是否禁用面板 | _boolean_ | `false` |
