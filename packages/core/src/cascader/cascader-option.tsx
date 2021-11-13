import * as React from "react"
import { ReactNode } from "react"

interface CascaderOptionProps {
  className?: string
  value?: any
  disabled?: boolean
  children?: ReactNode
}

function CascaderOption(props: CascaderOptionProps): JSX.Element

function CascaderOption() {
  return <></>
}

export default CascaderOption
