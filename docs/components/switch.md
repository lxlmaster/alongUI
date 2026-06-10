# Switch 开关

Switch 用于在两个互斥状态之间切换，适合启用/停用、开启/关闭等即时生效的设置项。

## 基础用法

```vue
<template>
  <al-switch v-model="enabled" />
</template>
```

## 带文字

```vue
<template>
  <al-switch v-model="enabled" active-text="开启" inactive-text="关闭" />
</template>
```

## 禁用与加载

```vue
<template>
  <al-switch v-model="enabled" disabled />
  <al-switch v-model="syncing" loading />
</template>
```

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `boolean` | `false` | 绑定值 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中，加载时不可切换 |
| activeText | `string` | `undefined` | 开启状态文字 |
| inactiveText | `string` | `undefined` | 关闭状态文字 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value: boolean)` | 状态切换时触发 |
| change | `(value: boolean)` | 状态切换时触发 |

## 视觉规则

- 轨道尺寸为 44px × 24px，圆角为 999px。
- 开启态使用 `#1D1D1F`，关闭态使用灰色，不使用蓝色主色。
- 禁用态只使用 `opacity: 0.4`，不额外变色。
- focus-visible 使用黑色 2px outline。
