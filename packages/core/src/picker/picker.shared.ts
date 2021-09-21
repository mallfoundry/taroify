import { Key, ReactNode } from "react"

export interface PickerOptionObject {
  index?: number
  value?: any
  disabled?: boolean
  children?: ReactNode

  // for custom filed names
  [key: string]: any
}

export interface PickerColumnObject {
  key: Key
  index?: number
  options: PickerOptionObject[]

  // for custom filed names
  [key: string]: any
}
