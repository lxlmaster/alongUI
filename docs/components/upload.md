# Upload 上传

Upload 用于文件上传，支持点击与拖拽两种触发方式，内置进度展示与文件管理。

## 基础用法

```vue
<template>
  <al-upload action="/api/upload">
    <al-button>选择文件</al-button>
  </al-upload>
</template>
```

## 拖拽上传

```vue
<template>
  <al-upload action="/api/upload" drag>
    <template #tip>支持拖拽文件到此处</template>
  </al-upload>
</template>
```

## 限制与过滤

```vue
<template>
  <al-upload
    action="/api/upload"
    accept="image/*"
    :limit="3"
    :file-size="5"
    multiple
  />
</template>
```

## Upload Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| action | `string` | `''` | 上传接口 URL |
| multiple | `boolean` | `false` | 是否允许同时选择多文件 |
| accept | `string` | `undefined` | 接受的文件类型，如 `image/*` |
| drag | `boolean` | `false` | 是否启用拖拽上传区域 |
| disabled | `boolean` | `false` | 是否禁用 |
| withCredentials | `boolean` | `false` | 跨域请求是否携带 cookie |
| headers | `Record<string, string>` | `{}` | 自定义请求头 |
| data | `Record<string, any>` | `{}` | 上传时附加的额外数据 |
| name | `string` | `'file'` | 文件字段名 |
| limit | `number` | `undefined` | 最大上传文件数 |
| fileSize | `number` | `undefined` | 单文件大小限制（MB） |
| listType | `'text' \| 'picture' \| 'picture-card'` | `'text'` | 文件列表展示类型 |

## Upload Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| onSuccess | `(response, file)` | 上传成功时触发 |
| onError | `(error, file)` | 上传失败时触发 |
| onChange | `(file)` | 文件状态变化时触发 |
| onRemove | `(file)` | 移除文件时触发 |
| onExceed | `(files)` | 超出数量限制时触发 |

## 设计说明

- 内部使用 XMLHttpRequest 进行上传，支持进度监听和取消。
- 拖拽区域在拖入文件时显示 hover 态反馈。
- 不上传时（action 为空字符串）文件立即标记为成功，方便纯本地场景。
- 文件列表显示文件名、大小、进度条和状态图标，并提供移除按钮。
