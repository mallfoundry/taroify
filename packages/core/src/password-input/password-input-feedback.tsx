import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { PropsWithChildren } from "react"
import { prefixClassname } from "../styles"

export type PasswordInputFeedbackColor = "primary" | "info" | "success" | "warning" | "danger"

export interface PasswordInputFeedbackProps extends PropsWithChildren<ViewProps> {
  color?: PasswordInputFeedbackColor
}

function PasswordInputFeedback(props: PasswordInputFeedbackProps) {
  const { className, color, ...restProps } = props
  return (
    <View
      className={classNames(
        prefixClassname("password-input__feedback"),
        {
          [prefixClassname("password-input__feedback--primary")]: color === "primary",
          [prefixClassname("password-input__feedback--info")]: color === "info",
          [prefixClassname("password-input__feedback--success")]: color === "success",
          [prefixClassname("password-input__feedback--warning")]: color === "warning",
          [prefixClassname("password-input__feedback--danger")]: color === "danger",
        },
        className,
      )}
      {...restProps}
    />
  )
}

export default PasswordInputFeedback
