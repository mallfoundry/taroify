import { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import { ReactNode } from "react"
import CellBase from "./cell-base"
import CellBrief from "./cell-brief"
import CellTitle from "./cell-title"
import CellValue from "./cell-value"
import { CellAlign, CellSize } from "./cell.shared"

export interface CellProps extends ViewProps {
  size?: CellSize
  align?: CellAlign
  title?: ReactNode
  brief?: ReactNode
  icon?: ReactNode
  rightIcon?: ReactNode
  bordered?: boolean
  clickable?: boolean
  children?: ReactNode
}

function Cell(props: CellProps) {
  const { title, brief, children, ...restProps } = props
  return (
    <CellBase {...restProps}>
      {title && (
        <CellTitle>
          {title}
          {brief && <CellBrief children={brief} />}
        </CellTitle>
      )}
      <CellValue alone={!title} children={children} />
    </CellBase>
  )
}

export default Cell
