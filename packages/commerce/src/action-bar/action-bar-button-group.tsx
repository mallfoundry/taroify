import { Flex } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { ActionBarButtonShape } from "./action-bar.shared"

export interface ActionBarButtonGroupProps {
  flex?: number
  shape?: ActionBarButtonShape
  children?: ReactNode
}

function ActionBarButtonGroup(props: ActionBarButtonGroupProps) {
  const { shape, flex, children } = props
  return (
    <Flex.Item
      span={flex}
      className={classnames(prefixClassname("action-bar-button-group"), {
        [prefixClassname("action-bar-button-group--round")]: shape === "round",
        [prefixClassname("action-bar-button-group--square")]: shape === "square",
      })}
    >
      {children}
    </Flex.Item>
  )
}

ActionBarButtonGroup.displayName = "ActionBarButtonGroup"
export default ActionBarButtonGroup
