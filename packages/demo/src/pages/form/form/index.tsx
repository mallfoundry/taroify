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
} from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import { CustomWrapper, View } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { FormProps } from "@tarojs/components/types/Form"
import { chooseImage } from "@tarojs/taro"
import * as _ from "lodash"
import * as React from "react"
import { useEffect, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicForm() {
  function onSubmit(event: BaseEventOrig<FormProps.onSubmitEventDetail>) {
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

  return (
    <Form defaultValues={{ validatorMessage: "abc" }}>
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

interface UploaderFieldProps {
  value?: any

  onChange?(value?: any): void
}

function UploaderField(props: UploaderFieldProps) {
  const { value = [], onChange } = props

  function onUpload() {
    chooseImage({
      count: 2,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      onChange?.([
        ...value,
        {
          url: tempFiles[0].path,
          type: tempFiles[0].type,
          name: tempFiles[0].originalFileObj?.name,
        },
      ])
    })
  }

  return <Uploader multiple maxFiles={2} value={value} onUpload={onUpload} onChange={onChange} />
}

interface PickerFieldProps {
  value?: any

  onChange?(value?: any): void
}

function PickerField(props: PickerFieldProps) {
  const { value: valueProp, onChange } = props
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()

  useEffect(() => setValue(valueProp), [valueProp])

  return (
    <>
      <Input value={valueProp} readonly placeholder="点击选择城市" onClick={() => setOpen(true)} />
      <Popup mountOnEnter={false} open={open} rounded placement="bottom" onClose={setOpen}>
        <Picker
          value={value}
          onChange={setValue}
          onCancel={() => setOpen(false)}
          onConfirm={(newValue) => {
            onChange?.(newValue)
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

interface DatetimePickerProps {
  value?: Date

  onChange?(value?: Date): void
}

function DatetimePickerField(props: DatetimePickerProps) {
  const { value: valueProp, onChange } = props
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date>()

  useEffect(() => setValue(valueProp), [valueProp])

  return (
    <>
      <Input
        value={
          valueProp
            ? `${_.padStart(_.toString(valueProp?.getHours()), 2, "0")}:${
                //
                _.padStart(_.toString(valueProp?.getMinutes()), 2, "0")
              }`
            : undefined
        }
        readonly
        placeholder="点击选择时间"
        onClick={() => setOpen(true)}
      />
      <Popup mountOnEnter={false} open={open} rounded placement="bottom" onClose={setOpen}>
        <DatetimePicker
          type="hour-minute"
          value={value}
          onChange={setValue}
          onCancel={() => setOpen(false)}
          onConfirm={(newValue) => {
            onChange?.(newValue)
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

interface CalendarProps {
  value?: Date

  onChange?(value?: Date): void
}

function CalendarField(props: CalendarProps) {
  const { value: valueProp, onChange } = props
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date>()

  useEffect(() => setValue(valueProp), [valueProp])

  return (
    <>
      <Input
        value={
          valueProp
            ? `${_.padStart(_.toString(valueProp.getMonth() + 1), 2, "0")}/${valueProp.getDate()}`
            : undefined
        }
        readonly
        placeholder="点击选择日期"
        onClick={() => setOpen(true)}
      />
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
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            onChange?.(newValue)
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

function FormWithFields() {
  return (
    <Form onSubmit={(e) => console.log(e.detail.value)}>
      <Cell.Group inset>
        <Form.Item name="switch">
          <Form.Label>开关</Form.Label>
          <Form.Control>
            <Switch size={20} />
          </Form.Control>
        </Form.Item>
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
        <Form.Item name="radio">
          <Form.Label>单选框</Form.Label>
          <Form.Control>
            <Radio.Group direction="horizontal">
              <Radio name="1">单选框 1</Radio>
              <Radio name="2">单选框 2</Radio>
            </Radio.Group>
          </Form.Control>
        </Form.Item>
        <Form.Item name="stepper">
          <Form.Label>步进器</Form.Label>
          <Form.Control>
            <Stepper />
          </Form.Control>
        </Form.Item>
        <Form.Item name="rate">
          <Form.Label>评分</Form.Label>
          <Form.Control>
            <Rate />
          </Form.Control>
        </Form.Item>
        <Form.Item name="slider">
          <Form.Label>滑块</Form.Label>
          <Form.Control>
            <Slider />
          </Form.Control>
        </Form.Item>
        <Form.Item name="uploader">
          <Form.Label>文件上传</Form.Label>
          <Form.Control>
            {(controller) => (
              <UploaderField value={controller.value} onChange={controller.onChange} />
            )}
          </Form.Control>
        </Form.Item>
        <Form.Item name="picker" clickable rightIcon={<ArrowRight />}>
          <Form.Label>选择器</Form.Label>
          <Form.Control>
            {(controller) => (
              <CustomWrapper>
                <PickerField value={controller.value} onChange={controller.onChange} />
              </CustomWrapper>
            )}
          </Form.Control>
        </Form.Item>
        <Form.Item name="datetimePicker" clickable rightIcon={<ArrowRight />}>
          <Form.Label>时间选择</Form.Label>
          <Form.Control>
            {(controller) => (
              <CustomWrapper>
                <DatetimePickerField value={controller.value} onChange={controller.onChange} />
              </CustomWrapper>
            )}
          </Form.Control>
        </Form.Item>
        <Form.Item name="calendar" clickable rightIcon={<ArrowRight />}>
          <Form.Label>日历</Form.Label>
          <Form.Control>
            {(controller) => (
              <CustomWrapper>
                <CalendarField value={controller.value} onChange={controller.onChange} />
              </CustomWrapper>
            )}
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
    </Page>
  )
}
