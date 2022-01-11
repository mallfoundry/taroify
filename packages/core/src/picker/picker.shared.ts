import * as _ from "lodash"
import { Key, ReactNode } from "react"
import { isTextElement } from "../utils/validate"

export const DEFAULT_SIBLING_COUNT = 3

export interface PickerOptionObject {
  key?: Key
  index?: number
  value?: any
  disabled?: boolean
  label?: ReactNode
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

export function getPickerOptionKey(option: PickerOptionObject) {
  const { key, value, label, children } = option
  const newKey = key ?? value ?? label
  if (_.isUndefined(newKey) && isTextElement(children)) {
    return children
  }
  return newKey
}
