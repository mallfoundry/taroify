# @taroify/hooks

### 介绍

Taroify 内置了一组 hooks，对于安装了 `@taroify/core` 的项目，可以直接使用这些 hooks 进行开发。

### 示例

下面是一个 Taroify Hooks 的用法示例，我们从 `@taroify/hooks` 这个包中引入 `useCascader` 方法，然后进行调用，即可获取得一个级联对象。

```ts
import { useCascader } from "@taroify/hooks";
import area from "./area"

const [value, setValue] = useState<string[]>([])
const { columns } = useCascader({ value, depth: 3, options: area })

console.log(columns); // -> options[]
```

### API 列表

下面是 `@taroify/hooks` 对外提供的所有 Hooks，点击名称可以查看详细介绍：

| 名称 | 描述 |
| --- | --- |
| [useCascader](/hooks/use-cascader/) | 监听点击元素外部的事件 |
