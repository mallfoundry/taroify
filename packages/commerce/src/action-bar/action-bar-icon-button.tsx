import { Badge, Button, Flex } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import "./action-bar-icon-button.scss"
import { ActionBarIconButtonProps } from "./action-bar.shared"

function ActionBarIconButton(props: ActionBarIconButtonProps) {
  const { badge, onClick, style, className, children } = props
  return (
    <Flex.Item>
      <Button
        className={classnames(prefixClassname("action-bar-icon-button"), className)}
        variant="text"
        style={{ padding: "0px", borderRadius: 0, ...style }}
        onClick={onClick}
      >
        <Badge content={badge} dot={badge === "dot"}>
          <Flex align="center" direction="column">
            {children}
          </Flex>
        </Badge>
      </Button>
    </Flex.Item>
  )
}

ActionBarIconButton.displayName = "ActionBarIcon"
export default ActionBarIconButton
