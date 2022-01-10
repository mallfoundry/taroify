import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, ReactElement, ReactNode, useCallback, useRef } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import { useValue } from "../utils/state"
import { isElementOf } from "../utils/validate"
import PickerColumns from "./picker-columns"
import { PickerColumn } from "./picker.composition"
import PickerContext from "./picker.context"
import { DEFAULT_SIBLING_COUNT, PickerOptionObject } from "./picker.shared"

function usePickerChildren(children?: ReactNode): ReactNode {
  const __children__: ReactNode[] = []

  const columns: ReactNode[] = []

  Children.toArray(children).forEach((child: ReactNode, index) => {
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
    siblingCount = DEFAULT_SIBLING_COUNT,
    children: childrenProp,
    onChange,
    onCancel,
    onConfirm,
    ...restProps
  } = props

  const { value, setValue } = useValue({ value: valueProp, defaultValue })

  const values = usePickerValues(value)

  const children = usePickerChildren(childrenProp)

  const valueOptionsRef = useRef<PickerOptionObject[]>([])

  const onColumnChange = useCallback(
    (option: PickerOptionObject, column: PickerOptionObject, emitChange?: boolean) => {
      const { index: columnIndex = -1 } = column

      valueOptionsRef.current[columnIndex] = option
      if (emitChange) {
        const newValues = _.map(
          _.filter(valueOptionsRef.current, (newOption) => !_.isUndefined(newOption)),
          ({ value }) => value,
        )
        _.set(newValues, columnIndex, option?.value)
        const aValues = getPickerValue(newValues, _.size(newValues) > 1)
        setValue(aValues)
        onChange?.(aValues, { ...option })
      }
    },
    [onChange, setValue],
  )

  const handleAction = (action: any) => () =>
    action?.(
      _.map(valueOptionsRef.current, ({ value }) => value),
      _.map(valueOptionsRef.current, (valueOption) => ({ ...valueOption })),
    )

  return (
    <PickerContext.Provider
      value={{
        readonly,
        siblingCount,
        values,
        onColumnChange,
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
