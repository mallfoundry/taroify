import type { ViewProps } from "@tarojs/components"
import type { AreaData } from "./area-picker.shared"

interface AreaPickerColumnsProps extends Omit<ViewProps, "children"> {
  children?: AreaData
  depth?: number
}

function AreaPickerColumns(props: AreaPickerColumnsProps) {
  return null
}

export default AreaPickerColumns
