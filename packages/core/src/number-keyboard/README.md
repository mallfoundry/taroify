# NumberKeyboard 数字键盘

### 介绍

虚拟数字键盘，可以配合[密码输入框组件](/components/password-input/)或自定义的输入框组件使用。

### 引入

```tsx
import { NumberKeyboard } from "@taroify/core";
```

## 代码演示

### 默认样式

数字键盘提供了 `onKeyPress`、`onBackspace`、`onHide` 事件，分别对应输入内容、删除内容和隐藏键盘。

```tsx
function BasicNumberKeyboard(props: KeyboardProps) {
  const { keyboard, onKeyboard, onKeyPress } = props
  return (
    <>
      <Cell
        clickable
        title="弹出默认键盘"
        rightIcon={<ArrowRight />}
        onClick={() => onKeyboard?.("basic")}
      />
      <NumberKeyboard
        open={keyboard === "basic"}
        onKeyPress={onKeyPress}
        onHide={() => onKeyboard?.("")}
      />
    </>
  )
}
```

> 点击键盘以外的区域时，键盘会自动收起，通过阻止元素上的 touchstart 事件冒泡可以避免键盘收起。

### 带右侧栏的键盘

使用 `NumberKeyboard.Sidebar` 子组件可以用来展示键盘的右侧栏，常用于输入金额的场景。

```tsx
function SidebarNumberKeyboard(props: KeyboardProps) {
  const { keyboard, onKeyboard, onKeyPress } = props
  return (
    <>
      <Cell
        clickable
        title="弹出带右侧栏的键盘"
        rightIcon={<ArrowRight />}
        onClick={() => onKeyboard?.("sidebar")}
      />
      <NumberKeyboard
        open={keyboard === "sidebar"}
        extraKey={[undefined, "."]}
        onKeyPress={onKeyPress}
        onHide={() => onKeyboard?.("")}
      >
        <NumberKeyboard.Sidebar>
          <NumberKeyboard.Key size="large" code="backspace" />
          <NumberKeyboard.Key size="large" code="keyboard-hide" color="blue">
            完成
          </NumberKeyboard.Key>
        </NumberKeyboard.Sidebar>
      </NumberKeyboard>
    </>
  )
}

```

### 身份证号键盘

通过 `extraKey` 属性可以设置左下角按键内容，比如需要输入身份证号时，可以将 `extraKey` 设置为 `X`。

```tsx
function IdCardNumberKeyboard(props: KeyboardProps) {
  const { keyboard, onKeyboard, onKeyPress } = props
  return (
    <>
      <Cell
        clickable
        title="弹出身份证号键盘"
        rightIcon={<ArrowRight />}
        onClick={() => onKeyboard?.("idCard")}
      />
      <NumberKeyboard
        open={keyboard === "idcard"}
        extraKey="X"
        onKeyPress={onKeyPress}
        onHide={() => onKeyboard?.("")}
      >
        <NumberKeyboard.Header>
          <NumberKeyboard.Button>完成</NumberKeyboard.Button>
        </NumberKeyboard.Header>
      </NumberKeyboard>
    </>
  )
}
```

### 键盘标题

通过 `title` 属性可以设置键盘标题。

```tsx
function TitleNumberKeyboard(props: KeyboardProps) {
  const { keyboard, onKeyboard, onKeyPress } = props
  return (
    <>
      <Cell
        clickable
        title="弹出身份证号键盘"
        rightIcon={<ArrowRight />}
        onClick={() => onKeyboard?.("title")}
      />
      <NumberKeyboard
        open={keyboard === "title"}
        title="键盘标题"
        extraKey="."
        onKeyPress={onKeyPress}
        onHide={() => onKeyboard?.("")}
      >
        <NumberKeyboard.Header>
          <NumberKeyboard.Button>完成</NumberKeyboard.Button>
        </NumberKeyboard.Header>
      </NumberKeyboard>
    </>
  )
}
```

### 配置多个按键

将 `extraKey` 配置成数组，可以实现配置多个按键。

