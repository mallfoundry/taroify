import * as React from "react"
import { useState } from "react"
import { View } from "@tarojs/components"
import Cell from "@taroify/core/cell"
import Transition, { TransitionName } from "@taroify/core/transition"
import ArrowRight from "@taroify/icons/ArrowRight"
import Block from "../../components/block"
import Page from "../../components/page"
import classes from "./index.module.scss"

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
              endIcon={<ArrowRight />}
              onClick={() => toggleTransition(TransitionName.Fade)}
        />
        <Cell clickable label="Fade Up"
              endIcon={<ArrowRight />}
              onClick={() => toggleTransition(TransitionName.FadeUp)}
        />
        <Cell clickable label="Fade Down"
              endIcon={<ArrowRight />}
              onClick={() => toggleTransition(TransitionName.FadeDown)}
        />
        <Cell clickable label="Fade Left"
              endIcon={<ArrowRight />}
              onClick={() => toggleTransition(TransitionName.FadeLeft)}
        />
        <Cell clickable label="Fade Right"
              endIcon={<ArrowRight />}
              onClick={() => toggleTransition(TransitionName.FadeRight)}
        />
        <Cell clickable label="Slide Up"
              endIcon={<ArrowRight />}
              onClick={() => toggleTransition(TransitionName.SlideUp)}
        />
        <Cell clickable label="Slide Down"
              endIcon={<ArrowRight />}
              onClick={() => toggleTransition(TransitionName.SlideDown)}
        />
        <Cell clickable label="Slide Left"
              endIcon={<ArrowRight />}
              onClick={() => toggleTransition(TransitionName.SlideLeft)}
        />
        <Cell clickable label="Slide Right"
              endIcon={<ArrowRight />}
              onClick={() => toggleTransition(TransitionName.SlideRight)}
        />
        <Transition in={state} name={name}>
          <View className={classes.AnimateBlock} />
        </Transition>
      </Block>
    </Page>
  )
}
