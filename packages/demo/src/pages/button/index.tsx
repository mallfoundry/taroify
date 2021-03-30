import * as React from "react"
import Button from "@taroify/core/button"
import Space from "@taroify/core/space"
import WhiteSpace from "@taroify/core/white-space"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

export default function ButtonDemo() {
  return (
    <Page title="按钮">
      <Block title="按钮类型">
        <Space>
          <Button variant="contained" color="primary">主要按钮</Button>
          <Button variant="contained" color="info">信息按钮</Button>
          <Button variant="contained" color="success">成功按钮</Button>
          <Button variant="contained" color="warning">警告按钮</Button>
          <Button variant="contained" color="danger">危险按钮</Button>
          <Button variant="contained" color="default">默认按钮</Button>
        </Space>
      </Block>
      <Block title="按钮形状">
        <Space>
          <Button variant="contained" color="primary">主要按钮</Button>
          <Button variant="contained" color="primary" shape="round">圆形按钮</Button>
          <Button variant="contained" color="primary" size="large" shape="round">圆形按钮</Button>
        </Space>
      </Block>
      <Block title="按钮尺寸">
        <Button variant="contained" color="primary" size="large">大号按钮</Button>
        <WhiteSpace />
        <Space>
          <Button variant="contained" color="primary">普通按钮</Button>
          <Button variant="contained" color="primary" size="small">小型按钮</Button>
          <Button variant="contained" color="primary" size="mini">迷你按钮</Button>
        </Space>
      </Block>
      <Block title="按钮类型">
        <Space>
          <Button variant="outlined" color="primary">主要按钮</Button>
          <Button variant="outlined" color="info">信息按钮</Button>
          <Button variant="outlined" color="success">成功按钮</Button>
          <Button variant="outlined" color="warning">警告按钮</Button>
          <Button variant="outlined" color="danger">危险按钮</Button>
          <Button variant="outlined" color="default">默认按钮</Button>
        </Space>
      </Block>
    </Page>
  )
}
