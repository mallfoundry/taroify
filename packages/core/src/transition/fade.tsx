import * as React from "react"
import { ReactNode } from "react"
import Transition, { TransitionName } from "./transition"
import * as _ from "lodash"

export enum FadeDirection {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

type FadeDirectionString = "up" | "down" | "left" | "right"

function getTransactionName(direction ?: FadeDirection | FadeDirectionString) {
  if (_.isUndefined(direction)) {
    return TransitionName.Fade
  }
  if (direction === FadeDirection.Up) {
    return TransitionName.FadeUp
  }
  if (direction === FadeDirection.Down) {
    return TransitionName.FadeDown
  }
  if (direction === FadeDirection.Left) {
    return TransitionName.FadeLeft
  }
  if (direction === FadeDirection.Right) {
    return TransitionName.FadeRight
  }
}

interface FadeProps {
  direction?: FadeDirection | FadeDirectionString
  in?: boolean
  duration?: number
  children?: ReactNode
}

export default function Fade(props: FadeProps) {
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
