import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react"
import { prefixClassname } from "../styles"
import Step from "./step"
import StepsContext from "./steps.context"
import { StepsDirection } from "./steps.shared"

interface StepsChildren {
  steps: ReactNode[]
}

function useStepsChildren(children: ReactNode): StepsChildren {
  const __children__: StepsChildren = {
    steps: [],
  }
  let index = 0
  Children.forEach(children, (child: ReactNode, i) => {
    // Skip is not Item of Swiper
    if (!isValidElement(child)) {
      return
    }
    const element = child as ReactElement
    const elementType = element.type
    if (elementType === Step) {
      const { key } = element
      __children__.steps.push(
        cloneElement(child, {
          ...element.props,
          key: key ?? i,
          index: index++,
        }),
      )
    }
  })

  return __children__
}

export interface StepsProps {
  className?: string
  style?: CSSProperties
  value?: number
  direction?: StepsDirection
  alternativeLabel?: boolean
  children?: ReactNode
}

function Steps(props: StepsProps) {
  const { className, style, value, direction = "horizontal", alternativeLabel = false } = props
  const { steps } = useStepsChildren(props.children)

  return (
    <StepsContext.Provider
      value={{
        value,
        direction,
        alternativeLabel,
      }}
    >
      <View
        className={classNames(
          prefixClassname("steps"),
          {
            [prefixClassname("steps--horizontal")]: direction === "horizontal",
            [prefixClassname("steps--vertical")]: direction === "vertical",
          },
          className,
        )}
        style={style}
      >
        <View className={prefixClassname("steps__items")} children={steps} />
      </View>
    </StepsContext.Provider>
  )
}

export default Steps
