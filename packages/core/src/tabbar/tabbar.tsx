import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { cloneElement, ReactElement, ReactNode, useRef } from "react"
import { usePlaceholder } from "../hooks"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_TOP_BOTTOM } from "../styles/hairline"
import TabbarItem from "./tabbar-item"
import TabbarContext from "./tabbar.context"

// TODO fragment, array children do not process
function arrayChildren(children?: ReactNode) {
  return React.Children.map(children, (node: ReactNode, index) => {
    if (!React.isValidElement(node)) {
      return node
    }
    const element = node as ReactElement
    if (element.type !== TabbarItem) {
      return element
    }
    const { props } = element
    return cloneElement(element, {
      ...props,
      __dataKey__: element.key ?? index,
    })
  })
}

export interface TabbarProps extends ViewProps {
  className?: string
  value?: any
  fixed?: boolean
  bordered?: boolean
  placeholder?: boolean
  children?: ReactNode

  onChange?(value: any): void
}

function Tabbar(props: TabbarProps) {
  const {
    className,
    value,
    bordered,
    fixed,
    placeholder,
    children: childrenProp,
    onChange,
    ...restProps
  } = props
  const children = arrayChildren(childrenProp)

  const rootRef = useRef()

  const PlaceHolder = usePlaceholder(rootRef, {
    className: prefixClassname("tabbar__placeholder"),
  })

  function onItemClick(dataKey?: any) {
    if (dataKey !== value) {
      onChange?.(dataKey)
    }
  }

  function TabbarRender() {
    return (
      <TabbarContext.Provider
        value={{
          value,
          onItemClick,
        }}
      >
        <View
          ref={rootRef}
          className={classNames(
            prefixClassname("tabbar"),
            {
              [HAIRLINE_BORDER_TOP_BOTTOM]: bordered,
              [prefixClassname("tabbar--fixed")]: fixed,
            },
            className,
          )}
          children={children}
          {...restProps}
        />
      </TabbarContext.Provider>
    )
  }

  if (fixed && placeholder) {
    return (
      <PlaceHolder>
        <TabbarRender />
      </PlaceHolder>
    )
  }
  return <TabbarRender />
}

export default Tabbar
