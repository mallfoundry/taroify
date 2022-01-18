import { createContext } from "react"
import { DEFAULT_SIBLING_COUNT, PickerOptionObject } from "./picker.shared"

interface PickerContextValue {
  values?: any[]
  readonly?: boolean
  siblingCount: number

  isMultiValue?(): boolean

  getValueOptions?(): PickerOptionObject[]

  onColumnChange?(
    option: PickerOptionObject,
    column: PickerOptionObject,
    emitChange?: boolean,
  ): void

  onChange?(values: any, option: PickerOptionObject, column: PickerOptionObject): void

  onConfirm?(): void

  onCancel?(): void
}

const PickerContext = createContext<PickerContextValue>({
  siblingCount: DEFAULT_SIBLING_COUNT,
})

export default PickerContext
