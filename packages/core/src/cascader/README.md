# Cascader 级联选择

### 介绍

级联选择框，用于多层级数据的选择，典型场景为省市区选择。

### 引入

```tsx
import { Cascader } from "@taroify/core"
import { useCascader } from "@taroify/hooks"
```

## 代码演示

### 基础用法

级联选择组件可以搭配 Field 和 Popup 组件使用，示例如下：

```tsx
import { Cascader, Field, Popup } from "@taroify/core"
import { useCascader } from "@taroify/hooks"
import { ArrowRight } from "@taroify/icons"
import * as _ from "lodash"
import { useState } from "react"
import area from "./area"

function BasicCascader() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const [fieldValue, setFieldValue] = useState("")
  const columns = useCascader({ value, depth: 3, options: area })
  return (
    <>
      <Field
        readonly
        label="选项值"
        placeholder="请选择地区"
        value={fieldValue}
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <Popup.Close />
        <Cascader
          value={value}
          onSelect={setValue}
          onChange={(values, options) => {
            setOpen(false)
            setFieldValue(
              _.join(
                _.map(options, ({ children }) => children),
                "/",
              ),
            )
          }}
        >
          <Cascader.Header>请选择所在地区</Cascader.Header>
          {
            _.map(columns, (options, index) => (
              <Cascader.Tab key={index}>
                {
                  _.map(options, (option) => (
                    <Cascader.Option key={option.value} value={option.value}>
                      {option.label}
                    </Cascader.Option>
                  ))
                }
              </Cascader.Tab>
            ))
          }
        </Cascader>
      </Popup>
    </>
  )
}
```

### 自定义颜色

通过 CSS 变量来设置选中状态的高亮颜色。

```tsx
<Cascader className="custom-color" />
```

```scss
.custom-color {
  --tabs-active-color: #1989fa;
  --cascader-active-color: #1989fa;
}
```

## API

### Cascader Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 顶部标题 | _string_ | - |
| value | 选中项的值 | _any[]_ | - | 
| placeholder | 未选中时的提示文案 | _string_ | `请选择` | 
| swipeable | 是否开启手势左右滑动切换 | _boolean_ | `false` |

### Cascader.Header Props

| 参数       | 说明         | 类型        | 默认值 |
| --------- | ------------ | ----------- | --- |
| children  | 头部内容      | _ReactNoe_  | - |

### Cascader.Tab Props

| 参数         | 说明           | 类型          | 默认值 | 
| ----------- | ------------- | ------------- | --- |
| children    | 子选项列表      | _ReactNoe_    | - |

### Cascader.Option Props

| 参数               | 说明                     | 类型               | 默认值 |
| ------------------ | ------------------------ | ---------------- | --- |
| children           | 选项内容（必填）         | _ReactNoe_          | - |
| value              | 选项对应的值（必填）     | _string \| number_   | - |
| disabled           | 是否禁用选项             | _boolean_          | `false` |

### Cascader Events

| 事件      | 说明                   | 回调参数                               |
| --------- | ---------------------- | -------------------------------------- |
| onSelect    | 选中项变化时触发       | _values: any[], options: Cascader.OptionObject[]_ |
| onChange    | 全部选项选择完成后触发 | _values: any[], options: Cascader.OptionObject[]_ |
| onTabClick | 点击标签时触发         | _event: Tabs.TabEvent_      |
