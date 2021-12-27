import { ReactNode } from "react"

export type FieldLabelAlign = "left" | "center" | "right"

export type FieldMessageAlign = "left" | "center" | "right"

export type FieldValidateTrigger = "onBlur" | "onChange" | "onSubmit"

export interface FieldValidError {
  name?: string
  errors: ReactNode[]
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
