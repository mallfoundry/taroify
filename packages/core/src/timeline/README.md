# Avatar 头像

### 介绍

显示用户头像、首字母或备用图标。

### 引入

```ts
import { TimeLine } from "@taroify/core"
```

## 代码演示

### 基础用法

```tsx
function CustomTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <FireOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View style={{ height: "100px" }}>AM 9:00</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <GiftOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View style={{ height: "100px" }}>AM 9:00</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <GiftOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View >AM 9:00</View>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
```

### 交替
```tsx
function AlternateTimeline() {
  return (
    <Timeline position="alternate">
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <GiftOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
    </Timeline>
  )
}
```
### 靠左


```tsx
function LeftTimeline() {
  return (
    <Timeline position="left">
      <Timeline.Item icon={<SettingOutlined size={24} />}>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
    </Timeline>
  )
}
```

### 靠右


```tsx
function RightTimeline() {
  return (
    <Timeline position="right">
      <Timeline.Item icon={<SettingOutlined size={24} />}>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item icon={<SettingOutlined size={24} />}>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
```

## API

### Timeline Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 位置布局`left` `right` `alternate` `alternate-reverse` | _string_ | - |

### Timeline Style Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| --timeline-connector-color | 线段颜色 | _string_ | - |
| --timeline-connector-width | 线段宽度 | _string_ | - |
| --timeline-connector-style | 线段样式 | _string_ | - |
| --timeline-top-connector-color | 上端线段颜色 | _string_ | - |
| --timeline-top-connector-width | 上端线段宽度 | _string_ | - |
| --timeline-top-connector-style | 上端线段样式 | _string_ | - |
| --timeline-bottom-connector-color | 下端线段颜色 | _string_ | - |
| --timeline-bottom-connector-width | 下端线段宽度 | _string_ | - |
| --timeline-bottom-connector-style | 下端线段样式 | _string_ | - |
