import { View, Text } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactChild, ReactNode, Children } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline-item.scss"
import { TimeLineContentProps } from "./timeline-content"

export interface TimeLineItemProps extends ViewProps {
  algin?: algin
  bullet?: JSX.Element
  title?: string
  children?: ReactNode
  className?: string
  active?: boolean
}
function useTimeLineContentCompoents(children: ReactNode) {
  const TimeLineContentCompoents: any = {}
  Children.forEach(children, (child: any) => {
    if (child.props.algin === "left") {
      TimeLineContentCompoents.leftChild = child
    } else if (child.props.algin === "right") {
      TimeLineContentCompoents.rightChild = child
    }
  })
  return TimeLineContentCompoents
}
function TimeLineItem(props: TimeLineItemProps) {
  const { children, bullet, algin, className, active } = props

  const { leftChild, rightChild }: any = useTimeLineContentCompoents(children)
  return (
    <View className={classNames(prefixClassname("timeline-item"),{
      [prefixClassname("timeline-item-right")]:algin==="right"
    }, className)}>
      {
        <>
          {!algin && (
            <View className={classNames(prefixClassname("timeline-item-content"))}>
              {leftChild}
            </View>
          )}
          <View
            className={classNames(prefixClassname("timeline-item-line"), {
              [prefixClassname("timeline-item-line-active")]: active,
            })}
          >
            <View
              className={classNames(prefixClassname("timeline-item-line-bullet"), {
                [prefixClassname("timeline-item-line-bullet-active")]: active,
              })}
            >
              {bullet}
            </View>
          </View>
          <View className={classNames(prefixClassname("timeline-item-content"))}>
            {!algin ? rightChild : children}
          </View>
        </>
      }
    </View>
  )
}

export default TimeLineItem
