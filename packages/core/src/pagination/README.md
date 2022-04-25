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
export default function BasicPagination() {
  const [current, setCurrent] = useState<number>(1)
  return <Pagination current={current} count={10} onChange={(page) => setCurrent(page)} />
}
```

### 显示省略号

设置 `Pagination.Item.type` 为 `start-ellipsis` 或者 `end-ellipsis` 展示省略号按钮，点击后可以快速跳转。

```tsx
function PaginationWithEllipses() {
  const [current, setCurrent] = useState<number>(1)
  return (
    <Pagination
      current={current}
      siblingCount={1}
      count={13}
      onChange={(page) => setCurrent(page)}
    >
      <Pagination.Item type="start-ellipsis" />
      <Pagination.Item type="end-ellipsis" />
    </Pagination>
  )
}
```

### 自定义按钮

通过 `Pagination.Item` 组件来自定义分页按钮的内容。

```tsx
function PaginationWithCustomButton() {
  const [current, setCurrent] = useState<number>(1)
  return (
    <Pagination current={current} count={6} onChange={(page) => setCurrent(page)}>
      <Pagination.Item type="previous">
        <ArrowLeft />
      </Pagination.Item>
      <Pagination.Item type="next">
        <ArrowRight />
      </Pagination.Item>
    </Pagination>
  )
}
```

## API

### Props

| 参数           | 说明            | 类型       | 默认值 |
|--------------|---------------|----------|-----|
| current      | 当前页码          | _number_ | -   |
| siblingCount | 当前页码两侧显示的数字个数 | _number_ | `2` |
| count        | 总页数           | _number_ | -   |

### Events

| 事件名      | 说明      | 回调参数 |
|----------|---------|------|
| onChange | 页码改变时触发 | -    |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                          | 默认值                            | 描述  |
|---------------------------------------------|--------------------------------|-----|
| --pagination-height                         | _40px * $hd_                   | -   |
| --pagination-font-size                      | _var(--font-size-md)_          | -   |
| --pagination-background-color               | _var(--white)_                 | -   |
| --pagination-item-min-width                 | _36px * $hd_                   | -   |
| --pagination-item-color                     | _var(--blue)_                  | -   |
| --pagination-item-active-color              | _var(--white)_                 | -   |
| --pagination-item-active-background-color   | _var(--pagination-item-color)_ | -   |
| --pagination-item-disabled-color            | _var(--gray-7)_                | -   |
| --pagination-item-disabled-background-color | _var(--background-color)_      | -   |
| --pagination-item-disabled-opacity          | _var(--disabled-opacity)_      | -   |
| --pagination-button-padding                 | _0 var(--padding-base)_        | -   |
