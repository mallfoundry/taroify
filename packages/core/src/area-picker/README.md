# AreaPicker 省市区选择

### 介绍

省市区三级联动选择，通常与[弹出层](/components/popup)组件配合使用。

### 引入

```tsx
import { AreaPicker } from "@taroify/core"
```

## 代码演示

### 基础用法

初始化省市区组件时，需要通过 `areaList` 属性传入省市区数据。

```tsx
<AreaPicker areaList={areaList} />
```

### areaList 格式

areaList 为对象结构，包含 `province_list`、`city_list`、`county_list` 三个 key。

每项以地区码作为 key，省市区名字作为 value。地区码为 6 位数字，前两位代表省份，中间两位代表城市，后两位代表区县，以 0 补足 6 位。比如北京的地区码为 `11`，以 0 补足 6 位，为 `110000`。

示例数据如下：

```js
const areaList = {
  province_list: {
    110000: "北京市",
    120000: "天津市",
  },
  city_list: {
    110100: "北京市",
    120100: "天津市",
  },
  county_list: {
    110101: "东城区",
    110102: "西城区",
    // ....
  },
}
```

### @vant/area-data

Vant 官方提供了一份默认的省市区数据，可以通过 [@vant/area-data](https://github.com/youzan/vant/tree/dev/packages/vant-area-data) 引入：

```bash
# 通过 npm
npm i @vant/area-data

# 通过 yarn
yarn add @vant/area-data

# 通过 pnpm
pnpm add @vant/area-data
```

```tsx
import { areaList } from "@vant/area-data"
```

### 选中省市区

通过 `defaultValue` 设置默认值

通过 `value` `onChange` 控制选中

```tsx
<AreaPicker areaList={areaList} defaultValue={["330000", "330300", "330305"]} />
```

### 配置显示列

可以通过 `depth` 属性配置省市区显示的列数，默认情况下会显示省市区，当你设置为 `2`，则只会显示省市选择。

```tsx
<AreaPicker depth={2} areaList={areaList} />
```

### 手动控制 DOM

初始化省市区组件时，需要通过 `AreaPicker.Columns` 子组件传入省市区数据。

```tsx
import { AreaPicker } from "@taroify/core"
import { areaList } from "@vant/area-data"

function BasicAreaPicker() {
  return (
    <AreaPicker>
      <AreaPicker.Toolbar>
        <AreaPicker.Button>取消</AreaPicker.Button>
        <AreaPicker.Title>标题</AreaPicker.Title>
        <AreaPicker.Button>确认</AreaPicker.Button>
      </AreaPicker.Toolbar>
      <AreaPicker.Columns children={areaList} />
    </AreaPicker>
  )
}
```

## API

### Props

| 参数                              | 说明                                                      | 类型             | 默认值  |
| --------------------------------- | --------------------------------------------------------- | ---------------- | ------- |
| defaultValue                      | 默认选中的值                                              | _string[]_       | -       |
| value                             | 选中的值                                                  | _string[]_       | -       |
| areaList <br>`v0.1.1-alpha.7`     | 省市区数据                                                | _object_         | -       |
| depth                             | 显示列数，3-省市区，2-省市，1-省                          | _string_         | `3`     |
| title <br>`v0.1.1-alpha.7`        | 顶部栏标题                                                | _ReactNode_      | -       |
| confirmText <br>`v0.1.1-alpha.7`  | 确认按钮文字                                              | _ReactNode_      | `确认`  |
| cancelText <br>`v0.1.1-alpha.7`   | 取消按钮文字                                              | _ReactNode_      | `取消`  |
| loading                           | 是否显示加载状态                                          | _boolean_        | `false` |
| readonly                          | 是否为只读状态，只读状态下无法切换选项                    | _boolean_        | `false` |
| siblingCount                      | 可见的选项相邻个数                                        | _number_         | `3`     |
| optionHeight <br>`v0.1.1-alpha.7` | 选项高度，支持 `px` `vw` `vh` `rem` `rpx` 单位，默认 `px` | _number\|string_ | `44`    |

### Events

| 事件      | 说明               | 回调参数                                                                   |
| --------- | ------------------ | -------------------------------------------------------------------------- |
| onConfirm | 点击完成按钮时触发 | _values: string[], options: PickerOptionObject[]_                          |
| onCancel  | 点击取消按钮时触发 | _values: string[], options: PickerOptionObject[]_                          |
| onChange  | 选项改变时触发     | _values: string[], option: PickerOptionObject, column: PickerOptionObject_ |
