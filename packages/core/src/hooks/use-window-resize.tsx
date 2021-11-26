import { offWindowResize, onWindowResize } from "@tarojs/taro"
import { useEffect } from "react"

interface Size {
  /** 变化后的窗口高度，单位 px */
  windowHeight: number
  /** 变化后的窗口宽度，单位 px */
  windowWidth: number
}

interface CallbackResult {
  size: Size
}

type WindowResizeCallback = (result: CallbackResult) => void

function useWindowResize(callback: WindowResizeCallback) {
  useEffect(() => {
    onWindowResize?.(callback)

    return () =>
      offWindowResize?.(
        // @ts-ignore
        callback,
      )
  }, [callback])
}

export default useWindowResize
