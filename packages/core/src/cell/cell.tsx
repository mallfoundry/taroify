import { ITouchEvent } from "@tarojs/components"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import BaseCell from "./base-cell"
import { CellAlign, CellAlignString, CellSize, CellSizeString } from "./cell.shared"

export interface CellProps {
  className?: string
  style?: CSSProperties
  size?: CellSize | CellSizeString
  align?: CellAlign | CellAlignString
  title?: ReactNode
  brief?: ReactNode
  icon?: ReactNode
  rightIcon?: ReactNode
  bordered?: boolean
  clickable?: boolean
  children?: ReactNode
  onClick?: (event: ITouchEvent) => void
}

function Cell(props: CellProps) {
  return <BaseCell {...props} />
}

export default Cell
