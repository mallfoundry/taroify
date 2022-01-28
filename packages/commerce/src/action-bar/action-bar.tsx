import { Flex } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { cloneElement, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import { ActionBarContext } from "./action-bar.context"
import "./action-bar.scss"
import { ActionBarProps } from "./action-bar.shared"

function ActionBar(props: ActionBarProps) {
  const { style, safeAreaInsetBottom, children, className } = props
  const childrenDisplayNames = useMemo(() => {
    return React.Children.toArray(children).map((item: any) => {
      return item?.type.displayName
    })
  }, [children])
  return (
    <ActionBarContext.Provider value={{ parent: childrenDisplayNames }}>
      <Flex
        style={style}
        className={classnames(
          prefixClassname("action-bar"),
          { [prefixClassname("action--bar--safeAreaInsetBottom")]: safeAreaInsetBottom === true },
          className,
        )}
      >
        {React.Children.toArray(children)
          .filter((child) => isValidElement(child))
          .map((child: ReactNode, index: number) => {
            return cloneElement(child as ReactElement, { index })
          })}
      </Flex>
    </ActionBarContext.Provider>
  )
}

export default ActionBar
