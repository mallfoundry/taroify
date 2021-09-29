import { nextTick } from "@tarojs/taro"
import { EffectCallback, useEffect } from "react"

export default function useMounted(cb: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => nextTick(cb), [])
}
