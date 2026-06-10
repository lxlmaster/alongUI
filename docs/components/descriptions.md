# Descriptions 描述列表

Descriptions 用于成组展示只读字段，适合订单详情、用户画像和系统信息页。

## 基础用法

```vue
<template>
  <al-descriptions title="订单信息" :column="2">
    <al-descriptions-item label="订单号">AL-2026-001</al-descriptions-item>
    <al-descriptions-item label="状态">已支付</al-descriptions-item>
  </al-descriptions>
</template>
```

## 常见状态

```vue
<template>
  <al-descriptions title="设备信息" border size="small">
    <al-descriptions-item label="系统">macOS</al-descriptions-item>
    <al-descriptions-item label="版本">14.6</al-descriptions-item>
  </al-descriptions>
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `''` | 描述列表标题 |
| column | `number` | `3` | 每行列数 |
| border | `boolean` | `false` | 是否显示边框 |
| size | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |

## 最小示例

```vue
<template>
  <al-descriptions title="用户信息" :column="1">
    <al-descriptions-item label="姓名">Ava</al-descriptions-item>
    <al-descriptions-item label="邮箱">ava@example.com</al-descriptions-item>
  </al-descriptions>
</template>
```
