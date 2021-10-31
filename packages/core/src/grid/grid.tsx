import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { Children, cloneElement, CSSProperties, ReactElement, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_TOP } from "../styles/hairline"
import { addUnitPx } from "../utils/format/unit"
import GridContext from "./grid.context"
import { GridDirection } from "./grid.shared"

const DEFAULT_GRID_COLUMNS = 4

export interface GridProps extends ViewProps {
  style?: CSSProperties
  columns?: number
  gutter?: number | string
  bordered?: boolean
  centered?: boolean
  clickable?: boolean
  square?: boolean
  direction?: GridDirection
  children?: ReactNode
}

function Grid(props: GridProps) {
  const {
    className,
    style: styleProp,
    columns = DEFAULT_GRID_COLUMNS,
    gutter,
    bordered = true,
    centered = true,
    clickable = false,
    direction = "vertical",
    square,
    children: childrenProp,
    ...restProps
  } = props

  const children = useMemo(
    () =>
      Children.map(childrenProp, (item, index) =>
        cloneElement(item as ReactElement, { __dataIndex__: index }),
      ),
    [childrenProp],
  )

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {
      ...styleProp,
    }
    if (gutter) {
      style.paddingLeft = addUnitPx(gutter)
    }
    return style
  }, [gutter, styleProp])

  return (
    <View
      style={rootStyle}
      className={classNames(
        prefixClassname("grid"),
        {
          [HAIRLINE_BORDER_TOP]: bordered && gutter === undefined,
        },
        className,
      )}
      {...restProps}
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

export default Grid
