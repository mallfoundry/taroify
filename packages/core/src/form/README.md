# Form 表单

### 介绍

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型。

### 引入

```tsx
import { Form } from "@taroify/core"
```

## 代码演示

### 基础用法

在表单中，每个 `Form.Item` 代表一个表单项，使用 Field 的 `rules` 属性定义校验规则。

```tsx
function BasicForm() {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    Toast.open(JSON.stringify(event.detail.value))
  }

  return (
    <Form onSubmit={onSubmit}>
      <Toast id="toast" />
      <Cell.Group inset>
        <Form.Item name="username" rules={[{ required: true, message: "请填写用户名" }]}>
          <Form.Label>用户名</Form.Label>
          <Form.Control>
            <Input placeholder="用户名" />
          </Form.Control>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "请填写密码" }]}>
          <Form.Label>密码</Form.Label>
          <Form.Control>
            <Input password placeholder="密码" />
          </Form.Control>
        </Form.Item>
        <Field
          name="text"
          label={{ align: "left", children: "文本" }}
          rules={[{ required: true, message: "请填写文本" }]}
        >
          <Input placeholder="请输入文本" />
        </Field>
      </Cell.Group>
      <View style={{ margin: "16px" }}>
        <Button shape="round" block color="primary" formType="submit">
          提交
        </Button>
      </View>
    </Form>
  )
}
```

### 校验规则

