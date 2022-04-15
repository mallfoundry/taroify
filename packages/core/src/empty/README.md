# Empty 空状态

### 介绍

空状态时的占位提示。

### 引入

```ts
import { Empty } from "@taroify/core"
// or
import Empty from "@taroify/core/empty"
```

## 代码演示

### 基础用法

```tsx
<Empty>
  <Empty.Image />
  <Empty.Description>描述文字</Empty.Description>
</Empty>
```

### 图片类型

Empty 组件内置了多种占位图片类型，可以在不同业务场景下使用。

```tsx
<!-- 通用错误 -->
<Empty>
  <Empty.Image src="error" />
  <Empty.Description>描述文字</Empty.Description>
</Empty>
<!-- 网络错误 -->
<Empty>
  <Empty.Image src="network" />
  <Empty.Description>描述文字</Empty.Description>
</Empty>
<!-- 搜索提示 -->
<Empty>
  <Empty.Image src="search" />
  <Empty.Description>描述文字</Empty.Description>
</Empty>
```

### 自定义图片

需要自定义图片时，可以在 image 属性中传入任意图片 URL。

```tsx
<Empty>
  <Empty.Image
    className="custom-empty__image"
    src="https://img.yzcdn.cn/vant/custom-empty-image.png"
  />
  <Empty.Description>描述文字</Empty.Description>
</Empty>
```

```scss
.custom-empty__image {
  width: 90px * 2;
  height: 90px * 2;
}
```

### 底部内容

通过默认插槽可以在 Empty 组件的下方插入内容。

```tsx
<Empty>
  <Empty.Image />
  <Empty.Description>描述文字</Empty.Description>
  <Button shape="round" color="danger" className="bottom-button">
    按钮
  </Button>
</Empty>
```

```scss
.bottom-button {
  margin-top: 24px * 2;
  width: 160px * 2;
  height: 40px * 2;
}
```

## API

### Empty Props

| 参数       | 说明  | 类型          | 默认值 |
|----------|-----|-------------|-----|
| children | 内容  | _ReactNode_ | -   |

### Empty.Image Props

| 参数    | 说明                                              | 类型              | 默认值       |
|-------|-------------------------------------------------|-----------------|-----------|
| style | 图片样式                                            | _CSSProperties_ | -         |
| src   | 图片类型，可选值为 `error` `network` `search`，支持传入图片 URL | _string_        | `default` |

### Empty.Description Props

| 参数       | 说明        | 类型          | 默认值 |
|----------|-----------|-------------|-----|
| children | 图片下方的描述文字 | _ReactNode_ | -   |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                              | 默认值                       | 描述  |
|---------------------------------|---------------------------|-----|
| --empty-padding                 | _var(--padding-xl) 0_     | -   |
| --empty-image-size              | _160px * $hd_             | -   |
| --empty-image-width             | _var(--empty-image-size)_ | -   |
| --empty-image-height            | _var(--empty-image-size)_ | -   |
| --empty-description-margin-top  | _var(--padding-md)_       | -   |
| --empty-description-padding     | _0 60px * $hd_            | -   |
| --empty-description-color       | _var(--gray-6)_           | -   |
| --empty-description-font-size   | _var(--font-size-md)_     | -   |
| --empty-description-line-height | _var(--line-height-md)_   | -   |
