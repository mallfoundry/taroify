import { Grid, Image } from "@taroify/core"
import { HomeOutlined, PhotoOutlined, Search } from "@taroify/icons"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function GridDemo() {
  return (
    <Page title="Grid 宫格" className="grid-demo">
      <Block title="基础用法">
        <Grid columns={4}>
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
        </Grid>
      </Block>
      <Block title="自定义列数">
        <Grid columns={3}>
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
        </Grid>
      </Block>
      <Block title="自定义内容">
        <Grid columns={3} bordered={false}>
          <Grid.Item>
            <Image className="grid-image" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          </Grid.Item>
          <Grid.Item>
            <Image className="grid-image" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
          </Grid.Item>
          <Grid.Item>
            <Image className="grid-image" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
          </Grid.Item>
        </Grid>
      </Block>
      <Block title="正方形格子">
        <Grid columns={4} square>
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
        </Grid>
      </Block>
      <Block title="格子间距">
        <Grid columns={4} gutter={10}>
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
        </Grid>
      </Block>
      <Block title="内容横排">
        <Grid columns={3} direction="horizontal">
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
          <Grid.Item icon={<PhotoOutlined />} text="文字" />
        </Grid>
      </Block>
      <Block title="徽标提示">
        <Grid columns={2}>
          <Grid.Item icon={<HomeOutlined />} badge text="文字" />
          <Grid.Item icon={<Search />} badge="99+" text="文字" />
        </Grid>
      </Block>
    </Page>
  )
}
