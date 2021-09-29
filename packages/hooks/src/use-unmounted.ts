import { nextTick } from "@tarojs/taro"
import { EffectCallback, useEffect } from "react"

export default function useUnmounted(cb: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => nextTick(cb), [])
}
