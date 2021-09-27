import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import Swiper from "../swiper"
import TabPaneBase from "./tab-pane-base"
import TabsContext from "./tabs.context"
import { TabKey, TabObject } from "./tabs.shared"

function useTabPanes(tabObjects?: TabObject[]): ReactNode {
  return useMemo(
    () =>
      _.map(tabObjects, (tab) => (
        <TabPaneBase
          key={tab.key}
          __dataKey__={tab.key}
          __dataIndex__={tab.index}
          className={tab.className}
          children={tab.children}
        />
      )),
    [tabObjects],
  )
}

interface TabsContentProps {
  activeKey?: TabKey
  children?: ReactNode
}

export function TabsContent(props: TabsContentProps) {
  const { activeKey, duration, animated, swipeable, tabObjects, onTabClick } = useContext(
    TabsContext,
  )

  const panes = useTabPanes(tabObjects)

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
