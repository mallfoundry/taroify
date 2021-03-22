import * as React from "react"
import Icon, { IconProps } from "./Icon"
import classNames from "classnames"

export default function UpOutlined(props: IconProps) {
  const { className, style, ...rest } = props
  return (
    <Icon
      className={classNames(`vant-icon-up-outlined`, className)}
      style={style}
      {...rest}
    />
  )
}
