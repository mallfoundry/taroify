import ArrowRight from "@taroify/icons/ArrowRight"
import { View } from "@tarojs/components"
import { nextTick } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import Cell from "../cell"
import CollapseContext from "../collapse/collapse.context"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import { doubleRaf, raf } from "../utils/raf"
import { getRect } from "../utils/rect"

enum CollapseItemSize {
  Medium = "medium",
  Large = "large",
}

type CollapseItemSizeString = "medium" | "large"

interface CollapseItemProps {
  className?: string
  style?: CSSProperties
  value?: any
  size?: CollapseItemSize | CollapseItemSizeString
  bordered?: boolean
  clickable?: boolean
  disabled?: boolean
  icon?: ReactNode
  expandIcon?: ReactNode
  title?: ReactNode
  brief?: ReactNode
  extra?: ReactNode
  children?: ReactNode
}

function CollapseItem(props: CollapseItemProps) {
  const {
    className,
    style,
    value,
    size = CollapseItemSize.Medium,
    bordered = true,
    disabled = false,
    clickable = true,
    icon,
    expandIcon = <ArrowRight />,
    title,
    brief,
    extra,
    children,
  } = props

  const contentRef = useRef<HTMLElement>()
  const { isExpanded, toggleItem } = useContext(CollapseContext)
  const expanded = isExpanded?.(value)

  const [visibility, setVisibility] = useState(expanded)
  const [expandHeight, setExpandHeight] = useState("0")

  const onTransitionEnd = useCallback(() => {
    if (!expanded) {
      setVisibility(false)
    } else {
      setExpandHeight("")
    }
  }, [expanded])

  useEffect(() => {
    if (expanded) {
      setVisibility(true)
    }

    // Use raf: flick when opened in safari
    // Use nextTick: closing animation failed when set `user-select: none`
    const tickRaf = expanded ? nextTick : raf

    tickRaf(async () => {
      const { height } = await getRect(contentRef)
      if (height) {
        const heightPx = addUnitPx(height)
        setExpandHeight(expanded ? "0" : heightPx)

        // use double raf to ensure animation can start
        doubleRaf(() => {
          setExpandHeight(expanded ? heightPx : "0")
        })
      } else {
        onTransitionEnd()
      }
    })
  }, [expanded, onTransitionEnd])

  const toggle = useCallback(
    (newExpanded = !expanded) => {
      toggleItem?.(value, newExpanded)
    },
    [value, expanded, toggleItem],
  )

  const onTitleClick = useCallback(() => {
    if (!disabled) {
      toggle()
    }
  }, [disabled, toggle])

  const wrapperStyle = useMemo(
    () => ({
      display: visibility ? "" : "none",
      height: expandHeight,
    }),
    [expandHeight, visibility],
  )

  return (
    <View
      className={classNames(
        prefixClassname("collapse-item"),
        {
          [prefixClassname("collapse-item--bordered")]: value && bordered,
        },
        className,
      )}
      style={style}
    >
      <Cell
        className={classNames(prefixClassname("collapse-item__title"), {
          [prefixClassname("collapse-item__title--disabled")]: disabled,
          [prefixClassname("collapse-item__title--expanded")]: expanded,
          [prefixClassname("collapse-item__title--borderless")]: !bordered,
        })}
        size={size}
        icon={icon}
        rightIcon={expandIcon}
        title={title}
        clickable={!disabled && clickable}
        brief={brief}
        children={extra}
        onClick={onTitleClick}
      />
      <View
        className={prefixClassname("collapse-item__wrapper")}
        style={wrapperStyle}
        onTransitionEnd={onTransitionEnd}
      >
        <View
          ref={contentRef}
          className={prefixClassname("collapse-item__content")}
          children={children}
        />
      </View>
    </View>
  )
}

export default CollapseItem
