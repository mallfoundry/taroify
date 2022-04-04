import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactElement, ReactText, useCallback, useMemo } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_LEFT, HAIRLINE_BORDER_SURROUND } from "../styles/hairline"
import { stopPropagation } from "../utils/dom/event"
import { createVariantElement } from "../utils/element"
import { addUnitPx } from "../utils/format/unit"
import PasswordInputFeedback, { PasswordInputFeedbackProps } from "./password-input-feedback"

export interface PasswordInputProps extends ViewProps {
  value?: string
  length?: number
  gutter?: number
  mask?: boolean
  focused?: boolean
  focus?: boolean
  feedback?: ReactText | PasswordInputFeedbackProps | ReactElement

  onFocus?(event: ITouchEvent): void
}

function PasswordInput(props: PasswordInputProps) {
  const {
    className,
    value = "",
    length = 6,
    gutter,
    mask = true,
    focused: focusedProp,
    focus: focusProp = false,
    feedback: feedbackProp,
    onFocus,
    ...restProps
  } = props

  const feedback = createVariantElement(PasswordInputFeedback, feedbackProp)

  const focus = useMemo(() => (_.isBoolean(focusedProp) ? focusedProp : focusProp), [
    focusProp,
    focusedProp,
  ])

  if (_.isBoolean(focusedProp)) {
    // eslint-disable-next-line no-console
    console.warn("[Deprecated] The focused prop is deprecated. Please use the focus prop.")
  }

  const onTouchStart = useCallback(
    (event: ITouchEvent) => {
      stopPropagation(event)
      onFocus?.(event)
    },
    [onFocus],
  )

  const points = useMemo(() => {
    const Points: JSX.Element[] = []

    for (let i = 0; i < length; i++) {
      const char = value[i]
      const bordered = i !== 0 && !gutter
      const showCursor = focus && i === value.length

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
  }, [focus, gutter, length, mask, value])

  return (
    <View className={classNames(prefixClassname("password-input"), className)} {...restProps}>
      <View
        className={classNames(prefixClassname("password-input__security"), {
          [HAIRLINE_BORDER_SURROUND]: !gutter,
        })}
        onTouchStart={onTouchStart}
        children={points}
      />
      {feedback}
    </View>
  )
}

export default PasswordInput
