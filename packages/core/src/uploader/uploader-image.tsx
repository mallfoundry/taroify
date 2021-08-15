import { Description } from "@taroify/icons"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import Image from "../image"
import { prefixClassname } from "../styles"
import UploaderRemove from "./uploader-remove"
import { isImageFile } from "./uploader.utils"

interface UploaderImageProps {
  className?: string
  type?: string
  url?: string
  name?: string
  removable?: boolean
  children?: ReactNode

  onRemove?(event: ITouchEvent): void
}

function UploaderImage(props: UploaderImageProps) {
  const { className, type, url, name, removable = true, children, onRemove } = props

  function renderFile() {
    if (isImageFile({ type, url })) {
      return <Image className={prefixClassname("uploader__preview-image")} src={url} />
    }

    return (
      <View className={prefixClassname("uploader__file")}>
        <Description className={prefixClassname("uploader__file-icon")} />
        <View
          className={classNames(
            prefixClassname("uploader__file-name"),
            prefixClassname("ellipsis"),
          )}
        >
          {name ?? url}
        </View>
      </View>
    )
  }

  return (
    <View className={classNames(prefixClassname("uploader__preview"), className)}>
      {renderFile()}
      {children}
      {removable && <UploaderRemove onClick={onRemove} />}
    </View>
  )
}

export default UploaderImage
