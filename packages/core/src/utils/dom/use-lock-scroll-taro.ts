import { useRef } from "react"
import { getEnv } from "@tarojs/taro"
import { useLockScroll } from "./use-lock-scroll"

export const useLockScrollTaro = (lock: boolean) => {
  const ref = useRef(null)
  if (getEnv() === "WEB") {
    useLockScroll(ref, lock)
  }
  return ref
}
