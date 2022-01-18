import * as _ from "lodash"
import { useCallback, useEffect, useMemo, useRef } from "react"
import useForceUpdate from "../use-force-update"
import useToRef from "../use-to-ref"
import { AreaData, AreaDivision, getAreaData } from "./area.shared"

export type AreaFormatter = (record?: Record<string, string>, prefix?: any) => AreaDivision[]

const DEFAULT_AREA_DATA: AreaData = {
  province_list: {},
  city_list: {},
  county_list: {},
}

function defaultFormatter(list?: Record<string, string>): AreaDivision[] {
  let index = 0
  return _.map(list, (label, value) => ({ index: index++, value, label, children: label }))
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

function getAreaPrefixDivision(
  prefixes: string[],
  divisions: AreaDivision[],
  values: any[],
  index: number,
): AreaDivision {
  const value = _.get(values, index)
  const depth = index + 1
  const valuePrefix = getAreaPrefix(value, depth)

  if (index === 0) {
    prefixes[index] = valuePrefix ?? getFirstDivisionPrefix(divisions, depth)
  } else {
    const valueSuperiorPrefix = value?.substring(0, index * 2)
    const superiorPrefix = prefixes[index - 1]
    // Easy to debug code
    if (superiorPrefix !== valueSuperiorPrefix) {
      prefixes[index] = getFirstDivisionPrefix(divisions, depth)
    } else {
      prefixes[index] = valuePrefix
    }
  }
  const valuePad = padAreaPrefixToValue(prefixes[index])
  return _.find(divisions, (division) => division.value === valuePad) as AreaDivision
}

interface UseAreaSelectOptions {
  data: AreaData
  unverifiedValues: any[]
  depth: number

  formatter: AreaFormatter
}

function doAreaSelect(options: UseAreaSelectOptions) {
  const { unverifiedValues, data: dataPrimitive, depth, formatter } = options
  const data = getAreaData(dataPrimitive, depth)
  //
  const prefixes: string[] = []
  const columns: AreaDivision[] = []
  const nextValueOptions: AreaDivision[] = []
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
    const division = getAreaPrefixDivision(prefixes, divisions, unverifiedValues, index)
    nextValueOptions[index] = division
    nextValues[index] = division.value
    columns[index] = {
      index,
      children: divisions,
    }
  })
  return {
    columns,
    values: nextValues,
    valueOptions: nextValueOptions,
  }
}

function useAreaSelect(options: UseAreaSelectOptions) {
  const { unverifiedValues, data, depth, formatter } = options
  return useMemo(
    () =>
      doAreaSelect({
        unverifiedValues,
        data,
        depth,
        formatter,
      }),
    [data, depth, formatter, unverifiedValues],
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

export default function useArea(unverifiedValue: any[] = [], options: UseAreaOptions = {}) {
  const { data = DEFAULT_AREA_DATA, depth = 3, formatter = defaultFormatter } = options
  const unverifiedValueRef = useRef(unverifiedValue)
  const forceUpdate = useForceUpdate()
  const unverifiedValues = useAreaValues(unverifiedValueRef.current)
  //
  const { columns, values, valueOptions } = useAreaSelect({
    unverifiedValues,
    data,
    depth,
    formatter,
  })
  //
  const valuesRef = useToRef(values)
  const valueOptionsRef = useToRef(valueOptions)
  const getValues = useCallback(() => valuesRef.current, [valuesRef])
  const getValueOptions = useCallback(() => valueOptionsRef.current, [valueOptionsRef])

  const setValues = useCallback(
    (newValues: any[]) => {
      unverifiedValueRef.current = newValues
      forceUpdate()
    },
    [forceUpdate],
  )
  //
  useEffect(() => {
    if (!_.isEqual(valuesRef.current, unverifiedValue)) {
      setValues(unverifiedValue)
    }
  }, [setValues, unverifiedValue, valuesRef])
  //
  return useMemo(
    () => ({
      columns,
      values,
      valueOptions,
      getValues,
      getValueOptions,
      setValues,
    }),
    [columns, getValueOptions, getValues, setValues, valueOptions, values],
  )
}
