import { Textarea, TextareaProps } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { prefixClassname } from "../styles"

export interface NativeTextareaProps extends TextareaProps {
  nativeProps?: Record<string, string>
  readonly?: boolean
}

function NativeTextarea(props: NativeTextareaProps) {
  const { nativeProps = {}, readonly, ...restProps } = props
  const { className: nativeClassname, ...restNativeProps } = nativeProps

  return (
    <Textarea
      // @ts-ignore
      nativeProps={{
        className: classNames(
          prefixClassname("native-textarea"),
          {
            [prefixClassname("native-textarea--readonly")]: readonly,
          },
          nativeClassname,
        ),
        ...restNativeProps,
      }}
      {...restProps}
    />
  )
}

export default NativeTextarea
