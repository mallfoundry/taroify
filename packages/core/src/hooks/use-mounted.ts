import { nextTick } from "@tarojs/taro"
import { EffectCallback, useEffect } from "react"

export default function useMounted(cb: EffectCallback) {
  useEffect(() => nextTick(cb), [])
}
