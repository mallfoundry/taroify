import * as _ from "lodash"
import { useEffect, useState, useRef } from "react"
import { CascaderOption } from "./use-cascader.shared"
interface CascaderFieldNames {
  label?: string
  value?: string
  children?: string
}

export interface UseCascaderOldOptions {
  value?: any[]
  depth?: number
  options?: CascaderOption[]
  /** @deprecated 请不要设置这个属性 */
  fieldNames?: CascaderFieldNames
  /** @deprecated 请不要设置这个属性 */
  refreshKey?: number
}

export interface CascaderObjectOld {
  columns: CascaderOption[][]
}

const emptyArr = []
const defaultFieldNames: CascaderFieldNames = {
  label: "label",
  value: "value",
  children: "children"
}

export default function useCascaderOld({
  value: values = emptyArr,
  depth = 0,
  options,
  fieldNames = defaultFieldNames,
  refreshKey = 0
}: UseCascaderOldOptions): CascaderObjectOld {
  depth = _.clamp(depth, 0, depth)
  const cacheMapRef = useRef(new Map())
  const [columns, setColumns] = useState<CascaderOption[][]>([])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cacheMapRef.current.clear();
    }
  }, [options])

  useEffect(() => {
    if (options === undefined) {
      return
    }

    const newColumns: CascaderOption[][] = []
    newColumns.push(options)

    if (!_.isEmpty(values)) {
      let cursorOptions: CascaderOption[] = options

      for (const value of values) {
        if (!cacheMapRef.current.has(value)) {
          cursorOptions.forEach(item => {
            cacheMapRef.current.set(item[fieldNames.value!], item)
          })
        }
        const nextOption = cacheMapRef.current.get(value)
        if (_.isUndefined(nextOption)) {
          break
        }
        const nextOptions = nextOption[fieldNames.children!]
        if (!nextOptions || _.isEmpty(nextOptions)) {
          break
        }
        cursorOptions = nextOptions
        newColumns.push(nextOptions)
      }
    }
    if (depth !== 0 && depth > _.size(newColumns)) {
      _.range(depth - _.size(newColumns))
        .forEach(() => newColumns.push([]))
    }
    setColumns(newColumns)
  }, [depth, options, values, fieldNames, refreshKey])

  return {
    columns,
  }
}
