import { nextTick } from "@tarojs/taro"
import { useEffect } from "react"
import { useToRef } from "../utils/state"

export default function useMounted(cb: (...args: any[]) => any, cp?: () => void) {
  const cpRef = useToRef(cp)

  useEffect(
    () => {
      nextTick(cb)
      return cpRef.current
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}
