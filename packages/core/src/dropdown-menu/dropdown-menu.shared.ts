import { ReactNode } from "react"

export type DropdownMenuDirection = "up" | "down"

export interface DropdownMenuOptionEvent {
  active: boolean
  value: any
  children?: ReactNode
}
