# ColorPicker 颜色选择器

ColorPicker 用于选取颜色值，支持饱和度和色相面板调节，可选透明度与预置色。

## 基础用法

```vue
<template>
  <al-color-picker v-model="color" />
</template>

<script setup>
const color = ref('#1D1D1F')
</script>
```

## 透明度与预置色

```vue
<template>
  <al-color-picker v-model="color" show-alpha />
  <al-color-picker
    v-model="color"
    :predefine="['#1D1D1F', '#007AFF', '#34C759', '#FF3B30', '#FF9500']"
  />
</template>
```

## 禁用

```vue
<template>
  <al-color-picker v-model="color" disabled />
</template>
```

## ColorPicker Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string` | `'#1D1D1F'` | 绑定颜色值，Hex 格式 |
| disabled | `boolean` | `false` | 是否禁用 |
| showAlpha | `boolean` | `false` | 是否显示透明度滑块 |
| predefine | `string[]` | `undefined` | 预置颜色列表，显示在面板底部 |

## ColorPicker Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(color: string)` | 颜色变化时触发 |
| change | `(color: string)` | 颜色变化时触发 |

## 设计说明

- 面板包含饱和度和色相两个调节区域，透明度滑块在 `showAlpha` 开启后显示。
- 选色过程中实时更新触发器中的颜色预览，鼠标松开后提交值。
- Hex 格式输出，包含透明度时追加 8 位 Hex（如 `#1D1D1FFF`）。
- 预置色点击后立即选中并提交，无需额外确认操作。
- 默认颜色值使用品牌黑色 `#1D1D1F`，与 Apple 风格一致。
