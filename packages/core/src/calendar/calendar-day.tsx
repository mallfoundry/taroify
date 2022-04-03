import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useCallback, useContext } from "react"
import { prefixClassname } from "../styles"
import CalendarContext from "./calendar.context"
import { CalendarDayType } from "./calendar.shared"

export interface CalendarDayProps extends ViewProps {
  type: CalendarDayType
  value: Date
  top?: ReactNode
  bottom?: ReactNode
  children?: ReactNode
}

function CalendarDay(props: CalendarDayProps) {
  const { className, style, type, value, top, bottom, children, ...restProps } = props
  const { type: ctxType, onDayClick } = useContext(CalendarContext)
  const single = ctxType === "single"
  const disabled = type === "disabled"

  const onClick = useCallback(() => {
    if (!disabled) {
      onDayClick?.({
        type,
        value,
        children,
      })
    }
  }, [children, disabled, onDayClick, type, value])

  const renderContent = () => {
    if (single && type === "active") {
      return (
        <>
          {top && <View className={prefixClassname("calendar__day__top")} children={top} />}
          <View className={prefixClassname("calendar__active-day")} children={children} />
          {bottom && (
            <View className={prefixClassname("calendar__day__bottom")} children={bottom} />
          )}
        </>
      )
    }
    return (
      <>
        {top && <View className={prefixClassname("calendar__day__top")} children={top} />}
        {children}
        {bottom && <View className={prefixClassname("calendar__day__bottom")} children={bottom} />}
      </>
    )
  }

  return (
    <View
      className={classNames(
        prefixClassname("calendar__day"),
        {
          [prefixClassname(`calendar__day--${type}`)]: type,
        },
        className,
      )}
      style={style}
      onClick={onClick}
      {...restProps}
    >
      {renderContent()}
    </View>
  )
}

export default CalendarDay
