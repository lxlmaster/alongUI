# Slider 滑块

Slider 用于通过拖拽或键盘在数值范围内进行选择。

## 基础用法

```vue
<template>
  <al-slider v-model="value" :min="0" :max="100" />
</template>
```

## 禁用

```vue
<template>
  <al-slider v-model="value" disabled />
</template>
```

## Slider Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `number` | `0` | 绑定值 |
| min | `number` | `0` | 最小值 |
| max | `number` | `100` | 最大值 |
| step | `number` | `1` | 步长 |
| disabled | `boolean` | `false` | 是否禁用 |
| showTooltip | `boolean` | `true` | 拖拽时是否显示数值提示 |

## Slider Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value: number)` | 拖拽或键盘操作时连续触发 |
| change | `(value: number)` | 鼠标松开时触发最终值 |

## 设计说明

- 拖拽过程中实时触发 `update:modelValue`，仅在鼠标松开时触发 `change` —— 适合与即时预览配合使用。
- 支持键盘左右键 / 上下键按 step 微调。
- 当 `max - min <= 20` 时自动显示刻度标记线。
- 轨道背景用浅灰色，已选范围使用黑色填充。
