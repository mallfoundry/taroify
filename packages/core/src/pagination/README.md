# Pagination 分页

### 介绍

数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面。

### 引入

```js
import { Pagination } from "@taroify/core"
// or
import Pagination from "@taroify/core/pagination"
```

## 代码演示

### 基础用法

通过 `current` 来绑定当前页码。

```tsx
export default function PaginationDemo() {
  const [current, setCurrent] = useState<number>(1)
  const [total] = useState(60)
  const [limit] = useState(10)
  const { count, items } = usePagination({
    current,
    total,
    limit,
  })
  return (
    <Pagination
      current={current}
      limit={limit}
      total={total}
      count={count}
      onChange={({ page }) => setCurrent(page)}
    >
      {items?.map((item) => (
        <Pagination.Item key={item.page} {...item} />
      ))}
    </Pagination>
  )
}

```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页码 | _number_ | - |
| mode | 显示模式，可选值为 `simple` | _string_ | `multi` |
| count | 总页数 | _number \| string_ | 根据页数计算 |
| total | 总记录数 | _number \| string_ | `0` |
| limit | 每页记录数 | _number \| string_ | `10` |
| forceEllipses | 是否显示省略号 | _boolean_ | `false` |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| change | 页码改变时触发 | -        |

