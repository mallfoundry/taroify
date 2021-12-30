import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { CellTitle } from "../cell"
import { prefixClassname } from "../styles"
import FormContext from "./form.context"
import { FormLabelAlign } from "./form.shared"

interface FormLabelProps extends ViewProps {
  align?: FormLabelAlign
  children?: ReactNode
}

function FormLabel(props: FormLabelProps) {
  const { align: alignProp, ...restProps } = props
  const { labelAlign } = useContext(FormContext)
  const align = alignProp ?? labelAlign

  return (
    <CellTitle
      className={classNames(prefixClassname("form-label"), {
        [prefixClassname("form-label--left")]: align === "left",
        [prefixClassname("form-label--center")]: align === "center",
        [prefixClassname("form-label--right")]: align === "right",
      })}
      {...restProps}
    />
  )
}

export default FormLabel