```tsx
function NumberKeyboardWithKeys(props: KeyboardProps) {
  const { keyboard, onKeyboard, onKeyPress } = props
  return (
    <>
      <Cell
        clickable
        title="弹出配置多个按键的键盘"
        rightIcon={<ArrowRight />}
        onClick={() => onKeyboard?.("keys")}
      />
      <NumberKeyboard
        open={keyboard === "keys"}
        extraKey={["00", "."]}
        onKeyPress={onKeyPress}
        onHide={() => onKeyboard?.("")}
      >
        <NumberKeyboard.Sidebar>
          <NumberKeyboard.Key size="large" code="backspace" />
          <NumberKeyboard.Key size="large" code="keyboard-hide" color="blue">
            完成
          </NumberKeyboard.Key>
        </NumberKeyboard.Sidebar>
      </NumberKeyboard>
    </>
  )
}
```

### 随机数字键盘

通过 `random` 属性可以随机排序数字键盘，常用于安全等级较高的场景。

```tsx
function RandomNumberKeyboard(props: KeyboardProps) {
  const { keyboard, onKeyboard, onKeyPress } = props
  return (
    <>
      <Cell
        clickable
        title="弹出配置随机数字的键盘"
        rightIcon={<ArrowRight />}
        onClick={() => onKeyboard?.("random")}
      />
      <NumberKeyboard
        open={keyboard === "random"}
        random
        onKeyPress={onKeyPress}
        onHide={() => onKeyboard?.("")}
      />
    </>
  )
}
```

## API

### NumberKeyboard Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前输入值 | _string_ | - |
| open | 是否显示键盘 | _boolean_ | - |
| title | 键盘标题 | _string_ | - |
| maxlength | 输入值最大长度 | _number \| string_ | - |
| transition | 是否开启过场动画 | _boolean_ | `true` |
| extraKey | 底部额外按键的内容 | _ReactNode \| [ReactNode, ReactNode]_ | `''` |
| random | 是否将通过随机顺序展示按键 | _boolean_ | `false` |

### NumberKeyboard Events

| 事件名 | 说明                           | 回调参数      |
| ------ | ------------------------------ | ------------- |
| onChange  | 点击按键时触发                 | key: 按键内容 |
| onBackspace | 点击删除键时触发               | -             |
| onHide  | 点击关闭按钮时触发             | -             |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                          | 默认值                                         | 描述  |
|---------------------------------------------|---------------------------------------------|-----|
| number-keyboard-z-index                     | _100_                                       | -   |
| number-keyboard-background-color            | _var(--gray-2)_                             | -   |
| number-keyboard-with-title-border-radius    | _20px * $hd 20px * $hd 0 0_                 | -   |
| number-keyboard-header-color                | _var(--gray-7)_                             | -   |
| number-keyboard-header-padding-top          | _6px * $hd_                                 | -   |
| number-keyboard-header-height               | _34px * $hd_                                | -   |
| number-keyboard-header-font-size            | _var(--font-size-lg)_                       | -   |
| number-keyboard-key-height                  | _48px * $hd_                                | -   |
| number-keyboard-key-font-size               | _28px * $hd_                                | -   |
| number-keyboard-key-background-color        | _var(--white, $white)_                      | -   |
| number-keyboard-key-border-radius           | _var(--border-radius-lg)_                   | -   |
| number-keyboard-key-line-height             | _1.5_                                       | -   |
| number-keyboard-key-active-background-color | _var(--gray-3)_                             | -   |
| number-keyboard-key-active-opacity          | _var(--active-opacity)_                     | -   |
| number-keyboard-large-key-font-size         | _var(--font-size-lg)_                       | -   |
| number-keyboard-hide-padding                | _0 var(--padding-md)_                       | -   |
| number-keyboard-hide-font-size              | _24px * $hd_                                | -   |
| number-keyboard-hide-color                  | _var(--text-link-color)_                    | -   |
| number-keyboard-hide-active-opacity         | _var(--number-keyboard-key-active-opacity)_ | -   |
| number-keyboard-backspace-font-size         | _22px * $hd_                                | -   |
| number-keyboard-button-color                | _var(--white)_                              | -   |
| number-keyboard-button-background-color     | _var(--primary-color)_                      | -   |
