import { ScrollView, View } from "@tarojs/components"
import { nextTick, offWindowResize, onWindowResize } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_TOP_BOTTOM } from "../styles/hairline"
import { getRect, getRects } from "../utils/dom/rect"
import Tab from "./tab"
import type { TabEvent, TabObject, TabsTheme } from "./tabs.shared"

export interface NavOffset {
  left?: number
  width?: number
}

export interface TabOffset {
  left?: number
  width?: number
}

interface TabsHeaderProps {
  value: any
  theme?: TabsTheme
  bordered?: boolean
  ellipsis?: boolean
  shrink?: boolean
  tabObjects: TabObject[]
  swipeThreshold: number

  onTabClick?(event: TabEvent): void
}

export default function TabsHeader(props: TabsHeaderProps) {
  const {
    value: activeValue,
    theme,
    ellipsis,
    bordered,
    shrink,
    tabObjects,
    swipeThreshold,
    onTabClick,
  } = props
  const themeLine = theme === "line"
  const themeCard = theme === "card"

  const navRef = useRef()

  const [navOffset, setNavOffset] = useState<NavOffset>({})
  const [tabOffsets, setTabOffsets] = useState<TabOffset[]>([])

  const activeIndex = useMemo(
    () => _.findIndex(tabObjects, (tab) => tab.value === activeValue),
    [tabObjects, activeValue],
  )

  const activeOffset = useMemo(() => {
    if (_.isEmpty(tabOffsets) || activeIndex === -1 || activeIndex >= _.size(tabOffsets)) {
      return {}
    }
    const { width } = tabOffsets[activeIndex]
    const left = tabOffsets
      .slice(0, activeIndex)
      .reduce((prev: number, curr: TabOffset) => prev + (curr.width ?? 0), 0)
    return {
      left,
      width,
    }
  }, [tabOffsets, activeIndex])

  const scrollLeft = useMemo(() => {
    if (navOffset) {
      const { width: navOffsetWidth = 0 } = navOffset
      const { left: offsetLeft = 0, width: offsetWidth = 0 } = activeOffset
      return offsetLeft - (navOffsetWidth - offsetWidth) / 2
    }
    return 0
  }, [navOffset, activeOffset])

  const resize = useCallback(() => {
    Promise.all([getRect(navRef), getRects(navRef, ` .${prefixClassname("tabs__tab")}`)]).then(
      ([navRect, tabRects]) => {
        setNavOffset(navRect)
        setTabOffsets(tabRects)
      },
    )
  }, [])

  const flexBasis = useMemo(() => {
    if (shrink) return ""
    return ellipsis && themeLine ? `${88 / swipeThreshold}%` : ""
  }, [ellipsis, themeLine, swipeThreshold, shrink])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => nextTick(resize), [resize, tabObjects])

  // resize
  useEffect(() => {
    onWindowResize?.(resize)
    return () => offWindowResize?.(resize)
  }, [resize])

  return (
    <View
      className={classNames(
        prefixClassname("tabs__wrap"),
        prefixClassname("tabs__wrap--scrollable"),
        {
          [HAIRLINE_BORDER_TOP_BOTTOM]: bordered && themeLine,
        },
      )}
    >
      <ScrollView
        enhanced
        showScrollbar={false}
        scrollX={tabObjects.length > swipeThreshold || !ellipsis}
        scrollWithAnimation
        scrollLeft={scrollLeft}
        className={classNames(prefixClassname("tabs__wrap__scroll"), {
          [prefixClassname("tabs__wrap__scroll--line")]: themeLine,
          [prefixClassname("tabs__wrap__scroll--card")]: themeCard,
          [prefixClassname("tabs__wrap__scroll--shrink")]: shrink && themeCard,
        })}
      >
        <View
          ref={navRef}
          className={classNames(prefixClassname("tabs__nav"), {
            [prefixClassname("tabs__nav--line")]: themeLine,
            [prefixClassname("tabs__nav--card")]: themeCard,
          })}
        >
          {
            //
            _.map(tabObjects, (tabObject) => (
              <Tab
                key={tabObject.key}
                flexBasis={flexBasis}
                // TODO swipeThreshold does not support
                // flexBasis={themeLine && ellipsis ? `${88 / 4}%` : ""}
                className={classNames(tabObject?.classNames?.title, {
                  [prefixClassname("tabs__tab--shrink")]: shrink,
                })}
                dot={tabObject.dot}
                badge={tabObject.badge}
                active={activeValue === tabObject.value}
                disabled={tabObject.disabled}
                underline={themeLine}
                ellipsis={themeLine && ellipsis}
                children={tabObject.title}
                onClick={() =>
                  onTabClick?.({
                    value: tabObject.value,
                    title: tabObject.title,
                    disabled: tabObject.disabled,
                  })
                }
              />
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}
