import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, cloneElement, ReactElement, ReactNode } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_LEFT, HAIRLINE_BORDER_TOP } from "../styles/hairline"

type DialogActionsTheme = "round"

interface DialogActionsProps {
  theme?: DialogActionsTheme
  children?: ReactNode
}

function renderActionButtons(props: DialogActionsProps) {
  const { children, theme } = props
  if (children === undefined) {
    return children
  }

  const __round__ = theme === "round"
  const count = Children.count(children)
  const zeroIndex = 0
  const lastIndex = count - 1
  return Children.map(children as ReactElement, (action: ReactElement, index) => {
    const actionClassNames = [action.props.className]

    if (index !== zeroIndex && !__round__) {
      actionClassNames.push(HAIRLINE_BORDER_LEFT)
    }

    if (index !== lastIndex) {
      actionClassNames.push(prefixClassname("dialog__cancel"))
    }

    if (index === lastIndex) {
      actionClassNames.push(prefixClassname("dialog__confirm"))
    }

    return cloneElement(action, {
      className: classNames(action.props.className, actionClassNames),
      size: "large",
      shape: "square",
      variant: __round__ ? "contained" : "text",
    })
  })
}

export default function DialogActions(props: DialogActionsProps) {
  const { theme } = props
  const children = renderActionButtons(props)
  return (
    <View
      className={classNames(prefixClassname("dialog__footer"), {
        [HAIRLINE_BORDER_TOP]: theme !== "round",
        [prefixClassname("dialog__footer--round")]: theme === "round",
      })}
    >
      {children}
    </View>
  )
}
