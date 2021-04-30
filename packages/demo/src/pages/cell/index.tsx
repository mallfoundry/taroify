import { Cell, CellGroup } from "@taroify/core"
import ArrowDown from "@taroify/icons/ArrowDown"
import ArrowRight from "@taroify/icons/ArrowRight"
import LocationOutlined from "@taroify/icons/LocationOutlined"
import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

export default function CellDemo() {
  return (
    <Page title="Cell 单元格" className="cell-demo">
      <Block title="基础用法">
        <Cell title="单元格">内容</Cell>
        <Cell title="单元格" subtitle="描述信息" children="内容" />
      </Block>
      <Block title="单元格大小">
        <Cell title="单元格">内容</Cell>
        <Cell title="单元格" subtitle="描述信息" size="large" children="内容" />
      </Block>
      <Block title="展示图标">
        <Cell startIcon={<LocationOutlined />} title="单元格" children="内容" />
      </Block>
      <Block title="只设置 value">
        <Cell>内容</Cell>
      </Block>
      <Block title="展示箭头">
        <Cell title="单元格" endIcon={<ArrowRight />} clickable />
        <Cell title="单元格" endIcon={<ArrowRight />} clickable children="内容" />
        <Cell title="单元格" endIcon={<ArrowDown />} clickable children="内容" />
      </Block>
      <Block title="分组标题">
        <CellGroup title="分组 1">
          <Cell title="单元格">内容</Cell>
        </CellGroup>
        <CellGroup title="分组 2">
          <Cell title="单元格">内容</Cell>
        </CellGroup>
      </Block>
      <Block title="对齐方式">
        <Cell title="单元格" subtitle="align start" size="large" align="start" children="内容" />
        <Cell title="单元格" subtitle="align center" size="large" align="center" children="内容" />
        <Cell title="单元格" subtitle="align end" size="large" align="end" children="内容" />
      </Block>
    </Page>
  )
}
