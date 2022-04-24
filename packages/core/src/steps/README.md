# Steps 步骤条

### 介绍

用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。

### 引入

```tsx
import { Steps } from "@taroify/core"
```

## 代码演示

### 基础用法

`value` 属性表示当前步骤的索引，从 0 起计。

```tsx
<Steps value={0}>
  <Steps.Step>买家下单</Steps.Step>
  <Steps.Step>商家接单</Steps.Step>
  <Steps.Step>买家提货</Steps.Step>
  <Steps.Step>交易完成</Steps.Step>
</Steps>
```

### 下方标签

可以通过 alternativeLabel 属性来设置下方标签展示方式

```tsx
<Steps defaultValue={0} alternativeLabel>
  <Steps.Step>买家下单</Steps.Step>
  <Steps.Step>商家接单</Steps.Step>
  <Steps.Step>买家提货</Steps.Step>
  <Steps.Step>交易完成</Steps.Step>
</Steps>
```

### 自定义样式

可以通过 `css` 设置激活状态下的颜色。

```tsx
<Steps className="custom-color" defaultValue={0}>
  <Steps.Step icon={<ArrowRight />}>买家下单</Steps.Step>
  <Steps.Step icon={<ArrowRight />}>商家接单</Steps.Step>
  <Steps.Step icon={<ArrowRight />}>买家提货</Steps.Step>
  <Steps.Step icon={<ArrowRight />}>交易完成</Steps.Step>
</Steps>
```

```scss
.custom-color {
  .taroify-step--completed {
    .taroify-step__icon {
      color: #38f;
    }

    .taroify-step__line,
    .taroify-step__circle {
      background-color: #38f;
    }
  }

  .taroify-step--active {
    .taroify-step__label,
    .taroify-step__icon {
      color: #38f;
    }

    .taroify-step__circle {
      background-color: #38f;
    }
  }
}
```

### 竖向步骤条

可以通过设置 `direction` 属性来改变步骤条的显示方向。

```tsx
<Steps defaultValue={0} direction="vertical">
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
| defaultValue | 默认步骤对应的索引值 | _number \| string_ | `0` |
| value | 当前步骤对应的索引值 | _number \| string_ | `0` |
| direction | 步骤条方向，可选值为 `vertical` | _string_ | `horizontal` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                     | 默认值                                  | 描述  |
|----------------------------------------|--------------------------------------|-----|
| --steps-background-color               | _var(var(--whit)_                    | -   |
| --steps-horizontal-padding             | _10px * $hd 0_                       | -   |
| --steps-vertical-padding               | _0 0 0 var(--padding-xl)_            | -   |
| --step-color                           | _var(--gray-6)_                      | -   |
| --step-active-color                    | _var(--green)_                       | -   |
| --step-process-color                   | _var(--text-color)_                  | -   |
| --step-font-size                       | _var(--font-size-md)_                | -   |
| --step-icon-font-size                  | _12px * $hd_                         | -   |
| --step-line-background-color           | _var(--border-color)_                | -   |
| --step-line-transition-duration        | _var(--animation-duration-base)_     | -   |
| --step-completed-color                 | _var(--text-color)_                  | -   |
| --step-completed-line-background-color | _var(--green)_                       | -   |
| --step-circle-size                     | _5PX_                                | -   |
| --step-circle-width                    | _var(--step-circle-size)_            | -   |
| --step-circle-height                   | _var(--step-circle-size)_            | -   |
| --step-circle-margin                   | _3px * $hd_                          | -   |
| --step-circle-background-color         | _var(--gray-6)_                      | -   |
| --step-circle-border-radius            | _50%_                                | -   |
| --step-horizontal-title-font-size      | _var(--font-size-sm)_                | -   |
| --step-vertical-line-height            | _var(--line-height-sm)_              | -   |
| --step-vertical-padding                | _10px * $hd 10px * $hd 10px * $hd 0_ | -   |
