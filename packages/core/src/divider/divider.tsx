import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactElement, ReactNode } from "react"
import { prefixClassname } from "../styles"

interface DividerText {
  orientation?: Divider.TextOrientation
  children?: ReactNode
}

function findDividerText(node?: ReactNode): DividerText {
  if (node === undefined) {
    return {
      children: undefined,
    }
  }
  if (!React.isValidElement(node)) {
    return {
      children: node,
    }
  }
  const element = node as ReactElement
  if (element.type !== Divider.Text) {
    return {
      children: node,
    }
  }

  const { props } = element
  const { orientation } = props
  return {
    orientation,
    children: element,
  }
}

interface DividerProps {
  className?: string
  style?: CSSProperties
  dashed?: boolean
  hairline?: boolean
  children?: ReactNode
}

function Divider(props: DividerProps) {
  const { className, style, dashed = false, hairline = true } = props
  const { orientation = Divider.TextOrientation.Center, children } = findDividerText(props.children)
  return (
    <View
      className={classNames(prefixClassname("divider"), {
        [prefixClassname("divider--hairline")]: hairline && !dashed,
        [prefixClassname("divider--dashed")]: dashed,
        [prefixClassname("divider--content-left")]:
          children && orientation === Divider.TextOrientation.Left,
        [prefixClassname("divider--content-center")]:
          children && orientation === Divider.TextOrientation.Center,
        [prefixClassname("divider--content-right")]:
          children && orientation === Divider.TextOrientation.Right,
        className,
      })}
      style={style}
    >
      {children}
    </View>
  )
}

namespace Divider {
  export enum TextOrientation {
    Left = "left",
    Right = "right",
    Center = "center",
  }

  type TextOrientationString = "left" | "right" | "center"

  interface TextProps {
    orientation?: TextOrientation | TextOrientationString
    children?: ReactNode
  }

  export function Text(props: TextProps) {
    return <>{props.children}</>
  }
}

export default Divider
