import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_LEFT, HAIRLINE_BORDER_TOP } from "../styles/hairline"

type DialogActionsTheme = "round"

interface DialogActionsProps {
  theme?: DialogActionsTheme
  children?: ReactNode
}

function useActionButtons(props: DialogActionsProps) {
  return useMemo(() => {
    const { children, theme } = props
    if (children === undefined) {
      return children
    }

    const __round__ = theme === "round"
    const count = Children.count(children)
    const zeroIndex = 0
    const lastIndex = count - 1

    const __children__: ReactNode[] = []

    Children.forEach(children as ReactElement, (action: ReactNode, index) => {
      if (!isValidElement(action)) {
        __children__.push(action)
        return
      }
      const element = action as ReactElement

      const actionClassNames = [element.props.className]

      if (index !== zeroIndex && !__round__) {
        actionClassNames.push(HAIRLINE_BORDER_LEFT)
      }

      if (index !== lastIndex) {
        actionClassNames.push(prefixClassname("dialog__cancel"))
      }

      if (index === lastIndex) {
        actionClassNames.push(prefixClassname("dialog__confirm"))
      }

      __children__.push(
        cloneElement(action, {
          key: action.key ?? index,
          className: classNames(action.props.className, actionClassNames),
          size: "large",
          shape: "square",
          variant: __round__ ? "contained" : "text",
        }),
      )
    })
    return __children__
  }, [props])
}

export default function DialogActions(props: DialogActionsProps) {
  const { theme } = props
  const children = useActionButtons(props)
  return (
    <View
      className={classNames(prefixClassname("dialog__footer"), {
        [HAIRLINE_BORDER_TOP]: theme !== "round",
        [prefixClassname("dialog__footer--round")]: theme === "round",
      })}
      children={children}
    />
  )
}
