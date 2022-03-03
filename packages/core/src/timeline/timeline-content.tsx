import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, PropsWithChildren } from "react"
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../flex"
import { prefixClassname } from "../styles"

export interface TimeLineContentProps extends PropsWithChildren<ViewProps> {
  style?: CSSProperties
  direction?: FlexDirection
  align?: FlexAlign
  justify?: FlexJustify
}

function TimeLineContent(props: TimeLineContentProps) {
  const { className, justify, align, ...restProps } = props
  return (
    <Flex
      className={classNames(
        prefixClassname("timeline-content"),
        {
          // Set justify style
          [prefixClassname("timeline-content--justify-start")]: justify === "start",
          [prefixClassname("timeline-content--justify-center")]: justify === "center",
          [prefixClassname("timeline-content--justify-end")]: justify === "end",
          [prefixClassname("timeline-content--justify-space-around")]: justify === "space-around",
          [prefixClassname("timeline-content--justify-space-between")]: justify === "space-between",
          // Set align style
          [prefixClassname("timeline-content--align-start")]: align === "start",
          [prefixClassname("timeline-content--align-center")]: align === "center",
          [prefixClassname("timeline-content--align-end")]: align === "end",
          [prefixClassname("timeline-content--align-baseline")]: align === "baseline",
          [prefixClassname("timeline-content--align-stretch")]: align === "stretch",
        },
        className,
      )}
      {...restProps}
    />
  )
}

export default TimeLineContent
