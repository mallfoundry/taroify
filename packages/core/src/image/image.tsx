import { Image as TaroImage, View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactElement, ReactNode, useEffect, useState } from "react"
import { prefixClassname } from "../styles"

// export enum ImageMode {
//   ScaleToFill = "scaleToFill",
//   AspectFit = "aspectFit",
//   AspectFill = "aspectFill",
//   WidthFix = "widthFix",
//   HeightFix = "heightFix",
//   Top = "top",
//   Bottom = "bottom",
//   Center = "center",
//   Left = "left",
//   Right = "right",
//   TopLeft = "topLeft",
//   TopRight = "topRight",
//   BottomLeft = "bottomLeft",
//   BottomRight = "bottomRight",
// }

export type ImageMode =
  | "scaleToFill"
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

function toTaroMode(mode: ImageMode): string {
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
        {React.cloneElement(children as ReactElement, {
          className: classNames(
            prefixClassname(`image__${prefix}`),
            prefixClassname(`image__${prefix}-icon`),
          ),
        })}
      </>
    )
  }
  // Text String
  if (_.isString(children) || _.isNumber(children)) {
    return <View className={prefixClassname(`image__${prefix}`)} children={children} />
  }
  return <></>
}

interface ImageProps {
  className?: string
  style?: CSSProperties
  src?: string
  alt?: string
  mode?: ImageMode
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
    mode = "scaleToFill",
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
      {!failed && src && (
        <TaroImage
          src={src as string}
          mode={(taroMode as unknown) as undefined}
          lazyLoad={lazyLoad}
          className={classNames(
            prefixClassname("image"),
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
      )}
      {loading && placeholder && (
        <View className={classNames(prefixClassname("image"), className)} style={style}>
          <ImagePlaceholder prefix="placeholder" children={placeholder} />
        </View>
      )}
      {failed && fallback && (
        <View className={classNames(prefixClassname("image"), className)} style={style}>
          <ImagePlaceholder prefix="fallback" children={fallback} />
        </View>
      )}
    </>
  )
}
