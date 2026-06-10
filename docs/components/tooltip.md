# Tooltip 文字提示

Tooltip 用于解释按钮、图标或紧凑控件的含义。

## 基础用法

```vue
<template>
  <al-tooltip content="保存当前配置">
    <al-button>保存</al-button>
  </al-tooltip>
</template>
```

## 触发方式

```vue
<template>
  <al-tooltip content="点击切换" trigger="click" placement="right">
    <al-button>点击</al-button>
  </al-tooltip>
</template>
```

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | `string` | `undefined` | 提示内容 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 出现位置 |
| trigger | `'hover' \| 'click' \| 'focus'` | `'hover'` | 触发方式 |
| disabled | `boolean` | `false` | 是否禁用 |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发元素 |
| content | 自定义提示内容 |

## 与 Element Plus 差异

- 当前实现不依赖 Popper，先覆盖基础 hover/click/focus 场景。
- 复杂自动定位、边界翻转和虚拟触发将在后续迭代补充。

