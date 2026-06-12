# Link 链接

Link 用于在页面内导航或触发外部跳转，支持文字链接与图标组合。

## 基础用法

```vue
<template>
  <al-link href="https://example.com" target="_blank">访问官网</al-link>
  <al-link type="primary" href="/dashboard">仪表盘</al-link>
</template>
```

## 禁用与图标

```vue
<template>
  <al-link disabled>已禁用链接</al-link>
  <al-link href="#edit" :icon="EditIcon">编辑资料</al-link>
</template>
```

## Link Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| href | `string` | `''` | 跳转链接 |
| target | `string` | `'_self'` | 打开方式 |
| type | `'default' \| 'primary'` | `'default'` | 链接类型 |
| underline | `boolean` | `true` | 是否显示下划线 |
| disabled | `boolean` | `false` | 是否禁用 |
| icon | `Component` | `undefined` | 图标组件，传入后显示在文字左侧 |

## Link Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | `(event: MouseEvent)` | 点击链接时触发，禁用状态不会触发 |

## Link Slots

| 插槽名 | 说明 |
|--------|------|
| default | 链接文字 |
| icon | 自定义图标内容，优先级高于 `icon` prop |

## 设计说明

- 仅提供 `default` 和 `primary` 两种类型，避免层级过度。`primary` 用于需强调的操作入口。
- 禁用态通过 `opacity` 降低视觉权重，不额外改变文本颜色。
- 默认显示下划线以维持可识别性，可传入 `underline={false}` 关闭。
