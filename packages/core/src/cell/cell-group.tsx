import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import CellGroupContext from "./cell-group.context"

interface CellGroupProps {
  title?: string
  clickable?: boolean
  inset?: boolean
  bordered?: boolean
  children?: ReactNode
}

export function CellGroup(props: CellGroupProps) {
  const { title, clickable = false, inset = false, bordered = true, children } = props
  return (
    <CellGroupContext.Provider
      value={{
        clickable,
      }}
    >
      <View
        className={classNames(prefixClassname("cell-group"), {
          [prefixClassname("cell-group--inset")]: inset,
        })}
      >
        {title && (
          <View
            className={classNames(prefixClassname("cell-group__title"), {
              [prefixClassname("cell-group__title--inset")]: inset,
            })}
            children={title}
          />
        )}
        <View
          className={classNames(prefixClassname("cell-group"), {
            [prefixClassname("hairline--top-bottom")]: bordered,
          })}
          children={children}
        />
      </View>
    </CellGroupContext.Provider>
  )
}

export default CellGroup
