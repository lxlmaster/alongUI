# TimePicker 时间选择器

TimePicker 用于选择时间（时:分），支持单选与范围模式。

## 基础用法

```vue
<template>
  <al-time-picker v-model="time" placeholder="选择时间" />
</template>
```

## 时间范围

```vue
<template>
  <al-time-picker v-model="range" is-range />
</template>
```

## 可清空

```vue
<template>
  <al-time-picker v-model="time" clearable />
</template>
```

## TimePicker Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| [string, string]` | `''` | 绑定值，格式 `HH:mm` |
| isRange | `boolean` | `false` | 是否范围选择 |
| placeholder | `string \| [string, string]` | `undefined` | 占位文本，范围模式可传入双占位 |
| disabled | `boolean` | `false` | 是否禁用 |
| clearable | `boolean` | `false` | 是否可清空 |

## TimePicker Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value)` | 选中值变化时触发 |
| change | `(value)` | 选中值变化时触发 |

## 设计说明

- 组件以双列滚动面板展示小时和分钟，选择后自动关闭下拉。
- 不提供秒级别的选择，满足绝大多数业务场景同时保持简洁。
- 范围模式下通过 `is-range` 开启，选择后的起始时间以选中的小时和分钟为准，结束时间需手动调整（当前为简化版本）。
