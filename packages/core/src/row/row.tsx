import { View } from "@tarojs/components"
import * as React from "react"
import { createContext, CSSProperties, ReactNode } from "react"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import * as _ from "lodash"

interface RowContextType {
  gutter: [number | undefined, number | undefined]
}

export const RowContext = createContext<RowContextType>({
  gutter: [undefined, undefined],
})

export enum RowJustify {
  End = "end",
  Center = "center",
  SpaceAround = "space-around",
  SpaceBetween = "space-between"
}

type RowJustifyString = "end" | "center" | "space-around" | "space-between";

export enum RowAlign {
  Center = "center",
  Bottom = "bottom"
}

type RowAlignString = "center" | "bottom"

type RowGutter = string | [string, string] | number | [number, number]

interface RowProps {
  className?: string
  gutter?: RowGutter
  justify?: RowJustify | RowJustifyString
  align?: RowAlign | RowAlignString
  children?: ReactNode
}

function useGutter(gutter?: RowGutter): [undefined | number, undefined | number] {

  if (gutter === undefined) {
    return [undefined, undefined]
  }

  if (_.isNumber(gutter)) {
    return [gutter, gutter]
  }

  if (_.isString(gutter)) {
    const gutterNumber = _.toNumber(gutter)
    return [gutterNumber, gutterNumber]
  }

  if (_.isArray(gutter)) {
    const [horizontalGutter, verticalGutter] = gutter
    return [_.toNumber(horizontalGutter), _.toNumber(verticalGutter)]
  }

  return [0, 0]
}

export default function Row(props: RowProps) {
  const { className, gutter, justify, align, children } = props
  const gutters = useGutter(gutter)
  const [horizontalGutter, verticalGutter] = gutters
  console.log(horizontalGutter, verticalGutter)

  //
  const gutterStyle: CSSProperties = {}
  if (horizontalGutter) {
    const averagePadding = _.toNumber(horizontalGutter) / 2
    gutterStyle.marginLeft = `-${averagePadding}px`
    gutterStyle.marginRight = `-${averagePadding}px`
  }

  return (
    <View
      className={classNames(
        prefixClassname("row"),
        {
          // Set justify style
          [prefixClassname("row-justify-end")]: justify === RowJustify.End,
          [prefixClassname("row-justify-center")]: justify === RowJustify.Center,
          [prefixClassname("row-justify-space-around")]: justify === RowJustify.SpaceAround,
          [prefixClassname("row-justify-space-between")]: justify === RowJustify.SpaceBetween,
          // Set align style
          [prefixClassname("row-align-center")]: align === RowAlign.Center,
          [prefixClassname("row-align-bottom")]: align === RowAlign.Bottom,
        },
        className,
      )}
      style={{
        ...gutterStyle,
      }}>
      <RowContext.Provider value={{
        gutter: gutters,
      }}>
        {children}
      </RowContext.Provider>
    </View>
  )
}
