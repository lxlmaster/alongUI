# MessageBox 弹框

MessageBox 用于模态弹框形式的确认、提示和输入，比 Message 具有更强的交互性。

## 基础用法

```vue
<template>
  <al-button @click="handleConfirm">删除确认</al-button>
</template>

<script setup>
import { ElMessageBox } from 'along-ui'

async function handleConfirm() {
  try {
    await ElMessageBox.confirm('确定删除此条记录？', '提示')
    // 用户点击确认
  } catch {
    // 用户点击取消
  }
}
</script>
```

## 三种快捷方法

```vue
<script setup>
import { ElMessageBox } from 'along-ui'

// alert — 信息提示
ElMessageBox.alert('操作成功', '提示')

// confirm — 确认/取消
ElMessageBox.confirm('确定提交？', '确认')

// prompt — 输入内容
const value = await ElMessageBox.prompt('请输入名称', '提示')
</script>
```

## MessageBox Options

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `''` | 弹框标题 |
| message | `string` | `''` | 弹框内容 |
| type | `'success' \| 'warning' \| 'error' \| 'info'` | `undefined` | 图标类型 |
| confirmButtonText | `string` | `'确定'` | 确认按钮文字 |
| cancelButtonText | `string` | `'取消'` | 取消按钮文字 |
| showCancelButton | `boolean` | `true` | 是否显示取消按钮 |
| showClose | `boolean` | `true` | 是否显示关闭按钮 |
| closeOnClickModal | `boolean` | `true` | 点击遮罩是否关闭 |
| inputValue | `string` | `''` | prompt 模式初始值 |
| inputPlaceholder | `string` | `''` | prompt 输入框占位 |
| inputValidator | `(value: string) => boolean \| string` | `undefined` | prompt 校验函数 |

## 设计说明

- 使用 `ElMessageBox.confirm()` / `.alert()` / `.prompt()` 函数式调用，返回 Promise。
- 用户点击确认时 resolve，点击取消或关闭时 reject，通过 `try/catch` 区分两种结果。
- 内部复用 Dialog 组件的样式和动画，保持一致视觉体验。
- prompt 模式提供输入校验，校验失败时确认按钮不可点击或显示错误提示。
