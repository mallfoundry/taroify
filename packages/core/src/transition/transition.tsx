import classNames from "classnames"
import * as React from "react"
import { ReactElement, ReactNode } from "react"
import { CSSTransition } from "react-transition-group"
import { prefixClassname } from "../styles"

export enum TransitionName {
  Fade = "fade",
  FadeUp = "fade-up",
  FadeDown = "fade-down",
  FadeLeft = "fade-left",
  FadeRight = "fade-right",
  SlideUp = "slide-up",
  SlideDown = "slide-down",
  SlideLeft = "slide-left",
  SlideRight = "slide-right",
}

function elementStyle(children?: ReactNode) {
  if (!React.isValidElement(children)) {
    return {}
  }
  const element = children as ReactElement
  const { style } = element.props
  return style ?? {}
}

interface TransitionProps {
  name?: TransitionName | string
  in?: boolean
  duration?: number
  children?: ReactNode
}

export default function Transition(props: TransitionProps) {
  const {
    name = TransitionName.Fade,
    in: inProp = false,
    duration = 300,
    children,
  } = props
  const childrenStyle = elementStyle(children)
  return (
    <CSSTransition
      in={inProp}
      timeout={duration}
      unmountOnExit
      classNames={classNames(prefixClassname(`transition-${name}`))}
      style={{
        ...childrenStyle,
        transitionDuration: `${duration}ms`,
      }}
      children={children}
    />
  )
}
