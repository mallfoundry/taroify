import { Button, Cell, Image, SwipeCell } from "@taroify/core"
import { View } from "@tarojs/components"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicSwipeCell() {
  return (
    <SwipeCell>
      <SwipeCell.Actions side="left">
        <Button variant="contained" shape="square" color="primary">
          选择
        </Button>
      </SwipeCell.Actions>
      <Cell bordered={false} title="单元格">
        内容
      </Cell>
      <SwipeCell.Actions side="right">
        <Button variant="contained" shape="square" color="danger">
          删除
        </Button>
        <Button variant="contained" shape="square" color="primary">
          收藏
        </Button>
      </SwipeCell.Actions>
    </SwipeCell>
  )
}

function SwipeCellWithCustomContent() {
  return (
    <SwipeCell className="custom-swipe-cell">
      <View className="custom-card">
        <Image className="custom-card__thumb" src="https://img01.yzcdn.cn/vant/ipad.jpeg" />
        <View className="custom-card__content">
          <View className="custom-card__title">商品标题</View>
        </View>
      </View>
      <SwipeCell.Actions side="right">
        <Button variant="contained" shape="square" color="danger">
          删除
        </Button>
        <Button variant="contained" shape="square" color="primary">
          收藏
        </Button>
      </SwipeCell.Actions>
    </SwipeCell>
  )
}

export default function SwipeCellDemo() {
  return (
    <Page title="SwipeCell 滑动单元格" className="swipe-cell-demo">
      <Block title="基础用法">
        <BasicSwipeCell />
      </Block>
      <Block title="自定义内容">
        <SwipeCellWithCustomContent />
      </Block>
    </Page>
  )
}
