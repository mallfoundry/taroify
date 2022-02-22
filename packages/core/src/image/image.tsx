import { Image as TaroImage, View } from "@tarojs/components"
import { StandardProps } from "@tarojs/components/types/common"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { prefixClassname } from "../styles"
import { getLogger } from "../utils/logger"
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

export interface ImageProps extends StandardProps {
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
  const taroMode = useImageMode(mode)
  const shape = useImageShape(shapeProp, round)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => setLoading(true), [src])

  const handleLoad = useCallback(() => {
    onLoad?.()
    setLoading(false)
  }, [onLoad])

  const handleError = useCallback(() => {
    onError?.()
    setLoading(false)
    setFailed(true)
  }, [onError])

  return (
    <>
      {!failed && src && (
        <TaroImage
          src={src as string}
          mode={(taroMode as unknown) as undefined}
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
