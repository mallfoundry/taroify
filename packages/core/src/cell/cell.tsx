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
  titleClass?: ViewProps["className"]
  titleStyle?: ViewProps["style"]
  valueClass?: ViewProps["className"]
  briefClass?: ViewProps["className"]
}

function Cell(props: CellProps) {
  const { title, brief, children, titleClass, titleStyle, valueClass, briefClass, ...restProps } =
    props
  return (
    <CellBase {...restProps}>
      {title && (
        <CellTitle className={titleClass} style={titleStyle}>
          {title}
          {brief && <CellBrief children={brief} className={briefClass} />}
        </CellTitle>
      )}
      {children === undefined || children === null ? null : (
        <CellValue alone={!title} children={children} className={valueClass} />
      )}
    </CellBase>
  )
}

export default Cell
