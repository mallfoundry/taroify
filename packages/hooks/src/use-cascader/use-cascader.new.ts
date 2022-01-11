import * as _ from "lodash"
import { useCallback, useEffect, useRef, useState } from "react"
import { CascaderOption, findCascadeOption } from "./use-cascader.shared"

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
  data: options = [],
  onChange,
}: UseCascaderNewOptions): CascaderObjectNew {
  maxDepth = _.clamp(maxDepth, 0, maxDepth)
  const [columns, setColumns] = useState<CascaderOption[]>([])

  // eventRef
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const doCascadeSelect = useCallback(() => {
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
  }, [options, values])

  useEffect(() => {
    const [newColumns, newValues] = doCascadeSelect()

    if (maxDepth !== 0 && maxDepth > _.size(newColumns)) {
      _.range(maxDepth - _.size(newColumns))
        .map(() => [])
        .forEach((e) => newColumns.push(e))
    }

    if (!_.isEqual(values, newValues)) {
      onChangeRef.current?.(newValues)
      setColumns(newColumns)
    }
  }, [doCascadeSelect, maxDepth, options, values])

  return {
    columns,
  }
}
