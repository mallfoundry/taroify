import { ReactNode } from "react"

export enum TabsTheme {
  Line = "line",
  Card = "card",
}

export type TabsThemeString = "line" | "card"

export type TabKey = string | number | undefined

export interface TabEvent {
  key?: any
  index?: number
  disabled?: boolean
  title?: ReactNode
}

export interface TabObject {
  key?: any
  index?: number
  disabled?: boolean
  title?: ReactNode
}
