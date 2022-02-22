import * as _ from "lodash"
import { Key, ReactNode } from "react"
import { isTextElement } from "../utils/validate"

export const DEFAULT_SIBLING_COUNT = 3

const DEFAULT_COLUMN_INDEX = 0

export interface PickerOptionObject extends Record<string, any> {
  key?: Key
  index: number
  value?: any
  disabled?: boolean
  label?: ReactNode
  children?: ReactNode
}

export interface PickerColumnInstance {
  stopMomentum(): void
}

export function validPickerColumn(column: PickerOptionObject) {
  const { index } = column
  return _.isNumber(index) && _.gte(index, DEFAULT_COLUMN_INDEX) ? column : undefined
}

export function getPickerOptionKey(option: PickerOptionObject) {
  const { key, value, label, children } = option
  const newKey = key ?? value ?? label
  if (_.isUndefined(newKey) && isTextElement(children)) {
    return children
  }
  return newKey
}

export function getPickerValue(values: any, multiColumns: boolean): any {
  return multiColumns ? values : _.first(values)
}
