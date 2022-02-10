import Flex, { FlexProps } from "@taroify/core/flex"
import { usePlaceholder } from "@taroify/core/hooks"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { useRef } from "react"

export interface ActionBarProps extends FlexProps {
  fixed?: boolean
  placeholder?: boolean
}

function ActionBar(props: ActionBarProps) {
  const { className, fixed, placeholder, justify = "space-between", ...restProps } = props
  const rootRef = useRef()

  const Placeholder = usePlaceholder(rootRef, {
    className: prefixClassname("action-bar__placeholder"),
  })

  function ActionBarRender() {
    return (
      <Flex
        ref={rootRef}
        justify={justify}
        className={classnames(
          prefixClassname("action-bar"),
          {
            [prefixClassname("action-bar--fixed")]: fixed,
          },
          className,
        )}
        {...restProps}
      />
    )
  }

  if (fixed && placeholder) {
    return (
      <Placeholder>
        <ActionBarRender />
      </Placeholder>
    )
  }
  return <ActionBarRender />
}

export default ActionBar
