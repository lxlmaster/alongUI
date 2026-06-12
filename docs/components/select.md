# Select 选择器

Select 用于从备选项中进行单选或多选，视觉风格与 Input 保持一致。

## 基础用法

```vue
<template>
  <al-select v-model="value" :options="options" placeholder="请选择状态" />
</template>
```

## 多选与折叠标签

```vue
<template>
  <al-select
    v-model="values"
    :options="options"
    multiple
    collapse-tags
    clearable
  />
</template>
```

## 搜索与创建

```vue
<template>
  <al-select
    v-model="value"
    :options="options"
    filterable
    allow-create
    placeholder="搜索或创建选项"
  />
</template>
```

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| number \| Array<string \| number>` | `undefined` | 绑定值 |
| options | `SelectOption[]` | `[]` | 选项列表 |
| multiple | `boolean` | `false` | 是否多选 |
| disabled | `boolean` | `false` | 是否禁用 |
| clearable | `boolean` | `false` | 是否可清空 |
| filterable | `boolean` | `false` | 是否可搜索 |
| allowCreate | `boolean` | `false` | 是否允许创建新项 |
| collapseTags | `boolean` | `false` | 多选时折叠标签 |
| placeholder | `string` | `'请选择'` | 占位文本 |
| loading | `boolean` | `false` | 是否加载中 |
| remote | `boolean` | `false` | 为后续远程搜索预留 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value)` | 选中值变化时触发 |
| change | `(value)` | 选中值变化时触发 |
| visibleChange | `(visible: boolean)` | 下拉面板开关时触发 |

## 视觉规则

- 高度与 Input 保持一致，为 36px。
- 背景必须使用 `#F5F5F7` 对应的 `--al-bg-color-input`。
- 圆角固定为 6px，hover 使用浅灰，不用蓝色边框。
