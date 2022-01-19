# Avatar 头像

### 介绍

显示用户头像、首字母或备用图标。

### 引入

```ts
import { Avatar } from "@taroify/core"
```

## 代码演示

### 基础用法

设置 `style` 可以修改,背景颜色

```tsx
<Avatar>P</Avatar>
<Avatar style={{ background: "green" }}>N</Avatar>
<Avatar style={{ background: "pink" }}>HP</Avatar>
```

### 尺寸

设置 `size` 属性后，可以选择四个大小。

```tsx
<Avatar src="https://joeschmoe.io/api/v1/1" size="mini" />
<Avatar src="https://joeschmoe.io/api/v1/2" size="small" />
<Avatar src="https://joeschmoe.io/api/v1/3" size="medium" />
<Avatar src="https://joeschmoe.io/api/v1/4" size="large" />
```

### 形状

通过 `variant` 属性来设置形状。

```tsx
<Avatar src="https://joeschmoe.io/api/v1/1" />
<Avatar src="https://joeschmoe.io/api/v1/2" shape="square" />
<Avatar src="https://joeschmoe.io/api/v1/3" shape="rounded" />
```

### 群组

最多显示5个。

```tsx
<Avatar.Group total={24}>
  <Avatar src="https://joeschmoe.io/api/v1/1" />
  <Avatar src="https://joeschmoe.io/api/v1/2" />
  <Avatar src="https://joeschmoe.io/api/v1/3" />
  <Avatar src="https://joeschmoe.io/api/v1/4" />
  <Avatar src="https://joeschmoe.io/api/v1/5" />
  <Avatar src="https://joeschmoe.io/api/v1/6" />
</Avatar.Group>
```

### 最大

通过 `max` 属性最大可展示数量,最多显示5个。

```tsx
<Avatar.Group max={3}>
  <Avatar src="https://joeschmoe.io/api/v1/1" />
  <Avatar src="https://joeschmoe.io/api/v1/2" />
  <Avatar src="https://joeschmoe.io/api/v1/3" />
  <Avatar src="https://joeschmoe.io/api/v1/4" />
  <Avatar src="https://joeschmoe.io/api/v1/5" />
  <Avatar src="https://joeschmoe.io/api/v1/6" />
</Avatar.Group>
```

### 图标

```tsx
<Avatar style={{ background: "red" }}>
  <Cross />
</Avatar>
<Avatar style={{ background: "pink" }}>
  <LocationOutlined />
</Avatar>
<Avatar style={{ background: "green" }}>
  <SettingOutlined />
</Avatar>
```

### 徽章

```tsx
<Badge className="avatar-dot" dot position="bottom-right">
  <Avatar src="https://joeschmoe.io/api/v1/1" />
</Badge>
<Badge
  className="avatar-avatar"
  content={<Avatar src="https://joeschmoe.io/api/v1/2" />}
  position="bottom-right"
>
  <Avatar src="https://joeschmoe.io/api/v1/female/3" />
</Badge>
```

```scss
.avatar-dot {
  bottom: 2px * 2;
  right: 6px * 2,
}

.avatar-avatar {
  --badge-background-color: transparent;
  --badge-padding: 0;
  --badge-size: 12px * 2;
  --avatar-size: var(--badge-size);
  bottom: 2px * 2;
  right: 6px * 2,
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
