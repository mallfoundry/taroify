import { Flex } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import { ActionBarContext } from "./action-bar.context"
import "./action-bar.scss"
import { ActionBarProps } from "./action-bar.shared"

function useDisplayNames(children: ReactNode[]) {
  const childrenDisplayNames = (children: ReactElement[]): string[] => {
    return children
      .map((item: ReactElement<any, any>) => {
        if (item.type.displayName === "ActionBarButtonGroup") {
          return childrenDisplayNames(item.props.children)
        }
        return item?.type.displayName
      })
      .flat()
  }
  return childrenDisplayNames(children as ReactElement[])
}

function ActionBar(props: ActionBarProps) {
  const { style, safeAreaInsetBottom, children, className } = props

  const childrenDisplayNames = useDisplayNames(React.Children.toArray(children))
  return (
    <ActionBarContext.Provider value={{ parent: childrenDisplayNames }}>
      <Flex
        justify={"space-between"}
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
