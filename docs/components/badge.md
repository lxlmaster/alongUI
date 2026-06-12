# Badge 徽标

Badge 用于提示数量、状态或新消息，通常附着在按钮、头像和导航项上。

## 基础用法

```vue
<template>
  <al-badge :value="8">
    <al-button>通知</al-button>
  </al-badge>
</template>
```

## 常见状态

```vue
<template>
  <al-badge is-dot>
    <span>审批中心</span>
  </al-badge>
  <al-badge :value="120" :max="99" type="danger" />
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `string \| number` | `''` | 徽标内容 |
| max | `number` | `99` | 数字最大显示阈值 |
| isDot | `boolean` | `false` | 是否显示小圆点 |
| hidden | `boolean` | `false` | 是否隐藏徽标 |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` | 徽标类型 |

## 最小示例

```vue
<template>
  <al-badge :value="3" type="danger">
    <al-avatar>AL</al-avatar>
  </al-badge>
</template>
```
