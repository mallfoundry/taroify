import * as React from "react"
import { useMemo, useRef, useState, useEffect } from "react"
import { Canvas, View } from "@tarojs/components"
import { getEnv, getWindowInfo } from "@tarojs/taro"
import cls from "classnames"
import { useCanvas } from "../hooks"
import { prefixClassname } from "../styles"

type WatermarkProps = Partial<{
  gapX: number
  gapY: number
  image: string
  width: number
  height: number
  rotate: number
  zIndex: number
  opacity: number
  fullPage: boolean
  content: string
  textSize: number
  textColor: string
}>

let _canvasIdx = 0

function Watermark(props: WatermarkProps) {
  const {
    gapX = 20,
    gapY = 20,
    image: imageProp = "",
    width: widthProp = 80,
    height: heightProp = 80,
    rotate = -11,
    zIndex,
    opacity = 1,
    fullPage = false,
    content = "",
    textSize = 20,
    textColor = "#dcdee0",
  } = props
  const width = useMemo(() => widthProp + gapX, [widthProp, gapX])
  const height = useMemo(() => heightProp + gapY, [heightProp, gapY])
  const canvasId = useMemo(() => `taroify-watermark${_canvasIdx++}`, [])
  const canvasRef = useRef<HTMLDivElement>(null)
  const [watermarkUrl, setWatermarkUrl] = useState("")
  const [canvas, ctx, loaded] = useCanvas(canvasId, canvasRef)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // not supported in mini program
    // const svgStr =
    // `<svg
    //   xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink"
    // >
    //       `<foreignObject x="0" y="0" width="${width}" height="${height}">
    //           <div xmlns="http://www.w3.org/1999/xhtml" style="transform-origin: center; transform: rotate(${rotate}deg)">
    //             ${html}
    //           </div>
    //         </foreignObject>`
    // </svg>`
    // const svg64 = btoaFn(svgStr);
    // const b64Start = "data:image/svg+xml;base64,";
    // const image64 = b64Start + svg64;
    if (canvas && ctx && loaded) {
      if (imageProp) {
        // @ts-ignore
        const image: HTMLImageElement = getEnv() === "WEB" ? new Image() : canvas.createImage()
        image.crossOrigin = "anonymous"
        image.referrerPolicy = "no-referrer"

        image.onload = () => {
          canvas.width = image.width + gapX
          canvas.height = image.height + gapY
          ctx.globalAlpha = opacity
          ctx.translate(canvas.width / 2, canvas.height / 2)
          ctx.rotate((rotate * Math.PI) / 180)
          ctx.translate(-canvas.width / 2, -canvas.height / 2)
          ctx?.drawImage(image, gapX, gapY)
          setWatermarkUrl(canvas.toDataURL())
        }
        image.src = imageProp
      } else {
        const ratio = getWindowInfo().pixelRatio || 1
        canvas.width = width * ratio
        canvas.height = height * ratio
        ctx.scale(ratio, ratio)
        ctx.globalAlpha = opacity
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((rotate * Math.PI) / 180)
        ctx.translate(-canvas.width / 2, -canvas.height / 2)
        ctx.textAlign = "left"
        ctx.font = `${textSize}px sans-serif`
        ctx.fillStyle = textColor
        ctx.textBaseline = "top"
        ctx.fillText(content, gapX, gapY)
        setWatermarkUrl(canvas.toDataURL())
      }
    }
  }, [gapX, gapY, imageProp, width, height, rotate, opacity, content, textSize, textColor, loaded])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const style = useMemo(
    () => ({
      zIndex,
      backgroundImage: `url(${watermarkUrl})`,
      backgroundSize: `${width}px ${height}px`,
    }),
    [zIndex, watermarkUrl],
  )

  return (
    <View
      className={cls({
        [prefixClassname("watermark")]: true,
        [prefixClassname("watermark--full")]: fullPage,
      })}
      style={style}
    >
      <View className={prefixClassname("watermark__wrapper")}>
        <Canvas type="2d" id={canvasId} canvasId={canvasId} ref={canvasRef} />
      </View>
    </View>
  )
}

export default Watermark
