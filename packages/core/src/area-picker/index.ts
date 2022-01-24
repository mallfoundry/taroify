import { FunctionComponent } from "react"
import Picker from "../picker"
import AreaPickerComponent, { AreaPickerProps } from "./area-picker"
import AreaPickerColumns from "./area-picker-columns"

interface AreaPickerInterface extends FunctionComponent<AreaPickerProps> {
  Toolbar: typeof Picker.Toolbar
  Title: typeof Picker.Title
  Button: typeof Picker.Button
  Columns: typeof AreaPickerColumns
}

const AreaPicker = AreaPickerComponent as AreaPickerInterface

AreaPicker.Toolbar = Picker.Toolbar
AreaPicker.Title = Picker.Title
AreaPicker.Button = Picker.Button
AreaPicker.Columns = AreaPickerColumns

export default AreaPicker
