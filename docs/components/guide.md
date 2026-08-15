# Guide 引导

## 简介

Guide 是分步新手引导组件：用聚光灯高亮页面上的目标元素，并在其旁边展示说明卡片，引导用户逐步完成首次上手。

组件通过 `Teleport` 渲染到 `body`，`v-model` 绑定的是**当前步骤索引**（数字），而不是显示开关。

## 基础用法

`steps` 为必填项。每一步用 `selector` 指定要高亮的元素，`v-model` 双向绑定当前步骤序号。

```vue
<template>
  <div>
    <al-button id="guide-create">新建</al-button>
    <al-button id="guide-filter">筛选</al-button>

    <al-guide
      v-if="running"
      v-model="current"
      :steps="steps"
      @finish="running = false"
      @close="running = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GuideStep } from 'along-ui'

const running = ref(true)
const current = ref(0)

const steps: GuideStep[] = [
  { selector: '#guide-create', title: '新建数据', content: '点击这里创建一条新记录。' },
  { selector: '#guide-filter', title: '筛选数据', content: '在这里按条件过滤列表。' }
]
</script>
```

::: tip 关于显示与关闭
组件挂载后会立即显示，内部不接受「是否可见」的 prop。请用 `v-if` 控制引导的启动与结束，并在 `finish` / `close` 事件里把开关置为 `false`。
:::

## 卡片位置

每一步可用 `placement` 指定说明卡片相对高亮元素的方位，默认 `bottom`。

```vue
<script setup lang="ts">
import type { GuideStep } from 'along-ui'

const steps: GuideStep[] = [
  { selector: '#el-a', title: '在下方', content: '默认方位', placement: 'bottom' },
  { selector: '#el-b', title: '在上方', content: '空间不足时可上移', placement: 'top' },
  { selector: '#el-c', title: '在左侧', content: '适合右侧栏元素', placement: 'left' },
  { selector: '#el-d', title: '在右侧', content: '适合左侧栏元素', placement: 'right' }
]
</script>
```

## 居中步骤

省略 `selector` 时该步骤没有高亮目标，卡片以居中弹窗形式展示，适合作为引导的开场与收尾。

```vue
<template>
  <al-guide v-if="running" v-model="current" :steps="steps" @finish="running = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GuideStep } from 'along-ui'

const running = ref(true)
const current = ref(0)

const steps: GuideStep[] = [
  { title: '欢迎使用 alongUI 控制台', content: '用 30 秒了解核心功能。' },
  { selector: '#guide-create', title: '新建数据', content: '点击这里创建记录。' },
  { title: '开始使用吧', content: '随时可在右上角帮助菜单中重看引导。' }
]
</script>
```

::: warning
居中步骤（无 `selector`）不会渲染遮罩层，只渲染居中卡片。若需要开场即有背景压暗，请给第一步也指定一个 `selector`。
:::

## 自定义文案与按钮

`next-label`、`prev-label`、`done-label` 分别控制下一步、上一步与最后一步的按钮文案。`closeable` 控制是否显示「跳过」按钮以及是否允许点击遮罩外区域关闭。

```vue
<template>
  <al-guide
    v-if="running"
    v-model="current"
    :steps="steps"
    next-label="继续"
    prev-label="返回"
    done-label="我知道了"
    :closeable="false"
    @finish="running = false"
  />
</template>
```

## 遮罩与滚动

```vue
<template>
  <al-guide
    v-if="running"
    v-model="current"
    :steps="steps"
    :show-mask="true"
    mask-color="rgba(0, 0, 0, 0.7)"
    :scroll-to-step="true"
    @finish="running = false"
  />
</template>
```

## 步骤钩子

`beforeEnter` 在进入某步之前执行，`beforeLeave` 在离开当前步之前执行，均支持异步。常用于在高亮前先展开面板、切换 Tab 或加载数据。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { GuideStep } from 'along-ui'

const panelOpen = ref(false)

