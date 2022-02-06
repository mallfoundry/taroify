import Button, { ButtonProps } from "@taroify/core/button"
import Flex from "@taroify/core/flex"
import { prefixClassname } from "@taroify/core/styles"
import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { createBadge, createBadgeWrapper } from "@taroify/~core/src/badge"
import classnames from "classnames"
import * as React from "react"
import { Children, CSSProperties, ReactNode } from "react"

function useActionBarIconButtonChildren(
  children?: ReactNode,
  badge?: boolean | string | number | ReactNode,
) {
  return Children.toArray(children).map((child, index) => {
    if (isIconElement(child)) {
      const IconBadgeWrapper = createBadgeWrapper(
        cloneIconElement(child, { className: prefixClassname("action-bar-icon-button__icon") }),
      )
      const Badge = createBadge(badge)
      return (
        <IconBadgeWrapper key={index}>
          <Badge />
        </IconBadgeWrapper>
      )
    }
    return child
  })
}

export interface ActionBarIconButtonProps extends ButtonProps {
  badge?: boolean | string | number | ReactNode
  style?: CSSProperties
  children: ReactNode
}

function ActionBarIconButton(props: ActionBarIconButtonProps) {
  const { badge, style, className, children: childrenProp } = props
  const children = useActionBarIconButtonChildren(childrenProp, badge)
  return (
    <Flex.Item>
      <Button
        className={classnames(prefixClassname("action-bar-icon-button"), className)}
        variant="text"
        style={style}
      >
        <Flex align="center" direction="column">
          {children}
        </Flex>
      </Button>
    </Flex.Item>
  )
}

export default ActionBarIconButton
