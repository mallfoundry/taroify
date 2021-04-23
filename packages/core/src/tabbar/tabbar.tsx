import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { cloneElement, ReactElement, ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import TabbarContext from "./tabbar.context"

// const __ACTIVE_COLOR__ = "#1989fa"
// const __INACTIVE_COLOR__ = "#646566"

// TODO fragment, array children do not process
function arrayChildren(children?: ReactNode) {
  return React.Children.map(children, (node, index) => {
    if (!React.isValidElement(node)) {
      return node
    }
    const element = node as ReactElement
    if (element.type !== Tabbar.TabItem) {
      return element
    }
    const { props } = element
    return cloneElement(element, {
      ...props,
      __dataKey__: element.key ?? index,
    })
  })
}

interface TabbarProps {
  fixed?: boolean
  bordered?: boolean
  activeKey?: Tabbar.Key
  activeColor?: string
  inactiveColor?: string
  children?: ReactNode
  onChange?: (activeKey?: string | number) => void
}

function Tabbar(props: TabbarProps) {
  const { activeKey, activeColor, inactiveColor, onChange } = props
  const children = arrayChildren(props.children)

  function emitClick(__activeKey__?: string | number) {
    if (__activeKey__ !== activeKey) {
      onChange?.(__activeKey__)
    }
  }

  return (
    <View className={classNames(prefixClassname("tabbar"))}>
      <TabbarContext.Provider
        value={{
          activeKey,
          activeColor,
          inactiveColor,
          emitClick,
        }}
      >
        {children}
      </TabbarContext.Provider>
    </View>
  )
}

namespace Tabbar {
  export type Key = string | number | undefined

  interface TabItemProps {
    __dataKey__?: Key
    icon?: ReactNode
    label?: ReactNode
  }

  export function TabItem(props: TabItemProps) {
    const { icon, label, __dataKey__ } = props
    const { activeKey, activeColor, inactiveColor, emitClick } = useContext(TabbarContext)
    const active = activeKey === __dataKey__
    // Default activeColor, inactiveColor is undefined
    // TODO Taro does not set undefined, use an empty string instead of undefined
    const color = activeColor && active ? activeColor ?? "" : inactiveColor ?? ""

    return (
      <View
        className={classNames(prefixClassname("tabbar-item"), {
          [prefixClassname("tabbar-item--active")]: active,
        })}
        style={{ color }}
        onClick={() => emitClick?.(__dataKey__)}
      >
        <View className={prefixClassname("tabbar-item__icon")} children={icon} />
        <View className={prefixClassname("tabbar-item__label")} children={label} />
      </View>
    )
  }
}

export default Tabbar