const steps: GuideStep[] = [
  { selector: '#toolbar', title: '工具栏', content: '常用操作都在这里。' },
  {
    selector: '#advanced-panel',
    title: '高级设置',
    content: '这里可以配置数据源。',
    // 进入这一步前先把面板展开，否则目标元素不存在
    beforeEnter: async () => {
      panelOpen.value = true
      await new Promise((resolve) => setTimeout(resolve, 300))
    },
    beforeLeave: () => {
      panelOpen.value = false
    }
  }
]
</script>
```

## 监听步骤变化

```vue
<template>
  <al-guide
    v-if="running"
    v-model="current"
    :steps="steps"
    @change="onChange"
    @finish="onFinish"
    @close="onClose"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const running = ref(true)
const current = ref(0)

function onChange(index: number) {
  console.log('进入第', index + 1, '步')
}

function onFinish() {
  running.value = false
  localStorage.setItem('guide-done', '1')
}

function onClose() {
  running.value = false
}
</script>
```

## GuideStep 结构

```ts
interface GuideStep {
  /** 卡片标题 */
  title: string
  /** 卡片正文 */
  content: string
  /** 高亮目标的 CSS 选择器，省略则为居中卡片 */
  selector?: string
  /** 卡片相对目标元素的方位，默认 'bottom' */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  /** 进入该步骤前的钩子，支持异步 */
  beforeEnter?: () => void | Promise<void>
  /** 离开该步骤前的钩子，支持异步 */
  beforeLeave?: () => void | Promise<void>
}
```

## Guide Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| steps | `GuideStep[]` | — | **必填**，引导步骤数组 |
| modelValue | `number` | `0` | 当前步骤索引（从 0 开始），配合 `v-model` 使用 |
| showMask | `boolean` | `true` | 是否显示遮罩层（仅对有 `selector` 的步骤生效） |
| maskColor | `string` | `'rgba(0, 0, 0, 0.5)'` | 遮罩层颜色 |
| scrollToStep | `boolean` | `true` | 切换步骤时是否平滑滚动，使目标元素居中可见 |
| nextLabel | `string` | `'下一步'` | 下一步按钮文案 |
| prevLabel | `string` | `'上一步'` | 上一步按钮文案（仅第二步起显示） |
| doneLabel | `string` | `'完成'` | 最后一步的按钮文案 |
| closeable | `boolean` | `true` | 是否可跳过：显示「跳过」按钮，并允许点击引导层空白处关闭 |

## Guide Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(index: number)` | 当前步骤索引变化时触发，供 `v-model` 使用 |
| change | `(index: number)` | 切换到新步骤时触发，与 `update:modelValue` 同时派发 |
| finish | `()` | 在最后一步点击完成按钮时触发，引导正常走完 |
| close | `()` | 点击「跳过」或点击引导层空白处关闭时触发（`closeable` 为 `false` 时不触发） |

## Guide Slots

当前版本卡片结构（步骤指示器 / 标题 / 正文 / 按钮组）为内置实现，不提供插槽。自定义内容请通过 `title`、`content` 与文案类 Props 配置。

## 注意事项

- **目标元素必须已存在于 DOM 中**：定位依赖 `document.querySelector` + `getBoundingClientRect`。若元素在 `v-if` 内尚未渲染，请用 `beforeEnter` 先让它出现。
- **步骤指示器文案固定**：卡片顶部显示「第 N / M 步」，「跳过」按钮文案同样是内置中文，暂不支持国际化配置。
- **`placement: 'center'` 暂未单独实现**：传入 `center` 时会按 `bottom` 定位。需要居中展示请省略该步骤的 `selector`。
- **`maskColor` 不影响聚光灯挖孔的压暗色**：挖孔效果由样式变量 `--al-guide-mask-color`（默认 `rgba(0, 0, 0, 0.5)`）控制，如需整体统一，请同时覆盖该 CSS 变量：

  ```css
  :root {
    --al-guide-mask-color: rgba(0, 0, 0, 0.7);
  }
  ```

- **层级**：引导层 `z-index` 从 `10000` 起（遮罩 10000 / 聚光灯 10001 / 卡片 10002），高于组件库内置的 `--al-z-index-notification`（7000），可覆盖在弹窗与通知之上。
