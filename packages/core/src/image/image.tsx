import { Image as TaroImage, View, ViewProps } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useEffect, useMemo, useState, useRef } from "react"
import { pxTransform } from "@tarojs/taro"
import { prefixClassname } from "../styles"
import { getLogger } from "../utils/logger"
import { useMemoizedFn } from "../hooks"
import mergeStyle from "../utils/merge-style"
import ImagePlaceholder from "./image-placeholder"
import { ImageMode, ImageShape } from "./image.shared"

const { warn } = getLogger("Image")

function useImageMode(mode: ImageMode) {
  return useMemo(() => {
    if (mode === "topLeft") {
      return "top left"
    }
    if (mode === "topRight") {
      return "top right"
    }
    if (mode === "bottomLeft") {
      return "bottom left"
    }
    if (mode === "bottomRight") {
      return "bottom right"
    }
    return mode
  }, [mode])
}

function useImageShape(shape?: ImageShape, round?: boolean) {
  if (_.isBoolean(round) && round) {
    shape = "circle"
    warn(`Use the shape="${shape}" prop instead of the round prop`)
    if (round) {
      return shape
    }
  }
  return shape
}

export interface ImageProps extends ViewProps {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  mode?: ImageMode
  /** @deprecated */
  round?: boolean
  shape?: ImageShape
  lazyLoad?: boolean
  placeholder?: boolean | ReactNode
  fallback?: boolean | ReactNode

  onLoad?(): void

  onError?(): void
}

export default function Image(props: ImageProps) {
  const {
    className,
    src,
    alt,
    width: widthProp,
    height: heightProp,
    mode = "scaleToFill",
    round,
    shape: shapeProp,
    lazyLoad = false,
    placeholder = false,
    fallback = false,
    onLoad,
    onError,
    style: styleProp,
    ...restProps
  } = props
  const taroImageRef = useRef<any>()
  const taroMode = useImageMode(mode)
  const shape = useImageShape(shapeProp, round)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const isLoadedRef = useRef(false)

  const [viewStyle, imgStyle] = useMemo(() => {
    const width = widthProp ? typeof widthProp === "number" ? pxTransform(widthProp) : widthProp : undefined
    const height = heightProp ? typeof heightProp === "number" ? pxTransform(heightProp) : heightProp : undefined
    const imgStyle = mergeStyle(styleProp, {})
    imgStyle.width = width || imgStyle.width
    imgStyle.height = height || imgStyle.height
    return [{ width: imgStyle.width || "100%", height: imgStyle.height || "100%", position: "relative" }, imgStyle] as const
  }, [styleProp, widthProp, heightProp])

  const handleLoad = useMemoizedFn(() => {
    if (!isLoadedRef.current) {
      isLoadedRef.current = true
      onLoad?.()
      setLoading(false)
    }
  })
  const handleError = useMemoizedFn(() => {
    onError?.()
    setLoading(false)
    setFailed(true)
  })

  useEffect(() => {
    isLoadedRef.current = false
    const nativeImg = taroImageRef.current?.children?.[0] as HTMLImageElement
    if (nativeImg && nativeImg.complete) {
      handleLoad()
    } else {
      setLoading(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])
  return (
    <View style={viewStyle}>
      {!failed && src && (
        <TaroImage
          ref={taroImageRef}
          src={src as string}
          mode={taroMode as unknown as undefined}
          lazyLoad={lazyLoad}
          className={classNames(
            prefixClassname("image"),
            {
              [prefixClassname("image--square")]: shape === "square",
              [prefixClassname("image--rounded")]: shape === "rounded",
              [prefixClassname("image--circle")]: shape === "circle",
              [prefixClassname("image--loading")]: loading,
            },
            className,
          )}
          style={imgStyle}
          imgProps={{ alt }}
          onLoad={handleLoad}
          onError={handleError}
          {...restProps}
        />
      )}
      {loading && placeholder && <ImagePlaceholder prefix="placeholder" children={placeholder} />}
      {failed && fallback && <ImagePlaceholder prefix="fallback" children={fallback} />}
    </View>
  )
}
