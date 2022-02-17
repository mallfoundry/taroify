import { Navbar } from "@taroify/core"
import { Search } from "@taroify/icons"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function NavbarDemo() {
  return (
    <Page title="Navbar 导航栏" className="navbar-demo">
      <Block title="基础用法">
        <Navbar title="标题">
          <Navbar.NavLeft>返回</Navbar.NavLeft>
          <Navbar.NavRight>按钮</Navbar.NavRight>
        </Navbar>
      </Block>
      <Block title="使用 NavLeft 和 NavRight">
        <Navbar>
          <Navbar.NavLeft>返回</Navbar.NavLeft>
          <Navbar.Title>标题</Navbar.Title>
          <Navbar.NavRight icon={<Search />} />
        </Navbar>
      </Block>
    </Page>
  )
}
