import { AreaFormatter } from "@taroify/hooks/use-area"
import * as React from "react"
import Picker, { MultiValuePickerProps } from "../picker"
import AreaPickerContext from "./area-picker.context"

export interface AreaPickerProps extends MultiValuePickerProps {
  depth?: number
  formatter?: AreaFormatter
}

function AreaPicker(props: AreaPickerProps) {
  const { depth, formatter, ...restProps } = props
  return (
    <AreaPickerContext.Provider
      value={{
        depth,
        formatter,
      }}
    >
      <Picker {...restProps} />
    </AreaPickerContext.Provider>
  )
}

export default AreaPicker
