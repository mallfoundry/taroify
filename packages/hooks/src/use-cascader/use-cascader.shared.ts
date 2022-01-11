import { ViewProps } from "@tarojs/components/types/View"
import * as _ from "lodash"
import { ReactNode } from "react"

export interface CascaderOption extends ViewProps {
  value?: any
  label?: ReactNode
  disabled?: boolean
  children?: CascaderOption[]
}

export function findCascadeOption(
  options: CascaderOption[],
  value: any,
  defaultFirst: boolean = false,
): CascaderOption | undefined {
  const option = _.find(options, (option) => option.value === value)
  return _.isUndefined(option) && defaultFirst ? _.first(options) : option
}
