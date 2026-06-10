# DatePicker 日期选择器

DatePicker 用于选择日期，支持日期、日期范围、日期时间、月份四种模式。

## 基础用法

```vue
<template>
  <al-date-picker v-model="date" placeholder="选择日期" />
</template>
```

## 日期范围

```vue
<template>
  <al-date-picker v-model="range" type="daterange" />
</template>
```

## 其他模式

```vue
<template>
  <al-date-picker v-model="datetime" type="datetime" placeholder="选择日期时间" />
  <al-date-picker v-model="month" type="month" placeholder="选择月份" />
</template>
```

## 可清空

```vue
<template>
  <al-date-picker v-model="date" clearable />
</template>
```

## DatePicker Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| Date \| [string, string]` | `''` | 绑定值 |
| type | `'date' \| 'daterange' \| 'datetime' \| 'month'` | `'date'` | 选择模式 |
| placeholder | `string \| [string, string]` | `undefined` | 占位文本，范围模式可传入双占位 |
| disabled | `boolean` | `false` | 是否禁用 |
| clearable | `boolean` | `false` | 是否可清空 |

## DatePicker Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value)` | 选中值变化时触发 |
| change | `(value)` | 选中值变化时触发 |

## 设计说明

- 日期、月份和日期范围使用自定义面板，日期时间模式直接使用原生 `<input type="datetime-local">` 以减少实现复杂度。
- 面板以月为单位切换，日期范围模式通过两次点选确认起止。
- 不使用蓝色主色——选中态使用黑色，hover 使用浅灰色。
