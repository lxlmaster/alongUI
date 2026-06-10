# Radio 单选框

Radio 用于单选场景，支持独立使用与 RadioGroup 组合。

## 基础用法

```vue
<template>
  <al-radio v-model="value" label="A">选项 A</al-radio>
  <al-radio v-model="value" label="B">选项 B</al-radio>
</template>
```

## 分组

```vue
<template>
  <al-radio-group v-model="selected">
    <al-radio label="周一">周一</al-radio>
    <al-radio label="周二">周二</al-radio>
    <al-radio label="周三">周三</al-radio>
  </al-radio-group>
</template>
```

## 禁用

```vue
<template>
  <al-radio v-model="value" label="X" disabled>不可选</al-radio>
  <al-radio-group v-model="value" disabled>
    <al-radio label="A">全组禁用</al-radio>
    <al-radio label="B">全组禁用</al-radio>
  </al-radio-group>
</template>
```

## Radio Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| number \| boolean` | `''` | 独立使用时绑定选中值 |
| label | `string \| number \| boolean` | `undefined` | 单选框标识值，选中时作为 modelValue |
| disabled | `boolean` | `false` | 是否禁用 |

## Radio Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value)` | 选中值变化时触发 |
| change | `(value)` | 选中值变化时触发 |

## RadioGroup Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| number \| boolean` | `''` | 选中的 label 值 |
| disabled | `boolean` | `false` | 是否禁用所有子 Radio |
| size | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸 |

## RadioGroup Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value)` | 选中值变化时触发 |
| change | `(value)` | 选中值变化时触发 |

## 设计说明

- 独立使用时通过 modelValue 与 label 的比较决定选中态；分组模式下由 RadioGroup 统一管理。
- 选中指示圆点使用纯 CSS 绘制，无额外依赖。
- 支持单选框单独禁用和整组禁用两种粒度。
