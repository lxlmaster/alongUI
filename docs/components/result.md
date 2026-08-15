# Result 结果页

## 简介

Result 用于对用户的一次操作或一次页面访问给出结果反馈，并提供后续操作入口。常见于表单提交完成页、支付结果页，以及 403 / 404 / 500 等异常兜底页。

组件内置 7 种状态的矢量插图，无需额外引入图标资源。

## 基础用法

`status` 决定内置插图，`title` 与 `sub-title` 分别是主副标题。两者为空字符串时对应节点不渲染。

```vue
<template>
  <al-result
    status="success"
    title="提交成功"
    sub-title="我们会在 1 个工作日内处理您的请求"
  />
</template>
```

## 结果状态

支持 `success`、`error`、`warning`、`info` 四种操作结果状态，默认 `info`。

```vue
<template>
  <al-result status="success" title="操作成功" sub-title="数据已保存" />
  <al-result status="error" title="操作失败" sub-title="请检查网络后重试" />
  <al-result status="warning" title="存在风险" sub-title="部分字段未通过校验" />
  <al-result status="info" title="等待处理" sub-title="您的工单已进入队列" />
</template>
```

## 异常页

`status` 额外支持 `403`、`404`、`500` 三种 HTTP 异常状态，可直接作为路由兜底页。

```vue
<template>
  <al-result status="404" title="404" sub-title="抱歉，你访问的页面不存在">
    <template #extra>
      <al-button type="primary" @click="router.push('/')">返回首页</al-button>
    </template>
  </al-result>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
```

```vue
<template>
  <al-result status="403" title="403" sub-title="抱歉，你无权访问该页面" />
  <al-result status="500" title="500" sub-title="服务器出错了，请稍后再试" />
</template>
```

## 带操作区

`extra` 插槽用于放置后续操作按钮，内部为 `flex` 居中布局并带 12px 间距。

```vue
<template>
  <al-result status="success" title="订单提交成功" sub-title="订单号 2026081500123">
    <template #extra>
      <al-button type="primary">查看订单</al-button>
      <al-button>返回列表</al-button>
    </template>
  </al-result>
</template>
```

默认插槽同样会渲染到操作区（作为 `extra` 的回退内容），因此简单场景可以省略 `template`：

```vue
<template>
  <al-result status="success" title="提交成功">
    <al-button type="primary">继续操作</al-button>
  </al-result>
</template>
```

::: tip
`extra` 与默认插槽是「二选一」关系：一旦提供了 `extra`，默认插槽的内容不会被渲染。
:::

## 自定义图标

用 `icon` 插槽完全替换内置插图。插图容器固定 64×64，内部 `svg` 会被拉伸至 100%。

```vue
<template>
  <al-result title="邮件已发送" sub-title="请前往邮箱完成验证">
    <template #icon>
      <img src="/illustration/mail.svg" width="64" height="64" alt="" />
    </template>
    <template #extra>
      <al-button type="primary">重新发送</al-button>
    </template>
  </al-result>
</template>
```

## Result Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| status | `'success' \| 'error' \| 'warning' \| 'info' \| '403' \| '404' \| '500'` | `'info'` | 结果状态，决定内置插图与根元素 `al-result--{status}` 类名。传入未知值时回退到 `info` 插图 |
| title | `string` | `''` | 主标题，为空时不渲染标题节点 |
| subTitle | `string` | `''` | 副标题，为空时不渲染副标题节点 |
| icon | `string \| Record<string, any>` | `undefined` | 自定义图标。**当前版本模板尚未消费该 prop，请使用 `icon` 插槽代替** |

`status` 的合法值同时以常量数组导出，可用于类型约束：

```ts
import { resultStatuses, type ResultStatus } from 'along-ui'

// resultStatuses: ['success', 'error', 'warning', 'info', '403', '404', '500']
const status: ResultStatus = '404'
```

## Result Events

Result 是纯展示组件，不派发任何自定义事件。操作反馈请绑定在 `extra` 插槽内的按钮上。

## Result Slots

| 插槽名 | 说明 |
|--------|------|
| icon | 自定义结果插图，替换内置 SVG |
| extra | 操作区内容，通常放置 1～2 个按钮 |
| default | 操作区的回退内容，仅在未提供 `extra` 时渲染 |

## 设计说明

- 整体为纵向居中布局，内边距 `48px 32px`，适合独立成页；嵌入卡片时建议由外层容器控制留白。
- 主标题 20px / 600 字重，副标题 14px 并使用 `--al-text-color-secondary`。
- 内置插图色值与全局状态色一致：成功 `#30d158`、失败 `#ff453a`、警告 `#ff9f0a`、信息 `#007aff`，`404` 使用中性灰 `#86868b`。
