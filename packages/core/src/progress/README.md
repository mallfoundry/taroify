# Progress 进度条

### 介绍

用于展示操作的当前进度。

### 引入

```tsx
import { Progress } from "@taroify/core"
// or
import Progress from "@taroify/core/progress"
```

## 代码演示

### 基础用法

进度条默认为蓝色，使用 `percentage` 属性来设置当前进度。

```tsx
<Progress percent={50} />
```

### 线条粗细

通过 `stroke-width` 可以设置进度条的粗细。

```html

<van-progress :percentage="50" stroke-width="8" />
```

### 置灰

设置 `inactive` 属性后进度条将置灰。

```tsx
<Progress percent={50} inactive />
```

### 样式定制

可以使用 `pivot-text` 属性自定义文字，`color` 属性自定义进度条颜色。

```tsx
<Progress className="custom-color1" percent={25} />
<Progress className="custom-color2" percent={50} />
<Progress className="custom-color3" percent={75} />
```

```scss
.custom-color1 {
  &:not(.taroify-progress--inactive) {
    .taroify-progress__portion {
      background: #f2826a;
    }
  }
}

.custom-color2 {
  &:not(.taroify-progress--inactive) {
    .taroify-progress__portion {
      background: #ee0a24;
    }
  }
}

.custom-color3 {
  &:not(.taroify-progress--inactive) {
    .taroify-progress__portion {
      background: linear-gradient(to right, #be99ff, #7232dd)_ | - |
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 进度百分比 | _number \| string_ | `0` |
| strokeWidth | 进度条粗细，默认单位为`px` | _number \| string_ | `4px` |
| color | 进度条颜色 | _string_ | `primary` |
| inactive | 是否置灰 | _boolean_ | `false` |
| label | 进度文字 | _boolean \| ReactNode_ | `true` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                          | 默认值                      | 描述  |
|---------------------------------------------|--------------------------|-----|
| --progress-height                           | _14px * $hd_             | -   |
| --progress-border-radius                    | _var(--progress-height)_ | -   |
| --progress-background-color                 | _var(--gray-3)_          | -   |
| --progress-portion-color                    | _var(--white)_           | -   |
| --progress-portion-font-size                | _var(--font-size-xs)_    | -   |
| --progress-inactive-background-color        | _#cacaca_                | -   |
| --progress-portion-primary-background-color | _var(--primary-color)_   | -   |
| --progress-portion-info-background-color    | _var(--info-color)_      | -   |
| --progress-portion-success-background-color | _var(--success-color)_   | -   |
| --progress-portion-warning-background-color | _var(--warning-color)_   | -   |
| --progress-portion-danger-background-color  | _var(--danger-color)_    | -   |
