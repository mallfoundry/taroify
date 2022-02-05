import { Badge, Button, Flex } from "@taroify/core"
import { ButtonProps } from "@taroify/core/button"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import "./action-bar-icon-button.scss"

export interface ActionBarIconButtonProps extends ButtonProps {
  badge?: string | number
  style?: CSSProperties
  className?: string
  children: ReactNode
}

function ActionBarIconButton(props: ActionBarIconButtonProps) {
  const { badge, style, className, children } = props
  return (
    <Flex.Item>
      <Button
        className={classnames(prefixClassname("action-bar-icon-button"), className)}
        variant="text"
        style={{ padding: "0px", ...style }}
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
