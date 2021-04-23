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
      <Block title="使用 NavLeft 和 NavRight">
        <Navbar title="标题">
          <Navbar.NavLeft icon={<ArrowLeft />} text="返回" />
          <Navbar.NavRight icon={<Search />} />
        </Navbar>
      </Block>
    </Page>
  )
}
