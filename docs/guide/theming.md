---
outline: deep
---

# 主题定制

## 简介

alongUI 的全部视觉参数都以 **CSS 自定义属性（CSS Variables）** 形式定义在 `packages/theme/src/variables.scss` 中，统一挂载在 `:root` 上，暗色主题挂载在 `[data-theme='dark']` 选择器下。

这带来两个特点：

- **不需要重新编译组件库**即可换肤，覆盖 CSS 变量就能生效，甚至可以在运行时用 JS 动态修改。
- 组件库**没有对外暴露 SCSS 变量**（不存在 `$al-*` 这类变量），因此**不支持** `@use 'along-ui/theme' with (...)` 的编译期注入写法。所有定制都通过 CSS 变量完成。

引入主题后同时会引入 `reset.scss`，它为 `body` 应用了默认字体、前景色与背景色，并统一了 `box-sizing` 与 `:focus-visible` 焦点环。

## Token 命名约定

所有 Token 以 `--al-` 前缀开头，按语义分层：

```text
--al-{类别}-{语义}-{变体}

--al-color-primary-hover     品牌色 · 主色 · 悬停态
--al-bg-color-elevated       背景色 · 浮起表面
--al-text-color-secondary    文字色 · 次要
--al-border-radius-large     圆角 · 大
```

## 关键 Token 一览

### 品牌色与状态色

| Token | 默认值 | 说明 |
|-------|--------|------|
| `--al-color-primary` | `#007aff` | 主色，按钮、链接、激活态 |
| `--al-color-primary-hover` | `#3395ff` | 主色悬停态 |
| `--al-color-primary-light` | `#e8f2ff` | 主色浅色背景（选中行、标签底色） |
| `--al-color-primary-dark` | `#0055cc` | 主色按下态 |
| `--al-color-success` | `#34c759` | 成功 |
| `--al-color-success-hover` | `#2db84e` | 成功悬停态 |
| `--al-color-warning` | `#ff9500` | 警告 |
| `--al-color-danger` | `#ff3b30` | 危险 / 错误 |
| `--al-color-info` | `#007aff` | 信息（当前与主色同值） |
| `--al-color-white` | `#ffffff` | 纯白 |
| `--al-color-black` | `#000000` | 纯黑 |

### 背景色

| Token | 浅色 | 暗色 | 说明 |
|-------|------|------|------|
| `--al-bg-color` | `#f5f5f7` | `#1c1c1e` | 全局基础背景 |
| `--al-bg-color-page` | `#e8e8ed` | `#2c2c2e` | 页面容器背景 |
| `--al-bg-color-sidebar` | `#ebebf0` | `#3a3a3c` | 侧边栏背景 |
| `--al-bg-color-overlay` | `#ffffff` | `#2c2c2e` | 浮层背景（弹窗、下拉） |
| `--al-bg-color-elevated` | `#fafafa` | `#3a3a3c` | 浮起表面（卡片、悬停行） |
| `--al-bg-color-hover` | `#e8e8ed` | `#3a3a3c` | 通用悬停背景 |
| `--al-bg-color-input` | `#f2f2f7` | `#3a3a3c` | 输入类控件背景 |

### 文字色

| Token | 浅色 | 暗色 | 说明 |
|-------|------|------|------|
| `--al-text-color-primary` | `#1d1d1f` | `#f5f5f7` | 主要文字、标题 |
| `--al-text-color-regular` | `#3a3a3c` | `#e5e5ea` | 常规正文 |
| `--al-text-color-secondary` | `#6e6e73` | `#aeaeb2` | 次要说明文字 |
| `--al-text-color-placeholder` | `#8e8e93` | `#8e8e93` | 占位符 |
| `--al-text-color-disabled` | `#c7c7cc` | `#48484a` | 禁用态文字 |
| `--al-text-color-inverse` | `#ffffff` | `#1c1c1e` | 反色文字（深色底上的文字） |

