import { Cell, CellGroup } from "@taroify/core"
import ArrowDown from "@taroify/icons/ArrowDown"
import ArrowRight from "@taroify/icons/ArrowRight"
import LocationOutlined from "@taroify/icons/LocationOutlined"
import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import classes from "./index.module.scss"

export default function CellDemo() {
  return (
    <Page title="Cell 单元格" className={classes.CellDemo}>
      <Block title="基础用法">
        <Cell label="单元格">内容</Cell>
        <Cell label="单元格" description="描述信息">
          内容
        </Cell>
      </Block>
      <Block title="单元格大小">
        <Cell label="单元格">内容</Cell>
        <Cell label="单元格" description="描述信息" size="large">
          内容
        </Cell>
      </Block>
      <Block title="展示图标">
        <Cell startIcon={<LocationOutlined />} label="单元格">
          内容
        </Cell>
      </Block>
      <Block title="只设置 value">
        <Cell>内容</Cell>
      </Block>
      <Block title="展示箭头">
        <Cell label="单元格" endIcon={<ArrowRight />} clickable />
        <Cell label="单元格" endIcon={<ArrowRight />} clickable>
          内容
        </Cell>
        <Cell label="单元格" endIcon={<ArrowDown />} clickable>
          内容
        </Cell>
      </Block>
      <Block title="分组标题">
        <CellGroup title="分组 1">
          <Cell label="单元格">内容</Cell>
        </CellGroup>
        <CellGroup title="分组 2">
          <Cell label="单元格">内容</Cell>
        </CellGroup>
      </Block>
      <Block title="对齐方式">
        <Cell label="单元格" description="align start" size="large" align="start">
          内容
        </Cell>
        <Cell label="单元格" description="align center" size="large" align="center">
          内容
        </Cell>
        <Cell label="单元格" description="align end" size="large" align="end">
          内容
        </Cell>
      </Block>
    </Page>
  )
}
