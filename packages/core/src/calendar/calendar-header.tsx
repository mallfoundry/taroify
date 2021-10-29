import { View } from "@tarojs/components"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import CalendarWeekdays from "./calendar-weekdays"

interface CalendarHeaderProps {
  title?: ReactNode
  subtitle?: ReactNode
}

function CalendarHeader(props: CalendarHeaderProps) {
  const { title, subtitle } = props
  return (
    <View className={prefixClassname("calendar__header")}>
      {
        //
        title !== false && (
          <View className={prefixClassname("calendar__header-title")}>
            {title === true ? "日期选择" : title}
          </View>
        )
      }
      {
        //
        subtitle && (
          <View className={prefixClassname("calendar__header-subtitle")} children={subtitle} />
        )
      }
      <CalendarWeekdays />
    </View>
  )
}

export default CalendarHeader
