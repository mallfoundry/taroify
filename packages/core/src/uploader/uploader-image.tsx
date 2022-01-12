import { Description } from "@taroify/icons"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import Image, { ImageMode } from "../image"
import { prefixClassname } from "../styles"
import UploaderRemove from "./uploader-remove"
import UploaderContext from "./uploader.context"
import { isImageFile } from "./uploader.utils"

interface UploaderImageProps extends ViewProps {
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
    removable: removableProp,
    mode,
    alt,
    round,
    children,
    onRemove,
    ...restProps
  } = props
  const { removable: ctxRemovable } = useContext(UploaderContext)
  const removable = removableProp ?? ctxRemovable

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
    <View className={classNames(prefixClassname("uploader__preview"), className)} {...restProps}>
      {renderFile()}
      {children}
      {removable && <UploaderRemove onClick={onRemove} />}
    </View>
  )
}

export default UploaderImage
