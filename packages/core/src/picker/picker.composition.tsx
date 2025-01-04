import type { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import type { ReactNode } from "react"

export interface PickerColumnProps extends ViewProps {
  className?: string
  readonly?: boolean
  children?: ReactNode
}

export function PickerColumn(props: PickerColumnProps) {
  return <></>
}
