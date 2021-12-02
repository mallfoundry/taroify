import * as React from "react"
import { ReactElement, ReactNode, useMemo, useState } from "react"
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
  appear?: boolean
  mountOnEnter?: boolean
  unmountOnExit?: boolean
  duration?: number | { appear?: number; enter?: number; exit?: number }
  children?: ReactNode
  onEnter?: EnterHandler<HTMLElement>
  onEntering?: EnterHandler<HTMLElement>
  onEntered?: EnterHandler<HTMLElement>
  onExit?: ExitHandler<HTMLElement>
  onExiting?: ExitHandler<HTMLElement>
  onExited?: ExitHandler<HTMLElement>
}

export default function Transition(props: TransitionProps) {
  const {
    name,
    in: inProp = false,
    appear = false,
    mountOnEnter = false,
    unmountOnExit,
    duration = 300,
    children: childrenProp,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  } = props
  const children = useMemo(() => childrenProp, [childrenProp])
  const childrenStyle = elementStyle(children)
  const transactionName = isTransitionPreset(name) ? prefixClassname(`transition-${name}`) : name
  const [enter, setEnter] = useState(false)
  const [exited, setExited] = useState(false)

  return (
    <CSSTransition
      in={inProp}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      timeout={duration}
      appear={appear}
      classNames={transactionName}
      style={{
        ...childrenStyle,
        display: enter && !exited ? "" : "none",
      }}
      children={children}
      onEnter={(node, isAppearing) => {
        setEnter(true)
        setExited(false)
        // @ts-ignore
        onEnter?.(node, isAppearing)
      }}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={(node) => {
        setEnter(false)
        setExited(true)
        // @ts-ignore
        onExited?.(node)
      }}
    />
  )
}
