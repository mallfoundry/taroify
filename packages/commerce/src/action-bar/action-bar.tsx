import FixedView from "@taroify/core/fixed-view"
import Flex, { FlexProps } from "@taroify/core/flex"
import { SafeAreaPosition } from "@taroify/core/safe-area"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"

export interface ActionBarProps extends FlexProps {
  fixed?: boolean
  safeArea?: SafeAreaPosition
  placeholder?: boolean
}

function ActionBar(props: ActionBarProps) {
  const { className, fixed, safeArea, placeholder, justify = "space-between", ...restProps } = props
  return (
    <FixedView<FlexProps>
      component={Flex}
      justify={justify}
      className={classnames(
        prefixClassname("action-bar"),
        {
          [prefixClassname("action-bar--fixed")]: fixed,
        },
        className,
      )}
      position={fixed}
      safeArea={safeArea}
      placeholder={fixed && prefixClassname("action-bar__placeholder")}
      {...restProps}
    />
  )
}

export default ActionBar
