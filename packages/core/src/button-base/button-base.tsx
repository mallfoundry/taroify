import { Button, ButtonProps } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { prefixClassname } from "../styles"

export interface ButtonBaseProps extends ButtonProps {}

function ButtonBase(props: ButtonBaseProps) {
  const { className, ...restProps } = props
  return <Button className={classNames(prefixClassname("button-base"), className)} {...restProps} />
}

export default ButtonBase
