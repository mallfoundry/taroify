import { ReactNode } from "react"
import Sidebar from "../sidebar"

export type TreeSelectTabKey = number | string | undefined

export type TreeSelectTabEvent = Sidebar.TabEvent

export type TreeSelectOptionValue = string | number | undefined

export interface TreeSelectOptionEvent {
  active: boolean
  value: TreeSelectOptionValue
  children?: ReactNode
}
