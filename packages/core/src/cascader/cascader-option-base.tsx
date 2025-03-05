import { Success } from "@taroify/icons"
import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CascaderOptionBaseProps extends ViewProps {
  key?: string | number
  className?: string
  active?: boolean
  disabled?: boolean
  children?: ReactNode
}

function CascaderOptionBase(props: CascaderOptionBaseProps) {
  const { className, active, disabled, children, ...restProps } = props
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
      {...restProps}
    >
      <View>{children}</View>
      {active && <Success className={prefixClassname("cascader__active-icon")} />}
    </View>
  )
}

export default CascaderOptionBase
