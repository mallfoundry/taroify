import { useUncontrolled } from "@taroify/hooks"
import type { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import type { ReactNode } from "react"
import Picker from "../picker"
import type { DatetimePickerColumnType, DatetimePickerType } from "./datetime-picker.shared"
import useDatetimePicker from "./use-datetime-picker"

export interface DatetimePickerProps extends ViewProps {
  type?: DatetimePickerType
  fields?: DatetimePickerColumnType[]
  defaultValue?: Date
  value?: Date
  min?: Date
  max?: Date
  readonly?: boolean
  loading?: boolean
  siblingCount?: number
  children?: ReactNode

  filter?(type: DatetimePickerColumnType, values: string[]): string[]

  formatter?(type: DatetimePickerColumnType, value: string): string

  onChange?(date: Date): void

  onConfirm?(date: Date): void

  onCancel?(date: Date): void
}

function DatetimePicker(props: DatetimePickerProps) {
  const {
    className,
    readonly,
    loading,
    type,
    fields,
    filter,
    formatter,
    min,
    max,
    defaultValue: defaultValueProp,
    value: valueProp,
    siblingCount,
    children,
    onChange: onChangeProp,
    onConfirm,
    onCancel,
    ...restProps
  } = props

  const { value: dateValue, setValue: setDateValue } = useUncontrolled({
    value: valueProp,
    onChange: onChangeProp,
  })

  const { defaultValue, value, columns, toDate } = useDatetimePicker({
    defaultValue: defaultValueProp,
    value: dateValue,
    min,
    max,
    type,
    fields,
    filter,
    formatter,
  })

  return (
    <Picker
      className={className}
      readonly={readonly}
      loading={loading}
      siblingCount={siblingCount}
      defaultValue={defaultValue}
      value={value}
      onChange={(aValue) => setDateValue(toDate(aValue as string[]))}
      onConfirm={(aValue) => onConfirm?.(toDate(aValue as string[]))}
      onCancel={(aValue) => onCancel?.(toDate(aValue as string[]))}
      {...restProps}
    >
      {children}
      <Picker.Columns children={columns as ReactNode} />
    </Picker>
  )
}

export default DatetimePicker
