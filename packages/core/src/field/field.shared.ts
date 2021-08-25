export enum FieldType {
  Number = "number",
  Text = "text",
  Idcard = "idcard",
  Digit = "digit",
  Textarea = "textarea",
  Password = "password",
}

export type FieldTypeString = "number" | "text" | "idcard" | "digit" | "textarea" | "password"

export enum FieldClearTrigger {
  Always = "always",
  Focus = "focus",
}

export type FieldClearTriggerString = "always" | "focus"

export enum FieldLabelAlign {
  Left = "left",
  Center = "center",
  Right = "right",
}

export type FieldLabelAlignString = "left" | "center" | "right"

export enum FieldInputAlign {
  Left = "left",
  Center = "center",
  Right = "right",
}

export type FieldInputAlignString = "left" | "center" | "right"

export enum FieldMessageAlign {
  Left = "left",
  Center = "center",
  Right = "right",
}

export type FieldMessageAlignString = "left" | "center" | "right"

export interface FieldAutosize {
  maxHeight: number
  minHeight: number
}

export type FieldConfirmType = "send" | "search" | "next" | "go" | "done"
