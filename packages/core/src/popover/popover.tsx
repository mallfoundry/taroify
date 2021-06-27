import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, CSSProperties, isValidElement, ReactElement, ReactNode } from "react"
import Popup, { PopupPlacement } from "../popup"
import { prefixClassname } from "../styles"
import PopoverTrigger from "./popover-trigger"
import PopoverContext from "./popover.context"

enum PopoverPlacement {
  Top = "top",
  TopStart = "top-start",
  TopEnd = "top-end",
  Left = "left",
  LeftStart = "left-start",
  LeftEnd = "left-end",
  Right = "right",
  RightStart = "right-start",
  RightEnd = "right-end",
  Bottom = "bottom",
  BottomStart = "bottom-start",
  BottomEnd = "bottom-end",
}

interface PopoverChildren {
  trigger?: ReactNode
  content?: ReactNode[]
}

function usePopoverChildren(children?: ReactNode): PopoverChildren {
  const __children__: PopoverChildren = {
    trigger: undefined,
    content: [],
  }

  Children.forEach(children, (child: ReactNode) => {
    if (!isValidElement(child)) {
      __children__.content?.push(child)
      return
    }

    const element = child as ReactElement
    const elementType = element.type
    if (elementType === PopoverTrigger) {
      __children__.trigger = child
    } else {
      __children__.content?.push(child)
    }
  })

  return __children__
}

export interface PopoverProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  placement?: PopoverPlacement
  duration?: number
  children?: ReactNode
  onClose?: (opened: boolean) => void
}

function Popover(props: PopoverProps) {
  const { className, style, open, duration = 3000 } = props

  const { trigger, content } = usePopoverChildren(props.children)

  return (
    <PopoverContext.Provider value={{}}>
      {trigger}
      <Popup
        className={classNames(prefixClassname("popover"), prefixClassname("popover"), className)}
        style={style}
        placement={PopupPlacement.Top}
        duration={duration}
        open={open}
      >
        <Popup.Backdrop open={false} />
        <View className={prefixClassname("popover__content")} children={content} />
      </Popup>
    </PopoverContext.Provider>
  )
}

export default Popover
