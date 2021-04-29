import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { tabIndexClassname, TabKey } from "./shared"

export interface TabEvent {
  key?: TabKey
  index?: number
  title?: ReactNode
  active?: boolean
  disabled?: boolean
}

interface TabProps {
  __dataKey__?: TabKey
  __dataIndex__?: number
  active?: boolean
  disabled?: boolean
  ellipsis?: boolean
  activeColor?: string
  inactiveColor?: string
  flexBasis?: string
  children?: ReactNode
  onClick?: (event: TabEvent) => void
}

export default function Tab(props: TabProps) {
  const {
    __dataIndex__,
    __dataKey__,
    active,
    disabled,
    ellipsis,
    flexBasis,
    children,
    onClick,
  } = props

  return (
    <View
      style={{ flexBasis }}
      className={classNames(
        prefixClassname("tabs__tab"), //
        tabIndexClassname(__dataIndex__),
        {
          [prefixClassname("tabs__tab--active")]: active,
          [prefixClassname("tabs__tab--disabled")]: disabled,
        },
      )}
      onClick={() =>
        onClick?.({
          key: __dataKey__,
          index: __dataIndex__,
          title: children,
          active,
          disabled,
        })
      }
    >
      <View
        className={classNames(prefixClassname("tabs__tab__content"), {
          [prefixClassname("ellipsis")]: ellipsis,
        })}
        children={children}
      />
    </View>
  )
}
