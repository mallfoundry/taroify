import * as _ from "lodash"
import { useEffect, useMemo } from "react"
import useToRef from "../use-to-ref"
import { CascaderOption, findCascadeOption } from "./use-cascader.shared"

interface UseCascadeSelectOptions {
  data: CascaderOption[]
  value: any[]
  depth: number
}

function doCascadeSelect({ value: values, data: options }: UseCascadeSelectOptions) {
  const newValues: any[] = []
  const newColumns: CascaderOption[] = []
  newColumns.push({ children: options })

  let cursorOptions: CascaderOption[] = options
  let depth = 0

  for (;;) {
    const value = _.get(values, depth)
    const nextOption = findCascadeOption(cursorOptions, value, true)
    if (_.isUndefined(nextOption)) {
      break
    }
    const { value: newValue, children: nextOptions } = nextOption
    newValues.push(newValue)
    if (!nextOptions || _.isEmpty(nextOptions)) {
      break
    }
    newColumns.push(nextOption)
    cursorOptions = nextOptions
    depth++
  }

  return [newColumns, newValues]
}

function useCascadeSelect(options: UseCascadeSelectOptions) {
  const { value, data, depth } = options
  return useMemo(
    () =>
      doCascadeSelect({
        value,
        data,
        depth,
      }),
    [data, depth, value],
  )
}

export interface UseCascaderNewOptions {
  value?: any[]
  depth?: number
  data?: CascaderOption[]

  onChange?(value: any[]): void
}

export interface CascaderObjectNew {
  columns: CascaderOption[]
}

export default function useCascaderNew({
  value: values = [],
  depth: maxDepth = 0,
  data = [],
  onChange,
}: UseCascaderNewOptions): CascaderObjectNew {
  maxDepth = _.clamp(maxDepth, 0, maxDepth)
  const onChangeRef = useToRef(onChange)
  const [columns, newValues] = useCascadeSelect({ value: values, depth: maxDepth, data })

  useEffect(() => {
    if (maxDepth !== 0 && maxDepth > _.size(columns)) {
      _.range(maxDepth - _.size(columns))
        .map(() => [])
        .forEach((e) => columns.push(e))
    }

    if (!_.isEqual(values, newValues)) {
      onChangeRef.current?.(newValues)
    }
  }, [columns, maxDepth, newValues, onChangeRef, values])

  return {
    columns,
  }
}
