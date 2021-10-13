import { ReactNode } from "react"
import Sidebar from "../sidebar"

export type TreeSelectTabObject = Sidebar.TabObject

export interface TreeSelectOptionObject {
  active: boolean
  disabled: boolean
  value: any
  children?: ReactNode
}
