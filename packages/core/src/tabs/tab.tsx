import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import TabsLine from "./tabs-line"
import TabsContext from "./tabs.context"

interface TabProps {
  className?: string
  value?: any
  dot?: boolean
  badge?: ReactNode
  disabled?: boolean
  ellipsis?: boolean
  flexBasis?: string
  children?: ReactNode
}

export default function Tab(props: TabProps) {
  const { className, value, disabled, ellipsis, flexBasis, children: title } = props
  const { value: activeValue, theme, onTabClick } = useContext(TabsContext)
  const active = activeValue === value
  const themeLine = theme === "line"

  return (
    <View
      style={{ flexBasis }}
      className={classNames(
        prefixClassname("tabs__tab"),
        {
          [prefixClassname("tabs__tab--active")]: active,
          [prefixClassname("tabs__tab--disabled")]: disabled,
        },
        className,
      )}
      onClick={() =>
        onTabClick?.({
          value,
          title,
          disabled,
        })
      }
    >
      <View
        className={classNames(prefixClassname("tabs__tab__content"), {
          [prefixClassname("ellipsis")]: ellipsis,
        })}
        children={title}
      />
      {themeLine && <TabsLine active={active} />}
    </View>
  )
}
