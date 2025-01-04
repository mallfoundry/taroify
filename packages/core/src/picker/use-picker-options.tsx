import * as _ from "lodash"
import { isValidElement, type ReactElement, type ReactNode, useMemo } from "react"
import Children from "../utils/children"
import { isTextElement } from "../utils/validate"
import type { PickerOptionProps } from "./picker-option"
import type { PickerOptionObject } from "./picker.shared"

function elementToObject(
  element: any,
  index: number,
  depth: number,
  maxDepth: number,
): PickerOptionObject | undefined {
  if (isValidElement(element)) {
    const { props } = element as ReactElement<PickerOptionProps>
    const { value, label, children, ...restProps } = props
    const textChildren = isTextElement(children) ? children : undefined
    return {
      index,
      value: value ?? label ?? textChildren,
      label: label ?? textChildren,
      children:
        isTextElement(children) || depth === maxDepth
          ? children
          : (mapToChildrenOptions(children, depth + 1, maxDepth) as ReactNode),
      ...restProps,
    }
  }
  if (_.isPlainObject(element)) {
    return element as PickerOptionObject
  }
}

function mapToOption(
  nodeOrObject: any,
  index: number,
  depth: number,
  maxDepth: number,
): PickerOptionObject | undefined {
  return elementToObject(nodeOrObject, index, depth, maxDepth)
}

export function mapToChildrenOptions(children: ReactNode, depth: number, maxDepth: number) {
  return Children.map<PickerOptionObject | undefined, ReactNode>(children, (child, index) => {
    return mapToOption(child, index, depth, maxDepth)
  })
}

interface UsePickerOptionsOptions {
  depth?: number
}

function usePickerOptions(children: ReactNode = undefined, options: UsePickerOptionsOptions = {}) {
  const { depth = 1 } = options
  return useMemo(() => mapToChildrenOptions(children, 0, depth), [depth, children])
}

export default usePickerOptions
