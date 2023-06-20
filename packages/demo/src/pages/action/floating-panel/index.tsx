import { FloatingPanel, Cell, Tabs } from "@taroify/core"
import { useState, useMemo } from "react"
import { getSystemInfoSync } from "@tarojs/taro"
import { View } from "@tarojs/components"
import Page from "../../../components/page"

import "./index.scss"

function BasicFloatingPanel() {
  return (
    <FloatingPanel>
      <Cell.Group>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell>4</Cell>
        <Cell>5</Cell>
        <Cell>6</Cell>
        <Cell>7</Cell>
        <Cell>8</Cell>
        <Cell>9</Cell>
        <Cell>10</Cell>
        <Cell>11</Cell>
        <Cell>12</Cell>
        <Cell>13</Cell>
      </Cell.Group>
    </FloatingPanel>
  )
}

function CustomAnchors() {
  const windowHeight = useMemo(() => getSystemInfoSync().windowHeight, [])

  const anchors = useMemo(
    () => [200, Math.round(0.4 * windowHeight), Math.round(0.7 * windowHeight)],
    [windowHeight],
  )

  return (
    <FloatingPanel anchors={anchors} height={anchors[0]}>
      <Cell.Group>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell>4</Cell>
        <Cell>5</Cell>
        <Cell>6</Cell>
        <Cell>7</Cell>
        <Cell>8</Cell>
        <Cell>9</Cell>
        <Cell>10</Cell>
        <Cell>11</Cell>
        <Cell>12</Cell>
        <Cell>13</Cell>
      </Cell.Group>
    </FloatingPanel>
  )
}

function HeadDragOnly() {
  return (
    <FloatingPanel contentDraggable={false}>
      <Cell.Group>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell>4</Cell>
        <Cell>5</Cell>
        <Cell>6</Cell>
        <Cell>7</Cell>
        <Cell>8</Cell>
        <Cell>9</Cell>
        <Cell>10</Cell>
        <Cell>11</Cell>
        <Cell>12</Cell>
        <Cell>13</Cell>
      </Cell.Group>
    </FloatingPanel>
  )
}

export default function FloatingPanelDemo() {
  const [value, setValue] = useState(0)

  return (
    <Page className="floating-panel-demo" title="FloatingPanel 浮动面板">
      <Tabs value={value} onChange={setValue}>
        <Tabs.TabPane title="基础用法">
          <BasicFloatingPanel />
        </Tabs.TabPane>
        <Tabs.TabPane title="自定义锚点">
          <CustomAnchors />
        </Tabs.TabPane>
        <Tabs.TabPane title="仅头部拖拽">
          <HeadDragOnly />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}
