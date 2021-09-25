import Picker from "../picker"
import DatetimePickerElement, { DatetimePickerProps } from "./datetime-picker"

interface DatetimePickerInterface {
  (props: DatetimePickerProps): JSX.Element

  Toolbar: typeof Picker.Toolbar
  Title: typeof Picker.Title
  Button: typeof Picker.Button
}

const DatetimePicker = DatetimePickerElement as DatetimePickerInterface

DatetimePicker.Toolbar = Picker.Toolbar
DatetimePicker.Title = Picker.Title
DatetimePicker.Button = Picker.Button

export default DatetimePicker