### 边框色

| Token | 浅色 | 暗色 | 说明 |
|-------|------|------|------|
| `--al-border-color` | `#d2d2d7` | `#48484a` | 默认边框 |
| `--al-border-color-light` | `#e5e5ea` | `#3a3a3c` | 浅边框、分割线 |
| `--al-border-color-lighter` | `#f2f2f7` | `#2c2c2e` | 极浅边框、表格线 |

### 圆角

| Token | 默认值 |
|-------|--------|
| `--al-border-radius-xs` | `4px` |
| `--al-border-radius-small` | `6px` |
| `--al-border-radius-base` | `6px` |
| `--al-border-radius-medium` | `8px` |
| `--al-border-radius-large` | `12px` |
| `--al-border-radius-xl` | `16px` |
| `--al-border-radius-round` | `999px` |
| `--al-border-radius-circle` | `50%` |

### 间距

间距为 4px 基准的 6 级梯度：

| Token | 默认值 |
|-------|--------|
| `--al-spacing-1` | `4px` |
| `--al-spacing-2` | `8px` |
| `--al-spacing-3` | `12px` |
| `--al-spacing-4` | `16px` |
| `--al-spacing-5` | `20px` |
| `--al-spacing-6` | `24px` |

### 字体

字号采用 Apple HIG 的语义命名（Title / Headline / Body / Callout / Footnote）：

| Token | 默认值 | 说明 |
|-------|--------|------|
| `--al-font-family` | `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif` | 全局字体栈 |
| `--al-font-size-title1` | `28px` | 一级标题 |
| `--al-font-size-title2` | `22px` | 二级标题 |
| `--al-font-size-title3` | `18px` | 三级标题 |
| `--al-font-size-headline` | `15px` | 小标题 |
| `--al-font-size-body` | `14px` | 正文 |
| `--al-font-size-callout` | `13px` | 表格、辅助内容 |
| `--al-font-size-subhead` | `12px` | 表头、标签 |
| `--al-font-size-footnote` | `11px` | 脚注 |
| `--al-font-size-base` | `var(--al-font-size-body)` | 基准字号，默认指向 body |
| `--al-font-weight-regular` | `400` | 常规 |
| `--al-font-weight-primary` | `400` | 全局默认字重（`reset` 中使用） |
| `--al-font-weight-medium` | `500` | 中等 |
| `--al-font-weight-semibold` | `600` | 半粗 |
| `--al-font-weight-bold` | `700` | 加粗 |

### 阴影与蒙层

| Token | 浅色默认值 | 说明 |
|-------|-----------|------|
| `--al-box-shadow-light` | `0 1px 3px rgba(0, 0, 0, 0.04)` | 极轻阴影 |
| `--al-box-shadow-base` | `0 2px 8px rgba(0, 0, 0, 0.06)` | 卡片阴影 |
| `--al-box-shadow-dropdown` | `0 4px 12px rgba(0, 0, 0, 0.08)` | 下拉浮层 |
| `--al-box-shadow-modal` | `0 8px 24px rgba(0, 0, 0, 0.1)` | 弹窗阴影 |
| `--al-tooltip-bg` | `rgba(29, 29, 31, 0.94)` | Tooltip 背景（暗色下反转为浅色） |
| `--al-overlay-mask-bg` | `rgba(255, 255, 255, 0.72)` | 遮罩背景（暗色下为 `rgba(28, 28, 30, 0.72)`） |

### 层级

| Token | 默认值 |
|-------|--------|
| `--al-z-index-normal` | `1` |
| `--al-z-index-dropdown` | `1000` |
| `--al-z-index-popper` | `2000` |
| `--al-z-index-tooltip` | `3000` |
| `--al-z-index-overlay` | `4000` |
| `--al-z-index-modal` | `5000` |
| `--al-z-index-message` | `6000` |
| `--al-z-index-notification` | `7000` |

### 过渡

