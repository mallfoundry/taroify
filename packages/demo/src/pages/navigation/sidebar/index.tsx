import { Grid, Sidebar, Toast } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function EventSidebar() {
  return (
    <>
      <Toast id="toast" />
      <Sidebar onChange={(_, { children }: Sidebar.TabObject) => Toast.open(children)}>
        <Sidebar.Tab>标签名 1</Sidebar.Tab>
        <Sidebar.Tab>标签名 2</Sidebar.Tab>
        <Sidebar.Tab>标签名 3</Sidebar.Tab>
      </Sidebar>
    </>
  )
}

export default function SidebarDemo() {
  return (
    <Page title="Sidebar 侧边导航" className="sidebar-demo">
      <Grid columns={2} centered bordered={false}>
        <Grid.Item>
          <Block title="基础用法">
            <Sidebar>
              <Sidebar.Tab>标签名</Sidebar.Tab>
              <Sidebar.Tab>标签名</Sidebar.Tab>
              <Sidebar.Tab>标签名</Sidebar.Tab>
            </Sidebar>
          </Block>
        </Grid.Item>
        <Grid.Item>
          <Block title="徽标提示">
            <Sidebar>
              <Sidebar.Tab badge>标签名</Sidebar.Tab>
              <Sidebar.Tab badge="5">标签名</Sidebar.Tab>
              <Sidebar.Tab badge="20">标签名</Sidebar.Tab>
            </Sidebar>
          </Block>
        </Grid.Item>
        <Grid.Item>
          <Block title="禁用选项">
            <Sidebar>
              <Sidebar.Tab>标签名</Sidebar.Tab>
              <Sidebar.Tab disabled>标签名</Sidebar.Tab>
              <Sidebar.Tab>标签名</Sidebar.Tab>
            </Sidebar>
          </Block>
        </Grid.Item>
        <Grid.Item>
          <Block title="监听切换事件">
            <EventSidebar />
          </Block>
        </Grid.Item>
      </Grid>
    </Page>
  )
}
