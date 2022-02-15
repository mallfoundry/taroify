import { useUncontrolled } from "@taroify/hooks"
import { ITouchEvent } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react"
import Backdrop from "../backdrop"
import { ButtonProps, createButton } from "../button"
import ButtonContext from "../button/button.context"
import Popup, { usePopupBackdrop } from "../popup"
import { prefixClassname } from "../styles"
import {
  getElementSelector,
  matchSelector,
  prependPageSelector,
  usePrependPageSelector,
} from "../utils/dom/element"
import { useObject, useToRef } from "../utils/state"
import { isElementOf } from "../utils/validate"
import DialogActions from "./dialog-actions"
import DialogContent from "./dialog-content"
import DialogHeader from "./dialog-header"
import { DialogOptions, useDialogCancel, useDialogOpen } from "./dialog.imperative"

interface DialogChildren {
  backdrop?: ReactElement
  header?: ReactElement
  content?: ReactElement
  actions?: ReactElement
}

function useDialogChildren(nodes?: ReactNode): DialogChildren {
  return useMemo(() => {
    const __children__: DialogChildren = {
      header: undefined,
      content: undefined,
      actions: undefined,
    }

    if (nodes === undefined) {
      return __children__
    }

    Children.forEach(nodes, (node: ReactNode) => {
      if (!isValidElement(node)) {
        return
      }

      const { header, content, actions } = __children__
      if (header !== undefined && content !== undefined && actions !== undefined) {
        return
      }

      const element = node as ReactElement
      if (isElementOf(element, Backdrop)) {
        __children__.backdrop = element
      } else if (element.type === DialogHeader) {
        __children__.header = element
      } else if (element.type === DialogContent) {
        __children__.content = element
      } else if (element.type === DialogActions) {
        __children__.actions = element
      }
    })

    return __children__
  }, [nodes])
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

export interface DialogProps extends ViewProps {
  style?: CSSProperties
  defaultOpen?: boolean
  open?: boolean
  children?: ReactNode

  onClose?(opened: boolean): void
}

function Dialog(props: DialogProps) {
  const {
    object: {
      id,
      className,
      defaultOpen,
      open: openProp,
      children,
      backdrop: backdropOptions,
      onClose,
      onConfirm,
      onCancel,
      ...restProps
    },
    setObject,
  } = useObject<DialogProps & DialogOptions>(props)

  const rootSelectorRef = useToRef(usePrependPageSelector(getElementSelector(id)))

  const { value: open = false, setValue: setOpen } = useUncontrolled({
    defaultValue: defaultOpen,
    value: openProp,
  })

  const onCancelRef = useToRef(onCancel)

  const { onClick } = useContext(ButtonContext)
  const { backdrop: backdropElement, header, content, actions } = useDialogChildren(children)
  const backdrop = usePopupBackdrop(backdropElement, backdropOptions)

  const hasHeader = header !== undefined
  const hasContent = content !== undefined

  const handleClick = (event: ITouchEvent, btnProps: ButtonProps) => {
    onClick?.(event, btnProps)
    const { className } = btnProps
    if (className?.includes(prefixClassname("dialog__confirm"))) {
      onConfirm?.()
    }
    if (className?.includes(prefixClassname("dialog__cancel"))) {
      onCancel?.()
    }

    setOpen(false)
  }

  const handleClose = useCallback(
    (opened: boolean) => {
      onClose?.(opened)
      setOpen(false)
    },
    [onClose, setOpen],
  )

  useDialogOpen(
    ({
      selector,
      title,
      message,
      messageAlign,
      confirm,
      cancel,
      ...restOptions
    }: DialogOptions) => {
      if (matchSelector(prependPageSelector(selector), rootSelectorRef.current)) {
        const children: ReactNode[] = []
        const actions: ReactNode[] = []

        if (title) {
          children.push(<DialogHeader key={0} children={title} />)
        }
        if (message) {
          children.push(<DialogContent key={1} align={messageAlign} children={message} />)
        }
        if (cancel) {
          actions.push(createButton(cancel, { key: 1 }))
        }
        if (confirm) {
          actions.push(createButton(confirm, { key: 0 }))
        }
        if (!_.isEmpty(actions)) {
          children.push(<DialogActions key={2} children={actions} />)
        }
        setObject({
          children,
          ...restOptions,
        })
        setOpen(true)
      }
    },
  )

  useDialogCancel((selector) => {
    if (matchSelector(prependPageSelector(selector), rootSelectorRef.current)) {
      onCancelRef.current?.()
      setOpen(false)
    }
  })

  return (
    <ButtonContext.Provider
      value={{
        onClick: handleClick,
      }}
    >
      <Popup
        id={id}
        open={open}
        className={classNames(prefixClassname("dialog"), className)}
        transaction={prefixClassname("dialog-bounce")}
        transactionTimeout={100}
        onClose={handleClose}
        {...restProps}
      >
        {backdrop}
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
    </ButtonContext.Provider>
  )
}

export default Dialog