| Token | 默认值 |
|-------|--------|
| `--al-transition-duration` | `0.3s` |
| `--al-transition-duration-fast` | `0.2s` |
| `--al-transition-function` | `cubic-bezier(0.4, 0, 0.2, 1)` |

## 覆盖设计变量

### 全局覆盖

在业务入口引入组件库样式**之后**，声明一份自己的 `:root` 覆盖即可。CSS 变量遵循层叠顺序，后声明者生效。

```ts
// main.ts
import { createApp } from 'vue'
import AlongUI from 'along-ui'
import './styles/theme-override.scss' // 必须在 along-ui 之后
import App from './App.vue'

createApp(App).use(AlongUI).mount('#app')
```

```scss
// styles/theme-override.scss
:root {
  /* 换成企业品牌绿 */
  --al-color-primary: #00875a;
  --al-color-primary-hover: #1fa06f;
  --al-color-primary-light: #e6f5ef;
  --al-color-primary-dark: #006644;

  /* 更方正的圆角风格 */
  --al-border-radius-base: 4px;
  --al-border-radius-medium: 4px;
  --al-border-radius-large: 6px;

  /* 更紧凑的信息密度 */
  --al-font-size-base: 13px;
  --al-spacing-4: 12px;

  /* 中文优先的字体栈 */
  --al-font-family: 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
}
```

::: warning 覆盖顺序
如果覆盖没生效，几乎都是引入顺序问题。请确认自定义样式的 import 语句位于 `import AlongUI from 'along-ui'`（或 `import '@along-ui/theme'`）**之后**。若无法保证顺序，可提高选择器优先级，例如用 `html:root { ... }`。
:::

### 用 SCSS 组织覆盖

虽然组件库不暴露 SCSS 变量，你仍然可以在业务侧用 SCSS 变量来生成 CSS 变量，享受计算与复用能力：

```scss
// styles/theme-override.scss
@use 'sass:color';

$brand: #00875a;

:root {
  --al-color-primary: #{$brand};
  --al-color-primary-hover: #{color.adjust($brand, $lightness: 8%)};
  --al-color-primary-dark: #{color.adjust($brand, $lightness: -8%)};
  --al-color-primary-light: #{color.mix($brand, #fff, 10%)};
}
```

### 局部作用域覆盖

CSS 变量按 DOM 继承，可以只对某个区域换肤：

```vue
<template>
  <!-- 只有这个区块内的组件用红色主色 -->
  <section class="danger-zone">
    <al-button type="primary">删除全部数据</al-button>
  </section>
</template>

<style scoped>
.danger-zone {
  --al-color-primary: #ff3b30;
  --al-color-primary-hover: #ff5c52;
}
</style>
```

### 运行时动态换肤

```ts
export function setBrandColor(hex: string) {
  document.documentElement.style.setProperty('--al-color-primary', hex)
}
```

### 组件级变量

部分组件在自身作用域内定义了细粒度变量，可以只调整单个组件而不影响全局。以 Table 为例：

```css
.al-table {
  --al-table-font-size-header: 13px;
  --al-table-cell-padding-v: 8px;
  --al-table-header-color: #1d1d1f;
  --al-table-border-color: #e5e5ea;
  --al-table-row-hover-bg: #f5f5f7;
}
```

Guide 组件的聚光灯压暗色也是组件级变量：

```css
:root {
  --al-guide-mask-color: rgba(0, 0, 0, 0.7);
}
```

## 暗色主题

### 开启方式

暗色 Token 定义在 `[data-theme='dark']` 选择器下，因此只要在祖先元素上加该属性即可切换。通常挂在 `<html>` 上：

```ts
// 开启暗色
document.documentElement.setAttribute('data-theme', 'dark')

// 回到浅色
document.documentElement.removeAttribute('data-theme')
```

由于选择器不限定元素，也可以只让局部区域变暗：

