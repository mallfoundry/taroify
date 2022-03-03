# Timeline 时间轴

### 介绍

按时间顺序来展示了一系列的事件。

### 引入

```ts
import { Timeline } from "@taroify/core"
```

## 代码演示

### 基础用法

一个基本的时间轴，显示事件列表。

```tsx
function RightTimeline() {
  return (
    <Timeline position="right">
      <Timeline.Item>Eat</Timeline.Item>
      <Timeline.Item>Code</Timeline.Item>
      <Timeline.Item>Sleep</Timeline.Item>
    </Timeline>
  )
}
```

### 左侧用法

时间轴的主要内容可以被放置在相对时间轴的左侧。

```tsx
function LeftTimeline() {
  return (
    <Timeline position="left">
      <Timeline.Item>Eat</Timeline.Item>
      <Timeline.Item>Code</Timeline.Item>
      <Timeline.Item>Sleep</Timeline.Item>
    </Timeline>
  )
}
```

### 交替用法

时间轴可以显示在事件的两侧。

```tsx
function AlternateTimeline() {
  return (
    <Timeline position="alternate">
      <Timeline.Item>Eat</Timeline.Item>
      <Timeline.Item>Code</Timeline.Item>
      <Timeline.Item>Sleep</Timeline.Item>
      <Timeline.Item>Repeat</Timeline.Item>
    </Timeline>
  )
}
```

### 描边用法

可以自定义圆点的变种和颜色。

```tsx
function OutlinedTimeline() {
  return (
    <Timeline position="alternate">
      <Timeline.Item dot={{ variant: "outlined" }}>Eat</Timeline.Item>
      <Timeline.Item dot={{ variant: "outlined", color: "primary" }}>Code</Timeline.Item>
      <Timeline.Item dot={{ variant: "outlined", color: "danger" }}>Sleep</Timeline.Item>
      <Timeline.Item dot={{ variant: "outlined" }}>Repeat</Timeline.Item>
    </Timeline>
  )
}
```

### 自定义用法

可以自定义整个时间轴。

```tsx
function CustomTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Content align="center">9:30 am</Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot>
            <FireOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content direction="column" align="start">
          <View className="timeline-title">Eat</View>
          <View>Because you need strength</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content direction="column" align="end">
          <View className="timeline-title">Code</View>
          <View>awesome</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot color="primary">
            <StarOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content align="center">10:00 am</Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content />
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot variant="outlined" color="primary">
            <GemOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content direction="column" align="start">
          <View className="timeline-title">Sleep</View>
          <View>Because you need rest</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content direction="column" align="end">
          <View className="timeline-title">Repeat</View>
          <View>you love!</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot color="danger">
            <SmileOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
    </Timeline>
  )
}
```

```scss
.timeline-title {
  font-size: 24px * 2;
}
```

## API

### Timeline Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 位置布局，可选值为 `left` `right` `alternate` `alternate-reverse` | _string_ | - |

### Timeline.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dot | 圆点 | _ReactNode \| TimelineDotProps_ | - |

### Timeline.Dot Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 圆点变体，可选值为 `outlined` | _string_ | `filled` |
| color | 圆点颜色，可选值为 `primary` `info` `success` `warning` `danger` | _string_ | `default` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --timeline-color | _var(--avatar-color, var(--white, $white))_ | - |
| --timeline-background-color | _var(--avatar-background-color, var(--gray-5, $gray-5))_ | - |
| --timeline-border-color | _var(--avatar-border-color, var(--white, $white))_ | - |
| --timeline-border-width | _var(--avatar-border-width, 2px * $hd)_ | - |
| --timeline-font-weight | _var(--avatar-font-weight, var(--font-weight-bold, $font-weight-bold))_ | - |
| --timeline-font-size | _var(--timeline-font-size, var(--font-size-md, $font-size-md))_ | - |
| --timeline-min-height | _var(--timeline-min-height, 70px * $hd)_ | - |
| --timeline-content-padding | _var(--timeline-content-padding, 0 16px * $hd)_ | - |
| --timeline-connector-border-color | _var(--timeline-connector-border-color, var(--gray-5, $gray-5))_ | - |
| --timeline-connector-border-width | _var(--timeline-connector-border-width, 2PX)_ | - |
| --timeline-connector-border-style | _var(--timeline-connector-border-style, solid)_ | - |
| --timeline-top-connector-border-color | _var(--timeline-top-connector-border-color, var(--timeline-connector-border-color))_ | - |
| --timeline-top-connector-border-width | _var(--timeline-top-connector-border-width, var(--timeline-connector-border-width))_ | - |
| --timeline-top-connector-border-style | _var(--timeline-top-connector-border-style, var(--timeline-connector-border-style))_ | - |
| --timeline-bottom-connector-border-color | _var(--timeline-bottom-connector-border-color, var(--timeline-connector-border-color))_ | - |
| --timeline-bottom-connector-border-width | _var(--timeline-bottom-connector-border-width, var(--timeline-connector-border-width))_ | - |
| --timeline-bottom-connector-border-style | _var(--timeline-bottom-connector-border-style, var(--timeline-connector-border-style))_ | - |
| --timeline-dot-size | _var(--timeline-dot-size, 12px * $hd)_ | - |
| --timeline-dot-margin | _var(--timeline-dot-margin, 6px * $hd 0)_ | - |
| --timeline-dot-padding | _var(--timeline-dot-padding, 4PX)_ | - |
| --timeline-dot-border-width | _var(--timeline-dot-border, 2PX)_ | - |
| --timeline-dot-default-color | _var(--timeline-dot-default-color, var(--gray-5, $gray-5))_ | - |
| --timeline-dot-primary-color | _var(--timeline-dot-primary-color, var(--primary-color, $primary-color))_ | - |
| --timeline-dot-info-color | _var(--timeline-dot-info-color, var(--info-color, $info-color))_ | - |
| --timeline-dot-success-color | _var(--timeline-dot-success-color, var(--success-color, $success-color))_ | - |
| --timeline-dot-warning-color | _var(--timeline-dot-warning-color, var(--warning-color, $warning-color))_ | - |
| --timeline-dot-danger-color | _var(--timeline-dot-danger-color, var(--danger-color, $danger-color))_ | - |
