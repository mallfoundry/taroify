import Loading from "@vant-taro/core/loading"
import Space from "@vant-taro/core/space"
import "./index.scss"
import Block from "../../components/block"
import Page from "../../components/page"

export default function LoadingDemo() {
  return (
    <Page title="Loading">
      <Block title="加载类型">
        <Space>
          <Loading />
          <Loading type="spinner" />
        </Space>
      </Block>
    </Page>
  )
}
