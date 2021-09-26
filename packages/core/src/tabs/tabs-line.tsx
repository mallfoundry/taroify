import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext } from "react"
import { prefixClassname } from "../styles"
import TabsContext from "./tabs.context"

interface TabsLineProps {
  active?: boolean
}

export default function TabsLine(props: TabsLineProps) {
  const { active } = props
  const { duration } = useContext(TabsContext)

  return (
    <View
      className={classNames(prefixClassname("tabs__line"), {
        [prefixClassname("tabs__line--active")]: active,
      })}
      style={{ transitionDuration: `${duration}ms` }}
    />
  )
}
