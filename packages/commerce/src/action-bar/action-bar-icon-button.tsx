import Button, { ButtonProps } from "@taroify/core/button"
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

export interface ActionBarIconButtonProps extends Omit<ButtonProps, "variant"> {
  style?: CSSProperties
  badge?: boolean | string | number | ReactNode
  children: ReactNode
}

function ActionBarIconButton(props: ActionBarIconButtonProps) {
  const { className, style, badge, children: childrenProp, ...restProps } = props
  const children = useActionBarIconButtonChildren(childrenProp, badge)
  return (
    <Button
      className={classnames(prefixClassname("action-bar-icon-button"), "color", className)}
      variant="text"
      {...restProps}
    >
      <Button.Content className={prefixClassname("action-bar-icon-button__content")}>
        {children}
      </Button.Content>
    </Button>
  )
}

export default ActionBarIconButton
