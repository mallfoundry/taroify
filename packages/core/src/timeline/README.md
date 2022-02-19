# Avatar 头像

### 介绍

显示用户头像、首字母或备用图标。

### 引入

```ts
import { TimeLine } from "@taroify/core"
```

## 代码演示

### 基础用法

设置 `--timeline-top-connector-color` 可以修改线段颜色

```tsx
function AlternateTimeline() {
  return (
    <Timeline>
      <Timeline.Item
        align
        icon={<SettingOutlined size={24} />}
        style={{
          "--timeline-top-connector-color": "red",
        }}
      >
        <View>
          You&apos;ve created new branch
          <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
        </View>
      </Timeline.Item>
      <Timeline.Item
        style={{
          "--timeline-connector-style": "dashed",
        }}
        icon={<SettingOutlined size={24} />}
      >
        <View>
          You&apos;ve created new branch
          <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
        </View>
      </Timeline.Item>
      <Timeline.Item icon={<SettingOutlined size={24} />}>
        <View>
          You&apos;ve created new branch
          <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
        </View>
      </Timeline.Item>
    </Timeline>
  )
}
```

### 靠左


```tsx
function LeftTimeline() {
  return (
    <Timeline>
      <Timeline.ItemBase>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>am 9:00</Timeline.Content>
      </Timeline.ItemBase>
      <Timeline.ItemBase>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
        </Timeline.Content>
      </Timeline.ItemBase>
      <Timeline.ItemBase
        style={{
          "--timeline-connector-style": "dashed",
        }}
      >
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
        </Timeline.Content>
      </Timeline.ItemBase>
    </Timeline>
  )
}
```

### 靠右

通过 `--timeline-connector-width` 可以设置线段宽度

```tsx
function RightTimeline() {
  return (
    <Timeline style={{ "--timeline-connector-width": "3px" }}>
      <Timeline.ItemBase>
        <Timeline.Content>am 9:00</Timeline.Content>
        <Timeline.Separator>
          <SettingOutlined size={24} />
        </Timeline.Separator>
      </Timeline.ItemBase>
      <Timeline.ItemBase>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.ItemBase>
      <Timeline.ItemBase>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.ItemBase>
    </Timeline>
  )
}
```

## API

### Avatar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 传入图片的链接,传入之后嵌套内容不展示 | _string_ | - |
| alt | 图片不显示时的文本内容 | _string_ | - |
| shape | 形状，可选值为 `square` `rounded` `circle` | _string_ | `circle` |
| size | 大小，可选值为 `mini` `small` `medium` `large` | _string_ | `medium` |

### Avatar.Group Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shape | 形状，可选值为 `square` `rounded` `circle` | _string_ | `circle` |
| spacing | 间距，可选值为 `small` `medium` `large` | _string_ | `medium` |
| limit | 显示的最大头像个数 | _number_ | - |
| total | 头像总数。用于计算额外头像的数量。| _string_ | - |
