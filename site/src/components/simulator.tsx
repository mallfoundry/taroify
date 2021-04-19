import * as React from "react"
import { useEffect, useState } from "react"
import "./simulator.scss"
import useScroll from "../hooks/useScroll"
import classNames from "classnames"
import * as _ from "lodash"
import { listeningSimulatorEvents } from "../utils/simulator-router"

function getIframePath(path?: string) {
  if (path && _.startsWith(path, "/components/")) {
    const componentName = _.replace(path, "/components/", "")
    return `#/pages/${_.endsWith(componentName, "/") ? componentName : `${componentName}/`}index`
  }
  if (path && _.startsWith(path, "/taroify.com/components/")) {
    const componentName = _.replace(path, "/taroify.com/components/", "")
    return `#/pages/${_.endsWith(componentName, "/") ? componentName : `${componentName}/`}index`
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
  const { position: { y: positionY } } = useScroll()
  const [iframeUrl, setIframeUrl] = useState("")

  useEffect(() => setIframeUrl(getIframeUrl(slug)), [slug])

  useEffect(listeningSimulatorEvents, [])

  return (
    <div className={classNames("vant-simulator", {
      [`vant-simulator-fixed`]: positionY > 60,
    })}>
      <iframe src={iframeUrl} frameBorder="0" />
    </div>
  )
}
