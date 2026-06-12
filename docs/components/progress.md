# Progress 进度条

Progress 用于反馈任务完成进度，支持线形和环形两种表达方式。

## 基础用法

```vue
<template>
  <al-progress :percentage="68" />
</template>
```

## 常见状态

```vue
<template>
  <al-progress :percentage="100" status="success" />
  <al-progress :percentage="48" type="circle" />
  <al-progress :percentage="76" status="warning" striped />
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| percentage | `number` | `0` | 当前进度百分比 |
| type | `'line' \| 'circle'` | `'line'` | 展示类型 |
| status | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 状态色 |
| strokeWidth | `number` | `8` | 线条粗细 |
| striped | `boolean` | `false` | 是否显示条纹效果 |
| showText | `boolean` | `true` | 是否显示文字 |

## 最小示例

```vue
<template>
  <al-progress :percentage="72" status="success" />
</template>
```
