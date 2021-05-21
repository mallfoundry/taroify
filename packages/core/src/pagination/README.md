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

通过 `v-model` 来绑定当前页码。

```html

<van-pagination v-model="currentPage" :total-items="24" :items-per-page="5" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const currentPage = ref(1);
    return { currentPage };
  },
};
```

### 简单模式

 将 `mode` 设置为 `simple` 来切换到简单模式，此时分页器不会展示具体的页码按钮。

```html

<van-pagination v-model="currentPage" :page-count="12" mode="simple" />
```

### 显示省略号

设置 `force-ellipses` 后会展示省略号按钮，点击后可以快速跳转。

```html

<van-pagination
  v-model="currentPage"
  :total-items="125"
  :show-page-size="3"
  force-ellipses
/>
```

### 自定义按钮

通过 `prev-text`、`next-text` 等插槽来自定义分页按钮的内容。

```html

<van-pagination v-model="currentPage" :total-items="50" :show-page-size="5">
  <template #prev-text>
    <van-icon name="arrow-left" />
  </template>
  <template #next-text>
    <van-icon name="arrow" />
  </template>
  <template #page="{ text }">{{ text }}</template>
</van-pagination>
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

