import * as _ from "lodash"
import { useCallback, useMemo, useState } from "react"
import useToRef from "../use-to-ref"
import { AreaData, AreaDivision, getAreaData } from "./area.shared"

type AreaFormatter = (record?: Record<string, string>, prefix?: any) => AreaDivision[]

const DEFAULT_AREA_DATA: AreaData = {
  province_list: {},
  city_list: {},
  county_list: {},
}

function defaultFormatter(list?: Record<string, string>): AreaDivision[] {
  return _.map(list, (label, value) => ({ value, label, children: label }))
}

function padAreaPrefixToValue(prefix: any) {
  return _.padEnd(prefix, 6, "0")
}

function filterAreaList(list?: Record<string, string>, prefix?: string) {
  const newRecord: Record<string, string> = {}
  _.forEach(list, (name, code) => {
    if (_.startsWith(code, prefix)) {
      newRecord[code] = name
    }
  })
  return newRecord
}

function getAreaPrefix(value: any, depth: number) {
  return value?.substring(0, depth * 2)
}

function getFirstDivisionPrefix(divisions: AreaDivision[], depth: number) {
  return getAreaPrefix(_.first(divisions)?.value, depth)
}

function getAreaPrefixValue(
  prefixes: string[],
  divisions: AreaDivision[],
  values: any[],
  index: number,
) {
  const value = _.get(values, index)
  const depth = index + 1
  const valuePrefix = getAreaPrefix(value, depth)

  if (index === 0) {
    prefixes[index] = valuePrefix ?? getFirstDivisionPrefix(divisions, depth)
  } else {
    const valueSuperiorPrefix = value?.substring(0, index * 2)
    const superiorPrefix = prefixes[index - 1]
    // prefixes[index] =
    //   superiorPrefix !== valueSuperiorPrefix ? getFirstDivisionPrefix(divisions, depth) : valuePrefix
    // Easy to debug code
    if (superiorPrefix !== valueSuperiorPrefix) {
      prefixes[index] = getFirstDivisionPrefix(divisions, depth)
    } else {
      prefixes[index] = valuePrefix
    }
  }
  return padAreaPrefixToValue(prefixes[index])
}

interface UseAreaSelectOptions {
  data: AreaData
  values: any[]
  depth: number

  formatter: AreaFormatter
}

function doAreaSelect(options: UseAreaSelectOptions) {
  const { values, data: dataPrimitive, depth, formatter } = options
  const data = getAreaData(dataPrimitive, depth)
  //
  const prefixes: string[] = []
  const columns: AreaDivision[] = []
  const nextValues: string[] = []

  _.forEach(data, (record, index) => {
    // const divisions = formatter?.(index === 0 ? record : filterAreaList(record, prefixes[index - 1]))
    // Easy to debug code
    let divisions: AreaDivision[]
    if (index === 0) {
      divisions = formatter?.(record)
    } else {
      divisions = formatter?.(filterAreaList(record, prefixes[index - 1]))
    }
    nextValues[index] = getAreaPrefixValue(prefixes, divisions, values, index)
    columns[index] = { children: divisions }
  })

  return [columns, nextValues]
}

function useAreaSelect(options: UseAreaSelectOptions) {
  const { values, data, depth, formatter } = options
  return useMemo(
    () =>
      doAreaSelect({
        values,
        data,
        depth,
        formatter,
      }),
    [data, depth, formatter, values],
  )
}

function useAreaValues(value: any | any[]) {
  return useMemo(() => (_.isArray(value) ? value : [value]), [value])
}

interface UseAreaOptions {
  depth?: number
  data?: AreaData

  formatter?: AreaFormatter
}

export default function useArea(initialValue: any[] = [], options: UseAreaOptions = {}) {
  const { data = DEFAULT_AREA_DATA, depth = 3, formatter = defaultFormatter } = options
  const [state = [], setValue] = useState<any>(initialValue)
  const values = useAreaValues(state)
  //
  const [columns, value] = useAreaSelect({ values, data, depth, formatter })
  //
  const valueRef = useToRef(value)
  const getValue = useCallback(() => valueRef.current, [valueRef])
  //
  return useMemo(
    () => ({
      columns,
      value,
      getValue,
      setValue,
    }),
    [columns, getValue, value],
  )
}
