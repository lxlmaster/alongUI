# Popover 弹出框

Popover 用于在触发元素附近展示详细的附加信息，支持自定义内容和交互。

## 基础用法

```vue
<template>
  <al-popover content="这是一段提示信息">
    <al-button>悬停查看</al-button>
  </al-popover>
</template>
```

## 点击触发

```vue
<template>
  <al-popover trigger="click" title="详情">
    <al-button>点击查看</al-button>
    <template #content>
      <p>这里是详情内容</p>
      <al-button size="small">确认</al-button>
    </template>
  </al-popover>
</template>
```

## Popover Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `undefined` | 弹出框标题 |
| content | `string` | `undefined` | 弹出框内容 |
| trigger | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | 触发方式 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'bottom'` | 弹出位置 |
| width | `string \| number` | `'150px'` | 弹出框宽度 |
| disabled | `boolean` | `false` | 是否禁用 |
| showArrow | `boolean` | `true` | 是否显示箭头 |
| popperClass | `string` | `''` | 自定义 popper 类名 |

## Popover Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| show | `()` | 弹出框显示时触发 |
| hide | `()` | 弹出框隐藏时触发 |

## Popover Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发元素 |
| title | 自定义标题区域 |
| content | 自定义内容区域 |

## 设计说明

- Popover 与 Tooltip 的区别：Popover 可承载更多内容（文字、图片、表单），支持标题和交互。
- 默认宽度 150px，可通过 `width` prop 调整。
- `manual` 触发模式完全由外部控制显示/隐藏，适用于复杂交互场景。
