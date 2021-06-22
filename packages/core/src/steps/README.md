# Steps 步骤条

### 介绍

用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。

### 引入

```tsx
import { Steps } from "@taroify/core"
// or
import Steps from "@taroify/core/steps"
```

## 代码演示

### 基础用法

`activeStep` 属性表示当前步骤的索引，从 0 起计。

```tsx
<Steps activeStep={0}>
  <Steps.Step>买家下单</Steps.Step>
  <Steps.Step>商家接单</Steps.Step>
  <Steps.Step>买家提货</Steps.Step>
  <Steps.Step>交易完成</Steps.Step>
</Steps>
```

### 下方标签

可以通过 alternativeLabel 属性来设置下方标签展示方式

```tsx
<Steps activeStep={0} alternativeLabel>
  <Steps.Step>买家下单</Steps.Step>
  <Steps.Step>商家接单</Steps.Step>
  <Steps.Step>买家提货</Steps.Step>
  <Steps.Step>交易完成</Steps.Step>
</Steps>
```

### 自定义样式

可以通过 `activeColor` 属性设置激活状态下的颜色。

```tsx
<Steps activeStep={0} activeColor="#38f">
  <Steps.Step icon={<ArrowRight />}>买家下单</Steps.Step>
  <Steps.Step icon={<ArrowRight />}>商家接单</Steps.Step>
  <Steps.Step icon={<ArrowRight />}>买家提货</Steps.Step>
  <Steps.Step icon={<ArrowRight />}>交易完成</Steps.Step>
</Steps>
```

### 竖向步骤条

可以通过设置 `direction` 属性来改变步骤条的显示方向。

```tsx
<Steps activeStep={0} direction="vertical">
  <Steps.Step>
    <View>【城市】物流状态2</View>
    <View>2016-07-12 12:40</View>
  </Steps.Step>
  <Steps.Step>
    <View>【城市】物流状态1</View>
    <View>2016-07-11 10:00</View>
  </Steps.Step>
  <Steps.Step>
    <View>【城市】物流状态</View>
    <View>2016-07-10 12:00</View>
  </Steps.Step>
  <Steps.Step>
    <View>快件已发货</View>
    <View>2016-07-10 09:30</View>
  </Steps.Step>
</Steps>
```

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeStep | 当前步骤对应的索引值 | _number \| string_ | `0` |
| direction | 步骤条方向，可选值为 `vertical` | _string_ | `horizontal` |
| activeColor | 当前步骤和已完成步骤的颜色 | _string_ | `#07c160` |
| inactiveColor | 未激活步骤的颜色 | _string_ | `#969799` |
