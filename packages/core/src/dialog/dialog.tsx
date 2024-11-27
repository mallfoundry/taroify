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
  useEffect,
  useMemo,
  useState
} from "react"
import Backdrop from "../backdrop"
import { ButtonProps, createButton } from "../button"
import ButtonContext from "../button/button.context"
import Popup, { PopupBackdropProps, usePopupBackdrop } from "../popup"
import { prefixClassname } from "../styles"
import {
  getElementSelector,
  matchSelector,
  prependPageSelector,
  usePrependPageSelector,
} from "../utils/dom/element"
import { useObject, useToRef } from "../utils/state"
import { isElementOf } from "../utils/validate"
import { useMemoizedFn } from "../hooks"
import DialogActions from "./dialog-actions"
import DialogContent from "./dialog-content"
import DialogHeader from "./dialog-header"
import { dialogEvents, dialogSelectorSet, DialogOptions, DialogMessageAlign, DialogActionsVariant } from "./dialog.shared"

export function useDialogOpen(cb: (options: DialogOptions) => void) {
  useEffect(() => {
    dialogEvents.on("open", cb)
    return () => {
      dialogEvents.off("open", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useDialogCancel(cb: (selector: string) => void) {
  useEffect(() => {
    dialogEvents.on("cancel", cb)
    return () => {
      dialogEvents.off("cancel", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

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
  backdrop?: boolean | Omit<PopupBackdropProps, "open">
  title?: ReactNode
  message?: ReactNode
  messageAlign?: DialogMessageAlign
  theme?: DialogActionsVariant
  confirm?: ReactNode | ButtonProps
  cancel?: ReactNode | ButtonProps
  onConfirm?(): void
  onCancel?(): void
  onBeforeClose?(action: "confirm" | "cancel"): boolean | Promise<boolean>
  onClose?(opened: boolean): void
}

function renderHeader(title, key?) {
  return <DialogHeader key={key} children={title} />
}

function renderContent(message, messageAlign, key?) {
  return <DialogContent key={key} align={messageAlign} children={message} />
}

function renderActions(confirm, cancel, variant, confirmLoading, cancelLoading, key?) {
  if (cancel === undefined && confirm === undefined) {
    return null
  }
  const actions: ReactNode[] = []
  if (cancel) {
    actions.push(createButton(cancel, { key: 1, loading: cancelLoading }))
  }
  if (confirm) {
    actions.push(createButton(confirm, { key: 0, loading: confirmLoading }))
  }
  return <DialogActions key={key} children={actions} variant={variant} />
}
const transactionTimeout = {
  enter: 100,
  exit: 300,
  appear: 100,
}

function Dialog(props: DialogProps) {
  const {
    object: {
      id,
      className,
      defaultOpen,
      open: openProp,
      children,
      backdrop: backdropOptions = { closeable: false },
      title: titleProp,
      message: messageProp,
      messageAlign: messageAlignProp,
      theme: themeProp,
      confirm: confirmProp,
      cancel: cancelProp,
      onBeforeClose: onBeforeCloseProp,
      onClose,
      onConfirm: onConfirmProp,
      onCancel: onCancelProp,
      ...restProps
    },
    setObject,
  } = useObject<DialogProps & DialogOptions>(props)

  const rootSelectorRef = useToRef(usePrependPageSelector(getElementSelector(id)))

  const { value: open = false, setValue: setOpen } = useUncontrolled({
    defaultValue: defaultOpen,
    value: openProp,
  })

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [cancelLoading, setCancelLoading]  = useState(false)
  const { onClick } = useContext(ButtonContext)
  const { backdrop: backdropElement, header: headerChildren, content: contentChildren, actions: actionsChildren } = useDialogChildren(children)
  const backdrop = usePopupBackdrop(backdropElement, backdropOptions)
  const header = useMemo(() => headerChildren ?? renderHeader(titleProp), [headerChildren, titleProp])
  const content = useMemo(() => contentChildren ?? renderContent(messageProp, messageAlignProp), [contentChildren, messageProp, messageAlignProp])
  const actions = useMemo(() => actionsChildren ?? renderActions(confirmProp, cancelProp, themeProp, confirmLoading, cancelLoading), [actionsChildren, confirmProp, cancelProp, themeProp, confirmLoading, cancelLoading])
  const onConfirm = useMemoizedFn(async () => {
    try {
      setConfirmLoading(true)
      let boolean = true
      if (onBeforeCloseProp) {
        boolean = await onBeforeCloseProp("confirm")
      }
      setConfirmLoading(false)
      if (boolean) {
        onConfirmProp?.()
        setOpen(false)
      }
    } catch(err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })
  const onCancel = useMemoizedFn(async () => {
    try {
      setCancelLoading(true)
      let boolean = true
      if (onBeforeCloseProp) {
        boolean = await onBeforeCloseProp("cancel")
      }
      setCancelLoading(false)
      if (boolean) {
        onCancelProp?.()
        setOpen(false)
      }
    } catch(err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })

  const hasHeader = header !== undefined
  const hasContent = content !== undefined

  const handleClick = (event: ITouchEvent, btnProps: ButtonProps) => {
    onClick?.(event, btnProps)
    const { className } = btnProps
    if (className?.includes(prefixClassname("dialog__confirm"))) {
      onConfirm()
    } else if (className?.includes(prefixClassname("dialog__cancel"))) {
      onCancel()
    } else {
      setOpen(false)
    }
  }

  const handleClose = useCallback(
    (opened: boolean) => {
      onClose?.(opened)
      setOpen(false)
    },
    [onClose, setOpen],
  )

  useEffect(() => {
    rootSelectorRef.current && dialogSelectorSet.add(rootSelectorRef.current)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      rootSelectorRef.current && dialogSelectorSet.delete(rootSelectorRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useDialogOpen(
    ({
      selector,
      title,
      message,
      messageAlign,
      confirm,
      cancel,
      theme,
      ...restOptions
    }: DialogOptions) => {
      if (matchSelector(prependPageSelector(selector), rootSelectorRef.current)) {
        const children: ReactNode[] = []
        if (title) {
          children.push(renderHeader(title, 0))
        }
        if (message) {
          children.push(renderContent(message, messageAlign, 1))
        }
        children.push(renderActions(confirm, cancel, theme, false, false, 2))
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
      onCancel()
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
        transactionTimeout={transactionTimeout}
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
