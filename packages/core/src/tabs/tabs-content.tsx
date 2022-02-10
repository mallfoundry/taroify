import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"
import Swiper from "../swiper"
import { useRendered } from "../utils/state"
import TabPaneBase from "./tab-pane-base"
import { TabEvent, TabObject } from "./tabs.shared"

function useTabPanes(tabObjects?: TabObject[]): ReactNode {
  return useMemo(() => _.map(tabObjects, (props) => <TabPaneBase {...props} />), [tabObjects])
}

interface TabsContentProps {
  value: any
  lazyRender: boolean
  duration?: number
  animated: boolean
  swipeable: boolean
  tabObjects: TabObject[]

  onTabChange?(event: TabEvent): void
}

export function TabsContent(props: TabsContentProps) {
  const { value: activeValue, duration, animated, swipeable, tabObjects, onTabChange } = props

  const panes = useTabPanes(tabObjects)

  function onSwiperChange(index: number) {
    const tabObject = _.get(tabObjects, index)
    if (tabObject) {
      const { value, title, disabled } = tabObject
      if (!disabled) {
        onTabChange?.({ value, title, disabled })
      }
    }
  }

  const childrenRender = useRendered(() => {
    if (animated || swipeable) {
      return (
        <Swiper
          value={activeValue as number}
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
  })

  return (
    <View
      className={classNames(prefixClassname("tabs__content"), {
        [prefixClassname("tabs__content--animated")]: animated,
      })}
      children={childrenRender}
    />
  )
}
