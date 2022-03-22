import { FixedView } from "@taroify/core"
import Page from "../../../components/page"

import "./index.scss"

export default function FixedViewDemo() {
  return (
    <Page title="FixedView 固定视图" className="fixed-view-demo">
      <FixedView position="bottom">固定在底部</FixedView>
    </Page>
  )
}
