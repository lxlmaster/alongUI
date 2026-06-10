# Input 输入框

Input 用于表单录入，是 alongUI 最重要的基础表单组件之一。

## 基础用法

```vue
<template>
  <al-input v-model="value" placeholder="请输入" />
</template>
```

## 可清空

```vue
<template>
  <al-input v-model="value" clearable />
</template>
```

## 前后缀

```vue
<template>
  <al-input v-model="email" placeholder="name@example.com">
    <template #prefix>
      <al-icon>
        <MailIcon />
      </al-icon>
    </template>
  </al-input>
</template>
```

## 文本域

```vue
<template>
  <al-input v-model="remark" type="textarea" :maxlength="80" show-word-limit />
</template>
```

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| number` | `''` | 绑定值 |
| type | `'text' \| 'password' \| 'textarea'` | `'text'` | 输入类型 |
| placeholder | `string` | `undefined` | 占位文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| clearable | `boolean` | `false` | 是否可清空 |
| rows | `number` | `3` | textarea 行数 |
| maxlength | `number` | `undefined` | 最大输入长度 |
| showWordLimit | `boolean` | `false` | 是否显示字数统计 |

模板中使用时请写为 `show-word-limit`，对应 Vue 的 kebab-case 写法。

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value: string)` | 输入时触发 |
| input | `(value: string)` | 输入时触发 |
| change | `(value: string)` | 原生 change 时触发 |
| focus | `(event: FocusEvent)` | 聚焦时触发 |
| blur | `(event: FocusEvent)` | 失焦时触发 |
| clear | `()` | 点击清空时触发 |

## Slots

| 插槽名 | 说明 |
|--------|------|
| prefix | 前缀内容 |
| suffix | 后缀内容 |

## 视觉规则

- 输入框背景必须使用 `#F5F5F7`，不能使用纯白。
- 默认高度为 36px，圆角为 6px。
- focus 边框使用 `#1D1D1F`，不使用蓝色。
