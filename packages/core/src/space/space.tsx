import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { Children, CSSProperties, ReactNode } from "react"
import Flex from "../flex"
import { prefixClassname } from "../styles"
import { SpaceAlign, SpaceDirection, SpaceJustify, SpaceSize, SpaceWrap } from "./space.shared"

interface SpaceProps extends ViewProps {
  style?: CSSProperties
  direction?: SpaceDirection
  size?: SpaceSize
  align?: SpaceAlign
  justify?: SpaceJustify
  wrap?: SpaceWrap
  children?: ReactNode
}

export default function Space(props: SpaceProps) {
  const {
    className,
    size = "small",
    justify,
    align,
    direction = "horizontal",
    wrap = "wrap",
    children,
    ...restProps
  } = props

  return (
    <Flex
      className={classNames(
        prefixClassname("space"),
        {
          [prefixClassname("space--horizontal")]: direction === "horizontal",
          [prefixClassname("space--vertical")]: direction === "vertical",

          [prefixClassname("space--mini")]: size === "mini",
          [prefixClassname("space--small")]: size === "small",
          [prefixClassname("space--medium")]: size === "medium",
          [prefixClassname("space--large")]: size === "large",
        },
        className,
      )}
      direction={
        direction === "horizontal" ? "row" : direction === "vertical" ? "column" : undefined
      }
      justify={justify}
      align={align}
      wrap={wrap}
      {...restProps}
    >
      {
        //
        Children.map(children, (item, index) => (
          <Flex.Item
            key={index}
            className={classNames(prefixClassname("space__item"), {
              [prefixClassname("space__item--mini")]: size === "mini",
              [prefixClassname("space__item--small")]: size === "small",
              [prefixClassname("space__item--medium")]: size === "medium",
              [prefixClassname("space__item--large")]: size === "large",
            })}
            children={item}
          />
        ))
      }
    </Flex>
  )
}
