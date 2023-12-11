import { TextEllipsis } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function TextEllipsisDemo() {
  return (
    <Page title="TextEllipsis 文本省略" className="text-props-ellipsis-demo">
      <Block variant="card" title="基础用法">
        <TextEllipsis content="慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。" />
      </Block>
      <Block variant="card" title="展开/收起">
        <TextEllipsis content="似水流年是一个人所有的一切，只有这个东西，才真正归你所有。其余的一切，都是片刻的欢娱和不幸，转眼间就已跑到那似水流年里去了。" expandText="展开" collapseText="收起" />
      </Block>
      <Block variant="card" title="自定义展示行数">
        <TextEllipsis content="那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。" rows={2} expandText="展开" collapseText="收起" />
        <TextEllipsis style={{ marginTop: "0.2rem" }} content="那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。" rows={4} expandText="展开" collapseText="收起" />
      </Block>
      <Block variant="card" title="自定义省略位置">
          <TextEllipsis content="那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。" position="start" rows={3} expandText="展开" collapseText="收起" />
          <TextEllipsis style={{ marginTop: "0.2rem" }} content="那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。" position="middle" rows={3} expandText="展开" collapseText="收起" />
      </Block>
    </Page>
  )
}
