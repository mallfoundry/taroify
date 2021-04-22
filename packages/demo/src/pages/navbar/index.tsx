import { Navbar } from "@taroify/core"
import { ArrowLeft, Search } from "@taroify/icons"
import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import classes from "./index.module.scss"

export default function NavbarDemo() {
  return (
    <Page title="Navbar 导航栏" className={classes.NavbarDemo}>
      <Block title="基础用法">
        <Navbar title="标题" />
      </Block>
      <Block title="使用 Left 和 Right">
        <Navbar title="标题">
          <Navbar.Left icon={<ArrowLeft />} text="返回" />
          <Navbar.Right icon={<Search />} />
        </Navbar>
      </Block>
    </Page>
  )
}
