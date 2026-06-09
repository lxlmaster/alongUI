# Button 按钮

用于触发即时操作，是 alongUI 的首个组件模板。

## 基础用法

```vue
<template>
  <al-button>默认按钮</al-button>
  <al-button type="primary">主要按钮</al-button>
</template>
```

## 尺寸

```vue
<template>
  <al-button size="small">小按钮</al-button>
  <al-button>默认尺寸</al-button>
  <al-button size="large">大按钮</al-button>
</template>
```

## 状态

```vue
<template>
  <al-button loading>加载中</al-button>
  <al-button disabled>禁用按钮</al-button>
</template>
```

## Button Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` | 按钮类型 |
| size | `'large' \| 'default' \| 'small'` | `'default'` | 按钮尺寸 |
| plain | `boolean` | `false` | 是否朴素按钮 |
| round | `boolean` | `false` | 是否圆角按钮 |
| circle | `boolean` | `false` | 是否圆形按钮 |
| loading | `boolean` | `false` | 是否加载中 |
| disabled | `boolean` | `false` | 是否禁用 |
| icon | `Component` | `undefined` | 图标组件 |
| nativeType | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |
| autofocus | `boolean` | `false` | 是否自动聚焦 |

## Button Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | `(event: MouseEvent)` | 点击按钮时触发，禁用和加载状态不会触发 |

## Button Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |
| icon | 自定义图标 |

## 与 Element Plus 差异

- 保持 `type`、`size`、`loading`、`disabled`、`nativeType` 等核心使用心智一致。
- 当前阶段先实现按钮基础能力，后续再补充更完整的图标体系与自动按需解析器。

