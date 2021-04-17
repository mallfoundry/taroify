# 快速上手

### 介绍

通过本章节你可以了解到 Taroify 的安装方法和基本使用姿势。

## 安装

### 通过 npm 安装

在现有项目中使用 Taroify 时，可以通过 `npm` 或 `yarn` 进行安装：

```bash
# 使用 npm 安装 Taroify：
npm i @taroify/core -S

# 使用 yarn 安装 Taroify：
yarn add @taroify/core
```

## 引入组件

### 方式一. 自动按需引入组件 (推荐)

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。

```bash
# 安装插件
npm i babel-plugin-import -D
```

```js
module.exports = {
  plugins: [
    [
      "import",
      {
        "libraryName": "@taroify/core",
        "libraryDirectory": "",
        "style": (name) => {
          return `${name}/index.scss`
        },
      },
      "@taroify/core",
    ],
  ],
};
```

接着你可以在代码中直接引入 Taroify 组件：

```js
// 插件会自动将代码转化为方式二中的按需引入形式
import { Button } from "@taroify/core";
```

#### TypeScript 插件

如果你在使用 TypeScript，可以使用 [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) 实现按需引入。

### 方式二. 手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件。

```js
import Button from "@taroify/core/button";
import "@taroify/core/button/index.scss";
```
