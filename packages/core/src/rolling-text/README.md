# RollingText 翻滚文本动效

### 介绍

文本翻滚动效，可以翻滚数字和其他类型文本。

请升级 `taroify` 到 >= `v0.1.0-alpha.6` 版本来使用该组件。

### 引入

```tsx
import { RollingText } from "@taroify/core"
```

## 代码演示

### 基础用法

你可以通过 `startNum` 设置起始数值，`targetNum` 设置目标数值。RollingText 组件会自动开始动画，从起始数值翻滚到目标数值。

```tsx
<RollingText startNum={0} targetNum={123} />
```

### 设置翻滚方向

你可以通过 `direction` 属性设置数字的翻滚方向，默认为向下翻滚，设置为 `up` 即可向上翻滚。

```tsx
<RollingText startNum={0} targetNum={432} direction="up" />
```

### 设置各数位停止顺序

你可以通过 `stopOrder` 属性设置动画各个数位的停止先后顺序。默认先停止高位，设置为 `rtl` 可以先从个位停止。

```tsx
<RollingText startNum={0} targetNum={54321} stopOrder="rtl" />
```

### 翻转非数字内容

你可以使用 `textList` 属性设置非数字内容的翻转。组件会从数组的第一项翻转到最后一项，请确保数组长度大于等于 2，以及每一项的长度一致。

```javascript
const textList = ["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee", "fffff", "ggggg"]
```

```tsx
<RollingText textList={textList} duration={1} />
```

### 自定义样式

RollingText 组件提供了一些 CSS 变量，你可以覆盖这些变量来自定义样式，也可以直接修改组件的样式。此外，你还可以通过 `height` 属性设置数字高度。

```tsx
<RollingText className="my-rolling-text" height={54} startNum={12345} targetNum={54321} />
```

```css
.my-rolling-text {
  --rolling-text-background: #1989fa;
  --rolling-text-color: white;
  --rolling-text-font-size: 48px;
  --rolling-text-gap: 12px;
  --rolling-text-item-border-radius: 10px;
  --rolling-text-item-width: 80px;
}
```

### 手动控制

通过 ref 获取到组件实例后，你可以调用 `start`、`reset` 方法，`start` 方法用于开始动画，`reset` 方法用于重置动画。

```tsx
import { useRef } from "react"
import { View } from "@tarojs/components"
import { RollingText, Button } from "@taroify/core"
import type { RollingTextRef } from "@taroify/core/rolling-text"

function HandRollingText() {
  const ref = useRef<RollingTextRef>()

  const start = () => {
    ref.current?.start()
  }

  const reset = () => {
    ref.current?.reset()
  }

  return (
    <View>
      <RollingText
        ref={ref}
        className="my-rolling-text"
        height={54}
        startNum={0}
        targetNum={54321}
        autoStart={false}
      />
      <View className="rolling-text-btn">
        <Button color="primary" onClick={start}>
          开始
        </Button>
        <Button color="primary" className="rolling-text-right" onClick={reset}>
          重置
        </Button>
      </View>
    </View>
  )
}
```

## API

### Props

| 参数      | 说明                                          | 类型       | 默认值 |
| :-------- | --------------------------------------------- | ---------- | ------ |
| startNum  | 起始数值                                      | _number_   | `0`    |
| targetNum | 目标数值                                      | _number_   | `-`    |
| textList  | 内容数组，用于翻转非数字内                    | _string[]_ | `[]`   |
| duration  | 动画时长，单位为秒                            | _number_   | `2`    |
| direction | 文本翻滚方向，值为 `down` 和 `up`             | _string_   | `down` |
| autoStart | 是否自动开始动画                              | _boolean_  | `true` |
| stopOrder | 各个数位动画停止先后顺序，值为 `ltr` 和 `rtl` | _string_   | `ltr`  |
| height    | 数字高度，单位为 `px`                         | _number_   | `40`   |

### 方法

通过 `ref` 可以获取到 RollingText 实例并调用实例方法

| 方法名 | 说明     | 参数 | 返回值 |
| :----- | -------- | ---- | ------ |
| start  | 开始动画 | \_   | -      |
| reset  | 重置动画 | \_   | -      |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                              | 默认值    | 描述             |
| --------------------------------- | --------- | ---------------- |
| --rolling-text-background         | _inherit_ | 单个数位背景色   |
| --rolling-text-color              | _#323233_ | 数字颜色         |
| --rolling-text-font-size          | _28px_    | 字体大小         |
| --rolling-text-gap                | _0px_     | 数位之间的间隔   |
| --rolling-text-item-width         | _30px_    | 单个数位宽度     |
| --rolling-text-item-border-radius | _0px_     | 单个数位边框圆角 |
