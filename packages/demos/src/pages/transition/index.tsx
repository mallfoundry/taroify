import Block from "../../components/block"
import Page from "../../components/page"
import Cell from "@vant-taro/core/cell"
import Transition, { TransitionName } from "@vant-taro/core/transition"
import ArrowForwardIosOutlined from "@vant-taro/icons/ArrowForwardIosOutlined"
import classes from "./index.module.scss"
import "@vant-taro/core/index.scss"
import { useState } from "react"
import { View } from "@tarojs/components"


export default function TransitionDemo() {
  const [name, setName] = useState<TransitionName>(TransitionName.Fade)
  const [state, setState] = useState(false)

  function toggleTransition(newName: TransitionName) {
    setName(newName)
    setState(!state)
  }

  return (
    <Page title="动画">
      <Block title="基本用法">
        <Cell clickable label="Fade"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => toggleTransition(TransitionName.Fade)}
        />
        <Cell clickable label="Fade Up"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => toggleTransition(TransitionName.FadeUp)}
        />
        <Cell clickable label="Fade Down"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => toggleTransition(TransitionName.FadeDown)}
        />
        <Cell clickable label="Fade Left"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => toggleTransition(TransitionName.FadeLeft)}
        />
        <Cell clickable label="Fade Right"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => toggleTransition(TransitionName.FadeRight)}
        />
        <Cell clickable label="Slide Up"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => toggleTransition(TransitionName.SlideUp)}
        />
        <Cell clickable label="Slide Down"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => toggleTransition(TransitionName.SlideDown)}
        />
        <Cell clickable label="Slide Left"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => toggleTransition(TransitionName.SlideLeft)}
        />
        <Cell clickable label="Slide Right"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => toggleTransition(TransitionName.SlideRight)}
        />
        <Transition in={state} duration={10000} name={name}>
          <View className={classes.AnimateBlock} />
        </Transition>
      </Block>
    </Page>
  )
}
