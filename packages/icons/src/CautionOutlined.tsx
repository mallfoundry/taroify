import * as React from "react"
import Icon, { IconProps } from "./Icon"
import classNames from "classnames"

export default function CautionOutlined(props: IconProps) {
  const { className, style, ...rest } = props
  return (
    <Icon
      className={classNames(`vant-icon-caution-outlined`, className)}
      style={style}
      {...rest}
    />
  )
}
