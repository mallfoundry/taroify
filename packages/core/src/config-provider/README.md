# ConfigProvider 全局配置

### 介绍

用于配置 Taroify 组件的主题样式。

### 引入

```tsx
import { ConfigProvider } from "@taroify/core";
```

## 定制主题

### 介绍

Taroify 组件通过丰富的 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 来组织样式，通过覆盖这些 CSS
变量，可以实现**定制主题、动态切换主题**等效果。

#### 示例

以 Button 组件为例，查看组件的样式，可以看到 `.taroify-button--primary` 类名上存在以下变量：

```scss
.taroify-button--primary {
  color: var(--button-primary-color);
  background-color: var(--button-primary-background-color);
}
```

### 自定义 CSS 变量

#### 通过 CSS 覆盖

你可以直接在代码中覆盖这些 CSS 变量，Button 组件的样式会随之发生改变：

```css
/* 添加这段样式后，Primary Button 会变成红色 */
:root {
    --button-primary-background-color: red;
}
```

> 注意：小程序不存在 `:root` 元素，只能在 `page` 根元素里覆盖 CSS 变量。

#### 通过 ConfigProvider 覆盖

`ConfigProvider` 组件提供了覆盖 CSS 变量的能力，你需要在根节点包裹一个 `ConfigProvider` 组件，并通过 `theme` 属性来配置一些主题变量。

```tsx
function CustomThemeVars() {
  const [rate, setRate] = useState(4)
  const [slider, setSlider] = useState(50)

  return (
    <ConfigProvider
      theme={{
        rateIconFullColor: "#07c160",
        sliderTrackHeight: "4px",
        sliderButtonWidth: "20px",
        sliderButtonHeight: "20px",
        sliderActiveBackgroundColor: "#07c160",
        buttonPrimaryBorderColor: "#07c160",
        buttonPrimaryBackgroundColor: "#07c160",
      }}
    >
      <Field label="评分">
        <Rate allowHalf value={rate} onChange={setRate} />
      </Field>
      <Field label="滑块">
        <Slider value={slider} onChange={setSlider} />
      </Field>
      <View style={{ margin: "16px" }}>
        <Button shape="round" block color="primary">
          提交
        </Button>
      </View>
    </ConfigProvider>
  )
}

```

> 注意：ConfigProvider 仅影响它的子组件的样式，不影响全局 root 节点。在小程序中 ConfigProvider 不能放置在 `app.ts` 文件里，因为 `app.ts` 文件不能渲染任何内容。

### 基础变量

Taroify 中的 CSS 变量分为 **基础变量** 和 **组件变量**。组件变量会继承基础变量，因此在修改基础变量后，会影响所有相关的组件。

#### 变量列表

下面是所有的基础变量：

```scss
// Color Palette
--black: #000;
--white: #fff;
--gray-1: #f7f8fa;
--gray-2: #f2f3f5;
--gray-3: #ebedf0;
--gray-4: #dcdee0;
--gray-5: #c8c9cc;
--gray-6: #969799;
--gray-7: #646566;
--gray-8: #323233;
--red: #ee0a24;
--blue: #1989fa;
--orange: #ff976a;
--orange-dark: #ed6a0c;
--orange-light: #fffbe8;
--green: #07c160;

// Gradient Colors
--gradient-red: linear-gradient(to right, #ff6034, #ee0a24);
--gradient-orange: linear-gradient(to right, #ffd01e, #ff8917);

// Component Colors
--primary-color: var(--blue);
--success-color: var(--green);
--danger-color: var(--red);
--warning-color: var(--orange);
--text-color: var(--gray-8);
--active-color: var(--gray-2);
--active-opacity: 0.7;
--disabled-opacity: 0.5;
--background-color: var(--gray-1);
--background-color-light: #fafafa;
--text-link-color: #576b95;

// Padding
--padding-base: 4px;
--padding-xs: 8px;
--padding-sm: 12px;
--padding-md: 16px;
--padding-lg: 24px;
--padding-xl: 32px;

// Font
--font-size-xs: 10px;
--font-size-sm: 12px;
--font-size-md: 14px;
--font-size-lg: 16px;
--font-weight-bold: 500;
--line-height-xs: 14px;
--line-height-sm: 18px;
--line-height-md: 20px;
--line-height-lg: 22px;
--base-font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
  Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB',
  'Microsoft Yahei', sans-serif;
--price-integer-font-family: Avenir-Heavy, PingFang SC, Helvetica Neue,
  Arial, sans-serif;

// Animation
--animation-duration-base: 0.3s;
--animation-duration-fast: 0.2s;
--animation-timing-function-enter: ease-out;
--animation-timing-function-leave: ease-in;

// Border
--border-color: var(--gray-3);
--border-width-base: 1px;
--border-radius-sm: 2px;
--border-radius-md: 4px;
--border-radius-lg: 8px;
--border-radius-max: 999px;
```

你可以在各个组件文档底部的表格中查看组件变量。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme| 自定义主题变量 | _object_ | - |
