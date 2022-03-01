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
import PickerColumn from "./picker-column"
import PickerContext from "./picker.context"
import { getPickerOptionKey, PickerOptionObject } from "./picker.shared"
import usePickerOptions from "./use-picker-options"

export interface PickerColumnsRenderProps extends ViewProps {
  style?: CSSProperties

  values?: any[]
  readonly?: boolean
  siblingCount: number

  children?: ReactNode

  onChange?(option: PickerOptionObject, column: PickerOptionObject, emitChange?: boolean): void
}

function PickerColumnsRender(props: PickerColumnsRenderProps) {
  const {
    className,
    style,
    children,
    readonly,
    values,
    siblingCount,
    onChange,
    ...restProps
  } = props

  const { setColumnRefs, clearColumnRefs } = useContext(PickerContext)

  const columns = usePickerOptions(children)

  const visibleCount = siblingCount * 2

  const itemHeight = 44

  const wrapHeight = useMemo(() => itemHeight * visibleCount, [visibleCount])

  const rootStyle = useMemo(
    () => ({
      ...style,
      height: addUnitPx(wrapHeight),
    }),
    [style, wrapHeight],
  )

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
      // When rerender, clear columns refs
      // Prevent leakage and contamination
      clearColumnRefs?.()
      //
      return (
        <PickerColumn
          ref={setColumnRefs?.(columnIndex)}
          key={getPickerOptionKey(column) ?? columnIndex}
          // @ts-ignore
          children={options}
          readonly={readonly}
          {...restColumnProps}
          value={_.get(values, columnIndex)}
          onChange={(option, emitChange) =>
            onChange?.(
              option,
              {
                ...column,
                index: columnIndex,
              },
              emitChange,
            )
          }
        />
      )
    }),
  )

  return (
    <View
      className={classNames(prefixClassname("picker__columns"), className)}
      style={rootStyle}
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

export default PickerColumnsRender
