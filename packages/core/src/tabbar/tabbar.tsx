import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
} from "react"
import { usePlaceholder } from "../hooks"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_TOP_BOTTOM } from "../styles/hairline"
import TabbarItem from "./tabbar-item"
import TabbarContext from "./tabbar.context"

function useTabbarChildren(children?: ReactNode) {
  return useMemo(
    () =>
      Children.map(children, (node: ReactNode, index) => {
        if (!isValidElement(node)) {
          return node
        }
        const element = node as ReactElement
        if (element.type !== TabbarItem) {
          return element
        }
        const { props } = element
        return cloneElement(element, {
          value: element.key ?? index,
          ...props,
        })
      }),
    [children],
  )
}

export interface TabbarProps extends ViewProps {
  defaultValue?: any
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
    defaultValue,
    value: valueProp,
    bordered,
    fixed,
    placeholder,
    children: childrenProp,
    onChange: onChangeProp,
    ...restProps
  } = props

  const { value = 0, setValue } = useUncontrolled({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  })

  const children = useTabbarChildren(childrenProp)

  const rootRef = useRef()

  const PlaceHolder = usePlaceholder(rootRef, {
    className: prefixClassname("tabbar__placeholder"),
  })

  function onItemClick(dataKey?: any) {
    if (dataKey !== value) {
      setValue(dataKey)
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
