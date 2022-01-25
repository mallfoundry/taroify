import * as _ from "lodash"
import { useEffect, useState } from "react"
import { CascaderOption, findCascadeOption } from "./use-cascader.shared"

export interface UseCascaderOldOptions {
  value?: any[]
  depth?: number
  options?: CascaderOption[]
}

export interface CascaderObjectOld {
  columns: CascaderOption[][]
}

export default function useCascaderOld({
  value: values = [],
  depth = 0,
  options = [],
}: UseCascaderOldOptions): CascaderObjectOld {
  depth = _.clamp(depth, 0, depth)
  const [columns, setColumns] = useState<CascaderOption[][]>([])

  useEffect(() => {
    if (_.isEmpty(options)) return
    const newColumns: CascaderOption[][] = []
    newColumns.push(options)

    if (!_.isEmpty(values)) {
      let cursorOptions: CascaderOption[] = options

      for (const value of values) {
        const nextOption = findCascadeOption(cursorOptions, value)
        if (_.isUndefined(nextOption)) {
          break
        }
        const { children: nextOptions } = nextOption
        if (!nextOptions || _.isEmpty(nextOptions)) {
          break
        }
        cursorOptions = nextOptions
        newColumns.push(nextOptions)
      }
    }
    if (depth !== 0 && depth > _.size(newColumns)) {
      _.range(depth - _.size(newColumns))
        .map(() => [])
        .forEach((e) => newColumns.push(e))
    }
    setColumns(newColumns)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depth, JSON.stringify(options), values])

  return {
    columns,
  }
}
