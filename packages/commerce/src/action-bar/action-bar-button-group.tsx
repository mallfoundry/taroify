import Flex from "@taroify/core/flex"
import { prefixClassname } from "@taroify/core/styles"
import type { ViewProps } from "@tarojs/components/types/View"
import classnames from "classnames"
import * as React from "react"
import type { CSSProperties, PropsWithChildren } from "react"
import type { ActionBarButtonShape } from "./action-bar.shared"

export interface ActionBarButtonGroupProps extends PropsWithChildren<ViewProps> {
  style?: CSSProperties
  shape?: ActionBarButtonShape
  flex?: number
}

function ActionBarButtonGroup(props: ActionBarButtonGroupProps) {
  const { className, shape = "round", flex, ...restProps } = props
  return (
    <Flex.Item
      span={flex}
      className={classnames(
        prefixClassname("action-bar-button-group"),
        {
          [prefixClassname("action-bar-button-group--round")]: shape === "round",
          [prefixClassname("action-bar-button-group--square")]: shape === "square",
        },
        className,
      )}
      {...restProps}
    />
  )
}

export default ActionBarButtonGroup
