import { nextTick } from "@tarojs/taro"
import { useEffect } from "react"

export default function useMounted(cb: () => any) {
  useEffect(
    () => nextTick(cb),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}
