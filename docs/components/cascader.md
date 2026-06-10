# Cascader 级联选择器

Cascader 用于从树形数据中逐级选择，适合省市区、分类等层级结构。

## 基础用法

```vue
<template>
  <al-cascader
    v-model="value"
    :options="options"
    placeholder="请选择地区"
  />
</template>

<script setup>
const value = ref('')
const options = [
  {
    label: '华东',
    value: 'hd',
    children: [
      { label: '上海', value: 'sh' },
      { label: '杭州', value: 'hz' }
    ]
  },
  {
    label: '华南',
    value: 'hn',
    children: [
      { label: '广州', value: 'gz' },
      { label: '深圳', value: 'sz' }
    ]
  }
]
</script>
```

## 禁用

```vue
<template>
  <al-cascader v-model="value" :options="options" disabled />
</template>
```

## Cascader Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| number` | `''` | 选中值，为叶子节点 value |
| options | `CascaderOption[]` | `[]` | 级联数据，每项含 `label`、`value`、可选 `children` 和 `disabled` |
| disabled | `boolean` | `false` | 是否禁用 |
| placeholder | `string` | `'请选择'` | 占位文本 |

## Cascader Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value)` | 选中叶子节点时触发 |
| change | `(value)` | 选中叶子节点时触发 |

## 设计说明

- 面板逐层展开，点击非叶子节点进入下一级，点选叶子节点确认选中。
- 选中路径以 `label / label` 格式显示在触发器中。
- 仅记录叶子节点 value，不保存中间路径，保持数据简洁。
- 不提供 Element Plus 的多选、搜索等功能，定位为轻量级级联选择。
