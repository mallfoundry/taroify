import * as React from "react"
import { ReactNode } from "react"
import { CellProps } from "../cell"
import Form, { FormLabelAlign, FormRule } from "../form"

export interface FieldProps extends CellProps {
  name?: string
  required?: boolean
  label?: ReactNode
  labelAlign?: FormLabelAlign
  error?: boolean
  children?: ReactNode

  rules?: FormRule[]
}

function Field(props: FieldProps) {
  const {
    className,
    style,
    name,
    label,
    labelAlign,
    align,
    bordered,
    icon,
    rightIcon,
    clickable,
    required,
    //
    children,
    //
    rules,
    onClick,
  } = props

  return (
    <Form.Item
      className={className}
      style={style}
      name={name}
      bordered={bordered}
      align={align}
      clickable={clickable}
      rules={rules}
      icon={icon}
      rightIcon={rightIcon}
      required={required}
      onClick={onClick}
    >
      <Form.Label align={labelAlign} children={label} />
      <Form.Control children={children} />
    </Form.Item>
  )
}

export default Field
