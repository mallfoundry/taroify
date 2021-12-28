import { ReactNode } from "react"

export type FormLabelAlign = "left" | "center" | "right"

export interface FormInstance {
  validateFields(name?: string | string[]): Promise<void>

  setFieldsValue(values: any): void

  getFieldsValue<V>(): V
}

export type FormFeedbackAlign = "left" | "center" | "right"

export type FormFeedbackStatus = "valid" | "warning" | "invalid"

export type FormValidateTrigger = "onBlur" | "onChange" | "onSubmit"

export interface FormValidError {
  name?: string
  errors: ReactNode[]
}

export type FormRuleMessage = string | ((value: any, rule: FormRule) => string)

export type FormRuleValidator = (
  value: any,
  rule: FormRule,
) => boolean | string | Promise<boolean | string>

export type FiledRuleFormatter = (value: any, rule: FormRule) => string

export interface FormRule {
  pattern?: RegExp
  trigger?: FormValidateTrigger
  message?: FormRuleMessage
  required?: boolean
  validator?: FormRuleValidator
  formatter?: FiledRuleFormatter
}

export interface FormController {
  name?: string
  value?: any

  onChange?(value: any): void

  onBlur?(value: any): void
}

export interface FormItemInstance {
  readonly name?: string

  validate(rules?: FormRule[]): Promise<void>
}
