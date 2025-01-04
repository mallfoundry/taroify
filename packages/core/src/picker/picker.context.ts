import { createContext } from "react"
import type { SetRefCallback } from "../utils/state"
import {
  DEFAULT_SIBLING_COUNT,
  DEFAULT_OPTION_HEIGHT,
  type PickerColumnInstance,
  type PickerOptionObject,
} from "./picker.shared"

interface PickerContextValue {
  values?: any[]
  readonly?: boolean
  siblingCount: number
  optionHeight: number

  isMultiValue?(): boolean

  getValueOptions?(): PickerOptionObject[]

  setValueOptions?(option: PickerOptionObject, column: PickerOptionObject): void

  setColumnRefs?: SetRefCallback<PickerColumnInstance>

  clearColumnRefs?(): void

  onChange?(values: any, option: PickerOptionObject, column: PickerOptionObject): void

  onConfirm?(): void

  onCancel?(): void
}

const PickerContext = createContext<PickerContextValue>({
  siblingCount: DEFAULT_SIBLING_COUNT,
  optionHeight: DEFAULT_OPTION_HEIGHT,
})

export default PickerContext
