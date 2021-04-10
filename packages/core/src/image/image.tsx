import { Image as TaroImage, View } from "@tarojs/components"
import * as React from "react"
import { CSSProperties, ReactElement, ReactNode, useEffect, useState } from "react"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import * as _ from "lodash"

export enum ImageMode {
  ScaleToFill = "scaleToFill",
  AspectFit = "aspectFit",
  AspectFill = "aspectFill",
  WidthFix = "widthFix",
  HeightFix = "heightFix",
  Top = "top",
  Bottom = "bottom",
  Center = "center",
  Left = "left",
  Right = "right",
  TopLeft = "topLeft",
  TopRight = "topRight",
  BottomLeft = "bottomLeft",
  BottomRight = "bottomRight",
}

type ImageModeString =
  "scaleToFill"
  | "aspectFit"
  | "aspectFill"
  | "widthFix"
  | "heightFix"
  | "top"
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"


function toTaroMode(mode: ImageMode | ImageModeString): string {
  if (mode === ImageMode.TopLeft) {
    return "top left"
  }
  if (mode === ImageMode.TopRight) {
    return "top right"
  }
  if (mode === ImageMode.BottomLeft) {
    return "bottom left"
  }
  if (mode === ImageMode.BottomRight) {
    return "bottom right"
  }
  return mode
}

interface ImagePlaceholderProps {
  prefix: string
  children?: ReactNode
}

function ImagePlaceholder({ prefix = "placeholder", children }: ImagePlaceholderProps) {
  // Icon Element
  if (React.isValidElement(children)) {
    return (
      <>
        {
          React.cloneElement(children as ReactElement, {
            className: classNames(prefixClassname(`image__${prefix}`),
              prefixClassname(`image__${prefix}-icon`)),
          })
        }
      </>
    )
  }
  // Text String
  if (_.isString(children) || _.isNumber(children)) {
    return (
      <View className={prefixClassname(`image__${prefix}`)} children={children} />
    )
  }
  return <></>
}

interface ImageProps {
  className?: string
  style?: CSSProperties
  src?: string
  alt?: string
  mode?: ImageMode | ImageModeString
  round?: boolean
  lazyLoad?: boolean
  placeholder?: boolean | ReactNode
  fallback?: boolean | ReactNode
}

export default function Image(props: ImageProps) {
  const {
    className,
    style,
    src,
    alt,
    mode = ImageMode.ScaleToFill,
    round = false,
    lazyLoad = false,
    placeholder = true,
    fallback = true,
  } = props
  const taroMode = toTaroMode(mode)

  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [src])

  function handleLoad() {
    setLoading(false)
  }

  function handleError() {
    setLoading(false)
    setFailed(true)
  }

  return (
    <>
      {
        (!failed && src) && <TaroImage
          src={src as string}
          mode={taroMode as unknown as undefined}
          lazyLoad={lazyLoad}
          className={classNames(
            {
              [prefixClassname("image--round")]: round,
              [prefixClassname("image--loading")]: loading,
            },
            className,
          )}
          style={style}
          imgProps={{ alt }}
          onError={handleError}
          onLoad={handleLoad}
        />
      }
      {
        (loading && placeholder) && <View className={classNames(prefixClassname("image"), className)} style={style}>
          <ImagePlaceholder prefix="placeholder" children={placeholder} />
        </View>
      }
      {
        (failed && fallback) && <View className={classNames(prefixClassname("image"), className)} style={style}>
          <ImagePlaceholder prefix="fallback" children={fallback} />
        </View>
      }
    </>
  )
}
