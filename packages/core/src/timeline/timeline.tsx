import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"

import { prefixClassname } from "../styles"

export interface TimeLineProps extends ViewProps {
  children:ReactNode
}

function TimeLine(props: TimeLineProps) {
  const {children} = props
  return <>TimeLine
  {children}
  </>
}

export default TimeLine
