import * as React from "react"
import { useState } from "react"
import classNames from "classnames"
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
    <Page title="样式">
      <Block title="文字省略">
        <View className={classNames("taroify-ellipsis", classes.EllipsisText)}>这是一段最多显示一行的文字，后面的内容会省略省略省略</View>
        <View
          className={classNames("taroify-ellipsis--l2", classes.EllipsisText)}>这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。</View>
      </Block>
      <Block title="1px 边框">
        <View className={classNames("taroify-hairline--top", classes.HairlineLine)} />
      </Block>
      <Block title="动画">
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
