# useCascader

### 介绍

用于创建级联操作对象。

## 代码演示

### 基本用法

```tsx
import { useCascader } from "@taroify/hooks"
import area from "./area"

const [value, setValue] = useState<string[]>([])
const { columns } = useCascader({ value, depth: 3, options: area })

console.log(columns); // -> options[]
```

```ts
// area
export default [
  {
    label: "浙江省",
    value: "330000",
    children: [
      {
        label: "杭州市",
        value: "330100",
        children: [
          {
            label: "上城区",
            value: "330102",
          },
          {
            label: "下城区",
            value: "330103",
          },
          {
            label: "江干区",
            value: "330104",
          },
        ],
      },
      {
        label: "宁波市",
        value: "330200",
        children: [
          {
            label: "海曙区",
            value: "330203",
          },
          {
            label: "江北区",
            value: "330205",
          },
          {
            label: "北仑区",
            value: "330206",
          },
        ],
      },
      {
        label: "温州市",
        value: "330300",
        children: [
          {
            label: "鹿城区",
            value: "330302",
          },
          {
            label: "龙湾区",
            value: "330303",
          },
          {
            label: "瓯海区",
            value: "330304",
          },
        ],
      },
    ],
  },
]
```

## API

### 类型定义

```ts
interface CascaderColumn {
  value?: any
  label?: ReactNode
  disabled?: boolean
}

interface CascaderOption extends CascaderColumn {
  children?: CascaderOption[]
}

interface UseCascaderOptions {
  value?: any[]
  depth?: number
  options: CascaderOption[]
}

interface CascaderObject {
  columns: CascaderOption[][]
}

function useCascader(options: UseCascaderOptions): CascaderObject
```

### 参数

| 参数     | 说明                     | 类型                       | 默认值 |
| -------- | ------------------------ | -------------------------- | ------ |
| options  | 配置项             | _UseCascaderOptions_                  | 见下表 |

### UseCascaderOptions

| 参数      | 说明           | 类型     | 默认值  |
| --------- | -------------- | -------- | ------- |
| value | 选中的级联 value 值 | _any[]_ | - |
| depth | 级联深度 | _number_ | `0` |
| options | 级联项数组 | _CascaderOption[]_ | - |
