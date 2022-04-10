# Countdown 倒计时

### 介绍

用于实时展示倒计时数值，支持毫秒精度。

### 引入

```tsx
import { Countdown } from "@taroify/core"
```

## 代码演示

### 基础用法

`value` 属性表示倒计时总时长，单位为毫秒。

```tsx
<Countdown value={30 * 60 * 60 * 1000} />
```

### 自定义格式

通过 `format` 属性设置倒计时文本的内容。

```tsx
<Countdown value={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
```

### 毫秒级渲染

倒计时默认每秒渲染一次，设置 `interval` 属性可以开启毫秒级渲染。

```tsx
<Countdown interval={1} value={30 * 60 * 60 * 1000} format="HH:mm:ss:SS" />
```

### 自定义样式

通过 `children` 自定义倒计时的样式，`current` 对象格式见下方表格。

```tsx
<Countdown value={30 * 60 * 60 * 1000}>
  {(current) => (
    <>
      <View className="block">{current.hours}</View>
      <View className="colon">:</View>
      <View className="block">{current.minutes}</View>
      <View className="colon">:</View>
      <View className="block">{current.seconds}</View>
    </>
  )}
</Countdown>
```

```scss
.colon {
  display: inline-block;
  margin: 0 4px * 2;
  color: #ee0a24;
}

.block {
  display: inline-block;
  width: 22px * 2;
  color: #fff;
  font-size: 12px * 2;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 4px * 2;
}
```

### 手动控制

通过 useCountdown 获取返回值后，可以调用 `start`、`pause`、`stop`、`restart` 方法。

```tsx
function CountdownWithManualControl() {
  const countRef = useRef<CountdownInstance>(null)
  return (
    <>
      <Toast id="toast" />
      <Countdown
        className="manual-control"
        ref={countRef}
        value={30 * 1000}
        format="ss:SSS"
        onComplete={() => Toast.open("倒计时结束")}
      />
      <Grid columns={3} clickable>
        <Grid.Item
          icon={<PlayCircleOutlined />}
          text="开始"
          onClick={() => countRef.current?.start()}
        />
        <Grid.Item
          icon={<PauseCircleOutlined />}
          text="暂停"
          onClick={() => countRef.current?.pause()}
        />
        <Grid.Item icon={<Replay />} text="重置" onClick={() => countRef.current?.restart()} />
      </Grid>
    </>
  )
}
```

## API

### Props

| 参数         | 说明           | 类型                                   | 默认值        |
|------------|--------------|--------------------------------------|------------|
| value      | 倒计时时长，单位毫秒   | _number_                             | `0`        |
| format     | 时间格式         | _string_                             | `HH:mm:ss` |
| autostart  | 是否自动开始倒计时    | _boolean_                            | `true`     |
| interval   | 倒计时渲染间隔，单位毫秒 | _number_                             | `1000`     |
| onChange   | 倒计时变化时触发     | _(currentTime: CurrentTime) => void_ | -          |
| onComplete | 倒计时结束时触发     | _() => void_                         | -          |

### format 格式

| 格式  | 说明      |
|-----|---------|
| DD  | 天数      |
| HH  | 小时      |
| mm  | 分钟      |
| ss  | 秒数      |
| S   | 毫秒（1 位） |
| SS  | 毫秒（2 位） |
| SSS | 毫秒（3 位） |

### CurrentTime 格式

| 名称           | 说明          | 类型       |
|--------------|-------------|----------|
| total        | 剩余总时间（单位毫秒） | _number_ |
| days         | 剩余天数        | _number_ |
| hours        | 剩余小时        | _number_ |
| minutes      | 剩余分钟        | _number_ |
| seconds      | 剩余秒数        | _number_ |
| milliseconds | 剩余毫秒        | _number_ |

### 方法

通过 ref 可以获取到 Countdown 实例并调用实例方法。

| 方法名     | 说明                                       | 参数  | 返回值 |
|---------|------------------------------------------|-----|-----|
| start   | 开始倒计时                                    | -   | -   |
| pause   | 暂停倒计时                                    | -   | -   |
| reset   | 重设倒计时，若 `autostart` 为 `true`，重设后会自动开始倒计时 | -   | -   |
| restart | 重启倒计时                                    | -   | -   |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                      | 默认值                     | 描述  |
|-------------------------|-------------------------|-----|
| --countdown-color       | _var(--text-color)_     | -   |
| --countdown-font-size   | _var(--font-size-md)_   | -   |
| --countdown-line-height | _var(--line-height-md)_ | -   |
