# BackTop 回到顶部

BackTop 提供一个快速返回页面顶部的按钮，在长页面中提升导航效率。

## 基础用法

```vue
<template>
  <al-backtop />
</template>
```

## 自定义内容

```vue
<template>
  <al-backtop :bottom="80">
    <al-button>顶部</al-button>
  </al-backtop>
</template>
```

## BackTop Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visibilityHeight | `number` | `200` | 滚动高度超过此值（px）时显示按钮 |
| bottom | `number` | `40` | 按钮距离底部距离（px） |
| right | `number` | `40` | 按钮距离右侧距离（px） |
| duration | `number` | `300` | 滚动到顶部的动画时长（ms） |

## BackTop Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | `(event: MouseEvent)` | 点击按钮时触发 |

## BackTop Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义按钮内容，未传入时使用默认向上箭头图标 |

## 设计说明

- 监听目标容器的 `scroll` 事件，默认监听 `window`。
- 滚动过程中按钮不显示，减少视觉干扰。
- 使用 `requestAnimationFrame` 实现平滑滚动返回顶部。
