import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import CellGroupContext from "./cell-group.context"

interface CellGroupProps {
  title?: string
  clickable?: boolean
  bordered?: boolean
  children?: ReactNode
}

export function CellGroup(props: CellGroupProps) {
  const { title, clickable = false, bordered = true, children } = props
  return (
    <CellGroupContext.Provider
      value={{
        clickable,
      }}
    >
      {title && <View className={prefixClassname("cell-group__title")} children={title} />}
      <View
        className={classNames(prefixClassname("cell-group"), {
          [prefixClassname("hairline--top-bottom")]: bordered,
        })}
        children={children}
      />
    </CellGroupContext.Provider>
  )
}

export default CellGroup
