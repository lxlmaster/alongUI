# Grid 网格

Grid 提供 24 列的栅格布局系统，支持响应式断点，用于页面的灵活排版。

## 基础用法

```vue
<template>
  <al-row :gutter="16">
    <al-col :span="12">占据 12 列</al-col>
    <al-col :span="12">占据 12 列</al-col>
  </al-row>
</template>
```

## 偏移

```vue
<template>
  <al-row>
    <al-col :span="6" :offset="6">偏移 6 列</al-col>
  </al-row>
</template>
```

## Row Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| gutter | `number` | `0` | 栅格间隔（px） |
| justify | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` | 水平对齐方式 |
| align | `'top' \| 'middle' \| 'bottom'` | `'top'` | 垂直对齐方式 |
| tag | `string` | `'div'` | 自定义元素标签 |

## Col Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| span | `number` | `24` | 栅格占据的列数 |
| offset | `number` | `0` | 栅格左侧间隔列数 |
| push | `number` | `0` | 向右移动列数 |
| pull | `number` | `0` | 向左移动列数 |
| xs | `number \| { span, offset }` | `undefined` | `< 768px` 响应式列数 |
| sm | `number \| { span, offset }` | `undefined` | `>= 768px` 响应式列数 |
| md | `number \| { span, offset }` | `undefined` | `>= 992px` 响应式列数 |
| lg | `number \| { span, offset }` | `undefined` | `>= 1200px` 响应式列数 |
| xl | `number \| { span, offset }` | `undefined` | `>= 1920px` 响应式列数 |

## Col Slots

| 插槽名 | 说明 |
|--------|------|
| default | 列内容 |

## 设计说明

- 基于 CSS Flexbox 实现，`Row` 为 flex 容器，`Col` 通过 flex-basis 计算宽度。
- gutter 间隔通过负 margin + padding 实现，避免破坏嵌套布局。
- 响应式断点与主流 UI 库对齐，xs / sm / md / lg / xl 覆盖从手机到大屏场景。
