import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, type ReactElement, type ReactNode, useCallback, useRef, useMemo } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import { useRefs, useToRef } from "../utils/state"
import { isElementOf } from "../utils/validate"
import { unitToPx } from "../utils/format/unit"
import PickerColumns from "./picker-columns"
import PickerToolbar from "./picker-toolbar"
import PickerTitle from "./picker-title"
import PickerButton from "./picker-button"
import { PickerColumn } from "./picker.composition"
import PickerContext from "./picker.context"
import PickerOption from "./picker-option"
import {
  DEFAULT_OPTION_HEIGHT,
  DEFAULT_SIBLING_COUNT,
  type PickerColumnInstance,
  type PickerOptionObject,
  type PickerOptionData,
  validPickerColumn,
} from "./picker.shared"

function usePickerValues(value?: any): any[] {
  return _.isArray(value) ? value : [value]
}

export interface PickerBaseProps extends ViewProps {
  readonly?: boolean
  loading?: boolean
  siblingCount?: number
  optionHeight?: string | number
  title?: ReactNode
  confirmText?: ReactNode
  cancelText?: ReactNode
  columns?: PickerOptionData[] | PickerOptionData[][]
  columnsFieldNames?: { label?: string; value?: string }
  children?: ReactNode
}

export interface PickerProps extends PickerBaseProps {
  defaultValue?: string | string[]
  value?: string | string[]

  onChange?(values: string | string[], option: PickerOptionObject, column: PickerOptionObject): void

  onConfirm?(values: string | string[], option: PickerOptionObject | PickerOptionObject[]): void

  onCancel?(values: string | string[], option: PickerOptionObject | PickerOptionObject[]): void
}

const defaultFieldNames = {
  label: "label",
  value: "value",
}

function Picker(props: PickerProps) {
  const {
    defaultValue,
    value: valueProp,
    className,
    loading,
    readonly,
    title,
    confirmText = "确认",
    cancelText = "取消",
    columns: columnsProp,
    columnsFieldNames: columnsFieldNamesProp,
    siblingCount = DEFAULT_SIBLING_COUNT,
    optionHeight: optionHeightProp,
    children: childrenProp,
    onChange,
    onCancel,
    onConfirm,
    ...restProps
  } = props

  const {
    getRefs: getColumnRefs,
    setRefs: setColumnRefs,
    clearRefs: clearColumnRefs,
  } = useRefs<PickerColumnInstance>()

  const { value, setValue } = useUncontrolled({ value: valueProp, defaultValue })

  const multiValueRef = useToRef(_.isArray(value))

  const values = usePickerValues(value)

  const fieldNames: PickerBaseProps["columnsFieldNames"] = useMemo(() => {
    if (!_.isEmpty(columnsFieldNamesProp) && _.isObject(columnsFieldNamesProp)) {
      return Object.assign({ ...defaultFieldNames }, columnsFieldNamesProp)
    }
    return defaultFieldNames
  }, [columnsFieldNamesProp])

  const children = useMemo(() => {
    let toolbar: ReactNode = null
    const __children__: ReactNode[] = []
    const columns: ReactNode[] = []
    // biome-ignore lint/complexity/noForEach: <explanation>
    Children.toArray(childrenProp).forEach((child: ReactNode) => {
      if (isElementOf(child, PickerColumn)) {
        const element = child as ReactElement
        columns.push(element)
      } else if (isElementOf(child, PickerColumns)) {
        const element = child as ReactElement
        columns.push(...element.props.children)
      } else if (isElementOf(child, PickerToolbar)) {
        toolbar = child
      } else {
        __children__.push(child)
      }
    })
    if (!toolbar && (title || confirmText || cancelText)) {
      toolbar = (
        <PickerToolbar key="-2">
          <PickerButton type="cancel">{cancelText}</PickerButton>
          <PickerTitle>{title}</PickerTitle>
          <PickerButton type="confirm">{confirmText}</PickerButton>
        </PickerToolbar>
      )
    }
    if (_.isEmpty(columns) && columnsProp && columnsProp.length > 0) {
      ;(Array.isArray(columnsProp[0]) ? columnsProp : [columnsProp]).forEach((col, i) => {
        columns.push(
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <PickerColumn key={i}>
            {col.map((data, ii) => (
              <PickerOption
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={ii}
                label={data[fieldNames.label!]}
                value={data[fieldNames.value!]}
                disabled={data.disabled}
              />
            ))}
          </PickerColumn>,
        )
      })
    }

    // biome-ignore lint/correctness/noChildrenProp: <explanation>
    __children__.unshift(<PickerColumns key="-1" children={columns} />)
    __children__.unshift(toolbar)
    return __children__
  }, [childrenProp, title, confirmText, cancelText, columnsProp, fieldNames])

  const valueOptionsRef = useRef<PickerOptionObject[]>([])

  const optionHeight = useMemo(
    () => (optionHeightProp ? unitToPx(optionHeightProp) : DEFAULT_OPTION_HEIGHT),
    [optionHeightProp],
  )

  const setValueOptions = useCallback(
    (option: PickerOptionObject, unverifiedColumn: PickerOptionObject) => {
      const column = validPickerColumn(unverifiedColumn)
      // If options is empty, option is undefined
      if (option && column) {
        const { index: columnIndex } = column
        valueOptionsRef.current[columnIndex] = option
      }
    },
    [],
  )

  const handleChange = useCallback(
    (values: any, option: PickerOptionObject, column: PickerOptionObject) => {
      setValue(values)
      onChange?.(values, option, column)
    },
    [onChange, setValue],
  )

  const stopMomentum = useCallback(
    () =>
      // biome-ignore lint/complexity/noForEach: <explanation>
      getColumnRefs()
        .filter((columnRef) => columnRef.current)
        .forEach((columnRef) => columnRef.current.stopMomentum()),
    [getColumnRefs],
  )

  const handleAction = (action: any) => () => {
    stopMomentum()
    action?.(
      _.map(valueOptionsRef.current, ({ value }) => value),
      _.map(valueOptionsRef.current, (valueOption) => ({ ...valueOption })),
    )
  }

  const getValueOptions = useCallback(() => valueOptionsRef.current, [])

  const isMultiValue = useCallback(() => multiValueRef.current, [multiValueRef])

  return (
    <PickerContext.Provider
      value={{
        readonly,
        siblingCount,
        optionHeight,
        values,
        getValueOptions,
        isMultiValue,
        setValueOptions,
        clearColumnRefs,
        setColumnRefs,
        onChange: handleChange,
        onConfirm: handleAction(onConfirm),
        onCancel: handleAction(onCancel),
      }}
    >
      <View className={classNames(prefixClassname("picker"), className)} {...restProps}>
        {loading && <Loading className={prefixClassname("picker__loading")} />}
        {children}
      </View>
    </PickerContext.Provider>
  )
}

export default Picker
