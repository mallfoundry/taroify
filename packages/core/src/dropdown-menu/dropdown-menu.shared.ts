import * as React from "react"
import { ReactNode } from "react"

export enum DropdownMenuDirection {
  Up = "up",
  Down = "down",
}

export type DropdownMenuKey = React.Key | undefined

export type DropdownMenuValue = number | string | undefined

export type DropdownMenuValues = number[] | string[]

export interface DropdownMenuOptionEvent {
  active: boolean
  value: DropdownMenuValue
  children?: ReactNode
}
