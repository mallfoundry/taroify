import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react"
import Sticky from "../sticky"
import { prefixClassname } from "../styles"
import TabPane from "./tab-pane"
import { TabsContent } from "./tabs-content"
import TabsHeader from "./tabs-header"
import TabsContext from "./tabs.context"
import { TabEvent, TabObject, TabsTheme } from "./tabs.shared"

function useTabObjects(children: ReactNode) {
  return useMemo(() => {
    const tabObjects: TabObject[] = []

    Children.forEach(children, (node: ReactNode) => {
      if (!isValidElement(node)) {
        return node
      }
      const element = node as ReactElement
      if (element.type !== TabPane) {
        return element
      }
      const { key, props } = element
      const index = _.size(tabObjects)
      const { value, ...restProps } = props
      tabObjects.push({
        key: key ?? index,
        index,
        value: value ?? index,
        ...restProps,
      })
    })

    return tabObjects
  }, [children])
}

export interface TabsProps {
  className?: string
  value?: any
  duration?: number
  lazyRender?: boolean
  animated?: boolean
  swipeable?: boolean
  sticky?: boolean
  theme?: TabsTheme
  bordered?: boolean
  ellipsis?: boolean
  children?: ReactNode

  onChange?(value: any, event: TabEvent): void

  onTabClick?(event: TabEvent): void
}

function Tabs(props: TabsProps) {
  const {
    className,
    value = -1,
    duration = 300,
    lazyRender = true,
    animated = false,
    swipeable = false,
    sticky = false,
    theme = "line",
    ellipsis = true,
    bordered,
    onTabClick,
    onChange,
  } = props
  const rootRef = useRef()
  const tabObjects = useTabObjects(props.children)

  const handleTabClick = useCallback(
    (event: TabEvent) => {
      if (!event.disabled) {
        onChange?.(event.value, event)
      }
      onTabClick?.(event)
    },
    [onChange, onTabClick],
  )

  const headerRender = useMemo(
    () => (
      <TabsHeader
        value={value}
        theme={theme}
        bordered={bordered}
        ellipsis={ellipsis}
        tabObjects={tabObjects}
        onTabClick={handleTabClick}
      />
    ),
    [bordered, ellipsis, handleTabClick, tabObjects, theme, value],
  )

  return (
    <TabsContext.Provider
      value={{
        value,
        duration,
        lazyRender,
        animated,
        swipeable,
        theme,
        ellipsis,
        bordered,
        tabObjects,
        onTabClick: handleTabClick,
      }}
    >
      <View
        ref={rootRef}
        className={classNames(
          prefixClassname("tabs"),
          {
            [prefixClassname("tabs--line")]: theme === "line",
            [prefixClassname("tabs--card")]: theme === "card",
          },
          className,
        )}
      >
        {sticky ? <Sticky container={rootRef} children={headerRender} /> : headerRender}
        <TabsContent
          value={value}
          lazyRender={lazyRender}
          duration={duration}
          animated={animated}
          swipeable={swipeable}
          tabObjects={tabObjects}
          onTabClick={handleTabClick}
        />
      </View>
    </TabsContext.Provider>
  )
}

export default Tabs
