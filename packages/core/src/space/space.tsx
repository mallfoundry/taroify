import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface SpaceItemProps {
  children?: ReactNode
  size?: SpaceSize | SpaceSizeString | number
}

function SpaceItem(props: SpaceItemProps) {
  const { size, children } = props
  return (
    <View
      className={classNames(prefixClassname("space__item"), prefixClassname("space__item-" + size))}
    >
      {children}
    </View>
  )
}

export enum SpaceDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

type SpaceDirectionString = "horizontal" | "vertical"

export enum SpaceSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type SpaceSizeString = "small" | "medium" | "large"
export enum SpaceJustify {
  Start = "start",
  Center = "center",
  End = "end",
  spaceBetween = "space-between",
  spaceAround = "space-around",
}

type SpaceJustifyString = "start" | "center" | "end" | "space-around" | "space-between"
interface SpaceProps {
  direction?: SpaceDirection | SpaceDirectionString
  size?: SpaceSize | SpaceSizeString
  children?: ReactNode
  justify?: SpaceJustify | SpaceJustifyString
  wrap?:boolean
}

export default function Space(props: SpaceProps) {
  const {
    size = SpaceSize.Small,
    justify = SpaceJustify.Start,
    direction = SpaceDirection.Horizontal,
    wrap,
    children,
  } = props
  return (
    <View
      style={{ justifyContent: justify }}
      className={classNames(
        prefixClassname("space"),
        {
          [prefixClassname(`space--${direction}`)]:
            direction === SpaceDirection.Horizontal || direction === SpaceDirection.Vertical,
          [prefixClassname("space--vertical--"+justify)]:direction === SpaceDirection.Vertical

        },
        
        prefixClassname("space--justify"),
        wrap && prefixClassname("space--nowrap"),
      )}
    >
      {React.Children.map(children, (item, index) => (
        <SpaceItem size={size} key={index} children={item} />
      ))}
    </View>
  )
}
