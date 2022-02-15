import { useUncontrolled } from "@taroify/hooks"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"

export interface SwitchProps extends ViewProps {
  style?: CSSProperties
  defaultChecked?: boolean
  checked?: boolean
  loading?: boolean
  disabled?: boolean
  size?: number | string

  onChange?(checked: boolean): void
}

function Switch(props: SwitchProps) {
  const {
    className,
    style,
    defaultChecked,
    checked: checkedProp,
    loading = false,
    disabled = false,
    size,
    onChange: onChangeProp,
    onClick,
    ...restProps
  } = props

  const { value: checked = false, setValue } = useUncontrolled({
    value: checkedProp,
    defaultValue: defaultChecked,
    onChange: onChangeProp,
  })

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
    if (disabled || loading) {
      return
    }
    setValue(!checked)
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
        ...style,
      }}
      onClick={handleClick}
      {...restProps}
    >
      <View className={prefixClassname("switch__node")}>
        {loading && <Loading className={prefixClassname("switch__loading")} />}
      </View>
    </View>
  )
}

export default Switch
