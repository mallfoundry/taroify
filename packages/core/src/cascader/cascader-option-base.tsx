import { Success } from "@taroify/icons"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CascaderOptionBaseProps {
  className?: string
  active?: boolean
  disabled?: boolean
  children?: ReactNode

  onClick?(event: ITouchEvent): void
}

function CascaderOptionBase(props: CascaderOptionBaseProps) {
  const { className, active, disabled, children, onClick } = props
  return (
    <View
      className={classNames(
        prefixClassname("cascader__option"),
        {
          [prefixClassname("cascader__option--active")]: active,
          [prefixClassname("cascader__option--disabled")]: disabled,
        },
        className,
      )}
      hoverClass={prefixClassname("cascader__option--hover")}
      onClick={onClick}
    >
      <View>{children}</View>
      {active && <Success className={prefixClassname("cascader__active-icon")} />}
    </View>
  )
}

export default CascaderOptionBase
