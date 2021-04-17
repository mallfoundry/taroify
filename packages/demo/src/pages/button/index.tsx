import Button from "@taroify/core/button"
import Space from "@taroify/core/space"
import WhiteSpace from "@taroify/core/white-space"
import ShopOutlined from "@taroify/icons/ShopOutlined"
import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import classes from "./index.module.scss"

export default function ButtonDemo() {
  return (
    <Page title="Button 按钮" className={classes.ButtonDemo}>
      <Block title="按钮颜色">
        <Space>
          <Button variant="contained" color="primary">主要按钮</Button>
          <Button variant="contained" color="info">信息按钮</Button>
          <Button variant="contained" color="success">成功按钮</Button>
          <Button variant="contained" color="warning">警告按钮</Button>
          <Button variant="contained" color="danger">危险按钮</Button>
          <Button variant="contained" color="default">默认按钮</Button>
        </Space>
      </Block>
      <Block title="轮廓按钮">
        <Space>
          <Button variant="outlined" color="primary">主要按钮</Button>
          <Button variant="outlined" color="info">信息按钮</Button>
          <Button variant="outlined" color="success">成功按钮</Button>
          <Button variant="outlined" color="warning">警告按钮</Button>
          <Button variant="outlined" color="danger">危险按钮</Button>
          <Button variant="outlined" color="default">默认按钮</Button>
        </Space>
      </Block>
      <Block title="细边框按钮">
        <Space>
          <Button variant="outlined" color="primary" hairline>主要按钮</Button>
          <Button variant="outlined" color="info" hairline>信息按钮</Button>
          <Button variant="outlined" color="success" hairline>成功按钮</Button>
          <Button variant="outlined" color="warning" hairline>警告按钮</Button>
          <Button variant="outlined" color="danger" hairline>危险按钮</Button>
          <Button variant="outlined" color="default" hairline>默认按钮</Button>
        </Space>
      </Block>
      <Block title="禁止状态">
        <Space>
          <Button variant="contained" color="primary" disabled>主要按钮</Button>
          <Button variant="contained" color="info" disabled>信息按钮</Button>
          <Button variant="contained" color="success" disabled>成功按钮</Button>
          <Button variant="contained" color="warning" disabled>警告按钮</Button>
          <Button variant="contained" color="danger" disabled>危险按钮</Button>
          <Button variant="contained" color="default" disabled>默认按钮</Button>
        </Space>
      </Block>
      <Block title="按钮形状">
        <Space>
          <Button variant="contained" color="primary" shape="square">方形按钮</Button>
          <Button variant="contained" color="primary" shape="round">圆形按钮</Button>
        </Space>
      </Block>
      <Block title="图标按钮">
        <Space>
          <Button variant="contained" color="primary" startIcon={<ShopOutlined />} />
          <Button variant="contained" color="primary" startIcon={<ShopOutlined />}>主要按钮</Button>
          <Button variant="outlined" color="primary" startIcon={<ShopOutlined />}>轮廓按钮</Button>
        </Space>
      </Block>
      <Block title="按钮尺寸">
        <Button variant="contained" color="primary" size="large">大号按钮</Button>
        <WhiteSpace />
        <Space>
          <Button variant="contained" color="primary" size="medium">普通按钮</Button>
          <Button variant="contained" color="primary" size="small">小型按钮</Button>
          <Button variant="contained" color="primary" size="mini">迷你按钮</Button>
        </Space>
      </Block>
      <Block title="块级按钮">
        <Button color="primary" block>块级按钮</Button>
      </Block>
    </Page>
  )
}
