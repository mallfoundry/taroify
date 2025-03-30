import * as React from "react"
import { useState, useRef, useLayoutEffect, useMemo, useImperativeHandle, forwardRef } from "react"
import { View, type ViewProps } from "@tarojs/components"
import { nextTick } from "@tarojs/taro"
import cls from "classnames"
import { prefixClassname } from "../styles"
import { getRect, getRects } from "../utils/dom/rect"
import mergeStyle from "../utils/merge-style"
import { useMemoizedFn, useDeepCompareMemo } from "../hooks"

type IndexType = number | [number, number]

export interface TextEllipsisProps extends ViewProps {
  rows?: number | string
  content?: string
  children?: string
  expandText?: string
  collapseText?: string
  dots?: string
  position?: "start" | "middle" | "end"
  onClickAction?: (expanded: boolean) => void
}

export interface TextEllipsisInstance {
  toggle: (isExpanded?: boolean) => void
}

const zhCharCodeStart = 19968
const zhChartCodeEnd = 40869
const numberChartCodeStart = 48
const numberChartCodeEnd = 57
const letterLowerChartCodeStart = 97
const letterLowerChartCodeEnd = 122
const letterUpperChartCodeStart = 65
const letterUpperChartCodeEnd = 90
const placeholderBaseCls = prefixClassname("text-ellipsis__placeholder-base")

