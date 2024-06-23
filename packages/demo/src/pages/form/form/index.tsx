import {
  Button,
  Calendar,
  Cell,
  Checkbox,
  DatetimePicker,
  Form,
  Input,
  Picker,
  Popup,
  Radio,
  Rate,
  Slider,
  Stepper,
  Switch,
  Toast,
  Uploader,
  Field,
} from "@taroify/core"
import { FormItemInstance, FormValidError, FormInstance } from "@taroify/core/form"
import { ArrowRight } from "@taroify/icons"
import { View } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { FormProps } from "@tarojs/components/types/Form"
import { chooseImage } from "@tarojs/taro"
import * as _ from "lodash"
import { useRef, useState, Fragment, useMemo } from "react"
import Block from "../../../components/block"
import CustomWrapper from "../../../components/custom-wrapper"
import Page from "../../../components/page"
import "./index.scss"


function BasicForm() {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    Toast.open(JSON.stringify(event.detail.value))
  }

  return (
    <Form onSubmit={onSubmit}>
      <Toast id="toast" />
      <Cell.Group inset>
        <Field  label="用户名" name="username" rules={[{ required: true, message: "请填写用户名" }]}>
          <Input placeholder="用户名" />
        </Field>
        <Field label="密码" name="password" rules={[{ required: true, message: "请填写密码" }]}>
          <Input password placeholder="密码" />
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
        <Field label="文本" name="pattern" rules={[{ pattern: /\d{6}/, message: "请输入正确内容" }]}>
          <Input placeholder="正则校验" />
        </Field>
        <Field
          label="文本"
          name="validator"
          rules={[{ validator: (val) => /1\d{10}/.test(val), message: "请输入正确内容" }]}
        >
          <Input placeholder="函数校验" />
        </Field>
        <Field
          label="文本"
          name="validatorMessage"
          rules={[{ validator: (val) => `${val ?? ""} 不合法，请重新输入` }]}
        >
          <Input placeholder="校验函数返回错误提示" />
        </Field>
        <Field
          label="文本"
          name="asyncValidator"
          rules={[{ validator: asyncValidator, message: "请输入正确内容" }]}
        >
          <Input placeholder="异步函数校验" />
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
    <Field label="文件上传" ref={itemRef} name="uploader">
      <Uploader multiple maxFiles={2} onUpload={onUpload} />
    </Field>
  )
}

function PickerField() {
  const itemRef = useRef<FormItemInstance>()
  const [open, setOpen] = useState(false)
  const columns = useMemo(() => [
    { label: "杭州", value: "Hangzhou" },
    { label: "宁波", value: "Ningbo" },
    { label: "温州", value: "Wenzhou" },
    { label: "绍兴", value: "Shaoxing" },
    { label: "湖州", value: "Huzhou" }
  ], [])


  return (
    <>
      <Field label="选择器" ref={itemRef} name="picker" clickable isLink>
        <Input readonly placeholder="点击选择城市" onClick={() => setOpen(true)} />
      </Field>
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <Picker
          title="选择城市"
          columns={columns}
          onCancel={() => setOpen(false)}
          onConfirm={(newValue) => {
            itemRef.current?.setValue(newValue)
            setOpen(false)
          }}
        >
        </Picker>
      </Popup>
    </>
  )
}

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
      <Field label="时间选择" ref={itemRef} name="datetimePicker" clickable isLink>
        {(controller) => (
          <Input
            value={formatDate(controller.value)}
            readonly
            placeholder="点击选择时间"
            onClick={() => setOpen(true)}
          />
        )}
      </Field>
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <DatetimePicker
          type="hour-minute"
          onCancel={() => setOpen(false)}
          onConfirm={(newValue) => {
            itemRef.current?.setValue(newValue)
            setOpen(false)
          }}
        >
        </DatetimePicker>
      </Popup>
    </>
  )
}

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
      <Field label="日历" ref={itemRef} name="calendar" clickable isLink>
        {(controller) => (
          <Input
            value={formatDate(controller.value)}
            readonly
            placeholder="点击选择日期"
            onClick={() => setOpen(true)}
          />
        )}
      </Field>
      <Calendar
        type="single"
        poppable
        showPopup={open}
        onConfirm={(newValue) => {
          itemRef.current?.setValue(newValue)
          setOpen(false)
        }}
      >
      </Calendar>
    </>
  )
}

