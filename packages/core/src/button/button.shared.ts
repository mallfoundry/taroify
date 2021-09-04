export enum ButtonFormType {
  Button = "button",
  Submit = "submit",
  Reset = "reset",
}

export type ButtonFormTypeString = "button" | "submit" | "reset"

export enum ButtonVariant {
  Contained = "contained",
  Text = "text",
  Outlined = "outlined",
}

export type ButtonVariantString = "contained" | "text" | "outlined"

export enum ButtonSize {
  Mini = "mini",
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type ButtonSizeString = "mini" | "small" | "medium" | "large"

export enum ButtonColor {
  Default = "default",
  Primary = "primary",
  Info = "info",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

export type ButtonColorString = "default" | "primary" | "info" | "success" | "warning" | "danger"

export enum ButtonShape {
  Square = "square",
  Circle = "circle",
  Round = "round",
}

export type ButtonShapeString = "square" | "circle" | "round"

export enum ButtonOpenType {
  Contact = "contact",
  ContactShare = "contactShare",
  share = "share",
  GetRealnameAuthInfo = "getRealnameAuthInfo",
  GetAuthorize = "getAuthorize",
  GetPhoneNumber = "getPhoneNumber",
  GetUserInfo = "getUserInfo",
  Lifestyle = "lifestyle",
  LaunchApp = "launchApp",
  OpenSetting = "openSetting",
  Feedback = "feedback",
}

export type ButtonOpenTypeString =
  | "contact"
  | "contactShare"
  | "share"
  | "getRealnameAuthInfo"
  | "getAuthorize"
  | "getPhoneNumber"
  | "getUserInfo"
  | "lifestyle"
  | "launchApp"
  | "openSetting"
  | "feedback"
