import { Badge, Col, Notify, Row, Tabs } from "@taroify/core"
import * as icons from "@taroify/icons"
import { CartOutlined, ChatOutlined, FireOutlined } from "@taroify/icons"
import names from "@taroify/icons/van/names"
import { View } from "@tarojs/components"
import * as _ from "lodash"
import * as React from "react"
import { createElement, useState } from "react"
import { inBrowser } from "../../../../../../bundles/core/utils/base"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

// from https://30secondsofcode.org
function copyToClipboard(str: string) {
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)

  const selection = document.getSelection()

  if (!selection) {
    return
  }

  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false

  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)

  if (selected) {
    selection.removeAllRanges()
    selection.addRange(selected)
  }
}

function convertIconComponentName(name: string) {
  const isOutline = _.endsWith(name, "-o")
  name = isOutline ? name.substring(0, _.size(name) - 2) + "-outlined" : name
  return _.upperFirst(_.camelCase(name))
}

interface VanIconProps {
  name: string

  onClick?(name: string): void
}

function VanIcon(props: VanIconProps) {
  const { name, onClick } = props
  const iconName = convertIconComponentName(name)
  return (
    <Col span={6} onClick={() => onClick?.(iconName)}>
      {
        // @ts-ignore
        createElement(icons[iconName])
      }
      <View className="icon-name">{iconName}</View>
    </Col>
  )
}

export default function IconDemo() {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(false)
  const [notify, setNotify] = useState("")

  function copyIcon(name: string) {
    if (inBrowser) {
      copyToClipboard(`<${name} />`)
      setNotify(`复制成功：<${name} />`)
      setOpen(true)
    }
  }

  return (
    <Page title="Icon 图标" className="icon-demo">
      <Notify
        className="icon-demo-notify"
        duration={1500}
        color="success"
        open={open}
        onClose={setOpen}
      >
        {notify}
      </Notify>
      <Tabs value={tab} lazyRender={false} onChange={setTab}>
        <Tabs.TabPane title="用法示例">
          <Block title="基础用法">
            <Row>
              <Col span={6}>
                <ChatOutlined />
              </Col>
              <Col span={6}>{createElement(icons.ChatOutlined)}</Col>
            </Row>
          </Block>
          <Block title="徽标提示">
            <Row>
              <Col span={6}>
                <Badge dot>
                  <ChatOutlined />
                </Badge>
              </Col>
              <Col span={6}>
                <Badge content="9">
                  <ChatOutlined />
                </Badge>
              </Col>
              <Col span={6}>
                <Badge content="99+">
                  <ChatOutlined />
                </Badge>
              </Col>
            </Row>
          </Block>
          <Block title="图标颜色">
            <Row>
              <Col span={6}>
                <CartOutlined style={{ color: "#1989fa" }} />
              </Col>
              <Col span={6}>
                <FireOutlined style={{ color: "#ee0a24" }} />
              </Col>
            </Row>
          </Block>
          <Block title="图标大小">
            <Row>
              <Col span={6}>
                <ChatOutlined size="40" />
              </Col>
              <Col span={6}>
                <ChatOutlined size="2rem" />
              </Col>
            </Row>
          </Block>
        </Tabs.TabPane>
        <Tabs.TabPane title="基础图标">
          <Row>
            {
              //
              _.map(names.basic, (name) => (
                <VanIcon key={name} name={name} onClick={copyIcon} />
              ))
            }
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane title="线框风格">
          <Row>
            {
              //
              _.map(names.outlined, (name) => (
                <VanIcon key={name} name={name} onClick={copyIcon} />
              ))
            }
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane title="实底风格">
          <Row>
            {
              //
              _.map(names.filled, (name) => (
                <VanIcon key={name} name={name} onClick={copyIcon} />
              ))
            }
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}
