# Spacer 弹性撑开

Spacer 在 Flexbox 布局中自动占据剩余空间，将两侧元素推向两端。

## 基础用法

```vue
<template>
  <div style="display: flex; width: 300px">
    <span>左</span>
    <al-spacer />
    <span>右</span>
  </div>
</template>
```

## 多个撑开

```vue
<template>
  <div style="display: flex; width: 100%">
    <span>左</span>
    <al-spacer />
    <span>中</span>
    <al-spacer />
    <span>右</span>
  </div>
</template>
```

## Spacer Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| tag | `string` | `'span'` | 渲染的 HTML 标签 |

## 设计说明

- 本质是 `flex: 1` 的语法糖组件，减少在模板中重复写内联样式。
- 仅在 Flexbox 容器中生效，多个 Spacer 按比例平分剩余空间。
- 渲染为 `span` 元素，不引入多余盒模型属性，不影响布局计算。
