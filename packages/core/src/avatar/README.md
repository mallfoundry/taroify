# Badge 徽标

### 介绍

在右上角展示徽标数字或小红点。

### 引入

```ts
import { Avatar } from "@taroify/core"
// or
import Avatar from "@taroify/core/avatar"
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
<Avatar src="https://mui.com/static/images/avatar/1.jpg" size="mini"></Avatar>
<Avatar src="https://mui.com/static/images/avatar/1.jpg" size="small"></Avatar>
<Avatar src="https://mui.com/static/images/avatar/1.jpg" size="medium"></Avatar>
<Avatar src="https://mui.com/static/images/avatar/1.jpg" size="large"></Avatar>
```

### 形状

通过 `variant` 属性来设置形状。

```tsx
<Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
<Avatar src="https://mui.com/static/images/avatar/1.jpg" variant="square"></Avatar>
<Avatar src="https://mui.com/static/images/avatar/1.jpg" variant="rounded"></Avatar>
```


### 群组

最多显示5个。

```tsx
<Avatar.Group total={24} spacing="medium">
  <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
</Avatar.Group>
```


### 最大

通过 `max` 属性最大可展示数量,最多显示5个。

```tsx
<Avatar.Group max={3} spacing="small" variant="square">
  <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
  <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
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
<Badge content={<Cross />} position="bottom-right">
  <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
</Badge>
<Badge content={<SettingOutlined></SettingOutlined>} position="bottom-right">
  <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
</Badge>
```
## API

### Avatar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 样式内容 | _Object_ | - |
| src | 传入图片的链接,传入之后嵌套内容不展示 | _string_ | - |
| alt | 图片不显示时的文本内容 | _string_ | - |
| variant | 形状，可选值为 `square` `rounded` `circular` | _string_ | `circular` |
| size | 大小，可选值为 `mini` `small` `medium` `large` | _string_ | `medium` |

### Avatar-Group Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| max | 显示最大内容 | _number_ | - |
| variant | 形状，可选值为 `square` `rounded` `circular` | _string_ | `circular` |
| spacing | 间距，可选值为 `small` `medium` `large` | _string_ | `medium` |
| total | 头像总数。用于计算额外头像的数量。| _string_ | - |