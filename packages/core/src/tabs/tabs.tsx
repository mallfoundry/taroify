import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { PageScrollObject } from "@tarojs/taro"
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

interface TabsSticky {
  offsetTop?: string | number
}

function useTabsSticky(sticky?: boolean | TabsSticky): TabsSticky | undefined {
  if (sticky === false) {
    return undefined
  }
  if (_.isBoolean(sticky) && sticky) {
    return {
      offsetTop: 0,
    }
  }
  return sticky
}

export interface TabsProps extends ViewProps {
  className?: string
  defaultValue?: any
  value?: any
  theme?: TabsTheme
  duration?: number
  lazyRender?: boolean
  animated?: boolean
  swipeable?: boolean
  sticky?: boolean | TabsSticky
  bordered?: boolean
  ellipsis?: boolean
  children?: ReactNode

  onChange?(value: any, event: TabEvent): void

  onTabClick?(event: TabEvent): void

  onScroll?(scroll: PageScrollObject): void
}

function Tabs(props: TabsProps) {
  const {
    className,
    defaultValue,
    value: valueProp,
    duration = 300,
    lazyRender = true,
    animated = false,
    swipeable = false,
    sticky = false,
    theme = "line",
    ellipsis = true,
    bordered,
    children: childrenProp,
    onTabClick,
    onChange,
    onScroll,
    ...restProps
  } = props

  const { value = 0, getValue, setValue } = useUncontrolled({
    defaultValue,
    value: valueProp,
  })

  const rootRef = useRef()

  const stickyProps = useTabsSticky(sticky)

  const tabObjects = useTabObjects(childrenProp)

  const index = useMemo<number | undefined>(() => {
    for (const tab of tabObjects) {
      if (tab.value === value) {
        return tab.index
      }
    }
  }, [tabObjects, value])

  const onTabChange = useCallback(
    (event: TabEvent) => {
      if (!event.disabled) {
        if (getValue() !== event.value) {
          onChange?.(event.value, event)
          setValue(event.value)
        }
      }
    },
    [getValue, onChange, setValue],
  )

  const handleTabClick = useCallback(
    (event: TabEvent) => {
      onTabClick?.(event)
      onTabChange(event)
    },
    [onTabChange, onTabClick],
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
        index,
        value,
        duration,
        lazyRender,
        animated,
        swipeable,
        theme,
        ellipsis,
        bordered,
        tabObjects,
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
        {...restProps}
      >
        {stickyProps ? (
          <Sticky
            container={rootRef}
            offsetTop={stickyProps.offsetTop}
            children={headerRender}
            onScroll={onScroll}
          />
        ) : (
          headerRender
        )}
        <TabsContent
          value={value}
          lazyRender={lazyRender}
          duration={duration}
          animated={animated}
          swipeable={swipeable}
          tabObjects={tabObjects}
          onTabChange={onTabChange}
        />
      </View>
    </TabsContext.Provider>
  )
}

export default Tabs
