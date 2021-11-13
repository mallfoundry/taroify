import { Key, ReactNode } from "react"

export type TabsTheme = "line" | "card"

export interface TabEvent {
  value?: any
  title?: ReactNode
  disabled?: boolean
}

export interface TabObject {
  key: Key
  index: number
  value: any
  className?: string
  classNames?: { title: string }
  title?: ReactNode
  disabled?: boolean
  dot?: boolean
  badge?: ReactNode
  children?: ReactNode
}
