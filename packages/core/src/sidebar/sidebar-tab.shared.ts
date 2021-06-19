import { ReactNode } from "react"

export type SidebarTabKey = string | number | undefined

export interface SidebarTabEvent {
  key?: SidebarTabKey
  index?: number
  title?: ReactNode
  disabled?: boolean
  active?: boolean
}
