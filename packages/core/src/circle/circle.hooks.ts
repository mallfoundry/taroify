import * as _ from "lodash"
import { useEffect, useState } from "react"
import { cancelRaf, raf } from "../utils/raf"
import { useToRef } from "../utils/state"

function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100)
}

export function useAnimatePercent(percentProp: number, speed: number) {
  const [percent, setPercent] = useState(percentProp)
  const currentRateRef = useToRef(percent)
  useEffect(() => {
    let rafId: number | undefined
    const startTime = Date.now()
    const startRate = currentRateRef.current
    const endRate = format(percentProp)
    const duration = Math.abs(((startRate - endRate) * 1000) / speed)

    const animate = () => {
      const now = Date.now()
      let progress = (now - startTime) / duration
      progress = Math.min(_.isNaN(progress) ? 1 : progress, 1)

      const rate = progress * (endRate - startRate) + startRate
      setPercent(rate)

      if (endRate > startRate ? rate < endRate : rate > endRate) {
        rafId = raf(animate)
      }
    }

    if (speed) {
      if (rafId) {
        cancelRaf(rafId)
      }
      rafId = raf(animate)
    } else {
      setPercent(endRate)
    }
  }, [currentRateRef, speed, percentProp])

  return percent
}
