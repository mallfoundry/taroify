# ActionSheet 动作面板

### 介绍

底部弹起的模态面板，包含与当前情境相关的多个选项。

### 引入

```tsx
import { ActionSheet } from "@taroify/core"
```

## 代码演示

### 基础用法

```tsx
function BasicActionSheet() {
  const [open, setOpen] = useState(false)
  const actions = useMemo(
    () => [
      { name: "选项一", value: "1" },
      { name: "选项二", value: "2" },
      { name: "选项三", value: "3" },
    ],
    [],
  )
  return (
    <>
      <Cell clickable isLink title="基础用法" onClick={() => setOpen(true)} />
      <ActionSheet
        actions={actions}
        open={open}
        onSelect={() => setOpen(false)}
        onClose={setOpen}
      />
    </>
  )
}
```

### 展示取消按钮

添加`cancelText`后，会在底部展示取消按钮，点击后关闭当前面板并触发 `onCancel` 事件。

```tsx
function ActionSheetWithCancel() {
  const [open, setOpen] = useState(false)
  const actions = useMemo(
    () => [
      { name: "选项一", value: "1" },
      { name: "选项二", value: "2" },
      { name: "选项三", value: "3" },
    ],
    [],
  )
  return (
    <>
      <Cell clickable isLink title="展示取消按钮" onClick={() => setOpen(true)} />
      <ActionSheet
        cancelText="取消"
        actions={actions}
        open={open}
        onSelect={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClose={setOpen}
      />
    </>
  )
}
```

### 展示描述信息

通过 `description` 和 `subname` 添加描述信息

```tsx
function ActionSheetWithDescription() {
  const [open, setOpen] = useState(false)
  const actions = useMemo(
    () => [
      { name: "选项一", value: "1", subname: "这是一段描述信息" },
      { name: "选项二", value: "2" },
      { name: "选项三", value: "3" },
    ],
    [],
  )
  return (
    <>
      <Cell clickable title="展示描述信息" isLink onClick={() => setOpen(true)} />
      <ActionSheet
        description="这是一段描述信息"
        cancelText="取消"
        actions={actions}
        open={open}
        onSelect={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClose={setOpen}
      />
    </>
  )
}
```

### 选项状态

通过 `loading` 和 `disabled` 将选项设置为加载状态或禁用状态，通过 `style`，`className` 修改样式

```tsx
function ActionSheetWithStatuses() {
  const [open, setOpen] = useState(false)
  const actions = useMemo(
    () => [
      { name: "选项一", value: "1", style: { color: "#ee0a24" } },
      { name: "选项二", value: "2", disabled: true },
      { name: "选项三", value: "3", loading: true },
    ],
    [],
  )
  return (
    <>
      <Cell clickable title="选项状态" isLink onClick={() => setOpen(true)} />
      <ActionSheet
        actions={actions}
        cancelText="取消"
        open={open}
        onSelect={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClose={setOpen}
      />
    </>
  )
}
```

### 手动控制 DOM

使用 `ActionSheet.Button` 组件后，会在底部展示取消按钮，点击后关闭当前面板并触发 `onCancel` 事件。<br>
使用`ActionSheet.Action`组件添加选项， 通过 `loading` 和 `disabled` 将选项设置为加载状态或禁用状态 <br>
通过 `ActionSheet.Header` 组件可以在菜单顶部显示描述信息，通过选项的 `ActionSheet.Action.children` 属性可以在 `Action` 文字的下侧展示描述信息。

```tsx
function ActionSheetWithStatuses() {
  const [open, setOpen] = useState(true)
  return (
    <ActionSheet open={open} onSelect={() => setOpen(false)} onClose={setOpen}>
      <ActionSheet.Action value="1" style={{ color: "#ee0a24" }} name="着色选项" />
      <ActionSheet.Action value="2" disabled name="禁止选项" />
      <ActionSheet.Action value="3" loading name="选项三" />
      <ActionSheet.Button onClick={() => setOpen(false)}>取消</ActionSheet.Button>
    </ActionSheet>
  )
}
```

