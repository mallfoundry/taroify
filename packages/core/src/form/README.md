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
> Tips: 推荐可以使用`Field`组件，可以减少代码量，提高可读性

### 校验规则

通过 `rules` 定义表单校验规则，所有可用字段见[下方表格](#rule-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)。

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
      <Form.Item ref={itemRef} name="picker" isLink>
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
      <Form.Item ref={itemRef} name="datetimePicker" isLink>
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
      <Form.Item ref={itemRef} name="calendar" isLink>
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


### 动态增减表单项

通过Form.List动态增减表单项
```tsx
function DynamicForm() {
  const ref = useRef<FormInstance>(null)
  const onManual = () => {
    ref.current?.setValues({
      contacts: [
        { name: "小红", phone: "10000" },
        { name: "小绿", phone: "10086" }
      ]
    })
  }
  return <Form ref={ref}  onSubmit={(e) => {
    Toast.open(JSON.stringify(e.detail.value, undefined, 2))
  }}
  >
    <Toast id="toast" />
    <Form.List name="contacts" defaultValue={[{name: "小明", phone: "10086"}]}>
      {
        (fields, { add, remove }) => <Cell.Group inset>
          {
            fields.map((field, idx) => <Fragment key={field.key}>
              <Form.Item name={`${field.name}.name`} key={`${field.key}.name`}>
                <Form.Label>姓名</Form.Label>
                <Form.Control>
                  {
                    ({ value, onChange }) => <>
                      <Input placeholder="请输入姓名" value={value} onChange={(e) => { onChange?.(e.detail.value) }} />
                      <View style={{ flexShrink: 0 }} onClick={() => { remove(idx) }}>删除</View>
                    </>
                  }
                </Form.Control>
              </Form.Item>
              <Form.Item name={`${field.name}.phone`} key={`${field.key}.phone`} rules={[{ required: true, message: "必填" }]}>
                <Form.Label>电话</Form.Label>
                <Form.Control>
                  <Input placeholder="请输入电话" />
                </Form.Control>
              </Form.Item>
            </Fragment>)
          }
          <Button variant="text" color="primary" onClick={() => add({})} >添加联系人</Button>
        </Cell.Group>
      }
    </Form.List>
    <View style={{ margin: "16px" }}>
      <Button shape="round" block color="primary" formType="submit">
        提交
      </Button>
      <Button style={{ marginTop: "16px" }} shape="round" block color="info" onClick={onManual}>
        手动
      </Button>
      <Button style={{ marginTop: "16px" }} shape="round" block color="warning" formType="reset">
        重置
      </Button>
    </View>
  </Form>
}
```

### 依赖与自动更新
通过dependencies自动触发校验
```tsx
function DependenciesDemo() {
  const formRef = useRef<FormInstance>()
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    Toast.open(JSON.stringify(event.detail.value))
  }

  return (
    <Form ref={formRef} onSubmit={onSubmit}>
      <Toast id="toast" />
      <Cell.Group inset>
        <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
          <Form.Label>用户名</Form.Label>
          <Form.Control>
            <Input placeholder="用户名" />
          </Form.Control>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
          <Form.Label>密码</Form.Label>
          <Form.Control>
            <Input placeholder="密码" />
          </Form.Control>
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[{ required: true, message: "请再次输入密码" }, {
            validator: (val) => {
              return formRef.current?.getValues<any>()?.password === val ? true : "密码不一致"
            }
          }]}
        >
          <Form.Label>密码</Form.Label>
          <Form.Control>
            <Input placeholder="密码" />
          </Form.Control>
        </Form.Item>
        <Field
          name="confirmPassword2"
          dependencies={["password"]}
          label="密码"
          rules={[{ required: true, message: "请再次输入密码" }, {
            validator: (val) => {

              return formRef.current?.getValues<any>()?.password === val ? true : "密码不一致"
            }
          }]}
        >
          <Input placeholder="密码" />
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
通过shouldUpdate和noStyle触发重新渲染, Form.Item里包裹的子组件必须由函数返回，否则 shouldUpdate 不会起作用, Field暂不支持
```tsx
function ShouldUpdateDemo() {
  const formRef = useRef<FormInstance>()
  return <Form
    ref={formRef}
    onSubmit={(e) => {
      Toast.open(JSON.stringify(e.detail.value, undefined, 2))
    }}
  >
    <Toast id="toast" />
    <Cell.Group inset>
      <Form.Item name="type">
        <Form.Label>复选框</Form.Label>
        <Form.Control>
          <Checkbox shape="square" />
        </Form.Control>
      </Form.Item>
      <Form.Item name="radio">
        <Form.Label>单选框</Form.Label>
        <Form.Control>
          <Radio.Group direction="horizontal">
            <Radio name="1">单选框 1</Radio>
            <Radio name="2">单选框 2</Radio>
          </Radio.Group>
        </Form.Control>
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(prev, cur) => prev.type !== cur.type}>
        {
          () => {
            const type = formRef.current?.getValues<any>()?.type
            if (type) {
              return <Form.Item name="a1">
                <Form.Label>复选框选中</Form.Label>
                <Form.Control><Input /></Form.Control>
              </Form.Item>
            } else {
              return <>
                <Form.Item name="a2">
                  <Form.Label>复选框未选中</Form.Label>
                  <Form.Control><Input /></Form.Control>
                </Form.Item>
                <Form.Item name="a3">
                  <Form.Label>复选框未选中</Form.Label>
                  <Form.Control><Input /></Form.Control>
                </Form.Item>
              </>
            }
          }
        }
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(prev, cur) => prev.radio !== cur.radio}>
        {
          () =>  <Field name="cc" label={`单选框${formRef.current?.getValues<any>()?.radio}`}>
            <Input placeholder={`结果${JSON.stringify(formRef.current?.getValues<any>())}`} />
          </Field>
        }
      </Form.Item>
    </Cell.Group>
    <View style={{ margin: "16px" }}>
      <Button shape="round" block color="primary" formType="submit">
        提交
      </Button>
    </View>
  </Form>
}
```

## API

### Form Props

| 参数              | 说明                                       | 类型         | 默认值      |
|-----------------|------------------------------------------|------------|----------|
| labelAlign      | 表单项 label 对齐方式，可选值为 `center` `right`     | _string_   | `left`   |
| controlAlign    | 表单项 control 对齐方式，可选值为 `center` `right`   | _string_   | `left`   |
| validateTrigger | 表单校验触发时机，可选值为 `onChange`、`onSubmit`，详见下表 | _string_   | `onBlur` |
| colon           | 是否在 label 后面添加冒号                         | _boolean_  | `false`  |

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
| setValues | 设置表单值(浅合并)                                   | _object_                    | - |
| getValues | 获得表单值，支持传入 `name` 来获得单个或部分表单项 | _name?: string \| string[]_ | _object_ |
| setErrors | 设置表单验证错误信息(浅合并) | _FormValidError[]_ | _void_ |
| getErrors | 获得表单验证错误信息，支持传入 `name` 来获得单个或部分表单项 | _name?: string \| string[]_ | _FormValidError[]_ |
| validate  | 验证表单，支持传入 `name` 来验证单个或部分表单项   | _name?: string \| string[]_ | _Promise_ |
| reset     | 重置表单                                     | -                           | _void_ |

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
| dependencies | 当依赖的字段值改变时，触发自身的校验 | _string[]_ | - |
| shouldUpdate | 当值为true时，触发当前区域重新渲染 | _boolean\|(prevValues, curValues) => boolean_ | - |
| noStyle | 直接渲染children | boolean | - |

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
| children | 内容 | _ReactNode\|((controller: FormController<V>) => ReactNode)_ | --

```tsx
interface FormController<V> {
  value?: V // 当前表单项值
  validateStatus?: FormValidateStatus // 当前表单项验证状态

  onChange?(value: V): void // 改变当前表单项值

  onBlur?(value: V): void // 触发onBlur当前表单项校验
}
```
> Tips: 使用onBlur触发表单验证，自定义表单项时，要手动调用onBlur，才能触发校验

### Form.List

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| children | 渲染函数 | _(fields: { key: string, name: string }[], operation: { add, remove }) => ReactNode_ | _
| name | 表单项名称，提交表单的标识符 | _string_ |
| defaultValue | 表单项默认值 | _any_ | 

### 类型定义
通过`@taroify/core/form`导入组件类型：
```tsx
import { 
  FormRule, FormItemInstance, FormListInstance, FormInstance 
} from "@taroify/core/form"
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                 | 默认值                       | 描述  |
|------------------------------------|---------------------------|-----|
| form-label-width                   | _6.2em_                   | -   |
| form-label-color                   | _var(--gray-7)_           | -   |
| form-label-margin-right            | _var(--padding-sm)_       | -   |
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
