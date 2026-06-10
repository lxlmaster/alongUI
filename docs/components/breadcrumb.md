# Breadcrumb 面包屑

Breadcrumb 展示当前页面在系统层级结构中的位置，帮助用户导航和回溯。

## 基础用法

```vue
<template>
  <al-breadcrumb>
    <al-breadcrumb-item to="/">首页</al-breadcrumb-item>
    <al-breadcrumb-item to="/docs">文档</al-breadcrumb-item>
    <al-breadcrumb-item>组件</al-breadcrumb-item>
  </al-breadcrumb>
</template>
```

## 自定义分隔符

```vue
<template>
  <al-breadcrumb separator="—">
    <al-breadcrumb-item to="/">首页</al-breadcrumb-item>
    <al-breadcrumb-item to="/docs">文档</al-breadcrumb-item>
  </al-breadcrumb>
</template>
```

## Breadcrumb Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| separator | `string` | `'/'` | 分隔符字符 |
| separatorIcon | `Component` | `undefined` | 分隔符图标，优先级高于 `separator` |

## Breadcrumb Slots

| 插槽名 | 说明 |
|--------|------|
| default | `BreadcrumbItem` 子项 |

## BreadcrumbItem Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| to | `string \| Location` | `undefined` | 路由跳转目标，传入后该节点可点击 |
| replace | `boolean` | `false` | 是否使用 `replace` 方式跳转 |

## BreadcrumbItem Slots

| 插槽名 | 说明 |
|--------|------|
| default | 节点文字内容 |

## 设计说明

- 最末一项（当前页面）自动置为不可点击的纯文本，降低视觉权重。
- 分隔符统一使用浅灰（`--al-text-color-placeholder`），不干扰层级阅读。
- 仅提供字符和图标两种分隔符形式，不引入多余的装饰元素。
