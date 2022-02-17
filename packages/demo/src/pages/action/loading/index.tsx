import { Loading, Space } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function LoadingDemo() {
  return (
    <Page title="Loading 加载" className="loading-demo">
      <Block title="加载类型">
        <Space>
          <Loading />
          <Loading type="spinner" />
        </Space>
      </Block>
      <Block title="自定义颜色">
        <Space>
          <Loading className="custom-color" />
          <Loading className="custom-color" type="spinner" />
        </Space>
      </Block>
      <Block title="自定义大小">
        <Space>
          <Loading size="24" />
          <Loading type="spinner" size="24" />
        </Space>
      </Block>
      <Block title="加载文案">
        <Loading size="24">加载中...</Loading>
      </Block>
      <Block title="垂直排列">
        <Loading direction="vertical" size="24">
          加载中...
        </Loading>
      </Block>
      <Block title="垂直排列">
        <Space size="large">
          <Loading className="custom-color" direction="vertical">
            加载中...
          </Loading>
          <Loading className="custom-text-color" direction="vertical">
            加载中...
          </Loading>
        </Space>
      </Block>
    </Page>
  )
}
