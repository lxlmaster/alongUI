# Tag 标签

Tag 用于轻量承载状态、分类或筛选结果，适合在表格和详情页里快速扫读。

## 基础用法

```vue
<template>
  <al-tag>默认标签</al-tag>
  <al-tag type="success">已完成</al-tag>
</template>
```

## 常见状态

```vue
<template>
  <al-tag closable>可关闭</al-tag>
  <al-tag type="warning" effect="plain">朴素标签</al-tag>
  <al-tag disabled>禁用标签</al-tag>
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | 标签类型 |
| effect | `'solid' \| 'plain' \| 'light'` | `'light'` | 视觉风格 |
| size | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸 |
| closable | `boolean` | `false` | 是否显示关闭按钮 |
| round | `boolean` | `false` | 是否使用圆角胶囊样式 |
| disabled | `boolean` | `false` | 是否禁用 |

## 最小示例

```vue
<template>
  <al-tag type="success" closable>
    发布成功
  </al-tag>
</template>
```
