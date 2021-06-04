import * as requestAnimationFrame from "raf"

export function raf(cb: FrameRequestCallback) {
  requestAnimationFrame(cb)
}

export function doubleRaf(cb: FrameRequestCallback) {
  requestAnimationFrame(() => requestAnimationFrame(cb))
}
