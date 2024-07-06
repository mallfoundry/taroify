import { Image as TaroImage, View, ViewProps } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useEffect, useMemo, useState, useRef } from "react"
import { prefixClassname } from "../styles"
import { getLogger } from "../utils/logger"
import { useMemoizedFn } from "../hooks"
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
  mode?: ImageMode
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
    mode = "scaleToFill",
    round,
    shape: shapeProp,
    lazyLoad = false,
    placeholder = true,
    fallback = true,
    onLoad,
    onError,
    ...restProps
  } = props
  const taroImageRef = useRef<any>()
  const taroMode = useImageMode(mode)
  const shape = useImageShape(shapeProp, round)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const isLoadedRef = useRef(false)
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
    setLoading(true)
  }, [src])

  useEffect(() => {
    const nativeImg = taroImageRef.current?.children?.[0] as HTMLImageElement
    if (nativeImg && nativeImg.complete) {
      handleLoad()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
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
          imgProps={{ alt }}
          onLoad={handleLoad}
          onError={handleError}
          {...restProps}
        />
      )}
      {loading && placeholder && (
        <View
          className={classNames(
            prefixClassname("image"),
            {
              [prefixClassname("image--square")]: shape === "square",
              [prefixClassname("image--rounded")]: shape === "rounded",
              [prefixClassname("image--circle")]: shape === "circle",
            },
            className,
          )}
          {...restProps}
        >
          <ImagePlaceholder prefix="placeholder" children={placeholder} />
        </View>
      )}
      {failed && fallback && (
        <View
          className={classNames(
            prefixClassname("image"),
            {
              [prefixClassname("image--square")]: shape === "square",
              [prefixClassname("image--rounded")]: shape === "rounded",
              [prefixClassname("image--circle")]: shape === "circle",
            },
            className,
          )}
          {...restProps}
        >
          <ImagePlaceholder prefix="fallback" children={fallback} />
        </View>
      )}
    </>
  )
}