通过 `rules` 定义表单校验规则，所有可用字段见[下方表格](#/zh-CN/form#rule-shu-ju-jie-gou)。

```tsx
function FormWithRules() {
  const asyncValidator = (val: any) =>
    new Promise<boolean>((resolve) => {
      Toast.loading("验证中...")

      setTimeout(() => {
        Toast.close("toast")
        resolve(/\d{6}/.test(val))
      }, 1000)
    })

  function onValidate(errors: FormValidError[]) {
    Toast.open({
      style: {
        textAlign: "left",
      },
      message: JSON.stringify(errors, undefined, 2),
    })
  }

  return (
    <Form defaultValues={{ validatorMessage: "abc" }} onValidate={onValidate}>
      <Toast id="toast" />
      <Cell.Group inset>
        <Form.Item name="pattern" rules={[{ pattern: /\d{6}/, message: "请输入正确内容" }]}>
          <Form.Label>文本</Form.Label>
          <Form.Control>
            <Input placeholder="正则校验" />
          </Form.Control>
        </Form.Item>
        <Form.Item
          name="validator"
          rules={[{ validator: (val) => /1\d{10}/.test(val), message: "请输入正确内容" }]}
        >
          <Form.Label>文本</Form.Label>
          <Form.Control>
            <Input placeholder="函数校验" />
          </Form.Control>
        </Form.Item>
        <Form.Item
          name="validatorMessage"
          rules={[{ validator: (val) => `${val ?? ""} 不合法，请重新输入` }]}
        >
          <Form.Label>文本</Form.Label>
          <Form.Control>
            <Input placeholder="校验函数返回错误提示" />
          </Form.Control>
        </Form.Item>
        <Form.Item
          name="asyncValidator"
          rules={[{ validator: asyncValidator, message: "请输入正确内容" }]}
        >
          <Form.Label>文本</Form.Label>
          <Form.Control>
            <Input placeholder="异步函数校验" />
          </Form.Control>
        </Form.Item>
      </Cell.Group>
      <View style={{ margin: "16px" }}>
        <Button shape="round" block color="primary" formType="submit">
          提交
        </Button>
      </View>
    </Form>
  )
}
```

### 表单项类型 - 开关

在表单中使用 [Switch 组件](/components/switch)。

```tsx
<Form.Item name="switch">
  <Form.Label>开关</Form.Label>
  <Form.Control>
    <Switch size={20} />
  </Form.Control>
</Form.Item>
```

### 表单项类型 - 复选框

在表单中使用 [Checkbox 组件](/components/checkbox)。

```tsx
<Form.Item name="checkbox">
  <Form.Label>复选框</Form.Label>
  <Form.Control>
    <Checkbox shape="square" />
  </Form.Control>
</Form.Item>
<Form.Item name="checkboxGroup">
  <Form.Label>复选框</Form.Label>
  <Form.Control>
    <Checkbox.Group direction="horizontal">
      <Checkbox name="1" shape="square">
        复选框 1
      </Checkbox>
      <Checkbox name="2" shape="square">
        复选框 2
      </Checkbox>
    </Checkbox.Group>
  </Form.Control>
</Form.Item>
```

### 表单项类型 - 单选框

在表单中使用 [Radio 组件](/components/radio)。

```tsx
<Form.Item name="radio">
  <Form.Label>单选框</Form.Label>
  <Form.Control>
    <Radio.Group direction="horizontal">
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  </Form.Control>
</Form.Item>
```

### 表单项类型 - 步进器

在表单中使用 [Stepper 组件](/components/stepper)。

```tsx
<Form.Item name="stepper">
  <Form.Label>步进器</Form.Label>
  <Form.Control>
    <Stepper />
  </Form.Control>
</Form.Item>
```

### 表单项类型 - 评分

在表单中使用 [Rate 组件](/components/rate)。

```tsx
<Form.Item name="rate">
  <Form.Label>评分</Form.Label>
  <Form.Control>
    <Rate />
  </Form.Control>
</Form.Item>
```

### 表单项类型 - 滑块

在表单中使用 [Slider 组件](/components/slider)。

```tsx
<Form.Item name="slider">
  <Form.Label>滑块</Form.Label>
  <Form.Control>
    <Slider />
  </Form.Control>
</Form.Item>
```

### 表单项类型 - 文件上传

在表单中使用 [Uploader 组件](/components/uploader)。

```tsx
function UploaderField() {
  const itemRef = useRef<FormItemInstance>()

  function onUpload() {
    chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      itemRef.current?.setValue([
        ...(itemRef.current?.getValue() ? [...itemRef.current?.getValue()] : []),
        {
          url: tempFiles[0].path,
          type: tempFiles[0].type,
          name: tempFiles[0].originalFileObj?.name,
        },
      ])
    })
  }

  return (
    <Form.Item ref={itemRef} name="uploader">
      <Form.Label>文件上传</Form.Label>
      <Form.Control>
        <Uploader multiple maxFiles={2} onUpload={onUpload} />
      </Form.Control>
    </Form.Item>
  )
}
```

### 表单项类型 - 选择器

在表单中使用 [Picker 组件](/components/picker)。

```tsx
function PickerField() {
  const itemRef = useRef<FormItemInstance>()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Form.Item ref={itemRef} name="picker" clickable rightIcon={<ArrowRight />}>
        <Form.Label>选择器</Form.Label>
        <Form.Control>
          <Input readonly placeholder="点击选择城市" onClick={() => setOpen(true)} />
        </Form.Control>
      </Form.Item>
      <Popup mountOnEnter={false} open={open} rounded placement="bottom" onClose={setOpen}>
        <Picker
          onCancel={() => setOpen(false)}
          onConfirm={(newValue) => {
            itemRef.current?.setValue(newValue)
            setOpen(false)
          }}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option>杭州</Picker.Option>
            <Picker.Option>宁波</Picker.Option>
            <Picker.Option>温州</Picker.Option>
            <Picker.Option>嘉兴</Picker.Option>
            <Picker.Option>湖州</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>
    </>
  )
}
```

### 表单项类型 - 时间选择器

在表单中使用 [DatetimePicker 组件](/components/datetime-picker)。

```tsx
function DatetimePickerField() {
  const itemRef = useRef<FormItemInstance>()
  const [open, setOpen] = useState(false)

  const formatDate = (date: any) => {
    if (date) {
      const hours = _.padStart(_.toString(date?.getHours()), 2, "0")
      const minutes = _.padStart(_.toString(date?.getMinutes()), 2, "0")
      return `${hours}:${minutes}`
    }
  }

  return (
    <>
      <Form.Item ref={itemRef} name="datetimePicker" clickable rightIcon={<ArrowRight />}>
        <Form.Label>时间选择</Form.Label>
        <Form.Control>
          {(controller) => (
            <Input
              value={formatDate(controller.value)}
              readonly
              placeholder="点击选择时间"
              onClick={() => setOpen(true)}
            />
          )}
        </Form.Control>
      </Form.Item>
      <Popup mountOnEnter={false} open={open} rounded placement="bottom" onClose={setOpen}>
        <DatetimePicker
          type="hour-minute"
          onCancel={() => setOpen(false)}
          onConfirm={(newValue) => {
            itemRef.current?.setValue(newValue)
            setOpen(false)
          }}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
        </DatetimePicker>
      </Popup>
    </>
  )
}
```

### 表单项类型 - 日历

在表单中使用 [Calendar 组件](/components/calendar)。

```tsx
function CalendarField() {
  const itemRef = useRef<FormItemInstance>()
  const [open, setOpen] = useState(false)

  const formatDate = (date: any) => {
    if (date) {
      const months = _.padStart(_.toString(date?.getMonth() + 1), 2, "0")
      const days = _.padStart(_.toString(date?.getDate()), 2, "0")
      return `${months}-${days}`
    }
  }

  return (
    <>
      <Form.Item ref={itemRef} name="calendar" clickable rightIcon={<ArrowRight />}>
        <Form.Label>日历</Form.Label>
        <Form.Control>
          {(controller) => (
            <Input
              value={formatDate(controller.value)}
              readonly
              placeholder="点击选择日期"
              onClick={() => setOpen(true)}
            />
          )}
        </Form.Control>
      </Form.Item>
      <Popup
        mountOnEnter={false}
        style={{ height: "80%" }}
        open={open}
        rounded
        placement="bottom"
        onClose={setOpen}
      >
        <Popup.Close />
        <Calendar
          type="single"
          onConfirm={(newValue) => {
            itemRef.current?.setValue(newValue)
            setOpen(false)
          }}
        >
          <Calendar.Footer>
            <Calendar.Button type="confirm">确定</Calendar.Button>
          </Calendar.Footer>
        </Calendar>
      </Popup>
    </>
  )
}
```

## API

### Form Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| labelAlign | 表单项 label 对齐方式，可选值为 `center` `right` | _string_ | `left` |
| controlAlign | 表单项 control 对齐方式，可选值为 `center` `right` | _string_ | `left` |
| validateTrigger | 表单校验触发时机，可选值为 `onChange`、`onSubmit`，详见下表 | _string_ | `onBlur` |
| validateFirst | 是否在某一项校验不通过时停止校验 | _boolean_ | `false` |
| colon | 是否在 label 后面添加冒号 | _boolean_ | `false` |

### Form Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onSubmit | 提交表单且验证通过后触发 | _event: BaseEventOrig<FormProps.onSubmitEventDetail>_ |
| onReset  | 重置表单后触发         | _event: BaseEventOrig_ |
| onValidate | 提交表单且验证不通过后触发 | _errors: { name: string, errors: string[] }[]_ |
| onValuesChange | 字段值更新后触发 | _changedValues: object, allValues: object_ |

### Form Methods

通过 ref 可以获取到 Form 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| setValues | 设置表单值                                   | _object_                    | - |
| getValues | 获得表单值，支持传入 `name` 来获得单个或部分表单项 | _name?: string \| string[]_ | _object_ |
| validate  | 验证表单，支持传入 `name` 来验证单个或部分表单项   | _name?: string \| string[]_ | _Promise_ |
| reset     | 重置表单                                     | -                           | _Promise_ |

### validateTrigger 可选值

通过 `validateTrigger` 属性可以自定义表单校验的触发时机。

| 值       | 描述                                 |
| -------- | ------------------------------------ |
| onSubmit | 仅在提交表单时触发校验               |
| onBlur   | 在提交表单和输入框失焦时触发校验     |
| onChange | 在提交表单和输入框内容变化时触发校验 |

### Form.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 表单项名称，提交表单的标识符 | _string_ | - |
| defaultValue | 表单项默认值 | _any_ | - |
| required | 是否显示表单必填星号 | _boolean_ | `false` |
| rules | 表单校验规则 | _FormRule[]_ | - |

> 属性继承自 Cell 组件，更多属性参见：[Cell 组件](/components/cell/#cell-props)

### Rule 数据结构

使用 Form.Item 的 `rules` 属性可以定义校验规则，可选属性如下：

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否为必选字段，当值为空字符串、空数组、`undefined`、`null` 时，校验不通过 | _boolean_ |
| message | 错误提示文案 | _string \| (value, rule) => string_ |
| validator | 通过函数进行校验 | _(value, rule) => boolean \| string \| Promise_ |
| pattern | 通过正则表达式进行校验 | _RegExp_ |
| trigger | 本项规则的触发时机，可选值为 `onChange`、`onBlur` | _string_ |
| formatter | 格式化函数，将表单项的值转换后进行校验 | _(value, rule) => any_ |

### Form.Label Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 对齐方式，可选值为 `center` `right` | _string_ | `left` |
| colon | 是否在 label 后面添加冒号 | _boolean_ | `false` |

### Form.Feedback Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 对齐方式，可选值为 `center` `right` | _string_ | `left` |
| status | 反馈状态，可选值为 `valid` `warning` `invalid` | _string_ | - |

### Form.Control Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 对齐方式，可选值为 `center` `right` | _string_ | `left` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                 | 默认值                       | 描述  |
|------------------------------------|---------------------------|-----|
| form-label-width                   | _6.2em_                   | -   |
| form-label-color                   | _var(--gray-7)_           | -   |
| form-label-margin-right            | _var(--padding-sm)_       | -   |
| form-label-required-color          | _var(--red)_              | -   |
| form-label-disabled-color          | _var(--gray-5)_           | -   |
| form-item-icon-size                | _16px * $hd_              | -   |
| form-item-right-icon-color         | _var(--gray-6)_           | -   |
| form-item-right-icon-padding       | _0 var(--padding-xs)_     | -   |
| form-item-right-icon-margin-right  | _-8px * $hd_              | -   |
| form-item-right-button-margin-left | _var(--padding-xs)_       | -   |
| form-control-color                 | _var(--text-color)_       | -   |
| form-control-min-height            | _var(--cell-line-height)_ | -   |
| form-feedback-font-size            | _var(--font-size-sm)_     | -   |
| form-feedback-valid-color          | _var(--success-color)_    | -   |
| form-feedback-warning-color        | _var(--warning-color)_    | -   |
| form-feedback-invalid-color        | _var(--danger-color)_     | -   |
