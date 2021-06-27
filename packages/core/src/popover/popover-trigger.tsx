import * as React from "react"
import { ReactNode } from "react"

interface PopoverTriggerProps {
  children?: ReactNode
}

function PopoverTrigger(props: PopoverTriggerProps) {
  const { children } = props
  return <>{children}</>
}

export default PopoverTrigger
