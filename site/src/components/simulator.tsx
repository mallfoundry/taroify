import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { useEffect, useState } from "react"
import useScroll from "../hooks/useScroll"
import { listeningSimulatorEvents } from "../utils/simulator-router"
import "./simulator.scss"

function resolveComponentName(path: string, pattern: RegExp | string) {
  return _.replace(path, pattern, "")
}

function resolveComponentPath(componentName: string) {
  return `#/pages/${_.endsWith(componentName, "/") ? componentName : `${componentName}/`}index`
}

function getIframePath(path?: string) {
  if (path && _.startsWith(path, "/components/")) {
    const componentName = resolveComponentName(path, "/components/")
    return resolveComponentPath(componentName)
  }
  if (path && _.startsWith(path, "/taroify.com/components/")) {
    const componentName = resolveComponentName(path, "/taroify.com/components/")
    return resolveComponentPath(componentName)
  }
  return "#/pages/home/index"
}

function h5Root() {
  if (process.env.NODE_ENV === "development") {
    return "//localhost:10086/index.html"
  }
  return "//taroify.gitee.io/taroify-demo/h5/index.html"
}

function getIframeUrl(path?: string) {
  const iframePath = getIframePath(path)
  return `${h5Root()}${iframePath}`
}

interface SimulatorProps {
  slug?: string
}

export default function Simulator(props: SimulatorProps) {
  const { slug } = props
  const {
    position: { y: positionY },
  } = useScroll()
  const [iframeUrl, setIframeUrl] = useState("")

  useEffect(() => setIframeUrl(getIframeUrl(slug)), [slug])

  useEffect(listeningSimulatorEvents, [])

  return (
    <div
      className={classNames("vant-simulator", {
        "vant-simulator-fixed": positionY > 60,
      })}
    >
      <iframe src={iframeUrl} frameBorder="0" />
    </div>
  )
}
