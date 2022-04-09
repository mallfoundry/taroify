import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_LEFT, HAIRLINE_BORDER_TOP } from "../styles/hairline"
import { getLogger } from "../utils/logger"
import { DialogActionsTheme, DialogActionsVariant } from "./dialog.shared"

const { deprecated } = getLogger("Dialog.Actions")

interface DialogActionsProps {
  theme?: DialogActionsTheme
  variant?: DialogActionsVariant
  children?: ReactNode
}

function useActionButtons(props: DialogActionsProps) {
  return useMemo(() => {
    const { children, variant } = props
    if (children === undefined) {
      return children
    }

    const __rounded__ = variant === "rounded"
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

      if (index !== zeroIndex && !__rounded__) {
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
          variant: __rounded__ ? "contained" : "text",
        }),
      )
    })
    return __children__
  }, [props])
}

export default function DialogActions(props: DialogActionsProps) {
  const { theme, variant: variantProp, children: childrenProp } = props

  if (theme === "round") {
    // eslint-disable-next-line quotes
    deprecated('Use the variant="rounded" prop instead of the theme="round" prop')
  }

  const variant = variantProp ?? (theme === "round" ? "rounded" : undefined)
  const children = useActionButtons({ children: childrenProp, variant })
  return (
    <View
      className={classNames(prefixClassname("dialog__footer"), {
        [HAIRLINE_BORDER_TOP]: variant !== "rounded",
        [prefixClassname("dialog__footer--rounded")]: variant === "rounded",
      })}
      children={children}
    />
  )
}
