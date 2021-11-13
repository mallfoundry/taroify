import { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import { ReactNode } from "react"

interface CascaderOptionProps extends ViewProps {
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
