import * as React from "react"
import type { ReactNode } from "react"
import CellBase from "./cell-base"
import CellBrief from "./cell-brief"
import CellTitle from "./cell-title"
import CellValue from "./cell-value"
import type { CellBaseProps } from "./cell.shared"

export interface CellProps extends CellBaseProps {
  title?: ReactNode
  brief?: ReactNode
}

function Cell(props: CellProps) {
  const { title, brief, children, titleStyle, titleClass, valueClass, briefClass, ...restProps } =
    props
  return (
    <CellBase {...restProps}>
      {title && (
        <CellTitle titleStyle={titleStyle} titleClass={titleClass}>
          {title}
          {brief && <CellBrief children={brief} briefClass={briefClass} />}
        </CellTitle>
      )}
      <CellValue alone={!title} children={children} />
    </CellBase>
  )
}

export default Cell
