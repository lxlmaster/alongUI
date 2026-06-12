# Notification 通知

Notification 用于系统级别的通知推送，出现在屏幕角落，支持自定义内容和操作。

## 基础用法

```vue
<template>
  <al-button @click="showNotify">显示通知</al-button>
</template>

<script setup>
import { AlNotification } from 'along-ui'

function showNotify() {
  AlNotification('这是一条通知')
}
</script>
```

## 不同类型

```vue
<script setup>
import { AlNotification } from 'along-ui'

AlNotification.success('操作成功')
AlNotification.warning('即将过期')
AlNotification.error('系统异常')
AlNotification.info('新消息提醒')
</script>
```

## Notification Options

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `''` | 通知标题 |
| message | `string` | `''` | 通知正文 |
| type | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` | 通知类型 |
| duration | `number` | `4500` | 显示时长（ms），设为 0 则不会自动关闭 |
| position | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | 出现位置 |
| showClose | `boolean` | `true` | 是否显示关闭按钮 |
| dangerouslyUseHTMLString | `boolean` | `false` | 是否将 message 作为 HTML 渲染 |
| onClose | `() => void` | `undefined` | 关闭时的回调 |
| onClick | `() => void` | `undefined` | 点击通知时的回调 |

## 设计说明

- 通知默认出现于屏幕右上角，位置可配置为四个角落之一。
- 显示时长默认 4.5 秒，比 Message 更长，因为通知内容通常更重要。
- 支持 `dangerouslyUseHTMLString` 渲染富文本，使用时需确保内容安全可控，防止 XSS。
- 多条通知堆叠显示，超出屏幕高度时自动折叠较早的通知。
