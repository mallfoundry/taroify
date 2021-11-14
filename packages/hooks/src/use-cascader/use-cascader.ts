import * as _ from "lodash"
import { ReactNode, useCallback, useEffect, useState } from "react"

interface CascaderColumn {
  value?: any
  label?: ReactNode
  disabled?: boolean
}

interface CascaderOption extends CascaderColumn {
  children?: CascaderOption[]
}

interface UseCascaderOptions {
  value?: any[]
  depth?: number
  options: CascaderOption[]
}

interface CascaderObject {
  columns: CascaderOption[][]
}

export default function useCascader({
  value: values = [],
  depth = 0,
  options,
}: UseCascaderOptions): CascaderObject {
  depth = _.clamp(depth, 0, depth)
  const [columns, setColumns] = useState<CascaderOption[][]>([])

  const findOption = useCallback(
    (options: CascaderOption[], value: any) =>
      _.find(options, (option) => option.value === value) ?? {},
    [],
  )

  useEffect(() => {
    const newColumns: CascaderOption[][] = []
    newColumns.push(options)

    if (!_.isEmpty(values)) {
      let cursorOptions: CascaderOption[] = options

      for (const value of values) {
        const { children: nextOptions } = findOption(cursorOptions, value)
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
  }, [depth, findOption, options, values])

  return {
    columns,
  }
}
