# Center 居中容器

Center 使其子元素在水平和垂直方向同时居中，等价于 Flexbox 的 `justify-content: center; align-items: center`。

## 基础用法

```vue
<template>
  <al-center style="height: 200px; background: #f5f5f7;">
    居中的内容
  </al-center>
</template>
```

## 嵌套使用

```vue
<template>
  <al-center>
    <div>
      <p>这是居中容器内的第一行</p>
      <al-button type="primary">确认</al-button>
    </div>
  </al-center>
</template>
```

## Center Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | `'horizontal' \| 'vertical' \| 'both'` | `'both'` | 居中方向 |
| tag | `string` | `'div'` | 渲染的 HTML 标签 |

## Center Slots

| 插槽名 | 说明 |
|--------|------|
| default | 需要居中的内容 |

## 设计说明

- 本质是 Flexbox 语法糖，避免在每个组件中重复写三行居中样式。
- 支持仅水平居中（`align-items: stretch`）或仅垂直居中（`justify-content: center; flex-direction: column`）。
- 不会自动设置高度，需由外部容器或父元素约束尺寸。
