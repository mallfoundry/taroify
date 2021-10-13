import { ReactNode } from "react"

export type SidebarTabKey = string | number | undefined

export interface SidebarTabObject {
  value?: any
  children?: ReactNode
  disabled?: boolean
}