## API

### ActionSheet Props

| 参数        | 说明                                  | 类型                        | 默认值   |
| ----------- | ------------------------------------- | --------------------------- | -------- |
| defaultOpen | 默认是否显示动作面板                  | _boolean_                   | `false`  |
| open        | 是否显示动作面板                      | _boolean_                   | `false`  |
| description | 选项上方的描述信息                    | _ReactNode_                 | -        |
| cancelText  | 取消按钮文字                          | _ReactNode_                 | -        |
| actions     | 面板选项列表                          | _ActionSheetActionObject[]_ | -        |
| className   | 样式类名                              | _string_                    | -        |
| style       | 样式对象                              | _CSSProperties_             | -        |
| rounded     | 是否为圆角                            | _string_                    | -        |
| safeArea    | 安全区的位置，可选值为 `top` `bottom` | _string_                    | `bottom` |

### ActionSheetActionObject 数据结构

| 参数      | 说明           | 类型        |
| --------- | -------------- | ----------- |
| name      | 标题           | _ReactNode_ |
| subname   | 二级标题       | _ReactNode_ |
| disabled  | 是否为禁用状态 | _boolean_   |
| loading   | 是否为加载状态 | _boolean_   |
| value     | 值             | _any_       |
| style     |                |             |
| className |                |             |

### ActionSheet.Backdrop Props

| 参数      | 说明               | 类型               | 默认值 |
| --------- | ------------------ | ------------------ | ------ |
| className | 样式类名           | _string_           | -      |
| style     | 样式对象           | _CSSProperties_    | -      |
| duration  | 动画时长，单位毫秒 | _number \| string_ | `300`  |
| closeable | 点击是否可以关闭   | _boolean_          | `true` |

### ActionSheet.Header Props

| 参数      | 说明     | 类型            | 默认值 |
| --------- | -------- | --------------- | ------ |
| className | 样式类名 | _string_        | -      |
| style     | 样式对象 | _CSSProperties_ | -      |
| title     | 标题     | _string_        | -      |
| children  | 描述信息 | _string_        | -      |

### ActionSheet.Action Props

| 参数      | 说明           | 类型            | 默认值 |
| --------- | -------------- | --------------- | ------ |
| className | 样式类名       | _string_        | -      |
| style     | 样式对象       | _CSSProperties_ | -      |
| name      | 标题           | _string_        | -      |
| value     | 选项值         | _string_        | -      |
| disabled  | 是否为禁用状态 | _boolean_       | -      |
| loading   | 是否为加载状态 | _boolean_       | -      |
| children  | 描述信息       | _string_        | -      |

### ActionSheet.Button Props

| 参数      | 说明                        | 类型            | 默认值   |
| --------- | --------------------------- | --------------- | -------- |
| className | 按钮类名                    | _string_        | -        |
| style     | 按钮样式                    | _CSSProperties_ | -        |
| type      | 按钮类型，可选值为 `cancel` | _string_        | `button` |
| children  | 按钮内容                    | _string_        | -        |

### ActionSheet Events

| 事件名   | 说明                                     | 回调参数                         |
| -------- | ---------------------------------------- | -------------------------------- |
| onSelect | 点击选项时触发，禁用或加载状态下不会触发 | _event: ActionSheet.ActionEvent_ |
| onCancel | 点击取消按钮时触发                       | -                                |
| onClose  | 关闭面板时触发                           | -                                |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                      | 默认值                  | 描述 |
| ----------------------------------------- | ----------------------- | ---- |
| --action-sheet-description-padding-bottom | _var(--padding-md)_     | -    |
| --action-sheet-subname-margin-top         | _var(--padding-xs)_     | -    |
| --action-sheet-subname-color              | _var(--gray-6)_         | -    |
| --action-sheet-subname-font-size          | _var(--font-size-sm)_   | -    |
| --action-sheet-subname-line-height        | _var(--line-height-sm)_ | -    |
