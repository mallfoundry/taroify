# CountDown 倒计时

### 介绍

用于实时展示倒计时数值，支持毫秒精度。

### 引入

```tsx
import { CountDown } from "@taroify/core"
```

## 代码演示

### 基础用法

`time` 属性表示倒计时总时长，单位为毫秒。

```tsx
function CountDownExemple() {
  return <CountDown time={30 * 60 * 60 * 1000} />
}
```

### 自定义格式

通过 `format` 属性设置倒计时文本的内容。

```tsx
function CountDownExemple() {
  return <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
}
```

### 毫秒级渲染

倒计时默认每秒渲染一次，设置 `millisecond` 属性可以开启毫秒级渲染。

```tsx
function CountDownExemple() {
  return <CountDown millisecond time={30 * 60 * 60 * 1000} format="HH:mm:ss:SS" />
}
```

### 自定义样式

通过 `children` 自定义倒计时的样式，`current` 对象格式见下方表格。

```tsx
function CountDownExemple() {
  return (
    <CountDown millisecond time={30 * 60 * 60 * 1000}>
      {(current) => (
        <>
          <View className="block">{current.hours}</View>
          <View className="colon">:</View>
          <View className="block">{current.minutes}</View>
          <View className="colon">:</View>
          <View className="block">{current.seconds}</View>
        </>
      )}
    </CountDown>
  )
}
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

通过 useCountDown 获取返回值后，可以调用 `start`、`pause`、`reset` 方法。

```tsx
function CountDownExemple() {
  const [toastOpen, setToastOpen] = useState(false)
  const countRef = useRef<CountDownInstance>(null)
  return (
    <>
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        倒计时结束
      </Toast>
      <CountDown
        ref={countRef}
        onFinish={() => {
          setToastOpen(true)
        }}
        time={30000}
        format="ss:SSS"
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
        <Grid.Item icon={<Replay />} text="重置" onClick={() => countRef.current?.reset()} />
      </Grid>
    </>
  )
}
```

## API

### Props

| 参数   | 说明                 | 类型               | 默认值     |
| ------ | -------------------- | ------------------ | ---------- |
| time   | 倒计时时长，单位毫秒  | _number_ | `0`        |
| format | 时间格式             | _string_           | `HH:mm:ss` |
| autostart   | 是否自动开始倒计时   | _boolean_                            | `true`     |
| millisecond | 是否开启毫秒级渲染   | _boolean_                            | `false`    |
| onChange    | 倒计时变化时触发     | _(currentTime: CurrentTime) => void_ | -          |
| onFinish    | 倒计时结束时触发     | _() => void_                         | -          |

### format 格式

| 格式 | 说明         |
| ---- | ------------ |
| DD   | 天数         |
| HH   | 小时         |
| mm   | 分钟         |
| ss   | 秒数         |
| S    | 毫秒（1 位） |
| SS   | 毫秒（2 位） |
| SSS  | 毫秒（3 位） |

### CurrentTime 格式

| 名称         | 说明                   | 类型     |
| ------------ | ---------------------- | -------- |
| total        | 剩余总时间（单位毫秒） | _number_ |
| days         | 剩余天数               | _number_ |
| hours        | 剩余小时               | _number_ |
| minutes      | 剩余分钟               | _number_ |
| seconds      | 剩余秒数               | _number_ |
| milliseconds | 剩余毫秒               | _number_ |

### 方法

通过 ref 可以获取到 CountDown 实例并调用实例方法。

| 方法名 | 说明                                                         | 参数 | 返回值 |
| ------ | ------------------------------------------------------------ | ---- | ------ |
| start  | 开始倒计时                                                   | -    | -      |
| pause  | 暂停倒计时                                                   | -    | -      |
| reset  | 重设倒计时，若 `autostart` 为 `true`，重设后会自动开始倒计时 | -    | -      |
