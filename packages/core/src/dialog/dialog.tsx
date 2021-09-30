import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import Popup from "../popup"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_LEFT, HAIRLINE_BORDER_TOP } from "../styles/hairline"

interface DialogChildren {
  header?: ReactElement
  content?: ReactElement
  actions?: ReactElement
}

function findDialogChildren(nodes?: ReactNode): DialogChildren {
  const children: DialogChildren = {
    header: undefined,
    content: undefined,
    actions: undefined,
  }

  if (nodes === undefined) {
    return children
  }

  Children.forEach(nodes, (node: ReactNode) => {
    if (!isValidElement(node)) {
      return
    }

    const { header, content, actions } = children
    if (header !== undefined && content !== undefined && actions !== undefined) {
      return
    }

    const element = node as ReactElement
    if (element.type === Dialog.Header) {
      children.header = element
    } else if (element.type === Dialog.Content) {
      children.content = element
    } else if (element.type === Dialog.Actions) {
      children.actions = element
    }
  })

  return children
}

interface DialogHeaderProps {
  isolated?: boolean
}

function renderDialogHeader(
  header: ReactElement | undefined,
  props: DialogHeaderProps,
): ReactElement | undefined {
  if (!isValidElement(header)) {
    return header
  }

  return cloneElement(header, props)
}

interface DialogContentProps {
  isolated?: boolean
  message?: boolean
}

function renderDialogContent(
  content: ReactElement | undefined,
  props: DialogContentProps,
): ReactElement | undefined {
  if (!isValidElement(content)) {
    return content
  }

  return cloneElement(content, props)
}

interface DialogProps {
  className?: string
  backdrop?: boolean
  open?: boolean
  children?: ReactNode
  onClose?: (opened: boolean) => void
}

function Dialog(props: DialogProps) {
  const { className, backdrop = true, open, children, onClose } = props
  const { header, content, actions } = findDialogChildren(children)
  const hasHeader = header !== undefined
  const hasContent = content !== undefined
  return (
    <Popup
      className={classNames(prefixClassname("dialog"), className)}
      duration={160}
      transaction={prefixClassname("dialog-bounce")}
      open={open}
      onClose={onClose}
    >
      {backdrop && <Popup.Backdrop />}
      {
        // Render header
        renderDialogHeader(header, {
          isolated: hasHeader && !hasContent,
        })
      }
      {
        // Render content
        renderDialogContent(content, {
          isolated: !hasHeader && hasContent,
        })
      }
      {
        // Render actions
        actions
      }
    </Popup>
  )
}

namespace Dialog {
  interface HeaderProps {
    children?: ReactNode
  }

  export function Header(props: HeaderProps) {
    const { children } = props
    return <View className={classNames(prefixClassname("dialog__header"), {})}>{children}</View>
  }

  export enum ContentAlign {
    Left = "left",
    Center = "center",
    Right = "right",
  }

  type ContentAlignString = "left" | "center" | "right"

  interface ContentProps {
    align?: ContentAlign | ContentAlignString
    isolated?: boolean
    children?: ReactNode
  }

  export function Content(props: ContentProps) {
    const { isolated, align = ContentAlign.Center, children } = props
    return (
      <View
        className={classNames(prefixClassname("dialog__content"), {
          [prefixClassname("dialog__content--isolated")]: isolated,
        })}
      >
        <View
          className={classNames(prefixClassname("dialog__message"), {
            [prefixClassname("dialog__message--left")]: align === ContentAlign.Left,
            [prefixClassname("dialog__message--right")]: align === ContentAlign.Right,
          })}
          children={children}
        />
      </View>
    )
  }

  export enum ActionsTheme {
    Round = "round",
  }

  type ActionsThemeString = "round"

  interface ActionsProps {
    theme?: ActionsTheme | ActionsThemeString
    children?: ReactNode
  }

  function renderActionButtons(props: ActionsProps) {
    const { children, theme } = props
    if (children === undefined) {
      return children
    }

    const __round__ = theme === ActionsTheme.Round
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

  export function Actions(props: ActionsProps) {
    const { theme } = props
    const children = renderActionButtons(props)
    return (
      <View
        className={classNames(prefixClassname("dialog__footer"), {
          [HAIRLINE_BORDER_TOP]: theme !== ActionsTheme.Round,
          [prefixClassname("dialog__footer--round")]: theme === ActionsTheme.Round,
        })}
      >
        {children}
      </View>
    )
  }
}
export default Dialog
