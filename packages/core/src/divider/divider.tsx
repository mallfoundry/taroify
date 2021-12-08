import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactElement, ReactNode } from "react"
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

interface DividerProps extends ViewProps {
  dashed?: boolean
  hairline?: boolean
  children?: ReactNode
}

function Divider(props: DividerProps) {
  const { className, dashed = false, hairline = true, children: childrenProp, ...restProps } = props
  const { orientation = "center", children } = findDividerText(childrenProp)
  return (
    <View
      className={classNames(
        prefixClassname("divider"),
        {
          [prefixClassname("divider--hairline")]: hairline && !dashed,
          [prefixClassname("divider--dashed")]: dashed,
          [prefixClassname("divider--content-left")]: children && orientation === "left",
          [prefixClassname("divider--content-center")]: children && orientation === "center",
          [prefixClassname("divider--content-right")]: children && orientation === "right",
        },
        className,
      )}
      children={children}
      {...restProps}
    />
  )
}

namespace Divider {
  export type TextOrientation = "left" | "right" | "center"

  interface TextProps {
    orientation?: TextOrientation
    children?: ReactNode
  }

  export function Text(props: TextProps): JSX.Element {
    const { children } = props
    return children as JSX.Element
  }
}

export default Divider
