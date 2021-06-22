import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { nextTick, useReady } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react"
import { prefixClassname } from "../styles"
import { useComputed } from "../utils/computed"
import { doubleRaf } from "../utils/raf"
import { getBoundingClientRect } from "../utils/rect"

interface NoticeBarChildren {
  icon: ReactNode
  text: ReactNode[]
  action: ReactNode
}

function useChildren(children: ReactNode): NoticeBarChildren {
  const __children__: NoticeBarChildren = {
    icon: undefined,
    text: [],
    action: undefined,
  }
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const element = child as ReactElement
      const elementType = element.type
      if (elementType === NoticeBar.Icon) {
        __children__.icon = element
      } else if (elementType === NoticeBar.Action) {
        __children__.action = element
      } else {
        __children__.text.push(child)
      }
    } else {
      __children__.text.push(child)
    }
  })
  return __children__
}

interface NoticeBarProps {
  className?: string
  style?: CSSProperties
  delay?: number
  speed?: number
  scrollable?: boolean
  wordwrap?: boolean
  children?: ReactNode
}

function NoticeBar(props: NoticeBarProps) {
  const { className, style, delay = 1000, speed = 60, wordwrap, scrollable = false } = props

  const { icon, text, action } = useChildren(props.children)
  const ellipsis = !scrollable && !wordwrap
  const startTimerRef = useRef<NodeJS.Timeout>()
  const wrapRef = useRef()
  const contentRef = useRef()
  const offsetRef = useRef(0)
  const durationRef = useRef(0)
  const wrapWidthRef = useRef(0)
  const contentWidthRef = useRef(0)
  const [, setForceRefresh] = useState(0)

  const contentStyle = useComputed<CSSProperties>(
    () => ({
      transform: offsetRef.current ? `translateX(${offsetRef.current}px)` : "",
      transitionDuration: `${durationRef.current}s`,
    }),
    [offsetRef, durationRef],
  )

  function forceRefresh() {
    setForceRefresh(Date.now())
  }

  function reset() {
    offsetRef.current = 0
    durationRef.current = 0
    wrapWidthRef.current = 0
    contentWidthRef.current = 0
    forceRefresh()
  }

  function onTransitionEnd() {
    offsetRef.current = wrapWidthRef.current
    durationRef.current = 0
    forceRefresh()

    nextTick(() => {
      // use double raf to ensure animation can start
      doubleRaf(() => {
        offsetRef.current = -contentWidthRef.current
        durationRef.current = (contentWidthRef.current + wrapWidthRef.current) / +speed
        forceRefresh()
      })
    })
  }

  function start() {
    reset()
    if (startTimerRef.current) {
      clearTimeout(startTimerRef.current)
    }
    startTimerRef.current = setTimeout(async () => {
      if (!wrapRef.current || !contentRef.current || !scrollable) {
        return
      }

      const wrapRefWidth = (await getBoundingClientRect(wrapRef)).width
      const contentRefWidth = (await getBoundingClientRect(contentRef)).width

      if (scrollable || contentRefWidth > wrapRefWidth) {
        doubleRaf(() => {
          wrapWidthRef.current = wrapRefWidth
          contentWidthRef.current = contentRefWidth
          offsetRef.current = -contentRefWidth
          durationRef.current = contentRefWidth / +speed
          forceRefresh()
        })
      }
    }, +delay)
  }

  useReady(start)

  return (
    <View
      className={classNames(
        prefixClassname("notice-bar"),
        {
          [prefixClassname("notice-bar--wordwrap")]: wordwrap,
        },
        className,
      )}
      style={style}
    >
      {icon}
      <View ref={wrapRef} className={prefixClassname("notice-bar__wrap")}>
        <View
          ref={contentRef}
          style={contentStyle.value}
          className={classNames(prefixClassname("notice-bar__content"), {
            [prefixClassname("ellipsis")]: ellipsis,
          })}
          children={text}
          onTransitionEnd={onTransitionEnd}
        />
      </View>
      {action}
    </View>
  )
}

namespace NoticeBar {
  interface IconProps {
    children?: ReactNode
    // onClick?: () => void
  }

  export function Icon(props: IconProps): JSX.Element {
    return cloneIconElement(props.children, {
      className: prefixClassname("notice-bar__icon"),
    }) as JSX.Element
  }

  interface ActionProps {
    children?: ReactNode
    // onClick?: () => void
  }

  export function Action(props: ActionProps): JSX.Element {
    return cloneIconElement(props.children, {
      className: prefixClassname("notice-bar__action"),
    }) as JSX.Element
  }
}

export default NoticeBar
