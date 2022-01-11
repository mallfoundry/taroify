import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_UNSET_TOP_BOTTOM } from "../styles/hairline"
import { preventDefault } from "../utils/dom/event"
import { addUnitPx } from "../utils/format/unit"
import { useRendered } from "../utils/state"
import { default as PickerColumnBase } from "./picker-column"
import PickerContext from "./picker.context"
import usePickerOptions from "./use-picker-options"

interface PickerColumnsProps extends ViewProps {
  style?: CSSProperties
  children?: ReactNode
}

function PickerColumns(props: PickerColumnsProps) {
  const { className, style, children, ...restProps } = props
  const { readonly, values, siblingCount, onColumnChange } = useContext(PickerContext)
  const columns = usePickerOptions(children)

  const visibleCount = siblingCount * 2

  const itemHeight = 44

  const wrapHeight = useMemo(() => itemHeight * visibleCount, [visibleCount])

  const maskStyle = useMemo<CSSProperties>(
    () => ({
      backgroundSize: `100% ${addUnitPx((wrapHeight - itemHeight) / 2)}`,
    }),
    [wrapHeight],
  )

  const frameStyle = useMemo<CSSProperties>(
    () => ({
      height: addUnitPx(itemHeight),
    }),
    [],
  )

  const columnsRender = useRendered(() =>
    _.map(columns, (column, columnIndex) => {
      const { children: options, ...restColumnProps } = column
      return (
        <PickerColumnBase
          key={columnIndex}
          // @ts-ignore
          children={options}
          readonly={readonly}
          {...restColumnProps}
          value={_.get(values, columnIndex)}
          onChange={(option, emitChange) => onColumnChange?.(option, column, emitChange)}
        />
      )
    }),
  )

  return (
    <View
      className={classNames(prefixClassname("picker__columns"), className)}
      style={{
        ...style,
        height: addUnitPx(wrapHeight),
      }}
      catchMove
      onTouchMove={preventDefault}
      {...restProps}
    >
      {columnsRender}
      <View className={prefixClassname("picker__mask")} style={maskStyle} />
      <View
        className={classNames([HAIRLINE_BORDER_UNSET_TOP_BOTTOM, prefixClassname("picker__frame")])}
        style={frameStyle}
      />
    </View>
  )
}

export default PickerColumns
