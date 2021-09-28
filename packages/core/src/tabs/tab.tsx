import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import TabsLine from "./tabs-line"

interface TabProps {
  className?: string
  active?: boolean
  disabled?: boolean
  underline?: boolean
  dot?: boolean
  badge?: ReactNode
  ellipsis?: boolean
  flexBasis?: string
  children?: ReactNode

  onClick?(event: ITouchEvent): void
}

export default function Tab(props: TabProps) {
  const { className, active, disabled, underline, ellipsis, flexBasis, children, onClick } = props

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
      onClick={onClick}
    >
      <View
        className={classNames(prefixClassname("tabs__tab__content"), {
          [prefixClassname("ellipsis")]: ellipsis,
        })}
        children={children}
      />
      {underline && <TabsLine active={active} />}
    </View>
  )
}
