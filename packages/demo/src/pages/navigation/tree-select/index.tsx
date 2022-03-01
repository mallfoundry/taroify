import { Image, TreeSelect } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"

import "./index.scss"

function RadioTreeSelect() {
  return (
    <TreeSelect>
      <TreeSelect.Tab title="浙江">
        <TreeSelect.Option value={0}>杭州</TreeSelect.Option>
        <TreeSelect.Option value={1}>温州</TreeSelect.Option>
        <TreeSelect.Option value={2} disabled>
          宁波
        </TreeSelect.Option>
        <TreeSelect.Option value={3}>义乌</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="江苏">
        <TreeSelect.Option value={4}>南京</TreeSelect.Option>
        <TreeSelect.Option value={5}>无锡</TreeSelect.Option>
        <TreeSelect.Option value={6}>徐州</TreeSelect.Option>
        <TreeSelect.Option value={7}>苏州</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="福建" disabled>
        <TreeSelect.Option value={8}>泉州</TreeSelect.Option>
        <TreeSelect.Option value={9}>厦门</TreeSelect.Option>
      </TreeSelect.Tab>
    </TreeSelect>
  )
}

function MultiselectTreeSelect() {
  return (
    <TreeSelect defaultValue={[0, 1]}>
      <TreeSelect.Tab title="浙江">
        <TreeSelect.Option value={0}>杭州</TreeSelect.Option>
        <TreeSelect.Option value={1}>温州</TreeSelect.Option>
        <TreeSelect.Option value={2} disabled>
          宁波
        </TreeSelect.Option>
        <TreeSelect.Option value={3}>义乌</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="江苏">
        <TreeSelect.Option value={4}>南京</TreeSelect.Option>
        <TreeSelect.Option value={5}>无锡</TreeSelect.Option>
        <TreeSelect.Option value={6}>徐州</TreeSelect.Option>
        <TreeSelect.Option value={7}>苏州</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="福建" disabled>
        <TreeSelect.Option value={8}>泉州</TreeSelect.Option>
        <TreeSelect.Option value={9}>厦门</TreeSelect.Option>
      </TreeSelect.Tab>
    </TreeSelect>
  )
}

function TreeSelectWithCustomContent() {
  return (
    <TreeSelect>
      <TreeSelect.Tab title="分组 1">
        <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
      </TreeSelect.Tab>
      <TreeSelect.Tab title="分组 2">
        <Image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
      </TreeSelect.Tab>
    </TreeSelect>
  )
}

function BadgeTreeSelect() {
  return (
    <TreeSelect>
      <TreeSelect.Tab badge title="浙江">
        <TreeSelect.Option value={0}>杭州</TreeSelect.Option>
        <TreeSelect.Option value={1}>温州</TreeSelect.Option>
        <TreeSelect.Option value={2} disabled>
          宁波
        </TreeSelect.Option>
        <TreeSelect.Option value={3}>义乌</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab badge="5" title="江苏">
        <TreeSelect.Option value={4}>南京</TreeSelect.Option>
        <TreeSelect.Option value={5}>无锡</TreeSelect.Option>
        <TreeSelect.Option value={6}>徐州</TreeSelect.Option>
        <TreeSelect.Option value={7}>苏州</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="福建" disabled>
        <TreeSelect.Option value={8}>泉州</TreeSelect.Option>
        <TreeSelect.Option value={9}>厦门</TreeSelect.Option>n
      </TreeSelect.Tab>
    </TreeSelect>
  )
}

export default function TreeSelectDemo() {
  return (
    <Page title="TreeSelect 分类选择" className="tree-select-demo">
      <Block title="单选模式">
        <RadioTreeSelect />
      </Block>
      <Block title="多选模式">
        <MultiselectTreeSelect />
      </Block>
      <Block title="自定义内容">
        <TreeSelectWithCustomContent />
      </Block>
      <Block title="徽标提示">
        <BadgeTreeSelect />
      </Block>
    </Page>
  )
}
