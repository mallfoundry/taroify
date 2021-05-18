import { Progress } from "@taroify/core"
import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

function BasicProgress() {
  return (
    <Block title="基础用法">
      <Progress percentage={50} />
    </Block>
  )
}

function StripedProgress() {
  return (
    <Block title="条纹线条">
      <Progress percentage={50} striped />
    </Block>
  )
}

function AnimatedProgress() {
  return (
    <Block title="动画条纹">
      <Progress percentage={50} striped animated />
    </Block>
  )
}

function InactiveProgress() {
  return (
    <Block title="置灰">
      <Progress percentage={50} inactive />
    </Block>
  )
}

function ProgressWithCustomColors() {
  return (
    <Block title="样式定制">
      <Progress percentage={25} color="#f2826a" />
      <Progress percentage={50} color="#ee0a24" />
      <Progress percentage={75} color="linear-gradient(to right, #be99ff, #7232dd)" />
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