const TextEllipsis = forwardRef<TextEllipsisInstance, TextEllipsisProps>((props, ref) => {
  const {
    rows = 1,
    content,
    children,
    expandText = "",
    collapseText = "",
    dots = "...",
    position = "end",
    onClickAction: onClickActionProp,
    className: classNameProp,
    style: styleProp,
    ...rest
  } = props

  const textProps = content || children || ""
  const cloneStyle = useDeepCompareMemo(
    () =>
      mergeStyle(styleProp, {
        position: "fixed",
        zIndex: "-9999",
        top: "-9999px",
        height: "auto",
        minHeight: "auto",
        maxHeight: "auto",
      }),
    [styleProp],
  )
  const [status, setStatus] = useState<"beforeInit" | "init" | "initd">("beforeInit")
  const [baseString, setBaseString] = useState<string[]>([])
  const [unConfirmedText, setUnConfirmedText] = useState("")
  const [unConfirmedIndex, setUnConfirmedIndex] = useState<IndexType>(0)
  const [correctIndex, setCorrectIndex] = useState<IndexType>(0)
  const [hasAction, setHasAction] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>()
  const cloneContainerRef = useRef<HTMLDivElement>()
  const placeholderBaseDomsRef = useRef<HTMLDivElement[]>([])
  const widthCacheRef = useRef<Map<number, number>>(new Map())
  const charCodesCacheRef = useRef<number[]>([])
  const containerHeightRef = useRef<number>(0)
  const hasActionRef = useRef(false)

  const getText = useMemoizedFn((index: IndexType) => {
    if (index === 0) {
      return ""
    }
    if (index === textProps.length) {
      return textProps
    }
    if (Array.isArray(index)) {
      return textProps.slice(0, index[0]) + dots + textProps.slice(index[1])
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (index > 0) {
      return textProps.slice(0, index) + dots
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return dots + textProps.slice(+index)
    }
  })

  const getPrevIndex = useMemoizedFn((idx: IndexType): IndexType => {
    if (Array.isArray(idx)) {
      return [idx[0] - 1, idx[1]]
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (idx >= 0) {
      return idx - 1
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return idx + 1
    }
  })

  const getNextIndex = useMemoizedFn((idx: IndexType): IndexType => {
    if (Array.isArray(idx)) {
      return [idx[0] + 1, idx[1]]
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (idx >= 0) {
      return idx + 1
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return idx - 1
    }
  })

  useLayoutEffect(() => {
    setStatus("beforeInit")
    hasActionRef.current = false
    setUnConfirmedIndex(0)
    nextTick(() => {
      const tempText = textProps + expandText + dots
      const tempBaseChar: string[] = []
      const tempCodes: number[] = []
      const widthCache = widthCacheRef.current
      widthCache.clear()
      for (let i = 0; i < tempText.length; i++) {
        const charCode = tempText.charCodeAt(i)
        if (charCode >= zhCharCodeStart && charCode <= zhChartCodeEnd) {
          tempCodes.push(zhChartCodeEnd)
          if (!widthCache.has(zhChartCodeEnd)) {
            widthCache.set(zhChartCodeEnd, 0)
            tempBaseChar.push("龥")
          }
        } else if (charCode >= numberChartCodeStart && charCode <= numberChartCodeEnd) {
          tempCodes.push(numberChartCodeEnd)
          if (!widthCache.has(numberChartCodeEnd)) {
            widthCache.set(numberChartCodeEnd, 0)
            tempBaseChar.push("9")
          }
        } else if (charCode >= letterLowerChartCodeStart && charCode <= letterLowerChartCodeEnd) {
          tempCodes.push(letterLowerChartCodeEnd)
          if (!widthCache.has(letterLowerChartCodeEnd)) {
            widthCache.set(letterLowerChartCodeEnd, 0)
            tempBaseChar.push("z")
          }
        } else if (charCode >= letterUpperChartCodeStart && charCode <= letterUpperChartCodeEnd) {
          tempCodes.push(letterUpperChartCodeEnd)
          if (!widthCache.has(letterUpperChartCodeEnd)) {
            widthCache.set(letterUpperChartCodeEnd, 0)
            tempBaseChar.push("Z")
          }
        } else {
          tempCodes.push(charCode)
          if (!widthCache.has(charCode)) {
            widthCache.set(charCode, 0)
            tempBaseChar.push(tempText[i])
          }
        }
      }
      charCodesCacheRef.current = tempCodes
      setBaseString(tempBaseChar)
    })
  }, [textProps, dots, expandText])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    const fn = async () => {
      const { width: containerWidth, height: containerHeight } = await getRect(containerRef.current)
      containerHeightRef.current = containerHeight
      if (baseString.length === 0) {
        hasActionRef.current = false
        setUnConfirmedIndex(0)
        return
      }
      getRects(cloneContainerRef.current, `.${placeholderBaseCls}`).then((rects) => {
        if (rects.length > 0) {
          baseString.forEach((char, index) => {
            widthCacheRef.current.set(char.charCodeAt(0), rects[index]?.width || 0)
          })
        }
        const calcCharWidth = (charCode: number) => {
          const widthCache = widthCacheRef.current
          if (charCode >= zhCharCodeStart && charCode <= zhChartCodeEnd) {
            return widthCache.get(zhChartCodeEnd)
            // biome-ignore lint/style/noUselessElse: <explanation>
          } else if (charCode >= numberChartCodeStart && charCode <= numberChartCodeEnd) {
            return widthCache.get(numberChartCodeEnd)
            // biome-ignore lint/style/noUselessElse: <explanation>
          } else if (charCode >= letterLowerChartCodeStart && charCode <= letterLowerChartCodeEnd) {
            return widthCache.get(letterLowerChartCodeEnd)
            // biome-ignore lint/style/noUselessElse: <explanation>
          } else if (charCode >= letterUpperChartCodeStart && charCode <= letterUpperChartCodeEnd) {
            return widthCache.get(letterUpperChartCodeEnd)
            // biome-ignore lint/style/noUselessElse: <explanation>
          } else {
            return widthCache.get(charCode)
          }
        }

        const charCodesCache = charCodesCacheRef.current
        let calcWidth = 0
        const placeholderWidth = charCodesCache
          .slice(textProps.length)
          .reduce((acc, cur) => acc + (calcCharWidth(cur) || 0), 0)
        const maxWidth = containerWidth * (Number.isNaN(Number(rows)) ? 1 : Number(rows))
        if (position === "end") {
          let index = 0
          for (let i = 0; i < textProps.length; i++) {
            calcWidth += calcCharWidth(charCodesCacheRef.current[i]) || 0
            if (calcWidth + placeholderWidth < maxWidth) {
              index = i
            }
            if (calcWidth > maxWidth) {
              setUnConfirmedIndex(index)
              hasActionRef.current = true
              return
            }
          }
        } else if (position === "start") {
          let index = textProps.length - 1
          for (let i = textProps.length - 1; i >= 0; i--) {
            calcWidth += calcCharWidth(charCodesCacheRef.current[i]) || 0
            if (calcWidth + placeholderWidth < maxWidth) {
              index = i
            }
            if (calcWidth > maxWidth) {
              setUnConfirmedIndex(index - textProps.length)
              hasActionRef.current = true
              return
            }
          }
        } else if (position === "middle") {
          let left = 0
          let right = textProps.length - 1
          let flag = false // true: left, false: right
          let leftIndex = 0
          let rightIndex = textProps.length - 1
          while (right > left) {
            if (flag) {
              calcWidth += calcCharWidth(charCodesCacheRef.current[left]) || 0
              if (calcWidth + placeholderWidth < maxWidth) {
                leftIndex = left
              }
              left++
            } else {
              calcWidth += calcCharWidth(charCodesCacheRef.current[right]) || 0
              if (calcWidth + placeholderWidth < maxWidth) {
                rightIndex = right
              }
              right--
            }
            if (calcWidth > maxWidth) {
              setUnConfirmedIndex([leftIndex, rightIndex])
              hasActionRef.current = true
              return
            }
            flag = !flag
          }
        }
        hasActionRef.current = false
        setCorrectIndex(textProps.length)
      })
    }
    nextTick(() => {
      fn()
    })
  }, [baseString, position, rows])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    let tempUnConfirmedIndex = unConfirmedIndex
    const maxHeight =
      containerHeightRef.current * ((Number.isNaN(Number(rows)) ? 1 : Number(rows)) + 0.01)
    let flag: boolean | undefined // true: find first smaller, false: find first bigger
    const max = 5
    let i = 0
    const fn = () => {
      if (i++ > max) {
        setCorrectIndex(tempUnConfirmedIndex)
        return
      }
      nextTick(() => {
        getRect(containerRef.current).then((rect) => {
          if (flag === undefined) {
            flag = rect.height > maxHeight
            tempUnConfirmedIndex = flag
              ? getPrevIndex(tempUnConfirmedIndex)
              : getNextIndex(tempUnConfirmedIndex)
            setUnConfirmedText(getText(tempUnConfirmedIndex))
            fn()
          } else {
            if (flag) {
              if (rect.height > maxHeight) {
                tempUnConfirmedIndex = getPrevIndex(tempUnConfirmedIndex)
                setUnConfirmedText(getText(tempUnConfirmedIndex))
                fn()
              } else {
                setCorrectIndex(tempUnConfirmedIndex)
              }
            } else {
              if (rect.height < maxHeight) {
                tempUnConfirmedIndex = getNextIndex(tempUnConfirmedIndex)
                setUnConfirmedText(getText(tempUnConfirmedIndex))
                fn()
              } else {
                setCorrectIndex(getPrevIndex(tempUnConfirmedIndex))
              }
            }
          }
        })
      })
    }
    if (hasActionRef.current) {
      setStatus("init")
      setUnConfirmedText(getText(tempUnConfirmedIndex))
      fn()
    } else {
      setCorrectIndex(unConfirmedIndex)
    }
  }, [unConfirmedIndex])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const text = useMemo(() => {
    setHasAction(hasActionRef.current)
    setStatus("initd")
    return getText(correctIndex)
  }, [correctIndex])

  const onClickAction = () => {
    setExpanded(!expanded)
    onClickActionProp?.(!expanded)
  }

  const toggle = (isExpanded = !expanded) => {
    setExpanded(isExpanded)
  }

  useImperativeHandle(ref, () => {
    return {
      toggle,
    }
  })

  return (
    <View
      ref={containerRef}
      className={cls(prefixClassname("text-ellipsis"), classNameProp, {
        [prefixClassname("text-ellipsis__hidden")]: status !== "initd",
      })}
      style={styleProp}
      {...rest}
    >
      {status === "beforeInit" && "\u00A0"}

      {status === "init" && (
        <>
          {unConfirmedText}
          <View className={cls(prefixClassname("text-ellipsis__expand"))}>{expandText}</View>
        </>
      )}

      {status === "initd" && (!expanded ? text : content || children)}
      {status === "initd" && hasAction && (
        <View className={cls(prefixClassname("text-ellipsis__expand"))} onClick={onClickAction}>
          {!expanded ? expandText : collapseText}
        </View>
      )}

      {status !== "initd" && (
        <View
          ref={cloneContainerRef}
          id="clone-container"
          style={cloneStyle}
          className={cls(prefixClassname("text-ellipsis"), classNameProp)}
          {...rest}
        >
          {baseString.map((char, index) => (
            <View
              // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
              ref={(r) => (placeholderBaseDomsRef.current[index] = r)}
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className={placeholderBaseCls}
              style={{ display: "inline" }}
            >
              {char}
            </View>
          ))}
        </View>
      )}
    </View>
  )
})

export default TextEllipsis
