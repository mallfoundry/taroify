import { ScrollView, View } from "@tarojs/components"
import { nextTick, offWindowResize, onWindowResize, useReady } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_TOP_BOTTOM } from "../styles/hairline"
import { getBoundingClientRect } from "../utils/rect"
import { selectAllRect } from "../utils/selector"
import { TabKey, TabsTheme, TabsThemeString } from "./shared"
import Tab, { TabEvent } from "./tab"
import Tabs from "./tabs"
import TabsLine from "./tabs-line"

interface TabObject {
  __dataKey__?: TabKey
  __dataIndex__?: number
  disabled?: boolean
  children?: ReactNode
}

function obtainTabs(children?: ReactNode): TabObject[] | undefined | null {
  return Children.map(children, (node: ReactNode, __dataIndex__: number) => {
    if (!React.isValidElement(node)) {
      return node
    }
    const element = node as ReactElement
    if (element.type !== Tabs.TabPane) {
      return element
    }
    const { props } = element
    const { title, disabled } = props
    const __dataKey__ = element.key ?? __dataIndex__
    return {
      __dataKey__,
      __dataIndex__,
      disabled,
      children: title,
    }
  })
}

export interface NavOffset {
  left?: number
  width?: number
}

export interface TabOffset {
  left?: number
  width?: number
}

interface NavTabsProps {
  activeKey?: TabKey
  theme?: TabsTheme | TabsThemeString
  activeColor?: string
  inactiveColor?: string
  ellipsis?: boolean
  bordered?: boolean
  children?: ReactNode
  onClick?: (event: TabEvent) => void
}

export default function NavTabs(props: NavTabsProps) {
  const { activeKey, theme, activeColor, inactiveColor, ellipsis, bordered, onClick } = props
  const themeLine = theme === TabsTheme.Line
  const themeCard = theme === TabsTheme.Card
  const [nowTime] = useState(Date.now())
  const navRef = useRef()
  const navId = `__tabs-nav-${nowTime}__`
  const tabs = useMemo(() => obtainTabs(props.children), [props.children])
  const [navOffset, setNavOffset] = useState<NavOffset>({})
  const [tabOffsets, setTabOffsets] = useState<TabOffset[]>([])

  //
  const activeIndex = useMemo(() => {
    return _.find(tabs, (tab) => tab.__dataKey__ === activeKey)?.__dataIndex__ ?? -1
  }, [tabs, activeKey])

  const activeOffset = useMemo(() => {
    if (_.isEmpty(tabOffsets) || activeIndex === -1) {
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
    const { width: navOffsetWidth = 0 } = navOffset
    const { left: offsetLeft = 0, width: offsetWidth = 0 } = activeOffset
    return offsetLeft - (navOffsetWidth - offsetWidth) / 2
  }, [navOffset, activeOffset])

  const resize = useCallback(() => {
    nextTick(() => {
      Promise.all([
        selectAllRect(`#${navId} .${prefixClassname("tabs__tab")}`),
        getBoundingClientRect(navRef),
      ]).then(([tabRects, navRect]) => {
        setTabOffsets(tabRects)
        setNavOffset(navRect)
      })
    })
  }, [navId])

  // ready
  useReady(resize)

  // TODO If nav id was changed, will call resize function
  useEffect(resize, [resize, navId])

  // resize
  useEffect(() => {
    const __resize__ = _.debounce(resize, 100)
    onWindowResize(__resize__)
    return () => offWindowResize(__resize__)
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
        scrollX
        scrollWithAnimation
        scrollLeft={scrollLeft}
        className={classNames(prefixClassname("tabs__wrap__scroll"), {
          [prefixClassname("tabs__wrap__scroll--line")]: themeLine,
          [prefixClassname("tabs__wrap__scroll--card")]: themeCard,
        })}
      >
        <View
          id={navId}
          ref={navRef}
          className={classNames(prefixClassname("tabs__nav"), {
            [prefixClassname("tabs__nav--line")]: themeLine,
            [prefixClassname("tabs__nav--card")]: themeCard,
          })}
        >
          {_.map(tabs, (tab) => (
            <Tab
              key={tab.__dataKey__}
              __dataKey__={tab.__dataKey__}
              __dataIndex__={tab.__dataIndex__}
              // TODO swipeThreshold does not support
              flexBasis={themeLine && ellipsis ? `${88 / 4}%` : ""}
              active={tab.__dataKey__ === activeKey}
              disabled={tab.disabled}
              ellipsis={themeLine && ellipsis}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              children={tab.children}
              onClick={onClick}
            />
          ))}
          {themeLine && <TabsLine offset={activeOffset} />}
        </View>
      </ScrollView>
    </View>
  )
}
