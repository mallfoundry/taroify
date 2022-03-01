import { Rate } from "@taroify/core"
import { Like, LikeOutlined, Star } from "@taroify/icons"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function RateDemo() {
  return (
    <Page title="Rate 评分" className="rate-demo">
      <Block title="基础用法">
        <Rate defaultValue={3} />
      </Block>
      <Block title="自定义图标">
        <Rate defaultValue={3} icon={<Like />} emptyIcon={<LikeOutlined />} />
      </Block>
      <Block title="自定义样式">
        <Rate className="custom-color" defaultValue={3} allowHalf size={25} emptyIcon={<Star />} />
      </Block>
      <Block title="半星">
        <Rate defaultValue={3} allowHalf />
      </Block>
      <Block title="自定义数量">
        <Rate defaultValue={3} count={6} />
      </Block>
      <Block title="禁用状态">
        <Rate defaultValue={3} disabled />
      </Block>
      <Block title="只读状态">
        <Rate defaultValue={3} readonly />
      </Block>
      <Block title="只读状态显示小数">
        <Rate defaultValue={3.3} readonly allowHalf />
      </Block>
    </Page>
  )
}
