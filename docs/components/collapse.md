# Collapse 折叠面板

Collapse 用于在有限空间内组织分组内容，适合 FAQ、筛选配置和分段信息。

## 基础用法

```vue
<template>
  <al-collapse v-model="activeNames">
    <al-collapse-item name="base" title="基础信息">
      内容区域
    </al-collapse-item>
  </al-collapse>
</template>
```

## 常见状态

```vue
<template>
  <al-collapse v-model="activeNames" accordion>
    <al-collapse-item name="design" title="设计规范" disabled />
    <al-collapse-item name="token" title="主题变量" />
  </al-collapse>
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| string[]` | `[]` | 当前展开项 |
| accordion | `boolean` | `false` | 是否开启手风琴模式 |
| border | `boolean` | `true` | 是否显示边框分隔 |

## 最小示例

```vue
<script setup>
import { ref } from 'vue'

const activeNames = ref(['base'])
</script>

<template>
  <al-collapse v-model="activeNames">
    <al-collapse-item name="base" title="基础信息">
      内容区域
    </al-collapse-item>
  </al-collapse>
</template>
```
