import * as _ from "lodash"
import * as requestAnimationFrame from "raf"

export function cancelRaf(rafId: number | number[]) {
  if (_.isNumber(rafId)) {
    requestAnimationFrame.cancel(rafId)
  } else if (_.isArray(rafId)) {
    _.forEach(rafId, cancelRaf)
  }
}

export function raf(cb: FrameRequestCallback) {
  // @ts-ignore
  return requestAnimationFrame.default(cb)
}

export function doubleRaf(cb: FrameRequestCallback): [number, number] {
  const rafIds: [number, number] = [0, 0]
  rafIds[1] = requestAnimationFrame(() => {
    rafIds[0] = requestAnimationFrame(cb)
  })
  return rafIds
}
