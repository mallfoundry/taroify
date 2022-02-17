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
import { FormItemInstance, FormValidError } from "@taroify/core/form"
import { ArrowRight } from "@taroify/icons"
import { View } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { FormProps } from "@tarojs/components/types/Form"
import { chooseImage } from "@tarojs/taro"
import * as _ from "lodash"
import { useRef, useState } from "react"
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

function FormWithFields() {
  return (
    <Form onSubmit={(e) => Toast.open(JSON.stringify(e.detail.value, undefined, 2))}>
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
