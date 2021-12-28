import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { CellTitle } from "../cell"
import { prefixClassname } from "../styles"
import { FormLabelAlign } from "./form.shared"

interface FormLabelProps extends ViewProps {
  align?: FormLabelAlign
  children?: ReactNode
}

function FormLabel(props: FormLabelProps) {
  const { align, ...restProps } = props
  return (
    <CellTitle
      className={classNames(prefixClassname("form__label"), {
        [prefixClassname("form__label--left")]: align === "left",
        [prefixClassname("form__label--center")]: align === "center",
        [prefixClassname("form__label--right")]: align === "right",
      })}
      {...restProps}
    />
  )
}

export default FormLabel
