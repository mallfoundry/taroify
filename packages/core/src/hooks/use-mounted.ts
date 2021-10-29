import { nextTick } from "@tarojs/taro"
import { useEffect } from "react"

export default function useMounted(cb: () => any) {
  useEffect(() => nextTick(cb), [])
}
