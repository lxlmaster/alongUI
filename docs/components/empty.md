# Empty 空状态

Empty 用于承接列表、搜索和初始页面没有内容时的留白反馈。

## 基础用法

```vue
<template>
  <al-empty description="暂无数据" />
</template>
```

## 常见状态

```vue
<template>
  <al-empty description="还没有上传文件">
    <al-button type="primary">立即上传</al-button>
  </al-empty>
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| description | `string` | `'暂无数据'` | 描述文案 |
| image | `string` | `undefined` | 自定义插图地址 |
| imageSize | `number` | `96` | 图片尺寸 |

## 最小示例

```vue
<template>
  <al-empty description="当前筛选条件下没有结果" />
</template>
```
