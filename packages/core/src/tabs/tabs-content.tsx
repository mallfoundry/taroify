import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, cloneElement, ReactElement, ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import Swiper from "../swiper"
import TabPane from "./tab-pane"
import TabsContext from "./tabs.context"
import { TabKey } from "./tabs.shared"

interface TabsChildren {
  panes: ReactNode[]
}

function useTabsChildren(children?: ReactNode) {
  const __children__: TabsChildren = {
    panes: [],
  }

  let index = 0
  Children.forEach(children, (node: ReactNode, i: number) => {
    if (!React.isValidElement(node)) {
      return node
    }
    const element = node as ReactElement
    if (element.type !== TabPane) {
      return element
    }
    const __dataKey__ = element.key ?? i
    __children__.panes.push(
      cloneElement(element, {
        key: __dataKey__,
        __dataKey__: __dataKey__,
        __dataIndex__: index++,
      }),
    )
  })

  return __children__
}

interface TabsContentProps {
  activeKey?: TabKey
  children?: ReactNode
}

export function TabsContent(props: TabsContentProps) {
  const { activeKey, duration, animated, swipeable, tabObjects, onTabClick } = useContext(
    TabsContext,
  )
  const { panes } = useTabsChildren(props.children)

  function onSwiperChange({ index }: Swiper.ItemEvent) {
    const tabObject = tabObjects.find((tab) => tab.index === index)
    if (tabObject) {
      onTabClick?.(tabObject)
    }
  }

  const renderChildren = () => {
    if (animated || swipeable) {
      return (
        <Swiper
          activeIndex={activeKey as number}
          loop={false}
          className={prefixClassname("tabs__track")}
          duration={duration}
          touchable={swipeable}
          children={panes}
          onChange={onSwiperChange}
        />
      )
    }

    return panes
  }

  return (
    <View
      className={classNames(prefixClassname("tabs__content"), {
        [prefixClassname("tabs__content--animated")]: animated,
      })}
      children={renderChildren()}
    />
  )
}
