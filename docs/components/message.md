# Message 消息提示

Message 用于显示轻量级的全局反馈提示，自动消失，不打断用户操作。

## 基础用法

```vue
<template>
  <al-button @click="showMessage">提示消息</al-button>
</template>

<script setup>
import { AlMessage } from 'along-ui'

function showMessage() {
  AlMessage('这是一条消息')
}
</script>
```

## 不同类型

```vue
<script setup>
import { AlMessage } from 'along-ui'

AlMessage.success('成功提示')
AlMessage.warning('警告提示')
AlMessage.error('错误提示')
AlMessage.info('信息提示')
</script>
```

## Message Options

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| message | `string` | `''` | 消息内容 |
| type | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` | 消息类型 |
| duration | `number` | `3000` | 显示时长（ms），设为 0 则不会自动关闭 |
| showClose | `boolean` | `false` | 是否显示关闭按钮 |
| center | `boolean` | `false` | 文字是否居中 |
| onClose | `() => void` | `undefined` | 关闭时的回调 |

## 设计说明

- 消息从视口顶部进入，使用 translateY 动画，避免引起布局抖动。
- 多条消息垂直堆叠，间距固定为 16px。
- 自动关闭时长为 3 秒，错误消息建议设置为更长时间或手动关闭。
- 不提供 HTML 内容支持，保持 API 简洁和安全性。
