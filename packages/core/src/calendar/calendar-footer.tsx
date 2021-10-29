import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { Children, isValidElement, ReactElement, ReactNode, useContext, useEffect } from "react"
import { prefixClassname } from "../styles"
import CalendarButton, { CalendarButtonProps } from "./calendar-button"
import CalendarContext from "./calendar.context"

interface CalendarFooterProps extends ViewProps {
  children?: ReactNode
}

function CalendarFooter(props: CalendarFooterProps) {
  const { className, children, ...restProps } = props
  const { notifyConfirm } = useContext(CalendarContext)

  useEffect(() => {
    let hasConfirm = false
    Children.forEach(children, (child: ReactNode) => {
      if (hasConfirm) {
        return
      }
      if (isValidElement(child)) {
        const element = child as ReactElement
        const { type: elementType, props } = element
        if (elementType === CalendarButton) {
          const button = props as CalendarButtonProps
          if (button.type === "confirm") {
            hasConfirm = true
          }
        }
      }
    })
    notifyConfirm?.(hasConfirm)
  }, [children, notifyConfirm])

  return (
    <View
      className={classNames(prefixClassname("calendar__footer"), className)}
      children={children}
      {...restProps}
    />
  )
}

export default CalendarFooter
