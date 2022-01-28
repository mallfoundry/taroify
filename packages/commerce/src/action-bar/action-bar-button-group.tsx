import { Flex } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { ActionBarButtonGroupProps } from "./action-bar.shared"

function ActionBarButtonGroup(props: ActionBarButtonGroupProps) {
  const { flex, children } = props
  return (
    <Flex.Item span={flex} className={classnames(prefixClassname("action-bar-button-group"))}>
      <Flex>{children}</Flex>
    </Flex.Item>
  )
}

ActionBarButtonGroup.displayName = "ActionBarButtonGroup"
export default ActionBarButtonGroup
