import { Progress } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicProgress() {
  return (
    <Block title="基础用法">
      <Progress percent={50} />
    </Block>
  )
}

function StripedProgress() {
  return (
    <Block title="条纹线条">
      <Progress percent={50} striped />
    </Block>
  )
}

function AnimatedProgress() {
  return (
    <Block title="动画条纹">
      <Progress percent={50} striped animated />
    </Block>
  )
}

function InactiveProgress() {
  return (
    <Block title="置灰">
      <Progress percent={50} inactive />
    </Block>
  )
}

function ProgressWithCustomColors() {
  return (
    <Block title="样式定制">
      <Progress className="custom-color1" percent={25} />
      <Progress className="custom-color2" percent={50} />
      <Progress className="custom-color3" percent={75} />
    </Block>
  )
}

export default function ProgressDemo() {
  return (
    <Page title="Progress 进度条" className="progress-demo">
      <BasicProgress />
      <StripedProgress />
      <AnimatedProgress />
      <InactiveProgress />
      <ProgressWithCustomColors />
    </Page>
  )
}