function FormWithFields() {
  return (
    <Form onSubmit={(e) => Toast.open(JSON.stringify(e.detail.value, undefined, 2))}>
      <Cell.Group inset>
        <Field label="开关" name="switch">
          <Switch size={20} />
        </Field>
        <Field label="复选框" name="checkbox">
          <Checkbox shape="square" />
        </Field>
        <Field label="复选框组" name="checkboxGroup">
          <Checkbox.Group direction="horizontal">
            <Checkbox name="1" shape="square">
              复选框 1
            </Checkbox>
            <Checkbox name="2" shape="square">
              复选框 2
            </Checkbox>
          </Checkbox.Group>
        </Field>
        <Field label="单选框" name="radio">
          <Radio.Group direction="horizontal">
            <Radio name="1">单选框 1</Radio>
            <Radio name="2">单选框 2</Radio>
          </Radio.Group>
        </Field>
        <Field label="步进器" name="stepper">
          <Stepper />
        </Field>
        <Field label="评分" name="rate">
          <Rate />
        </Field>
        <Field label="滑块" name="slider">
          <Slider />
        </Field>
        <CustomWrapper>
          <UploaderField />
        </CustomWrapper>
        <CustomWrapper>
          <PickerField />
        </CustomWrapper>
        <CustomWrapper>
          <DatetimePickerField />
        </CustomWrapper>
        <CustomWrapper>
          <CalendarField />
        </CustomWrapper>
      </Cell.Group>
      <View style={{ margin: "16px" }}>
        <Button shape="round" block color="primary" formType="submit">
          提交
        </Button>
        <Button style={{ marginTop: "16px" }} shape="round" block color="warning" formType="reset">
          重置
        </Button>
      </View>
    </Form>
  )
}

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
    <Form.List name="contacts" defaultValue={[{name: "小明", phone: "10086"}]}>
      {
        (fields, { add, remove }) => <Cell.Group inset>
          {
            fields.map((field, idx) => <Fragment key={field.key}>
              <Field label="姓名" name={`${field.name}.name`} key={`${field.key}.name`}>
                {
                  ({ value, onChange }) => <>
                    <Input placeholder="请输入姓名" value={value} onChange={(e) => { onChange?.(e.detail.value) }} />
                    <View style={{ flexShrink: 0 }} onClick={() => { remove(idx) }}>删除</View>
                  </>
                }
              </Field>
              <Field label="电话" name={`${field.name}.phone`} key={`${field.key}.phone`} rules={[{ required: true, message: "必填" }]}>
                <Input placeholder="请输入电话" />
              </Field>
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

function DependenciesDemo() {
  const formRef = useRef<FormInstance>()
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    Toast.open(JSON.stringify(event.detail.value))
  }

  return (
    <Form ref={formRef} onSubmit={onSubmit} validateTrigger="onChange">
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
          <Form.Label>确认密码</Form.Label>
          <Form.Control>
            <Input placeholder="确认密码" />
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

export default function FormDemo() {
  return (
    <Page title="Form 表单" className="form-demo">
      <Block title="基础用法">
        <BasicForm />
      </Block>
      <Block title="校验规则">
        <FormWithRules />
      </Block>
      <Block title="表单项类型">
        <CustomWrapper>
          <FormWithFields />
        </CustomWrapper>
      </Block>
      <Block title="动态增减表单项">
        <DynamicForm />
      </Block>
      <Block title="依赖与自动更新">
        <DependenciesDemo />
        <ShouldUpdateDemo />
      </Block>
    </Page>
  )
}
