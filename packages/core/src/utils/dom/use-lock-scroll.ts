import { useEffect, RefObject } from "react"
import { ITouchEvent } from "@tarojs/components"
import { getScrollParent } from "./scroll"
import { useTouch } from "../touch"
import { preventDefault } from "./event"
import { supportsPassive } from "./supports-passive"

let totalLockCount = 0

const BODY_LOCK_CLASS = "taroify-popup-overflow-hidden"

// https://github.com/youzan/vant/blob/HEAD/packages/vant/src/composables/use-lock-scroll.ts
export function useLockScroll(rootRef: RefObject<HTMLElement>, shouldLock: boolean) {
  const touch = useTouch()
  const DIRECTION_UP = "01"
  const DIRECTION_DOWN = "10"

  const onTouchMove = async (event: ITouchEvent) => {
    touch.move(event)

    const direction = touch.deltaY > 0 ? DIRECTION_DOWN : DIRECTION_UP
    const el = await getScrollParent(
      event.target as HTMLElement,
      rootRef.current as HTMLElement | undefined,
    )
    if (!el) return
    const { scrollHeight, offsetHeight, scrollTop } = el
    let status = "11"

    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? "00" : "01"
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = "10"
    }

    if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      preventDefault(event, true)
    }
  }

  const lock = () => {
    document.addEventListener("touchstart", touch.start as any)
    document.addEventListener(
      "touchmove",
      onTouchMove as any,
      supportsPassive ? { passive: false } : false,
    )

    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS)
    }

    totalLockCount++
  }

  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener("touchstart", touch.start as any)
      document.removeEventListener("touchmove", onTouchMove as any)

      totalLockCount--

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS)
      }
    }
  }

  useEffect(() => {
    if (shouldLock) {
      lock()
      return () => {
        unlock()
      }
    }
  }, [shouldLock])
}
