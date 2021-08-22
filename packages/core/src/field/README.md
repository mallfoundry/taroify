# Field 输入框

### 介绍

用户可以在文本框内输入或编辑文字。

### 引入

```tsx
import { Cell, Field } from "@taroify/core";
```

## 代码演示

### 基础用法

可以通过 `value` 设置输入框的值，通过 `placeholder` 设置占位提示文字，通过 `onChange` 事件获得改变的值。

```tsx
import { Cell, Field } from "@taroify/core"

function BasicField() {
  const [value, setValue] = useState("")
  return (
    <Cell.Group inset>
      <Field
        value={value}
        label="文本"
        placeholder="请输入文本"
        onChange={(e) => setValue(e.detail.value)}
      />
    </Cell.Group>
  )
}
```

### 自定义类型

根据 `type` 属性定义不同类型的输入框，默认值为 `text`。

```tsx
import { Cell, Field } from "@taroify/core"

function CustomField() {
  const [text, setText] = useState("")
  const [idcard, setIdcard] = useState("")
  const [number, setNumber] = useState("")
  const [digit, setDigit] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Cell.Group inset>
      <Field
        value={text}
        label="文本"
        placeholder="请输入文本"
        onChange={(e) => setText(e.detail.value)}
      />
      <Field
        value={idcard}
        label="身份证号"
        type="idcard"
        placeholder="请输入手机号"
        onChange={(e) => setIdcard(e.detail.value)}
      />
      <Field
        value={number}
        label="整数"
        type="number"
        placeholder="请输入整数"
        onChange={(e) => setNumber(e.detail.value)}
      />
      <Field
        value={digit}
        label="数字"
        type="digit"
        placeholder="请输入数字（支持小数）"
        onChange={(e) => setDigit(e.detail.value)}
      />
      <Field
        value={password}
        label="密码"
        type="password"
        placeholder="请输入密码"
        onChange={(e) => setPassword(e.detail.value)}
      />
    </Cell.Group>
  )
}
```

### 禁用输入框

通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

```tsx
import { Cell, Field } from "@taroify/core"

function DisabledField() {
  return (
    <Cell.Group inset>
      <Field label="文本" placeholder="输入框只读" readonly />
      <Field label="文本" placeholder="输入框已禁用" disabled />
    </Cell.Group>
  )
}
```

### 显示图标

通过 `icon` 和 `rightIcon` 配置输入框两侧的图标，通过设置 `clearable` 在输入过程中展示清除图标。

```tsx
function IconField() {
  const [value2, setValue2] = useState("")

  return (
    <Cell.Group inset>
      <Field
        label="文本"
        icon={<SmileOutlined />}
        rightIcon={<WarningOutlined />}
        placeholder="显示图标"
      />
      <Field
        value={value2}
        label="文本"
        icon={<MusicOutlined />}
        clearable
        placeholder="显示清除图标"
        onChange={(e) => setValue2(e.detail.value)}
      />
    </Cell.Group>
  )
}
```

### 错误提示

设置 `required` 属性表示这是一个必填项，可以配合 `error` 或 `message` 属性显示对应的错误提示。

```tsx
function ErrorField() {
  return (
    <Cell.Group inset>
      <Field required error label="用户名" placeholder="请输入用户名" />
      <Field required error label="手机号" placeholder="请输入手机号" message="手机号格式错误" />
    </Cell.Group>
  )
}

```

### 插入按钮

通过 `Field.Button` 可以在输入框尾部插入按钮。

```tsx
function ButtonField() {
  return (
    <Cell.Group inset>
      <Field align="center" label="短信验证码" placeholder="请输入短信验证码">
        <Field.Button>
          <Button size="small" color="primary">
            发送验证码
          </Button>
        </Field.Button>
      </Field>
    </Cell.Group>
  )
}
```

### 格式化输入内容

通过 `formatter` 属性可以对输入的内容进行格式化，通过 `format-trigger` 属性可以指定执行格式化的时机，默认在输入时进行格式化。

