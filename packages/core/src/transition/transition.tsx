import * as React from "react"
import { ReactElement, ReactNode, useState } from "react"
import { CSSTransition } from "react-transition-group"
import { EnterHandler, ExitHandler } from "react-transition-group/Transition"
import { prefixClassname } from "../styles"

export enum TransitionName {
  Fade = "fade",
  SlideUp = "slide-up",
  SlideDown = "slide-down",
  SlideLeft = "slide-left",
  SlideRight = "slide-right",
}

const TRANSITION_PRESETS: string[] = [
  TransitionName.Fade,
  TransitionName.SlideUp,
  TransitionName.SlideDown,
  TransitionName.SlideLeft,
  TransitionName.SlideRight,
]

function isTransitionPreset(name?: string) {
  return name && TRANSITION_PRESETS.includes(name)
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
  duration?: number | { appear?: number; enter?: number; exit?: number }
  unmountOnExit?: boolean
  children?: ReactNode
  onEnter?: EnterHandler<HTMLElement>
  onEntered?: EnterHandler<HTMLElement>
  onExited?: ExitHandler<HTMLElement>
}

export default function Transition(props: TransitionProps) {
  const {
    name,
    in: inProp = false,
    duration = 300,
    unmountOnExit,
    children,
    onEnter,
    onEntered,
    onExited,
  } = props
  const childrenStyle = elementStyle(children)
  const transactionName = isTransitionPreset(name) ? prefixClassname(`transition-${name}`) : name
  const [display, setDisplay] = useState("none")

  return (
    <CSSTransition
      in={inProp}
      timeout={duration}
      unmountOnExit={unmountOnExit}
      classNames={transactionName}
      style={{
        display,
        ...childrenStyle,
      }}
      children={children}
      onEnter={(node, isAppearing) => {
        setDisplay("")
        // @ts-ignore
        onEnter?.(node, isAppearing)
      }}
      onEntered={onEntered}
      onExited={(node: HTMLElement) => {
        setDisplay("none")
        // @ts-ignore
        onExited?.(node)
      }}
    />
  )
}
