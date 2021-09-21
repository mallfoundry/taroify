import { createContext } from "react"

interface PickerContextValue {
  onConfirm?(): void

  onCancel?(): void
}

const PickerContext = createContext<PickerContextValue>({})

export default PickerContext
