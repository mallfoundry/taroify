import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
} from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_TOP_BOTTOM } from "../styles/hairline"
import CollapseItem from "./collapse-item"
import CollapseContext from "./collapse.context"

function validateActiveKey(
  activeKey: string | number | Array<string | number>,
  accordion: boolean,
) {
  if (accordion && Array.isArray(activeKey)) {
    // eslint-disable-next-line
    console.error('[Taroify] Collapse: "activeKey" should not be Array in accordion mode')
    return false
  }
  if (!accordion && !Array.isArray(activeKey)) {
    // eslint-disable-next-line
    console.error('[Taroify] Collapse: "activeKey" should be Array in non-accordion mode')
    return false
  }
  return true
}

interface CollapseChildren {
  items: ReactNode[]
}

function useCollapseChildren(children?: ReactNode): CollapseChildren {
  const __children__: CollapseChildren = {
    items: [],
  }

  Children.forEach(children, (child: ReactNode, index) => {
    if (isValidElement(child)) {
      const element = child as ReactElement
      const elementType = element.type
      if (elementType === CollapseItem) {
        const { key } = element
        __children__.items?.push(
          cloneElement(element, {
            key: key ?? index,
            __dataKey__: key ?? index,
          }),
        )
      } else {
        __children__.items?.push(element)
      }
    } else {
      __children__.items?.push(child)
    }
  })

  return __children__
}

export interface CollapseProps {
  className?: string
  style?: CSSProperties
  activeKey?: number | string | number[] | string[]
  accordion?: boolean
  bordered?: boolean
  children?: ReactNode
  onChange?: (activeKey: number | string | number[] | string[]) => void
}

function Collapse(props: CollapseProps) {
  const { className, style, bordered, activeKey = "", accordion = false, onChange } = props
  const { items } = useCollapseChildren(props.children)

  const toggleItem = useCallback(
    (dataKey: number | string, expanded: boolean) => {
      if (accordion) {
        onChange?.(dataKey === activeKey ? "" : dataKey)
      } else if (expanded) {
        onChange?.((activeKey as any[]).concat(dataKey))
      } else {
        onChange?.((activeKey as any[]).filter((activeKey) => activeKey !== dataKey))
      }
    },
    [accordion, activeKey, onChange],
  )

  const isExpanded = useCallback(
    (dataKey: number | string) => {
      if (process.env.NODE_ENV !== "production" && !validateActiveKey(activeKey, accordion)) {
        return false
      }

      return accordion
        ? activeKey === dataKey
        : (activeKey as Array<number | string>).includes(dataKey)
    },
    [accordion, activeKey],
  )

  return (
    <CollapseContext.Provider
      value={{
        isExpanded,
        toggleItem,
      }}
    >
      <View
        className={classNames(
          prefixClassname("collapse"),
          {
            [HAIRLINE_BORDER_TOP_BOTTOM]: bordered,
          },
          className,
        )}
        style={style}
        children={items}
      />
    </CollapseContext.Provider>
  )
}

export default Collapse
