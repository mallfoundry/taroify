import * as React from "react"
import { useMemo, useRef, Children, type ReactElement } from "react"
import { useUncontrolled } from "@taroify/hooks"
import Picker from "../picker"
import type { PickerBaseProps } from "../picker/picker"
import type { PickerOptionData, PickerOptionObject } from "../picker/picker.shared"
import { isElementOf } from "../utils/validate"
import { useMemoizedFn } from "../hooks"
import type { AreaData } from "./area-picker.shared"
import { formatDataForCascade } from "./area-picker.shared"
import AreaPickerColumns from "./area-picker-columns"

export type AreaPickerProps = Omit<PickerBaseProps, "columns" | "columnsFieldNames"> & {
  depth?: number
  areaList?: AreaData
  defaultValue?: string[]
  value?: string[]

  onChange?(values: string[], option: PickerOptionObject, column: PickerOptionObject): void

  onConfirm?(values: string[], option: PickerOptionObject[]): void

  onCancel?(values: string[], option: PickerOptionObject[]): void
}

const defaultAreaList = {}

function AreaPicker({
  areaList: areaListProp,
  depth: depthProp,
  children: childrenProps,
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  onConfirm: onConfirmProp,
  onCancel: onCancelProp,
  ...restProps
}: AreaPickerProps) {
  const hasChange = useRef(false)
  const { value, setValue } = useUncontrolled({
    value: valueProp,
    defaultValue,
  })
  const [areaList, columnsNum] = useMemo(() => {
    let __areaList__ = areaListProp || defaultAreaList
    Children.forEach(childrenProps, (child) => {
      if (isElementOf(child, AreaPickerColumns)) {
        __areaList__ = (child as ReactElement).props.children
      }
    })

    return [__areaList__, depthProp || 3]
  }, [childrenProps, areaListProp, depthProp])

  const [origin, provinceMap, cityMap] = useMemo(
    () =>
      formatDataForCascade({
        // @ts-ignore
        areaList,
        columnsNum,
      }),
    [areaList, columnsNum],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const columns = useMemo(() => {
    const ret: PickerOptionData[] = [origin]
    let parent = origin
    for (let i = 0; i < columnsNum - 1; i++) {
      let selected: PickerOptionData | undefined
      if (value?.[i]) {
        selected = parent.find((item) => item.value === value?.[i])
      } else {
        selected = parent[0]
      }
      parent = selected?.children || []
      ret.push(parent)
    }

    return ret
  }, [origin, value])

  const handleChange = useMemoizedFn((val, option, column) => {
    const valCache = Array.isArray(val) && val.length ? val : [val]

    const idx = valCache.findIndex((item) => item === option.value)
    let newVal: string[] = []
    if (idx === 0) {
      newVal = [valCache[0]]
      if (columnsNum > 1) {
        const province = provinceMap.get(option.value.slice(0, 2))
        const city = province?.children?.[0]
        newVal.push(city?.value)
        if (columnsNum > 2) {
          newVal.push(city?.children?.[0]?.value)
        }
      }
    } else if (idx === 1) {
      const city = cityMap.get(option.value.slice(0, 4))
      newVal = [valCache[0], city?.value]
      if (columnsNum > 2) {
        newVal.push(city?.children?.[0]?.value)
      }
    } else if (idx === 2) {
      newVal = [value?.[0], value?.[1], option.value]
    }
    hasChange.current = true
    setValue(newVal)
    onChangeProp?.(newVal, option, column)
  })

  const genValOption = (valueParam) => {
    const val = (hasChange.current ? value : valueParam) || []
    const province = provinceMap.get(val[0]?.slice(0, 2)) || {}
    const option = [province]
    if (columnsNum > 1) {
      // @ts-ignore
      const { children, ...city } = cityMap.get(val[1]?.slice(0, 4)) || {}
      option.push(city)
      if (columnsNum > 2) {
        const country = children?.find((item) => item.value === val[2])
        option.push(country || {})
      }
    }
    return [val, option]
  }

  const handleConfirm = useMemoizedFn((valueParam) => {
    if (onConfirmProp) {
      const [val, option] = genValOption(valueParam)
      onConfirmProp(val, option)
    }
  })
  const handleCancel = useMemoizedFn((valueParam) => {
    if (onCancelProp) {
      const [val, option] = genValOption(valueParam)
      onCancelProp(val, option)
    }
  })

  return (
    <Picker
      {...restProps}
      children={childrenProps}
      columns={columns}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  )
}

export default AreaPicker
