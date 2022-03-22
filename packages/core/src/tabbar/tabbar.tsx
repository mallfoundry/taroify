import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import FixedView from "../fixed-view"
import { SafeAreaPosition } from "../safe-area"
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
  bordered?: boolean
  fixed?: boolean
  placeholder?: boolean
  safeArea?: SafeAreaPosition
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
    placeholder = true,
    safeArea,
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

  function onItemClick(dataKey?: any) {
    if (dataKey !== value) {
      setValue(dataKey)
    }
  }

  return (
    <TabbarContext.Provider
      value={{
        value,
        onItemClick,
      }}
    >
      <FixedView
        position={fixed}
        safeArea={safeArea}
        placeholder={fixed && placeholder && prefixClassname("tabbar__placeholder")}
      >
        <View
          className={classNames(
            prefixClassname("tabbar"),
            {
              [HAIRLINE_BORDER_TOP_BOTTOM]: bordered,
            },
            className,
          )}
          children={children}
          {...restProps}
        />
      </FixedView>
    </TabbarContext.Provider>
  )
}

export default Tabbar
