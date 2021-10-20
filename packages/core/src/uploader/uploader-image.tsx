import { Description } from "@taroify/icons"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import Image, { ImageMode } from "../image"
import { prefixClassname } from "../styles"
import UploaderRemove from "./uploader-remove"
import { isImageFile } from "./uploader.utils"

interface UploaderImageProps {
  className?: string
  type?: string
  url?: string
  name?: string
  removable?: boolean
  mode?: ImageMode
  alt?: string
  round?: boolean
  children?: ReactNode

  onRemove?(event: ITouchEvent): void
}

function UploaderImage(props: UploaderImageProps) {
  const {
    className,
    type,
    url,
    name,
    removable = true,
    mode,
    alt,
    round,
    children,
    onRemove,
  } = props

  function renderFile() {
    if (isImageFile({ type, url })) {
      return (
        <Image
          className={prefixClassname("uploader__preview-image")}
          src={url}
          mode={mode}
          alt={alt}
          round={round}
        />
      )
    }

    return (
      <View className={prefixClassname("uploader__file")}>
        <Description className={prefixClassname("uploader__file-icon")} />
        <View
          className={classNames(
            prefixClassname("uploader__file-name"),
            prefixClassname("ellipsis"),
          )}
          children={name ?? url}
        />
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
