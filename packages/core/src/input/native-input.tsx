import { Input, InputProps } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { HTMLProps } from "react"
import { prefixClassname } from "../styles"
import { InputColor } from "./input.shared"

export interface NativeInputProps extends InputProps {
  nativeProps?: HTMLProps<HTMLInputElement>
  readonly?: boolean
  color?: InputColor
}

function NativeInput(props: NativeInputProps) {
  const { nativeProps = {}, readonly, color, ...restProps } = props
  const { className: nativeClassname, ...restNativeProps } = nativeProps
  return (
    <Input
      // @ts-ignore
      nativeProps={{
        className: classNames(
          prefixClassname("native-input"),
          {
            [prefixClassname("native-input--readonly")]: readonly,
            [prefixClassname("native-input--colorful")]: color || readonly,
          },
          nativeClassname,
        ),
        ...restNativeProps,
      }}
      {...restProps}
    />
  )
}

export default NativeInput
