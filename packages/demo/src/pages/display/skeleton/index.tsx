import { Skeleton, WhiteSpace } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicSkeleton() {
  return (
    <Block title="基础用法">
      <Skeleton variant="circle" />
      <WhiteSpace />
      <Skeleton style={{ width: "40%" }} />
      <WhiteSpace size="20px" />
      <Skeleton />
      <WhiteSpace />
      <Skeleton />
      <WhiteSpace />
      <Skeleton style={{ width: "60%" }} />
    </Block>
  )
}

function AnimateSkeleton() {
  return (
    <Block title="动画效果">
      <Skeleton />
      <WhiteSpace />
      <Skeleton animation={false} />
      <WhiteSpace />
      <Skeleton animation="wave" />
    </Block>
  )
}

export default function SkeletonDemo() {
  return (
    <Page title="Skeleton 骨架屏" className="skeleton-demo">
      <BasicSkeleton />
      <AnimateSkeleton />
    </Page>
  )
}
