import classNames from "classnames"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import Popup from "../popup"
import { prefixClassname } from "../styles"
import DialogActions from "./dialog-actions"
import DialogContent from "./dialog-content"
import DialogHeader from "./dialog-header"

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
    if (element.type === DialogHeader) {
      children.header = element
    } else if (element.type === DialogContent) {
      children.content = element
    } else if (element.type === DialogActions) {
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

export interface DialogProps {
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

export default Dialog
