import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react"
import Badge from "../badge"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER, HAIRLINE_BORDER_TOP } from "../styles/hairline"
import GridContext from "./grid.context"

const DEFAULT_GRID_COLUMNS = 4

export enum GridDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

type GridDirectionString = "horizontal" | "vertical"

interface GridProps {
  columns?: number
  gutter?: number | string
  bordered?: boolean
  centered?: boolean
  clickable?: boolean
  square?: boolean
  direction?: GridDirection | GridDirectionString
  children?: ReactNode
}

function Grid(props: GridProps) {
  const {
    columns = DEFAULT_GRID_COLUMNS,
    gutter,
    bordered = true,
    centered = true,
    clickable = false,
    direction = GridDirection.Vertical,
    square,
  } = props

  const children = Children.map(props.children, (item, index) =>
    cloneElement(item as ReactElement, { __dataIndex__: index }),
  )

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {}
    if (gutter) {
      style.paddingLeft = `${gutter}px`
    }
    return style
  }, [gutter])

  return (
    <View
      style={rootStyle}
      className={classNames(prefixClassname("grid"), {
        [HAIRLINE_BORDER_TOP]: bordered && gutter === undefined,
      })}
    >
      <GridContext.Provider
        value={{
          bordered,
          centered,
          columns,
          clickable,
          direction,
          gutter,
          square,
        }}
      >
        {children}
      </GridContext.Provider>
    </View>
  )
}

namespace Grid {
  function usePercent(columns: number) {
    return useMemo(() => `${100 / columns}%`, [columns])
  }

  interface ItemProps {
    __dataIndex__?: number
    dot?: boolean
    badge?: ReactNode
    icon?: ReactNode
    text?: ReactNode
    children?: ReactNode
    onClick?: (event: ITouchEvent) => void
  }

  export function Item(props: ItemProps) {
    const { __dataIndex__ = 0, icon, text, dot, badge, children, onClick } = props
    const { columns, gutter, bordered, centered, clickable, direction, square } = useContext(
      GridContext,
    )
    const percent = usePercent(columns)

    const rootStyle = useMemo(() => {
      const style: CSSProperties = {}
      style.flexBasis = `${percent}`
      if (square) {
        style.paddingTop = percent
      } else if (gutter) {
        const gutterValue = `${gutter}px`
        style.paddingRight = gutterValue

        if (__dataIndex__ >= columns) {
          style.marginTop = gutterValue
        }
      }
      return style
    }, [__dataIndex__, percent, columns, square, gutter])

    const contentStyle = useMemo(() => {
      if (square && gutter) {
        const gutterValue = `${gutter}px`
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: "auto",
        }
      }
    }, [square, gutter])

    return (
      <View
        className={classNames(prefixClassname("grid-item"), {
          [prefixClassname("grid-item--square")]: square,
        })}
        style={rootStyle}
        onClick={onClick}
      >
        <View
          style={contentStyle}
          className={classNames(prefixClassname("grid-item__content"), {
            [prefixClassname("grid-item__content--square")]: square,
            [prefixClassname("grid-item__content--centered")]: centered,
            [prefixClassname("grid-item__content--clickable")]: clickable,
            [prefixClassname("grid-item__content--horizontal")]:
              direction === GridDirection.Horizontal,
            [prefixClassname("grid-item__content--surround")]: bordered && gutter,
            [HAIRLINE_BORDER]: bordered,
          })}
        >
          {!children && (
            <>
              {icon && (
                <Badge
                  className={prefixClassname("grid-item__icon")}
                  dot={dot}
                  content={badge}
                  children={icon}
                />
              )}
              <View className={prefixClassname("grid-item__text")}>{text}</View>
            </>
          )}
          {children}
        </View>
      </View>
    )
  }
}

export default Grid
