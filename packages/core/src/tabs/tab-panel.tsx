import type { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import type { ReactNode } from "react"

interface TabPanelProps extends ViewProps {
  className?: string
  value?: any
  classNames?: { title: string }
  title?: ReactNode
  disabled?: boolean
  dot?: boolean
  badge?: ReactNode
  children?: ReactNode
}

export default function TabPanel(props: TabPanelProps) {
  return <></>
}
