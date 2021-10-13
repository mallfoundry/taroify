import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
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

function validateActiveValue(value: string | number | Array<string | number>, accordion: boolean) {
  if (accordion && Array.isArray(value)) {
    // eslint-disable-next-line
    console.error('[Taroify] Collapse: "value" should not be Array in accordion mode')
    return false
  }
  if (!accordion && !Array.isArray(value)) {
    // eslint-disable-next-line
    console.error('[Taroify] Collapse: "value" should be Array in non-accordion mode')
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

  Children.forEach(children, (child: ReactNode) => {
    if (isValidElement(child)) {
      const element = child as ReactElement
      const elementType = element.type
      if (elementType === CollapseItem) {
        const { key, props } = element
        const index = _.size(__children__.items)
        const { value } = props
        __children__.items?.push(
          cloneElement(element, {
            key: key ?? index,
            value: value ?? index,
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
  value?: any
  accordion?: boolean
  bordered?: boolean
  children?: ReactNode
  onChange?: (value: any) => void
}

function Collapse(props: CollapseProps) {
  const { className, style, bordered, value = "", accordion = false, onChange } = props
  const { items } = useCollapseChildren(props.children)

  const toggleItem = useCallback(
    (itemValue: number | string, expanded: boolean) => {
      if (accordion) {
        onChange?.(itemValue === value ? "" : itemValue)
      } else if (expanded) {
        onChange?.((value as any[]).concat(itemValue))
      } else {
        onChange?.((value as any[]).filter((activeKey) => activeKey !== itemValue))
      }
    },
    [accordion, value, onChange],
  )

  const isExpanded = useCallback(
    (itemValue: number | string) => {
      if (process.env.NODE_ENV !== "production" && !validateActiveValue(value, accordion)) {
        return false
      }

      return accordion ? value === itemValue : (value as Array<number | string>).includes(itemValue)
    },
    [accordion, value],
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
