import { Flex } from "@taroify/core"
import { FlexProps } from "@taroify/core/flex"
import { prefixClassname } from "@taroify/core/styles"
import { usePlaceholder } from "@taroify/~core/src/hooks"
import { View } from "@tarojs/components"
import classnames from "classnames"
import * as React from "react"
import { useRef } from "react"
import "./action-bar.scss"

export interface ActionBarProps extends FlexProps {
  fixed: boolean
  placeholder: boolean
}

function ActionBar(props: ActionBarProps) {
  const { className, fixed, placeholder, justify = "space-between", ...restProps } = props
  const rootRef = useRef()
  const PlaceHolder = usePlaceholder(rootRef, {
    className: prefixClassname("action-bar--placeholder"),
  })

  function ActionBarRender() {
    return (
      <View
        className={classnames({
          [prefixClassname("action-bar--fixed")]: fixed,
        })}
      >
        <Flex
          justify={justify}
          className={classnames(
            prefixClassname("action-bar"),

            className,
          )}
          {...restProps}
        />
      </View>
    )
  }

  if (fixed && placeholder) {
    return (
      <PlaceHolder>
        <ActionBarRender />
      </PlaceHolder>
    )
  }
  return <ActionBarRender />
}

export default ActionBar
