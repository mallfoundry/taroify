import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import { useMemo } from "react"
import * as React from "react"
import { pxTransform } from "@tarojs/taro"
import { Children, type CSSProperties, type ReactNode } from "react"
import Flex from "../flex"
import { prefixClassname } from "../styles"
import type { SpaceAlign, SpaceDirection, SpaceJustify, SpaceSize, SpaceWrap } from "./space.shared"

interface SpaceProps extends ViewProps {
  style?: CSSProperties
  direction?: SpaceDirection
  size?: SpaceSize
  align?: SpaceAlign
  justify?: SpaceJustify
  wrap?: SpaceWrap
  children?: ReactNode
  fill?: boolean
}

function normalizeSize(size: SpaceSize) {
  if (Array.isArray(size)) {
    return ["", pxTransform(size[0]), pxTransform(size[1]!)]
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else if (typeof size === "number") {
    return ["", pxTransform(size), pxTransform(size)]
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else if (["mini", "small", "medium", "large"].includes(size)) {
    return [size]
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return ["small"]
  }
}

export default function Space(props: SpaceProps) {
  const {
    className,
    size: _size = "small",
    justify,
    align,
    direction = "horizontal",
    wrap = "wrap",
    fill,
    children,
    ...restProps
  } = props

  const [size, gapX, gapY] = useMemo(() => normalizeSize(_size), [_size])

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
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            style={{
              marginRight: gapX,
              marginBottom: gapY,
            }}
            className={classNames(prefixClassname("space__item"), {
              [prefixClassname("space__item--mini")]: size === "mini",
              [prefixClassname("space__item--small")]: size === "small",
              [prefixClassname("space__item--medium")]: size === "medium",
              [prefixClassname("space__item--large")]: size === "large",

              [prefixClassname("space__item--fill")]: fill,
            })}
            children={item}
          />
        ))
      }
    </Flex>
  )
}
