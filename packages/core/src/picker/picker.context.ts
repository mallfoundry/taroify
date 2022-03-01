import { createContext } from "react"
import { SetRefCallback } from "../utils/state"
import { DEFAULT_SIBLING_COUNT, PickerColumnInstance, PickerOptionObject } from "./picker.shared"

interface PickerContextValue {
  values?: any[]
  readonly?: boolean
  siblingCount: number

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
})

export default PickerContext
