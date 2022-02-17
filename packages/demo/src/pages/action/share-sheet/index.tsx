import { Cell, Image, ShareSheet } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicShareSheet() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        clickable
        title="显示分享面板"
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <ShareSheet
        open={open}
        onSelect={() => setOpen(false)}
        onClose={setOpen}
        onCancel={() => {
          setOpen(false)
        }}
      >
        <ShareSheet.Backdrop />
        <ShareSheet.Header title="立即分享给好友" />
        <ShareSheet.Options>
          <ShareSheet.Option icon="wechat" name="微信" openType="share" />
          <ShareSheet.Option icon="wechat-moments" name="朋友圈" />
          <ShareSheet.Option icon="weibo" name="微博" />
          <ShareSheet.Option icon="qq" name="QQ" />
        </ShareSheet.Options>
        <ShareSheet.Button type="cancel">取消</ShareSheet.Button>
      </ShareSheet>
    </>
  )
}

function MultilineShareSheet() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        clickable
        title="显示分享面板"
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <ShareSheet open={open} onSelect={() => setOpen(false)} onClose={setOpen}>
        <ShareSheet.Header title="立即分享给好友" />
        <ShareSheet.Options>
          <ShareSheet.Option icon="wechat" name="微信" />
          <ShareSheet.Option icon="wechat-moments" name="朋友圈" />
          <ShareSheet.Option icon="weibo" name="微博" />
          <ShareSheet.Option icon="qq" name="QQ" />
        </ShareSheet.Options>
        <ShareSheet.Options>
          <ShareSheet.Option icon="link" name="复制链接" />
          <ShareSheet.Option icon="poster" name="分享海报" />
          <ShareSheet.Option icon="qrcode" name="二维码" />
          <ShareSheet.Option icon="weapp-qrcode" name="小程序码" />
        </ShareSheet.Options>
        <ShareSheet.Button type="cancel">取消</ShareSheet.Button>
      </ShareSheet>
    </>
  )
}

function CustomShareSheet() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        clickable
        title="显示分享面板"
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <ShareSheet open={open} onSelect={() => setOpen(false)} onClose={setOpen}>
        <ShareSheet.Options>
          <ShareSheet.Option
            icon={<Image src="https://img.yzcdn.cn/vant/custom-icon-fire.png" />}
            name="名称"
          />
          <ShareSheet.Option
            icon={<Image src="https://img.yzcdn.cn/vant/custom-icon-light.png" />}
            name="名称"
          />
          <ShareSheet.Option
            icon={<Image src="https://img.yzcdn.cn/vant/custom-icon-water.png" />}
            name="名称"
          />
        </ShareSheet.Options>
        <ShareSheet.Button type="cancel">取消</ShareSheet.Button>
      </ShareSheet>
    </>
  )
}

function ShareSheetWithDescription() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        clickable
        title="显示分享面板"
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <ShareSheet open={open} onSelect={() => setOpen(false)} onClose={setOpen}>
        <ShareSheet.Header title="立即分享给好友">描述信息</ShareSheet.Header>
        <ShareSheet.Options>
          <ShareSheet.Option icon="wechat" name="微信" />
          <ShareSheet.Option icon="weibo" name="微博" />
          <ShareSheet.Option icon="link" name="复制链接" description="描述信息" />
          <ShareSheet.Option icon="poster" name="分享海报" />
          <ShareSheet.Option icon="qrcode" name="二维码" />
        </ShareSheet.Options>
        <ShareSheet.Button type="cancel">取消</ShareSheet.Button>
      </ShareSheet>
    </>
  )
}

export default function ShareSheetDemo() {
  return (
    <Page title="ShareSheet 分享面板" className="share-sheet-demo">
      <Block variant="card" title="基础用法">
        <BasicShareSheet />
      </Block>
      <Block variant="card" title="展示多行选项">
        <MultilineShareSheet />
      </Block>
      <Block variant="card" title="自定义图标">
        <CustomShareSheet />
      </Block>
      <Block variant="card" title="展示描述信息">
        <ShareSheetWithDescription />
      </Block>
    </Page>
  )
}
