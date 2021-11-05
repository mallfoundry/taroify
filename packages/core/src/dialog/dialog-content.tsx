import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

type DialogContentAlign = "left" | "center" | "right"

interface DialogContentProps {
  align?: DialogContentAlign
  isolated?: boolean
  children?: ReactNode
}

export default function DialogContent(props: DialogContentProps) {
  const { isolated, align = "center", children } = props
  return (
    <View
      className={classNames(prefixClassname("dialog__content"), {
        [prefixClassname("dialog__content--isolated")]: isolated,
      })}
    >
      <View
        className={classNames(prefixClassname("dialog__message"), {
          [prefixClassname("dialog__message--left")]: align === "left",
          [prefixClassname("dialog__message--right")]: align === "right",
        })}
        children={children}
      />
    </View>
  )
}
