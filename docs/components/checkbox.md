# Checkbox 复选框

Checkbox 用于多选场景，支持独立使用与 CheckboxGroup 组合。

## 基础用法

```vue
<template>
  <al-checkbox v-model="checked">记住登录状态</al-checkbox>
</template>
```

## 分组

```vue
<template>
  <al-checkbox-group v-model="selected">
    <al-checkbox label="A">选项 A</al-checkbox>
    <al-checkbox label="B">选项 B</al-checkbox>
    <al-checkbox label="C">选项 C</al-checkbox>
  </al-checkbox-group>
</template>
```

## 半选与禁用

```vue
<template>
  <al-checkbox v-model="allChecked" indeterminate>全选</al-checkbox>
  <al-checkbox v-model="checked" disabled>已禁用</al-checkbox>
</template>
```

## Checkbox Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| number \| boolean` | `false` | 独立使用时绑定选中状态 |
| label | `string \| number \| boolean` | `undefined` | 分组模式下标识值，同时也是默认文本 |
| indeterminate | `boolean` | `false` | 是否半选状态 |
| disabled | `boolean` | `false` | 是否禁用 |

## Checkbox Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value)` | 选中状态变化时触发 |
| change | `(value)` | 选中状态变化时触发 |

## CheckboxGroup Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `(string \| number \| boolean)[]` | `[]` | 选中的 label 值集合 |
| disabled | `boolean` | `false` | 是否禁用所有子 Checkbox |
| size | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸 |

## CheckboxGroup Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value[])` | 选中项变化时触发 |
| change | `(value[])` | 选中项变化时触发 |

## 设计说明

- 独立使用时 modelValue 为 boolean，分组模式下由 Group 管理选中数组。
- 半选状态通过 `indeterminate` 控制，视觉上区分于全选。
- 选中标记使用纯 CSS 绘制对勾，不依赖图标字体。
- 禁用态统一降低 opacity，保持整体一致性。
