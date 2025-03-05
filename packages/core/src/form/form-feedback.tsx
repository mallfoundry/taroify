import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { type ReactNode, useContext } from "react"
import FormContext from "./form.context"
import { prefixClassname } from "../styles"
import type { FormFeedbackAlign, FormFeedbackStatus } from "./form.shared"

export interface FormFeedbackProps extends ViewProps {
  align?: FormFeedbackAlign
  status?: FormFeedbackStatus
  children?: ReactNode
}

function FormFeedback(props: FormFeedbackProps) {
  const { className, align: alignProp, status, ...restProps } = props
  const { controlAlign } = useContext(FormContext)
  const align = alignProp ?? controlAlign ?? "left"
  return (
    <View
      className={classNames(
        prefixClassname("form-feedback"),
        {
          [prefixClassname("form-feedback--left")]: align === "left",
          [prefixClassname("form-feedback--center")]: align === "center",
          [prefixClassname("form-feedback--right")]: align === "right",
          [prefixClassname("form-feedback--valid")]: status === "valid",
          [prefixClassname("form-feedback--warning")]: status === "warning",
          [prefixClassname("form-feedback--invalid")]: status === "invalid",
        },
        className,
      )}
      {...restProps}
    />
  )
}

FormFeedback.displayName = "FormFeedback"

export default FormFeedback
