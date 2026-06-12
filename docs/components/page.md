# Page 页面框架

Page 提供页面级别的布局骨架，统一内容区域的内边距、标题和操作栏结构。

## 基础用法

```vue
<template>
  <al-page title="用户管理">
    <template #actions>
      <al-button type="primary">新增用户</al-button>
    </template>
    <p>页面内容区域</p>
  </al-page>
</template>
```

## 无标题

```vue
<template>
  <al-page>
    <p>简单的无标题页面</p>
  </al-page>
</template>
```

## Page Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `undefined` | 页面标题 |
| subtitle | `string` | `undefined` | 页面副标题 |
| padding | `string \| number` | `'24px'` | 内边距 |
| loading | `boolean` | `false` | 是否显示加载态 |

## Page Slots

| 插槽名 | 说明 |
|--------|------|
| default | 页面主体内容 |
| header | 自定义标题区域，优先级高于 `title` prop |
| actions | 标题栏右侧的操作区 |

## 设计说明

- 统一页面级内边距为 24px，保持 across-pages 一致性。
- 标题区左侧为标题/副标题，右侧为 `actions` 插槽，使用 Flexbox 两端对齐。
- loading 态表现为内容区域显示骨架屏或加载指示器，标题和操作栏保持可见。
