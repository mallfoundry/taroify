import * as _ from "lodash"
import { useEffect, useState, useRef } from "react"
import { CascaderOption } from "./use-cascader.shared"

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
  const cacheMapRef = useRef(new Map())
  const cachedKeyRef = useRef<string[]>([])
  const [columns, setColumns] = useState<CascaderOption[][]>([])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cacheMapRef.current.clear();
      cachedKeyRef.current = [];
    }
  }, [options])

  useEffect(() => {
    const newColumns: CascaderOption[][] = []
    newColumns.push(options)

    if (!_.isEmpty(values)) {
      let cursorOptions: CascaderOption[] = options

      for (const value of values) {
        if (!cacheMapRef.current.has(value)) {
          cursorOptions.forEach(item => {
            cacheMapRef.current.set(item.value, item)
          })
        }
        const nextOption = cacheMapRef.current.get(value)
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
        .forEach((e) => newColumns.push([]))
    }
    setColumns(newColumns)
  }, [depth, options, values])

  return {
    columns,
  }
}
