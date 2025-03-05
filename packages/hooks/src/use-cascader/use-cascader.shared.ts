import type { ViewProps } from "@tarojs/components/types/View"
import * as _ from "lodash"
import type { ReactNode } from "react"

export interface CascaderOption extends Omit<ViewProps, "children"> {
  value?: any
  label?: ReactNode
  disabled?: boolean
  children?: CascaderOption[]
}

export function findCascadeOption(
  options: CascaderOption[],
  value: any,
  defaultFirst = false,
): CascaderOption | undefined {
  const option = _.find(options, (option) => option.value === value)
  return _.isUndefined(option) && defaultFirst ? _.first(options) : option
}
