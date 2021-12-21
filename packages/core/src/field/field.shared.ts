import { ReactNode } from "react"

export type FieldType = "number" | "text" | "idcard" | "digit" | "textarea" | "password"

export type FieldClearTrigger = "always" | "focus"

export type FieldLabelAlign = "left" | "center" | "right"

export type FieldInputAlign = "left" | "center" | "right"

export type FieldMessageAlign = "left" | "center" | "right"

export interface FieldAutosize {
  maxHeight: number
  minHeight: number
}

export type FieldConfirmType = "send" | "search" | "next" | "go" | "done"

export type FieldFormatTrigger = "onBlur" | "onChange"

export type FieldValidateTrigger = "onBlur" | "onChange" | "onSubmit"

export interface FieldValidError {
  name?: string
  message: ReactNode
}

export type FieldRuleMessage = string | ((value: any, rule: FieldRule) => string)

export type FieldRuleValidator = (
  value: any,
  rule: FieldRule,
) => boolean | string | Promise<boolean | string>

export type FiledRuleFormatter = (value: any, rule: FieldRule) => string

export interface FieldRule {
  pattern?: RegExp
  trigger?: FieldValidateTrigger
  message?: FieldRuleMessage
  required?: boolean
  validator?: FieldRuleValidator
  formatter?: FiledRuleFormatter
}

export interface FieldInstance {
  readonly name?: string

  validate(rules?: FieldRule[]): Promise<void>
}
