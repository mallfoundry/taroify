import { Flex } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { Children, cloneElement, ReactElement } from "react"
import { ActionBarSquare } from "./action-bar.shared"

export interface ActionBarButtonGroupProps {
  flex?: number
  children?: ReactElement | ReactElement[]
  shape?: ActionBarSquare
}

function ActionBarButtonGroup(props: ActionBarButtonGroupProps) {
  const { shape, flex, children } = props
  return (
    <Flex.Item span={flex} className={classnames(prefixClassname("action-bar-button-group"))}>
      <Flex>
        {Children.toArray(children).map((Child: any, index: number) => {
          return cloneElement(Child as ReactElement, { shape, index }, Child?.props?.children)
        })}
      </Flex>
    </Flex.Item>
  )
}

ActionBarButtonGroup.displayName = "ActionBarButtonGroup"
export default ActionBarButtonGroup
