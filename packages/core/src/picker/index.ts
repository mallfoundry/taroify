import PickerElement, { PickerProps } from "./picker"
import PickerButton from "./picker-button"
import PickerColumns from "./picker-columns"
import PickerOption from "./picker-option"
import PickerTitle from "./picker-title"
import PickerToolbar from "./picker-toolbar"
import { PickerColumn } from "./picker.composition"

interface PickerInterface {
  (props: PickerProps): JSX.Element

  Toolbar: typeof PickerToolbar
  Title: typeof PickerTitle
  Button: typeof PickerButton
  Columns: typeof PickerColumns
  Column: typeof PickerColumn
  Option: typeof PickerOption
}

const Picker = PickerElement as PickerInterface

Picker.Toolbar = PickerToolbar
Picker.Title = PickerTitle
Picker.Button = PickerButton
Picker.Columns = PickerColumns
Picker.Column = PickerColumn
Picker.Option = PickerOption

export default Picker