```html

<van-cell-group inset>
  <van-field
    v-model="state.value1"
    label="文本"
    :formatter="formatter"
    placeholder="在输入时执行格式化"
  />
  <van-field
    v-model="state.value2"
    label="文本"
    :formatter="formatter"
    format-trigger="onBlur"
    placeholder="在失焦时执行格式化"
  />
</van-cell-group>
```

```js
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      value1: '',
      value2: '',
    });
    // 过滤输入的数字
    const formatter = (value) => value.replace(/\d/g, '');

    return {
      state,
      formatter,
    };
  },
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前输入的值 | _number \| string_ | - |
| label | 输入框左侧文本 | _string_ | - |
| name | 名称，提交表单的标识符 | _string_ | - |
| type | 输入框类型, 可选值为 `idcard` `digit`<br>`number` `textarea` `password` 等 | _string_ | `text` |
| size | 大小，可选值为 `large` | _string_ | - |
| maxlength | 输入的最大字符数 | _number \| string_ | - |
| placeholder | 输入框占位提示文字 | _string_ | - |
| bordered | 是否显示内边框 | _boolean_ | `true` |
| disabled | 是否禁用输入框 | _boolean_ | `false` |
| readonly | 是否为只读状态，只读状态下无法输入内容 | _boolean_ | `false` |
| colon | 是否在 label 后面添加冒号 | _boolean_ | `false` |
| required | 是否显示表单必填星号 | _boolean_ | `false` |
| align | 是否使内容垂直居中 | _boolean_ | `false` |
| clearable | 是否启用清除图标，点击清除图标后会清空输入框 | _boolean_ | `false` |
| clearIcon | 清除图标 | _string_ | `<Clear />` |
| clearTrigger | 显示清除图标的时机，`always` 表示输入框不为空时展示，<br>`focus` 表示输入框聚焦且不为空时展示 | _string_ | `focus` |
| clickable | 是否开启点击反馈 | _boolean_ | `false` |
| autofocus | 是否自动聚焦，iOS 系统不支持该属性 | _boolean_ | `false` |
| error | 是否将输入内容标红 | _boolean_ | `false` |
| message | 底部错误提示文案，为空时不展示 | _string_ | - |
| messageAlign | 错误提示文案对齐方式，可选值为 `center` `right` | _string_ | `left` |
| formatter | 输入内容格式化函数 | _(val: string) => string_ | - |
| formatTrigger | 格式化函数触发的时机，可选值为 `onBlur` | _string_ | `onChange` |
| labelClassName | 左侧文本额外类名 | _string \| Array \| object_ | - |
| labelAlign | 左侧文本对齐方式，可选值为 `center` `right` | _string_ | `left` |
| inputAlign | 输入框对齐方式，可选值为 `center` `right` | _string_ | `left` |
| icon | 左侧图标 | _ReactNode_ | - |
| rightIcon | 右侧图标 | _ReactNode_ | - |
| confirmType | 设置键盘右下角按钮的文字，仅在 type='text' 时生效 | _string_ | `done` |
| confirmHold | 点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效 | _boolean_ | `false` |
| holdKeyboard | focus 时，点击页面的时候不收起键盘 | _boolean_ | `false` |
| cursorSpacing | 输入框聚焦时底部与键盘的距离 | _number_ | `50` |
| adjustPosition | 键盘弹起时，是否自动上推页面 | _boolean_ | `true` |
| selectionStart | 光标起始位置，自动聚集时有效，需与 selectionEnd 搭配使用 | _number_ | `-1` |
| selectionEnd | 光标结束位置，自动聚集时有效，需与 selectionStart 搭配使用 | _number_ | `-1` |

### Events

| 事件               | 说明                 | 回调参数                       |
| ------------------ | -------------------- | ------------------------------ |
| onChange | 输入框内容变化时触发 | _event.detail: 当前输入值_ |
| onFocus              | 输入框获得焦点时触发 | _event: Event_                 |
| onBlur               | 输入框失去焦点时触发 | _event: Event_                 |
| onClear              | 点击清除按钮时触发   | _event: MouseEvent_            |
