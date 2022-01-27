import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useContext, useMemo } from "react"
import { useBadge, useBadgeWrapper } from "../badge"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER } from "../styles/hairline"
import { addUnitPx } from "../utils/format/unit"
import GridContext from "./grid.context"

function useGridItemPercent(columns: number) {
  return useMemo(() => `${100 / columns}%`, [columns])
}

interface GridItemProps extends ViewProps {
  __dataIndex__?: number
  style?: CSSProperties
  dot?: boolean
  badge?: boolean | string | number | ReactNode
  icon?: ReactNode
  text?: ReactNode
  children?: ReactNode
}

export function GridItem(props: GridItemProps) {
  const {
    __dataIndex__ = 0,
    className,
    style: styleProp,
    icon,
    text,
    dot,
    badge,
    children,
    ...restProps
  } = props

  const {
    columns,
    gutter,
    bordered,
    centered,
    clickable,
    direction,
    square, //
  } = useContext(GridContext)

  const IconBadgeWrapper = useBadgeWrapper(icon)

  const Badge = useBadge(badge, { dot })

  const percent = useGridItemPercent(columns)

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {
      ...styleProp,
    }
    style.flexBasis = `${percent}`
    if (square) {
      style.paddingTop = percent
    } else if (gutter) {
      const gutterValue = addUnitPx(gutter)
      style.paddingRight = gutterValue

      if (__dataIndex__ >= columns) {
        style.marginTop = gutterValue
      }
    }
    return style
  }, [styleProp, percent, square, gutter, __dataIndex__, columns])

  const contentStyle = useMemo(() => {
    if (square && gutter) {
      const gutterValue = addUnitPx(gutter)
      return {
        right: gutterValue,
        bottom: gutterValue,
        height: "auto",
      }
    }
  }, [square, gutter])

  return (
    <View
      className={classNames(
        prefixClassname("grid-item"),
        {
          [prefixClassname("grid-item--square")]: square,
        },
        className,
      )}
      style={rootStyle}
      {...restProps}
    >
      <View
        style={contentStyle}
        className={classNames(prefixClassname("grid-item__content"), {
          [prefixClassname("grid-item__content--square")]: square,
          [prefixClassname("grid-item__content--centered")]: centered,
          [prefixClassname("grid-item__content--clickable")]: clickable,
          [prefixClassname("grid-item__content--horizontal")]: direction === "horizontal",
          [prefixClassname("grid-item__content--surround")]: bordered && gutter,
          [HAIRLINE_BORDER]: bordered,
        })}
      >
        {!children && (
          <>
            <IconBadgeWrapper className={classNames(prefixClassname("grid-item__icon"))}>
              <Badge />
            </IconBadgeWrapper>
            <View className={prefixClassname("grid-item__text")}>{text}</View>
          </>
        )}
        {children}
      </View>
    </View>
  )
}

export default GridItem
