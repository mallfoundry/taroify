# ShareSheet 分享面板

### 介绍

底部弹起的分享面板，用于展示各分享渠道对应的操作按钮，不含具体的分享逻辑。

### 引入

```tsx
import { ShareSheet } from "@taroify/core"
// or
import ShareSheet from "@taroify/core/share-sheet"
```

## 代码演示

### 基础用法

分享面板通过 `ShareSheet.Option` 组件来定义分享选项。

```tsx
import { ShareSheet } from "@taroify/core"

function BasicShareSheet() {
  const [open, setOpen] = useState(true)
  return (
    <ShareSheet open={open} onSelect={() => setOpen(false)} onClose={setOpen}>
      <ShareSheet.Header title="立即分享给好友" />
      <ShareSheet.Options>
        <ShareSheet.Option icon="wechat" name="微信" />
        <ShareSheet.Option icon="wechat-moments" name="朋友圈" />
        <ShareSheet.Option icon="weibo" name="微博" />
        <ShareSheet.Option icon="qq" name="QQ" />
      </ShareSheet.Options>
      <ShareSheet.Button type="cancel">取消</ShareSheet.Button>
    </ShareSheet>
  )
}
```

### 展示多行选项

当分享选项的数量较多时，可以将 `options` 定义为数组嵌套的格式，每个子数组会作为一行选项展示。

```tsx
import { ShareSheet } from "@taroify/core"

function MultilineShareSheet() {
  const [open, setOpen] = useState(true)
  return (
    <ShareSheet open={open} onSelect={() => setOpen(false)} onClose={setOpen}>
      <ShareSheet.Header title="立即分享给好友" />
      <ShareSheet.Options>
        <ShareSheet.Option icon="wechat" name="微信" />
        <ShareSheet.Option icon="wechat-moments" name="朋友圈" />
        <ShareSheet.Option icon="weibo" name="微博" />
        <ShareSheet.Option icon="qq" name="QQ" />
      </ShareSheet.Options>
      <ShareSheet.Options>
        <ShareSheet.Option icon="link" name="复制链接" />
        <ShareSheet.Option icon="poster" name="分享海报" />
        <ShareSheet.Option icon="qrcode" name="二维码" />
        <ShareSheet.Option icon="weapp-qrcode" name="小程序码" />
      </ShareSheet.Options>
      <ShareSheet.Button type="cancel">取消</ShareSheet.Button>
    </ShareSheet>
  )
}
```

### 自定义图标

除了使用内置的几种图标外，可以直接在 `icon` 中传入 Image 组件来使用自定义的图标。

```tsx
import { Image, ShareSheet } from "@taroify/core"

function CustomShareSheet() {
  const [open, setOpen] = useState(true)
  return (
    <ShareSheet open={open} onSelect={() => setOpen(false)} onClose={setOpen}>
      <ShareSheet.Options>
        <ShareSheet.Option
          icon={<Image src="https://img.yzcdn.cn/vant/custom-icon-fire.png" />}
          name="名称"
        />
        <ShareSheet.Option
          icon={<Image src="https://img.yzcdn.cn/vant/custom-icon-light.png" />}
          name="名称"
        />
        <ShareSheet.Option
          icon={<Image src="https://img.yzcdn.cn/vant/custom-icon-water.png" />}
          name="名称"
        />
      </ShareSheet.Options>
      <ShareSheet.Button type="cancel">取消</ShareSheet.Button>
    </ShareSheet>
  )
}
```

### 展示描述信息

通过 `description` 属性可以设置标题下方的描述文字, 在 `options` 内设置 `description` 属性可以添加分享选项描述。

```tsx
import { ShareSheet } from "@taroify/core"

function ShareSheetWithDescription() {
  const [open, setOpen] = useState(true)
  return (
    <ShareSheet open={open} onSelect={() => setOpen(false)} onClose={setOpen}>
      <ShareSheet.Header title="立即分享给好友">描述信息</ShareSheet.Header>
      <ShareSheet.Options>
        <ShareSheet.Option icon="wechat" name="微信" />
        <ShareSheet.Option icon="weibo" name="微博" />
        <ShareSheet.Option icon="link" name="复制链接" description="描述信息" />
        <ShareSheet.Option icon="poster" name="分享海报" />
        <ShareSheet.Option icon="qrcode" name="二维码" />
      </ShareSheet.Options>
      <ShareSheet.Button type="cancel">取消</ShareSheet.Button>
    </ShareSheet>
  )
}
```

## API

### ShareSheet Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultOpen | 默认是否显示动作面板 | _boolean_ | `false` |
| open      | 是否显示动作面板 | _boolean_ | `false` |
| className | 样式类名 | _string_ | - |
| style     | 样式对象 | _CSSProperties_ | - |
| rounded   | 是否为圆角 | _string_ | - |

### ShareSheet.Backdrop Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 样式类名 | _string_        | - |
| style     | 样式对象 | _CSSProperties_ | - |
| duration  | 动画时长，单位毫秒 | _number \| string_ | `300` |
| closeable | 点击是否可以关闭  | _boolean_ | `true` |

### ShareSheet.Header Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 样式类名 | _string_        | - |
| style     | 样式对象 | _CSSProperties_ | - |
| title     | 标题    | _string_        | - |
| children  | 描述信息 | _string_        | - |

### ShareSheet.Option Props

|     参数     | 说明 | 类型 | 默认值 |
| ----------- | --- | --- | --- |
| className   | 分享选项类名 | _string_ | - |
| name        | 分享渠道名称 | _string_ | - |
| value       | 选项值  | _string_        | - |
| description | 分享选项描述 | _string_ | - |
| icon        | 图标，可选值为 `wechat` `weibo` `qq` `link` `qrcode` `poster`<br/>`weapp-qrcode` `wechat-moments`，支持传入 Image 组件 | _string_ | - |
| openType    | 微信开放能力，可选值为 `contact` `contactShare` `share`<br/>`getRealnameAuthInfo` `getAuthorize` `getPhoneNumber`<br/>`getUserInfo` `lifestyle` `launchApp` `openSetting` `feedback` | _string_ | - |

### Events

| 事件名        | 说明                     | 回调参数                        |
| ------------- | ------------------------ | ------------------------------- |
| onSelect        | 点击分享选项时触发       | _event: ShareSheet.OptionEvent_ |
| onCancel | 点击取消按钮时触发 | - |
| onClose | 关闭面板时触发 | - |

## 常见问题

### 如何实现分享逻辑？

在不同的 App 或浏览器中，存在各式各样的分享接口或分享方式，因此 ShareSheet 组件不提供具体的分享逻辑，需要开发者根据业务场景自行实现。

#### 微信内分享

由于微信未提供分享相关的 API，需要引导用户点击右上角进行分享。

#### App 内分享

可以通过 JSBridge 调用原生应用的 SDK 进行分享。

#### 分享海报或二维码

可以通过 [Popup](/components/popup/) 组件以弹层的形式展示图片，然后引导用户保存图片进行分享。
