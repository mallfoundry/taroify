import { useRef } from "react"
import { Signature, SignatureInstance, Flex, Button } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"


function BasicSignature() {
  const ref = useRef<SignatureInstance>(null)
  return <>
    <Signature ref={ref} />
    <Flex justify="end">
      <Button size="small" onClick={() => { ref.current?.clear() }} style={{ marginRight: "1rem" }}>取消</Button>
      <Button size="small" color="primary" onClick={() => { console.log(ref.current?.getImage()) }}>确认</Button>
    </Flex>
  </>
}

function PenColorSignature() {
  return <Signature penColor="#ff0000" />
}

function LineWidthSignature() {
  return <Signature lineWidth={6} />
}

function BackgroundColorSignature() {
  const ref = useRef<SignatureInstance>(null)
  return <>
    <Signature ref={ref} backgroundColor="#eee"  />
    <Flex justify="end">
      <Button size="small" onClick={() => { ref.current?.clear() }} style={{ marginRight: "1rem" }}>取消</Button>
      <Button size="small" color="primary" onClick={() => { console.log(ref.current?.getImage()) }}>确认</Button>
    </Flex>
  </>
}


export default function SignatureDemo() {
  return (
    <Page title="Signature 签名" className="signature-demo">
      <Block title="基础用法">
        <BasicSignature />
      </Block>
      <Block title="自定义颜色">
        <PenColorSignature />
      </Block>
      <Block title="自定义线宽">
        <LineWidthSignature />
      </Block>
      <Block title="自定义背景颜色">
        <BackgroundColorSignature />
      </Block>
    </Page>
  )
}
