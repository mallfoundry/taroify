# @taroify/mcp

### 介绍

Taroify MCP 是一项独立的 MCP（模型上下文协议）服务，旨在将 Taroify 与大模型连接起来。它使大模型能够直接从文档中检索组件、API数据。

- 直接使用 npx 运行
- 无需外部依赖，只需要 Node 环境

### Cursor 用法

Cursor Mcp 使用指南参考：<https://docs.cursor.com/context/model-context-protocol#using-mcp-tools-in-agent>

```json
{
  "mcpServers": {
    "@taroify/mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@taroify/mcp",
      ],
      "env": {}
    }
  }
}
```
