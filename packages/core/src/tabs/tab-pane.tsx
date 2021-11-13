import { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import { ReactNode } from "react"

interface TabPaneProps extends ViewProps {
  className?: string
  value?: any
  classNames?: { title: string }
  title?: ReactNode
  disabled?: boolean
  dot?: boolean
  badge?: ReactNode
  children?: ReactNode
}

export default function TabPane(props: TabPaneProps) {
  return <></>
}
