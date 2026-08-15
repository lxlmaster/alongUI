# InfiniteScroll 无限滚动

## 简介

InfiniteScroll 是一个**指令**（而非组件），挂载在可滚动容器上，当容器滚动到距底部指定距离时自动触发加载回调，用于列表分页的「滚动加载更多」。

导出名为 `vInfiniteScroll`，在模板中使用 `v-infinite-scroll`。

## 注册方式

`v-infinite-scroll` **不会**随 `app.use(AlongUI)` 自动注册，需要手动注册为全局指令，或在单文件组件内局部引入。

全局注册：

```ts
// main.ts
import { createApp } from 'vue'
import AlongUI, { vInfiniteScroll } from 'along-ui'
import App from './App.vue'

const app = createApp(App)

app.use(AlongUI)
app.directive('infinite-scroll', vInfiniteScroll)

app.mount('#app')
```

局部使用（`<script setup>` 中以 `v` 开头的变量会自动注册为指令）：

```vue
<script setup lang="ts">
import { vInfiniteScroll } from 'along-ui'
</script>
```

## 基础用法

指令的值是一个**配置对象**，至少包含 `onLoad` 回调。容器必须有确定的高度，指令会自动把容器的 `overflow` 设为 `auto`。

```vue
<template>
  <div
    v-infinite-scroll="{ onLoad: loadMore, distance: 100 }"
    style="height: 320px"
  >
    <div v-for="item in list" :key="item" class="row">第 {{ item }} 条</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vInfiniteScroll } from 'along-ui'

const list = ref<number[]>(Array.from({ length: 20 }, (_, i) => i + 1))

function loadMore() {
  const start = list.value.length
  for (let i = 1; i <= 10; i++) list.value.push(start + i)
}
</script>
```

::: warning 注意绑定形式
指令值必须是对象，`distance`、`disabled` 是对象的属性，**不是** HTML 属性。以下写法无效：

```vue
<!-- ❌ 错误：函数 + 独立属性（Element Plus 风格） -->
<div v-infinite-scroll="loadMore" :infinite-scroll-distance="100" />

<!-- ✅ 正确：单一配置对象 -->
<div v-infinite-scroll="{ onLoad: loadMore, distance: 100 }" />
```
:::

## 异步加载与防重复

`onLoad` 支持返回 Promise。由于指令本身不做并发控制，滚动过程中回调可能被连续触发，需要在业务侧用 `disabled` 加锁。

```vue
<template>
  <div
    v-infinite-scroll="{ onLoad: fetchNext, disabled: loading || finished }"
    style="height: 400px"
  >
    <div v-for="row in rows" :key="row.id">{{ row.name }}</div>

    <div v-if="loading" class="tip">加载中…</div>
    <div v-else-if="finished" class="tip">没有更多了</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vInfiniteScroll } from 'along-ui'

interface Row {
  id: number
  name: string
}

const rows = ref<Row[]>([])
const page = ref(0)
const loading = ref(false)
const finished = ref(false)

async function fetchNext() {
  if (loading.value || finished.value) return

  loading.value = true
  try {
    page.value += 1
    const res = await fetch(`/api/rows?page=${page.value}&size=20`)
    const data: Row[] = await res.json()

    rows.value.push(...data)
    if (data.length < 20) finished.value = true
  } finally {
    loading.value = false
  }
}
</script>
```

## 停止加载

把 `disabled` 置为 `true` 即可停止触发，常用于数据加载完毕或页面处于非激活状态。

```vue
<template>
  <div v-infinite-scroll="{ onLoad: loadMore, disabled: finished }" style="height: 300px">
    <!-- ... -->
  </div>
</template>
```

## 指令配置 (InfiniteScrollOptions)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| onLoad | `() => void \| Promise<void>` | — | **必填**，触底时执行的加载回调 |
| distance | `number` | `100` | 触发阈值（px）。当 `scrollHeight - scrollTop - clientHeight <= distance` 时触发 |
| disabled | `boolean` | `false` | 为 `true` 时跳过全部判定，不触发 `onLoad` |

类型定义可直接引入：

```ts
import type { InfiniteScrollOptions } from 'along-ui'

const options: InfiniteScrollOptions = {
  onLoad: () => {},
  distance: 200,
  disabled: false
}
```

## 触发时机

指令在两个时机执行触底判定：

| 生命周期 | 行为 |
|----------|------|
| mounted | 设置 `el.style.overflow = 'auto'`，并监听容器 `scroll` 事件 |
| updated | 组件更新后主动复检一次，用于内容高度变化后继续补足 |

## 注意事项

- **容器必须有高度**：指令只负责设置 `overflow`，不设置高度。没有固定高度或最大高度时容器不会产生滚动，回调永不触发。
- **首屏不主动触发**：`mounted` 阶段不做首次判定。若初始数据不足以撑出滚动条，需要业务侧先手动调用一次加载。
- **需自行防抖/加锁**：回调在滚动事件中同步判定，`onLoad` 未完成时可能被再次调用，务必配合 `disabled` 使用。
- **卸载时监听器未被正确移除**：当前实现的 `unmounted` 钩子传入了新的空函数，无法解除 `mounted` 中注册的匿名监听器。对于频繁创建销毁滚动容器的页面，建议关注后续修复版本。
