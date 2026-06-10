# Container 容器布局

Container 用于搭建页面的整体骨架，包含 Header、Aside、Main、Footer 四个子组件。

## 基础用法

```vue
<template>
  <al-container>
    <al-header>顶部</al-header>
    <al-main>主体内容</al-main>
    <al-footer>底部</al-footer>
  </al-container>
</template>
```

## 侧边栏布局

```vue
<template>
  <al-container>
    <al-aside width="200px">侧边栏</al-aside>
    <al-container>
      <al-header>顶部</al-header>
      <al-main>主体内容</al-main>
    </al-container>
  </al-container>
</template>
```

## Container Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | `'horizontal' \| 'vertical'` | `undefined` | 子元素排列方向，未设置时自动判断 |

## Header Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| height | `string` | `'60px'` | 头部高度 |

## Aside Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| width | `string` | `'200px'` | 侧边栏宽度 |

## Main Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| tag | `string` | `'main'` | 渲染的 HTML 标签 |

## Footer Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| height | `string` | `'60px'` | 底部高度 |

## Slots

| 组件 | 插槽名 | 说明 |
|------|--------|------|
| Container | default | 布局子元素 |
| Header / Aside / Main / Footer | default | 各自区域内容 |

## 设计说明

- Container 默认使用 Flexbox 布局，子元素中有 Aside 时自动切换为水平方向。
- Header、Footer 默认高度 60px，Aside 默认宽度 200px，可通过 prop 覆盖。
- 不预设背景色或边框，由使用者通过样式系统自行定义。
