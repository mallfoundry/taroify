import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"

interface SwitchProps {
  className?: string
  checked?: boolean
  loading?: boolean
  disabled?: boolean
  size?: number | string
  activeColor?: string
  inactiveColor?: string

  onChange?(checked: boolean): void

  onClick?(event: ITouchEvent): void
}

function Switch(props: SwitchProps) {
  const {
    className,
    checked = false,
    loading = false,
    disabled = false,
    size,
    activeColor,
    inactiveColor,
    onChange,
    onClick,
  } = props

  const color = checked ? activeColor : inactiveColor

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
    if (disabled || loading) {
      return
    }
    onChange?.(!checked)
  }

  return (
    <View
      className={classNames(
        prefixClassname("switch"),
        {
          [prefixClassname("switch--checked")]: checked,
          [prefixClassname("switch--loading")]: loading,
          [prefixClassname("switch--disabled")]: disabled,
        },
        className,
      )}
      style={{
        fontSize: addUnitPx(size),
        backgroundColor: color,
      }}
      onClick={handleClick}
    >
      <View className={prefixClassname("switch__node")}>
        {loading && <Loading className={prefixClassname("switch__loading")} color={color} />}
      </View>
    </View>
  )
}

export default Switch
