import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useContext } from "react"
import PullRefreshContext from "./pull-refresh.context"

interface PullRefreshRenderProps {
  distance: number
}

type PullRefreshRender = (props: PullRefreshRenderProps) => ReactNode

export interface PullRefreshPullingProps {
  children?: ReactNode | PullRefreshRender
}

export function PullRefreshPulling(props: PullRefreshPullingProps) {
  const { children } = props
  const { distance } = useContext(PullRefreshContext)
  if (_.isFunction(children)) {
    return <>{children?.({ distance })}</>
  }
  return <>{children}</>
}

export interface PullRefreshLoosingProps {
  children?: ReactNode
}

export function PullRefreshLoosing(props: PullRefreshLoosingProps) {
  const { children } = props
  return <>{children}</>
}

export interface PullRefreshLoadingProps {
  children?: ReactNode
}

export function PullRefreshLoading(props: PullRefreshLoadingProps) {
  const { children } = props
  return <>{children}</>
}

export interface PullRefreshCompletedProps {
  duration?: number
  children?: ReactNode
}

export function PullRefreshCompleted(props: PullRefreshCompletedProps) {
  const { children } = props
  return <>{children}</>
}
