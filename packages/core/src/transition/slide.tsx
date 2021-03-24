import * as React from "react"
import { ReactNode } from "react"
import Transition, { TransitionName } from "./transition"

export enum SlideDirection {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

type SlideDirectionString = "up" | "down" | "left" | "right"

function getTransactionName(direction ?: SlideDirection | SlideDirectionString) {
  if (direction === SlideDirection.Up) {
    return TransitionName.SlideUp
  }
  if (direction === SlideDirection.Down) {
    return TransitionName.SlideDown
  }
  if (direction === SlideDirection.Left) {
    return TransitionName.SlideLeft
  }
  if (direction === SlideDirection.Right) {
    return TransitionName.SlideRight
  }
}

interface SlideProps {
  direction?: SlideDirection | SlideDirectionString
  in?: boolean
  duration?: number
  children?: ReactNode
}

export default function Slide(props: SlideProps) {
  const { direction, in: inProp, duration, children } = props
  const name = getTransactionName(direction)
  return (
    <Transition
      in={inProp}
      name={name}
      duration={duration}
      children={children}
    />
  )
}