```vue
<template>
  <div data-theme="dark" class="preview-panel">
    <al-card>这个卡片是暗色的</al-card>
  </div>
</template>
```

### 完整的切换实现

包含持久化与跟随系统偏好：

```ts
// composables/use-theme.ts
import { ref, watchEffect } from 'vue'

type ThemeMode = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'along-ui-theme'
const mode = ref<ThemeMode>((localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'auto')

const media = window.matchMedia('(prefers-color-scheme: dark)')

function apply() {
  const isDark = mode.value === 'dark' || (mode.value === 'auto' && media.matches)

  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

media.addEventListener('change', apply)

export function useTheme() {
  watchEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode.value)
    apply()
  })

  return { mode }
}
```

```vue
<template>
  <al-select v-model="mode" style="width: 140px">
    <al-option label="浅色" value="light" />
    <al-option label="深色" value="dark" />
    <al-option label="跟随系统" value="auto" />
  </al-select>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/use-theme'

const { mode } = useTheme()
</script>
```

### 自定义暗色 Token

覆盖暗色需要匹配同样的选择器：

```scss
[data-theme='dark'] {
  --al-bg-color: #000000;
  --al-bg-color-page: #131315;
  --al-bg-color-overlay: #1c1c1e;

  /* 暗色下主色通常需要提亮才够醒目 */
  --al-color-primary: #0a84ff;
  --al-color-primary-light: rgba(10, 132, 255, 0.16);
}
```

::: tip 暗色下建议一并调整的 Token
`[data-theme='dark']` 目前只覆盖了**背景色、文字色、边框色、Tooltip 与遮罩**。品牌色、状态色、阴影、圆角、间距、字体在暗色下沿用浅色值。

由于阴影仍是基于黑色的 `rgba(0, 0, 0, 0.06)` 一类值，在深色底上几乎不可见。若你的暗色设计依赖层次感，建议自行覆盖：

```scss
[data-theme='dark'] {
  --al-box-shadow-light: 0 1px 3px rgba(0, 0, 0, 0.4);
  --al-box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.5);
  --al-box-shadow-dropdown: 0 4px 12px rgba(0, 0, 0, 0.55);
  --al-box-shadow-modal: 0 8px 24px rgba(0, 0, 0, 0.6);
}
```
:::

## 已知限制

在做深度定制前请注意以下几点，它们会影响「覆盖 Token 就能全站换肤」的预期：

- **部分状态色写死在组件脚本中**，不读取 CSS 变量，覆盖 Token 不会影响它们：
  - Timeline 的节点圆点颜色（`#007aff` / `#30d158` / `#ff9f0a` / `#ff453a` / `#c7c7cc`）
  - Result 的内置 SVG 插图配色

  这些内联色值与主题 Token（`--al-color-success` 为 `#34c759`、`--al-color-warning` 为 `#ff9500`、`--al-color-danger` 为 `#ff3b30`）存在轻微色差。需要严格统一时，请用 Timeline 的 `color` prop / `dot` 插槽，以及 Result 的 `icon` 插槽自行传入。

- **少量变量被组件样式引用但主题未定义**，目前依赖 CSS 变量的回退值：`--al-color-success-light`、`--al-color-warning-light`、`--al-color-danger-light`、`--al-color-info-light`、`--al-font-size-heading`、`--al-spacing-10`。若你希望统一控制，可在自己的 `:root` 中补齐定义。

- **不存在 SCSS 变量入口**：`@along-ui/theme` 导出的是纯 CSS 变量声明的 SCSS 文件，无 `!default` 变量、mixin 或 function 可供 `@use ... with` 配置。

## 参考

- 变量定义源码：`packages/theme/src/variables.scss`
- 基础样式：`packages/theme/src/reset.scss`
- 完整设计规范：`project/design/ALONGUI-DESIGN-TOKENS.md`
- 色彩预览：`project/design/ALONGUI-COLOR-PREVIEW.html`
