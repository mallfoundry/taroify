import { Photograph } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import UploaderContext from "./uploader.context"

interface UploaderUploadProps extends ViewProps {
  readonly?: boolean
  icon?: ReactNode

  onClick?(event: ITouchEvent): void
}

function UploaderUpload(props: UploaderUploadProps) {
  const { className, readonly, icon = <Photograph />, onClick, ...restProps } = props
  const { disabled, onUpload } = useContext(UploaderContext)

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
    if (!readonly && !disabled) {
      onUpload?.()
    }
  }

  return (
    <View
      className={classNames(
        prefixClassname("uploader__upload"),
        {
          [prefixClassname("uploader__upload--readonly")]: readonly,
        },
        className,
      )}
      onClick={handleClick}
      {...restProps}
    >
      {cloneIconElement(icon, { className: prefixClassname("uploader__upload-icon") })}
    </View>
  )
}

export default UploaderUpload
