import * as _ from "lodash"
import { ReactNode, useEffect, useMemo } from "react"
import useToRef from "../use-to-ref"

const DEFAULT_AREA_DATA: AreaData = {
  province_list: {},
  city_list: {},
  county_list: {},
}

const FIRST_PROVINCE_PREFIX = "11"

interface AreaData {
  province_list: Record<string, string>
  city_list: Record<string, string>
  county_list: Record<string, string>
}

interface AreaDivision extends Record<any, any> {
  value?: any
  label?: ReactNode
  children?: AreaDivision[] | ReactNode
}

function defaultFormatter(list: Record<string, string>): AreaDivision[] {
  return _.map(list, (label, value) => ({ value, label, children: label }))
}

function nextFirstValuePrefix(prefix: string) {
  return prefix + "01"
}

function padAreaPrefixToValue(prefix: any) {
  return _.padEnd(prefix, 6, "0")
}

function getAreaPrefixesAndValues(values: any[], size: number) {
  const prefixes: string[] = []
  const newValues: string[] = []

  for (let index = 0; index < size; index++) {
    const depth = index + 1
    const indexValue = _.get(values, index)
    const valuePrefix = indexValue?.substring(0, depth * 2)
    if (index === 0) {
      prefixes[index] = valuePrefix ?? FIRST_PROVINCE_PREFIX
    } else {
      const valueSuperiorPrefix = indexValue?.substring(0, index * 2)
      const superiorPrefix = prefixes[index - 1]
      // prefixes[index] =
      //   superiorPrefix !== valueSuperiorPrefix ? nextFirstValuePrefix(superiorPrefix) : valuePrefix
      // Easy to debug code
      if (superiorPrefix !== valueSuperiorPrefix) {
        prefixes[index] = nextFirstValuePrefix(superiorPrefix)
      } else {
        prefixes[index] = valuePrefix
      }
    }
    newValues[index] = padAreaPrefixToValue(prefixes[index])
  }
  return [prefixes, newValues]
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

function getAreaData(data: AreaData, maxDepth: number) {
  const { province_list, city_list, county_list } = data
  const dataArray: Record<any, any>[] = []
  if (maxDepth >= 1 && !_.isEmpty(province_list)) {
    dataArray.push(province_list)
    if (maxDepth >= 2 && !_.isEmpty(city_list)) {
      dataArray.push(city_list)
      if (maxDepth >= 3 && !_.isEmpty(county_list)) {
        dataArray.push(county_list)
      }
    }
  }
  return dataArray
}

interface UseAreaSelectOptions {
  data: AreaData
  value: any[]
  depth: number

  formatter(record?: Record<string, string>): AreaDivision[]
}

function doAreaSelect(options: UseAreaSelectOptions) {
  const { value: values, data: dataPrimitive, depth, formatter } = options
  const data = getAreaData(dataPrimitive, depth)
  const [prefixes, newValues] = getAreaPrefixesAndValues(values, depth)
  const columns = _.map(data, (record, index) => ({
    children:
      index === 0
        ? formatter?.(record) //
        : formatter?.(filterAreaList(record, prefixes[index - 1])),
  }))

  return [columns, newValues]
}

function useAreaSelect(options: UseAreaSelectOptions) {
  const { value, data, depth, formatter } = options
  return useMemo(
    () =>
      doAreaSelect({
        value,
        data,
        depth,
        formatter,
      }),
    [data, depth, formatter, value],
  )
}

function useAreaValues(value: any | any[]) {
  return useMemo(() => (_.isArray(value) ? value : [value]), [value])
}

interface UseVanAreaOptions {
  value?: any[]
  depth?: number
  data?: AreaData

  formatter?(record?: Record<string, string>): AreaDivision[]

  onChange?(value: any[]): void
}

export default function useArea(options: UseVanAreaOptions) {
  const {
    value = [],
    data = DEFAULT_AREA_DATA,
    depth = 3,
    formatter = defaultFormatter,
    onChange,
  } = options
  const onChangeRef = useToRef(onChange)
  const values = useAreaValues(value)

  const [columns, newValues] = useAreaSelect({ value: values, data, depth, formatter })

  useEffect(() => {
    if (!_.isEqual(value, newValues)) {
      onChangeRef.current?.(newValues)
    }
  }, [newValues, onChangeRef, value])

  return {
    columns,
  }
}
