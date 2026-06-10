# Divider 分割线

Divider 用于分隔内容区块，使页面层级更清晰。

## 基础用法

```vue
<template>
  <p>上方内容</p>
  <al-divider />
  <p>下方内容</p>
</template>
```

## 带文字分割线

```vue
<template>
  <al-divider>默认居中</al-divider>
  <al-divider content-position="left">居左</al-divider>
  <al-divider content-position="right">居右</al-divider>
</template>
```

## Divider Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 分割线方向 |
| contentPosition | `'left' \| 'center' \| 'right'` | `'center'` | 文字内容位置 |
| borderStyle | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | 边框样式 |
| color | `string` | `undefined` | 分割线颜色 |

## Divider Slots

| 插槽名 | 说明 |
|--------|------|
| default | 分割线中间的文字或自定义内容 |

## 设计说明

- 水平分割线使用 `border-bottom` 实现，垂直分割线使用 `border-left` 实现，避免额外的容器嵌套。
- 带文字时左右两段线通过伪元素配合 Flexbox 实现，默认居中。
- 垂直分割线主要用于行内元素之间，高度默认跟随父元素。
