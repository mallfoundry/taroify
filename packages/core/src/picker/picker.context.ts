import { createContext } from "react"
import { DEFAULT_SIBLING_COUNT, PickerOptionObject } from "./picker.shared"

interface PickerContextValue {
  values?: any[]
  readonly?: boolean
  siblingCount: number

  onColumnChange?(
    option: PickerOptionObject,
    column: PickerOptionObject,
    emitChange?: boolean,
  ): void

  onConfirm?(): void

  onCancel?(): void
}

const PickerContext = createContext<PickerContextValue>({
  siblingCount: DEFAULT_SIBLING_COUNT,
})

export default PickerContext
