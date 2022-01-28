import { prefixClassname } from "@taroify/core/styles"
import { View } from "@tarojs/components"
import classnames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import "./action-bar.scss"

interface ActionBarProps {
  safeAreaInsetBottom: boolean
  children: ReactNode | ReactNode[]
  className?: string
}

function ActionBar(props: ActionBarProps) {
  const { safeAreaInsetBottom, children, className } = props
  return (
    <View
      className={classnames(
        prefixClassname("action-bar"),
        { [prefixClassname("action--bar--safeAreaInsetBottom")]: safeAreaInsetBottom === true },
        className,
      )}
    >
      {children}
    </View>
  )
}

export default ActionBar
