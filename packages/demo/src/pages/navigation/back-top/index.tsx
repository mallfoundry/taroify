import { BackTop } from "@taroify/core"
import Page from "../../../components/page"
import "./index.scss"

export default function BackTopDemo() {
  return (
    <Page title="BackTop 回到顶部" className="back-top-demo">
      <BackTop />
    </Page>
  )
}
