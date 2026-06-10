# Rate 评分

Rate 用于星级评分，支持半选、自定义数量与颜色。

## 基础用法

```vue
<template>
  <al-rate v-model="score" />
</template>
```

## 半选与自定义

```vue
<template>
  <al-rate v-model="score" allow-half :count="10" />
  <al-rate v-model="score" color="#FF9500" void-color="#E8E8ED" />
</template>
```

## 只读展示

```vue
<template>
  <al-rate v-model="score" disabled />
</template>
```

## Rate Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `number` | `0` | 评分值 |
| count | `number` | `5` | 星星总数 |
| disabled | `boolean` | `false` | 是否只读 |
| allowHalf | `boolean` | `false` | 是否允许半星 |
| size | `number` | `24` | 星星字号（px） |
| color | `string` | `'#FFC107'` | 选中态颜色 |
| voidColor | `string` | `'#E8E8ED'` | 未选中态颜色 |

## Rate Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value: number)` | 评分变化时触发 |
| change | `(value: number)` | 评分变化时触发 |

## 设计说明

- 启用 `allowHalf` 时，鼠标在星星左右半区分别对应半星和整星。
- 点击已选中的星星可清除评分（值为 0），无需额外清空按钮。
- 星星图标使用纯 CSS 渲染（字符 `★` + 颜色控制），无需图标依赖。
