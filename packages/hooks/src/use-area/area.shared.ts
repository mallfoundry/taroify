import * as _ from "lodash"
import { ReactNode } from "react"

export interface AreaData {
  province_list: Record<string, string>
  city_list: Record<string, string>
  county_list: Record<string, string>
}

export interface AreaDivision extends Record<any, any> {
  index: number
  value?: any
  label?: ReactNode
  children?: AreaDivision[] | ReactNode
}

export function getAreaData(data: AreaData, maxDepth: number) {
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
