import { ViewProps } from "@tarojs/components/types/View"
import * as _ from "lodash"
import { Key, ReactNode } from "react"

export interface CascaderOptionObject extends ViewProps {
  key?: Key
  tabIndex: number
  className?: string
  value?: any
  disabled?: boolean
  children?: ReactNode
}

export interface CascaderTabObject {
  className?: string
  options?: CascaderOptionObject[]
}

export type CascaderThemeVars = {
  cascaderActiveColor?: string
  cascaderHeaderHeight?: string
  cascaderHeaderPadding?: string
  cascaderHeaderFontSize?: string
  cascaderHeaderFontWeight?: string
  cascaderHeaderLineHeight?: string
  cascaderTabsHeight?: string
  cascaderTabFontWeight?: string
  cascaderTabColor?: string
  cascaderInactiveTabColor?: string
  cascaderOptionsHeight?: string
  cascaderOptionPadding?: string
  cascaderOptionFontSize?: string
  cascaderOptionLineHeight?: string
  cascaderOptionActiveBackgroundColor?: string
  cascaderDisabledOptionColor?: string
  cascaderActiveOptionColor?: string
  cascaderActiveOptionFontWeight?: string
  cascaderActiveIconFontSize?: string
}

export function isActiveOption(option: CascaderOptionObject, values: any[]) {
  return _.get(values, option.tabIndex) === option.value
}
