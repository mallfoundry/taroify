import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import Swiper from "../swiper"
import TabPaneBase from "./tab-pane-base"
import TabsContext from "./tabs.context"
import { TabObject } from "./tabs.shared"

function useTabPanes(tabObjects?: TabObject[]): ReactNode {
  return useMemo(
    () =>
      _.map(tabObjects, ({ key, value, className, children }) => (
        <TabPaneBase key={key} value={value} className={className} children={children} />
      )),
    [tabObjects],
  )
}

interface TabsContentProps {
  children?: ReactNode
}

export function TabsContent(props: TabsContentProps) {
  const { value: activeValue, duration, animated, swipeable, tabObjects, onTabClick } = useContext(
    TabsContext,
  )

  const panes = useTabPanes(tabObjects)

  function onSwiperChange({ index }: Swiper.ItemEvent) {
    const tabObject = _.get(tabObjects, index)
    if (tabObject) {
      const { value, title, disabled } = tabObject
      if (!disabled) {
        onTabClick?.({ value, title, disabled })
      }
    }
  }

  const renderChildren = () => {
    if (animated || swipeable) {
      return (
        <Swiper
          activeIndex={activeValue as number}
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
