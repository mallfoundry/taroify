import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_UNSET_TOP_BOTTOM } from "../styles/hairline"
import { preventDefault } from "../utils/dom/event"
import { addUnitPx } from "../utils/format/unit"
import { useValue } from "../utils/state"
import PickerColumn, { PickerColumnProps } from "./picker-column"
import PickerColumnBase from "./picker-column-base"
import PickerOption, { PickerOptionProps } from "./picker-option"
import PickerToolbar from "./picker-toolbar"
import PickerContext from "./picker.context"
import { PickerColumnObject, PickerOptionObject } from "./picker.shared"

function getPickerOptions(children?: ReactNode): PickerOptionObject[] {
  const options: PickerOptionObject[] = []
  let index = 0
  Children.forEach(children, (child: ReactNode) => {
    if (isValidElement(child)) {
      const element = child as ReactElement

      const elementType = element.type
      if (elementType === PickerOption) {
        const { key, props } = element
        const { value, children, ...restProps } = props as PickerOptionProps
        options.push({
          key: key ?? index,
          index: index,
          value: value ?? children,
          children,
          ...restProps,
        })
        // index = index + 1
        index++
      }
    }
  })

  return options
}

interface PickerChildren {
  toolbar: ReactNode
  columns: PickerColumnObject[]
}

function usePickerChildren(children?: ReactNode): PickerChildren {
  const __children__: PickerChildren = {
    toolbar: undefined,
    columns: [],
  }

  let index = 0

  Children.forEach(children, (child: ReactNode) => {
    if (isValidElement(child)) {
      const element = child as ReactElement
      const { type: elementType } = element
      if (elementType === PickerToolbar) {
        __children__.toolbar = element
      } else if (elementType === PickerColumn) {
        const { key, props } = element
        const { children, ...restProps } = props as PickerColumnProps
        __children__.columns.push({
          key: key ?? index,
          index,
          options: getPickerOptions(children),
          ...restProps,
        })
        index++
      }
    }
  })
  return __children__
}

function getPickerValue(values: any, multiColumns: boolean): any {
  return multiColumns ? values : _.first(values)
}

function usePickerValues(value?: any): any[] {
  return _.isArray(value) ? value : [value]
}

export interface PickerProps extends ViewProps {
  defaultValue?: any | any[]
  value?: any | any[]
  readonly?: boolean
  loading?: boolean
  siblingCount?: number
  children?: ReactNode

  onChange?(values: any | any[], option: PickerOptionObject): void

  onConfirm?(values: any | any[], options: PickerOptionObject | PickerOptionObject[]): void

  onCancel?(values: any | any[], options: PickerOptionObject | PickerOptionObject[]): void
}

export default function Picker(props: PickerProps) {
  const {
    defaultValue,
    value: valueProp,
    className,
    loading,
    readonly,
    siblingCount = 3,
    children: childrenProp,
    onChange,
    onCancel,
    onConfirm,
    ...restProps
  } = props

  const { value, setValue } = useValue({ value: valueProp, defaultValue })

  const values = usePickerValues(value)

  const { columns, toolbar } = usePickerChildren(childrenProp)

  const valueOptionsRef = useRef<PickerOptionObject[]>([])

  const multiColumns = _.size(columns) > 1

  const visibleCount = siblingCount * 2

  const itemHeight = 44

  const wrapHeight = useMemo(() => itemHeight * visibleCount, [visibleCount])

  const columnsStyle = useMemo<CSSProperties>(
    () => ({
      height: addUnitPx(wrapHeight),
    }),
    [wrapHeight],
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

  const onColumnChange = useCallback(
    (option: PickerOptionObject, column: PickerColumnObject, emitChange?: boolean) => {
      const { index: columnIndex = -1 } = column

      valueOptionsRef.current[columnIndex] = option

      if (emitChange) {
        const newValues = _.map(
          _.filter(valueOptionsRef.current, (newOption) => !_.isUndefined(newOption)),
          ({ value }) => value,
        )
        _.set(newValues, columnIndex, option?.value)
        const aValues = getPickerValue(newValues, multiColumns)
        setValue(aValues)
        onChange?.(aValues, { ...option })
      }
    },
    [multiColumns, onChange, setValue],
  )

  const handleAction = (action: any) => () =>
    action?.(
      _.map(valueOptionsRef.current, ({ value }) => value),
      _.map(valueOptionsRef.current, (valueOption) => ({ ...valueOption })),
    )

  return (
    <View className={classNames(prefixClassname("picker"), className)} {...restProps}>
      <PickerContext.Provider
        value={{
          onConfirm: handleAction(onConfirm),
          onCancel: handleAction(onCancel),
        }}
      >
        {toolbar}
      </PickerContext.Provider>
      {loading && <Loading className={prefixClassname("picker__loading")} />}
      <View
        className={prefixClassname("picker__columns")}
        style={columnsStyle}
        catchMove
        onTouchMove={preventDefault}
      >
        {
          //
          _.map(columns, (column, columnIndex) => (
            <PickerColumnBase
              {...column}
              readonly={readonly}
              value={_.get(values, columnIndex)}
              onChange={(option, emitChange) => onColumnChange(option, column, emitChange)}
            />
          ))
        }
        <View className={prefixClassname("picker__mask")} style={maskStyle} />
        <View
          className={classNames([
            HAIRLINE_BORDER_UNSET_TOP_BOTTOM,
            prefixClassname("picker__frame"),
          ])}
          style={frameStyle}
        />
      </View>
    </View>
  )
}
