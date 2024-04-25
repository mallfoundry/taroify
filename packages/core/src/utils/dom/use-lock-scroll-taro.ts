import { useEffect } from "react"
import { getEnv } from "@tarojs/taro"
import { supportsPassive } from "./supports-passive"
import { preventDefault } from "./event"

// use-lock-scroll from vant: before preventDefault check result is not as expected in some cases,
// especially when dropdown in the page top position
// always preventDefault and use the ScrollView wrapper, maybe better.

let totalLockCount = 0

const BODY_LOCK_CLASS = "taroify-popup-overflow-hidden"

export const useLockScrollTaro = (shouldLock: boolean) => {
  useEffect(() => {
    if (getEnv() === "WEB" && shouldLock) {
      const touchmoveHandler = (e) => {
        preventDefault(e, true)
      }
      const lock = () => {
        document.addEventListener(
          "touchmove",
          touchmoveHandler,
          supportsPassive ? { passive: false } : false,
        )
        if (!totalLockCount) {
          document.body.classList.add(BODY_LOCK_CLASS)
        }

        totalLockCount++
      }

      const unlock = () => {
        if (totalLockCount) {
          document.removeEventListener("touchmove", touchmoveHandler)

          totalLockCount--

          if (!totalLockCount) {
            document.body.classList.remove(BODY_LOCK_CLASS)
          }
        }
      }
      lock()
      return () => unlock()
    }
  }, [shouldLock])
}
