# Drawer 抽屉

从屏幕边缘滑入的面板，用于承载详情、编辑表单等辅助内容。

## 基础用法

```vue
<template>
  <al-button @click="drawerVisible = true">打开抽屉</al-button>
  <al-drawer v-model="drawerVisible" title="详情">
    <div>抽屉内容</div>
  </al-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const drawerVisible = ref(false)
</script>
```

## 方向

```vue
<al-drawer v-model="visible1" title="从右" direction="rtl" />
<al-drawer v-model="visible2" title="从左" direction="ltr" />
<al-drawer v-model="visible3" title="从上" direction="ttb" />
<al-drawer v-model="visible4" title="从下" direction="btt" />
```

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `boolean` | — | 显示/隐藏（v-model） |
| title | `string` | — | 标题 |
| direction | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` | `'rtl'` | 滑入方向 |
| size | `string \| number` | `'30%'` | 宽度或高度 |
| withHeader | `boolean` | `true` | 显示标题栏 |
| closeOnClickModal | `boolean` | `true` | 点击遮罩关闭 |
| destroyOnClose | `boolean` | `false` | 关闭销毁内容 |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 抽屉内容 |
| header | 自定义标题栏 |
| footer | 底部操作区 |

## 设计说明

- 右侧抽屉是默认方向，符合用户从右向左浏览的视觉动线
- 遮罩层锁定背景滚动，防止抽屉打开时页面滚动
- 禁用状态下 Drawer 不应打开
