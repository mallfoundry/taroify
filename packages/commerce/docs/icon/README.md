# Icon 图标

### 介绍

基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 `icon` 属性引用。

### 引入

```tsx
import { ChatOutlined } from "@taroify/icons"
```

## 代码演示

### 基础用法

通过导入的方式引用需要使用的图标，Taroify 内置了一套 Vant 图标库（见右侧示例），可以直接复制对应的名称来使用。

```tsx
<ChatOutlined />
```

### 徽标提示

与 Badge 组件组合使用，会在图标右上角展示相应的徽标。

```tsx
<Badge dot>
  <ChatOutlined />
</Badge>

<Badge content="9">
  <ChatOutlined />
</Badge>

<Badge content="99+">
  <ChatOutlined />
</Badge>
```

### 图标颜色

通过 `style` 属性来设置图标的颜色。

```tsx
<CartOutlined style={{ color: "#1989fa" }} />
<FireOutlined style={{ color: "#ee0a24" }} />
```

### 图标大小

通过 `size` 属性来设置图标的尺寸大小，可以指定任意 CSS 单位。

```tsx
<!-- 不指定单位，默认使用 px -->
<ChatOutlined size="40" />
<!-- 指定使用 rem 单位 -->
<ChatOutlined size="2rem" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 图标颜色 | _string_ | `inherit` |
| size | 图标大小，如 `20px` `2em`，默认单位为 `px` | _number \| string_ | `inherit` |

### Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| onClick  | 点击图标时触发 | _event: ITouchEvent_ |
