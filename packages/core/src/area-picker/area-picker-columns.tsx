import useArea, { AreaData } from "@taroify/hooks/use-area"
import * as _ from "lodash"
import * as React from "react"
import { useContext, useEffect, useRef } from "react"
import Picker, { PickerColumnsProps, PickerContext, PickerOptionObject } from "../picker"
import { useToRef } from "../utils/state"
import AreaPickerContext from "./area-picker.context"

interface AreaPickerColumnsProps extends PickerColumnsProps {
  children?: AreaData
}

function AreaPickerColumns(props: AreaPickerColumnsProps) {
  const { children: data } = props
  const { depth, formatter } = useContext(AreaPickerContext)

  const {
    values: unverifiedValues,
    setValueOptions,
    onChange,
    ...restCtx //
  } = useContext(PickerContext)

  const {
    columns,
    values,
    valueOptions,
    setValues,
    getValueOptions, //
  } = useArea(unverifiedValues, {
    data,
    depth,
    formatter,
  })

  const onChangeRef = useToRef(onChange)
  const valuesRef = useRef<any[]>()
  const columnRef = useRef<PickerOptionObject>()

  _.forEach(valueOptions, (value, index) => setValueOptions?.(value, { index }))

  useEffect(() => {
    if (columnRef.current && !_.isEqual(valuesRef.current, values)) {
      const option = _.get(getValueOptions(), columnRef.current.index)
      onChangeRef.current?.(values, option as PickerOptionObject, columnRef.current)
      valuesRef.current = values
    }
    columnRef.current = undefined
  }, [getValueOptions, onChangeRef, values])

  return (
    <PickerContext.Provider
      value={{
        values,
        onChange(values, option, column) {
          columnRef.current = column
          setValues(values)
        },
        ...restCtx,
      }}
    >
      <Picker.Columns children={columns} />
    </PickerContext.Provider>
  )
}

export default AreaPickerColumns
