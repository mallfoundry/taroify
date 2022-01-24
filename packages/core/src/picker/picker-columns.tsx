import { ViewProps } from "@tarojs/components/types/View"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useContext } from "react"
import PickerColumnsRender from "./picker-columns-render"
import PickerContext from "./picker.context"
import { getPickerValue, PickerOptionObject, validPickerColumn } from "./picker.shared"

export interface PickerColumnsProps extends ViewProps {
  style?: CSSProperties
  children?: ReactNode
}

function PickerColumns(props: PickerColumnsProps) {
  const {
    readonly,
    values,
    siblingCount,
    getValueOptions,
    isMultiValue,
    setValueOptions,
    onChange,
  } = useContext(PickerContext)

  const onColumnChange = useCallback(
    (option: PickerOptionObject, unverifiedColumn: PickerOptionObject, emitChange?: boolean) => {
      setValueOptions?.(option, unverifiedColumn)
      const column = validPickerColumn(unverifiedColumn)
      if (column && emitChange) {
        const { index: columnIndex } = column
        const newValues = _.map(
          _.filter(getValueOptions?.(), (newOption) => !_.isUndefined(newOption)),
          ({ value }) => value,
        )
        _.set(newValues, columnIndex, option?.value)
        const aValues = getPickerValue(newValues, isMultiValue?.() || _.size(newValues) > 1)
        onChange?.(aValues, { ...option }, { ...column })
      }
    },
    [getValueOptions, isMultiValue, onChange, setValueOptions],
  )

  return (
    <PickerColumnsRender
      {...props}
      readonly={readonly}
      values={values}
      siblingCount={siblingCount}
      onChange={onColumnChange}
    />
  )
}

export default PickerColumns
