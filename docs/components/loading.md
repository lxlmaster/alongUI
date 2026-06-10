# Loading 加载

Loading 用于在异步请求、提交和局部刷新时阻止重复操作。

## 指令用法

```vue
<template>
  <section v-loading="loading">
    内容区域
  </section>
</template>
```

## 服务式用法

```ts
import { LoadingService } from '@along-ui/components'

const instance = LoadingService({
  text: '加载中',
  fullscreen: true
})

instance.close()
```

## Options

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| target | `HTMLElement \| string` | `document.body` | 加载目标 |
| text | `string` | `'加载中'` | 加载文案 |
| fullscreen | `boolean` | 根据 target 推导 | 是否全屏 |

## 与 Element Plus 差异

- 当前阶段提供 `v-loading` 和 `LoadingService` 的基础能力。
- 锁定滚动、背景色自定义、SVG 自定义等能力后续补充。

