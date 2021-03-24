import * as React from "react"
import { ReactNode } from "react"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import { CSSTransition } from "react-transition-group"

export enum TransitionName {
  Fade = "fade",
  FadeUp = "fade-up",
  FadeDown = "fade-down",
  FadeLeft = "fade-left",
  FadeRight = "fade-right",
  SlideUp = "slide-up",
  SlideDown = "slide-down",
  SlideLeft = "slide-left",
  SlideRight = "slide-right"
}

interface TransitionProps {
  name?: TransitionName | string
  in?: boolean
  duration?: number
  children?: ReactNode
}

export default function Transition(props: TransitionProps) {
  const { name = TransitionName.Fade, in: inProp = false, duration = 300, children } = props
  return (
    <CSSTransition
      in={inProp}
      timeout={duration}
      classNames={classNames(
        prefixClassname(`transition-${name}`),
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
      unmountOnExit
      children={children}
    />
  )
}
