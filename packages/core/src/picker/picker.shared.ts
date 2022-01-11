import { Key, ReactNode } from "react"

export const DEFAULT_SIBLING_COUNT = 3

export type PickerMode = "flat" | "cascade"

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
  children?: PickerOptionObject[]

  // for custom filed names
  [key: string]: any
}
