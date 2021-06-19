import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CellGroupProps {
  title?: string
  bordered?: boolean
  children?: ReactNode
}

export function CellGroup(props: CellGroupProps) {
  const { title, bordered = true, children } = props
  return (
    <>
      <View className={prefixClassname("cell-group__title")} children={title} />
      <View
        className={classNames(prefixClassname("cell-group"), {
          [prefixClassname("hairline--top-bottom")]: bordered,
        })}
        children={children}
      />
    </>
  )
}

export default CellGroup
