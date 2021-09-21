import PickerElement, { PickerProps } from "./picker"
import PickerButton from "./picker-button"
import PickerColumn from "./picker-column"
import PickerOption from "./picker-option"
import PickerTitle from "./picker-title"
import PickerToolbar from "./picker-toolbar"

interface PickerInterface {
  (props: PickerProps): JSX.Element

  Toolbar: typeof PickerToolbar
  Title: typeof PickerTitle
  Button: typeof PickerButton
  Column: typeof PickerColumn
  Option: typeof PickerOption
}

const Picker = PickerElement as PickerInterface

Picker.Toolbar = PickerToolbar
Picker.Title = PickerTitle
Picker.Button = PickerButton
Picker.Column = PickerColumn
Picker.Option = PickerOption

export default Picker
