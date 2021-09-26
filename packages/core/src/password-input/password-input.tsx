import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_LEFT, HAIRLINE_BORDER_SURROUND } from "../styles/hairline"
import { stopPropagation } from "../utils/dom/event"
import { addUnitPx } from "../utils/format/unit"

interface PasswordInputProps {
  className?: string
  style?: CSSProperties
  value?: string
  length?: number
  gutter?: number
  mask?: boolean
  focused?: boolean
  error?: boolean
  info?: string

  onFocus?(event: ITouchEvent): void
}

function PasswordInput(props: PasswordInputProps) {
  const {
    className,
    value = "",
    length = 6,
    gutter,
    mask = true,
    focused = false,
    error,
    info,
    onFocus,
  } = props

  const onTouchStart = (event: ITouchEvent) => {
    stopPropagation(event)
    onFocus?.(event)
  }

  const renderPoints = () => {
    const Points: JSX.Element[] = []

    for (let i = 0; i < length; i++) {
      const char = value[i]
      const bordered = i !== 0 && !gutter
      const showCursor = focused && i === value.length

      let style
      if (i !== 0 && gutter) {
        style = { marginLeft: addUnitPx(gutter) }
      }

      Points.push(
        <View
          key={i}
          className={classNames(prefixClassname("password-input__item"), {
            [HAIRLINE_BORDER_LEFT]: bordered,
            [prefixClassname("password-input__item--focus")]: showCursor,
          })}
          style={style}
        >
          {mask ? (
            <View
              className={prefixClassname("password-input__item--mask")}
              style={{ visibility: char ? "visible" : "hidden" }}
            />
          ) : (
            char
          )}
          {showCursor && <View className={prefixClassname("password-input__cursor")} />}
        </View>,
      )
    }

    return Points
  }
  return (
    <View className={classNames(prefixClassname("password-input"), className)}>
      <View
        className={classNames(prefixClassname("password-input__security"), {
          [HAIRLINE_BORDER_SURROUND]: !gutter,
        })}
        onTouchStart={onTouchStart}
      >
        {renderPoints()}
      </View>
      {info && (
        <View
          className={classNames(prefixClassname("password-input__info"), {
            [prefixClassname("password-input__info--error")]: error,
          })}
          children={info}
        />
      )}
    </View>
  )
}

export default PasswordInput
