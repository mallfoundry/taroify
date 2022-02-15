import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, ReactElement, ReactNode, useCallback, useRef } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import { useToRef } from "../utils/state"
import { isElementOf } from "../utils/validate"
import PickerColumns from "./picker-columns"
import { PickerColumn } from "./picker.composition"
import PickerContext from "./picker.context"
import { DEFAULT_SIBLING_COUNT, PickerOptionObject, validPickerColumn } from "./picker.shared"

function usePickerChildren(children?: ReactNode): ReactNode {
  const __children__: ReactNode[] = []
  const columns: ReactNode[] = []
  // Use toArray to generate element id
  Children.toArray(children).forEach((child: ReactNode) => {
    if (isElementOf(child, PickerColumn)) {
      const element = child as ReactElement
      if (_.isEmpty(columns)) {
        __children__.push(<PickerColumns key="-1" children={columns} />)
      }

      columns.push(element)
    } else {
      __children__.push(child)
    }
  })

  return __children__
}

function usePickerValues(value?: any): any[] {
  return _.isArray(value) ? value : [value]
}

interface PickerBaseProps extends ViewProps {
  readonly?: boolean
  loading?: boolean
  siblingCount?: number
  children?: ReactNode
}

export interface MultiValuePickerProps extends PickerBaseProps {
  defaultValue?: any[]
  value?: any[]

  onChange?(values: any[], option: PickerOptionObject, column: PickerOptionObject): void

  onConfirm?(values: any[], options: PickerOptionObject[]): void

  onCancel?(values: any[], options: PickerOptionObject[]): void
}

export interface PickerProps extends PickerBaseProps {
  defaultValue?: any | any[]
  value?: any | any[]

  onChange?(values: any | any[], option: PickerOptionObject, column: PickerOptionObject): void

  onConfirm?(values: any | any[], option: PickerOptionObject | PickerOptionObject[]): void

  onCancel?(values: any | any[], option: PickerOptionObject | PickerOptionObject[]): void
}

function Picker(props: PickerProps) {
  const {
    defaultValue,
    value: valueProp,
    className,
    loading,
    readonly,
    siblingCount = DEFAULT_SIBLING_COUNT,
    children: childrenProp,
    onChange,
    onCancel,
    onConfirm,
    ...restProps
  } = props

  const { value, setValue } = useUncontrolled({ value: valueProp, defaultValue })

  const multiValueRef = useToRef(_.isArray(value))

  const values = usePickerValues(value)

  const children = usePickerChildren(childrenProp)

  const valueOptionsRef = useRef<PickerOptionObject[]>([])

  const setValueOptions = useCallback(
    (option: PickerOptionObject, unverifiedColumn: PickerOptionObject) => {
      const column = validPickerColumn(unverifiedColumn)
      if (column) {
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

  const handleAction = (action: any) => () =>
    action?.(
      _.map(valueOptionsRef.current, ({ value }) => value),
      _.map(valueOptionsRef.current, (valueOption) => ({ ...valueOption })),
    )

  const getValueOptions = useCallback(() => valueOptionsRef.current, [])

  const isMultiValue = useCallback(() => multiValueRef.current, [multiValueRef])

  return (
    <PickerContext.Provider
      value={{
        readonly,
        siblingCount,
        values,
        getValueOptions,
        isMultiValue,
        setValueOptions,
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
