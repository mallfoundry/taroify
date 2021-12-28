import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { FormFeedbackAlign, FormFeedbackStatus } from "./form.shared"

interface FormFeedbackProps extends ViewProps {
  align?: FormFeedbackAlign
  status?: FormFeedbackStatus
  children?: ReactNode
}

function FormFeedback(props: FormFeedbackProps) {
  const { className, align = "left", status, ...restProps } = props
  return (
    <View
      className={classNames(
        prefixClassname("form__feedback"),
        {
          [prefixClassname("form__feedback--left")]: align === "left",
          [prefixClassname("form__feedback--center")]: align === "center",
          [prefixClassname("form__feedback--right")]: align === "right",
          [prefixClassname("form__feedback--valid")]: status === "valid",
          [prefixClassname("form__feedback--warning")]: status === "warning",
          [prefixClassname("form__feedback--invalid")]: status === "invalid",
        },
        className,
      )}
      {...restProps}
    />
  )
}

export default FormFeedback
