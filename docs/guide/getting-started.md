# 快速开始

## 简介

alongUI 是基于 **Vue 3 + TypeScript + SCSS** 的企业级 PC 后台组件库，以 pnpm monorepo 组织，视觉语言受 Apple 设计风格启发（中性灰阶、微圆角、克制阴影），设计 Token 全部以 CSS 变量下发，支持一键暗色切换。

本页介绍如何在业务项目中安装与引入 alongUI。若你要参与组件库本身的开发，请看[开发指南](../development.md)。

## 安装

alongUI 把 `vue` 声明为 peerDependency（要求 `^3.5.0`），需要与 Vue 一起安装：

```bash
pnpm add along-ui vue
```

组件库分发的是 **TypeScript 与 SCSS 源码**，因此构建工具链需要具备 Sass 编译能力：

```bash
pnpm add -D sass
```

::: tip 其他包管理器
```bash
npm install along-ui vue && npm install -D sass
yarn add along-ui vue && yarn add -D sass
```
:::

## 全量引入

最简单的方式，一次注册全部组件。入口文件已经内置了主题变量与全部组件样式的引入，**无需再单独 import CSS**。

```ts
// main.ts
import { createApp } from 'vue'
import AlongUI from 'along-ui'
import App from './App.vue'

createApp(App).use(AlongUI).mount('#app')
```

之后即可在任意模板中直接使用组件，无需再局部注册：

```vue
<template>
  <al-button type="primary">主要按钮</al-button>
</template>
```

::: warning 指令需要单独注册
`v-infinite-scroll` 等指令目前**不在** `app.use(AlongUI)` 的注册范围内，需要手动注册：

```ts
import AlongUI, { vInfiniteScroll } from 'along-ui'

const app = createApp(App)
app.use(AlongUI)
app.directive('infinite-scroll', vInfiniteScroll)
```
:::

## 按需引入

从 `along-ui` 具名导入组件，由打包器（Vite / Rollup / webpack 5）完成 tree-shaking，未使用的组件不会进入产物。

```vue
<script setup lang="ts">
import { AlButton, AlInput } from 'along-ui'
</script>

<template>
  <al-input v-model="keyword" placeholder="请输入关键词" />
  <al-button type="primary">搜索</al-button>
</template>
```

按需引入时组件的 JS 逻辑会被裁剪，但**样式需要自行引入**。有两种做法：

**方式一：引入全量样式（推荐，简单可靠）**

```ts
// main.ts
import '@along-ui/theme'
import '@along-ui/components/style'
```

**方式二：只引入用到的组件样式（产物更小）**

```ts
// main.ts —— 主题 Token 必须先引入
import '@along-ui/theme'
// 再按组件引入
import '@along-ui/components/button/style/index.scss'
import '@along-ui/components/input/style/index.scss'
```

::: warning 关于子包路径
`@along-ui/theme`、`@along-ui/components` 是 `along-ui` 的依赖，在 pnpm 的严格 `node_modules` 布局下无法从业务代码直接引用。请显式安装：

```bash
pnpm add @along-ui/theme @along-ui/components
```

或在 `.npmrc` 中提升：

```ini
public-hoist-pattern[]=@along-ui/*
```
:::

::: tip 主题 Token 不可省略
组件样式中的颜色、圆角、间距均通过 `var(--al-*)` 读取。虽然大部分声明写了字面量回退值，但只有引入 `@along-ui/theme` 才能获得完整 Token、`reset` 基础样式与暗色主题能力。
:::

## 基础用法

一个包含表单、按钮与反馈的最小可运行页面：

```vue
<template>
  <al-page title="用户管理">
    <al-card>
      <al-form :model="form" label-width="80px">
        <al-form-item label="用户名">
          <al-input v-model="form.name" placeholder="请输入用户名" />
        </al-form-item>

        <al-form-item label="角色">
          <al-select v-model="form.role" placeholder="请选择角色">
            <al-option label="管理员" value="admin" />
            <al-option label="普通成员" value="member" />
          </al-select>
        </al-form-item>

        <al-form-item label="启用">
          <al-switch v-model="form.enabled" />
        </al-form-item>

        <al-form-item>
          <al-button type="primary" :loading="submitting" @click="submit">
            提交
          </al-button>
          <al-button @click="reset">重置</al-button>
        </al-form-item>
      </al-form>
    </al-card>
  </al-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const submitting = ref(false)

const form = reactive({
  name: '',
  role: '',
  enabled: true
})

async function submit() {
  submitting.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 600))
  } finally {
    submitting.value = false
  }
}

function reset() {
  form.name = ''
  form.role = ''
  form.enabled = true
}
</script>
```

## TypeScript

包的 `types` 直接指向源码入口，安装后即有完整类型推导，**无需额外配置 `.d.ts`**。组件的 Props 类型与配置接口也一并导出：

```ts
import type { ResultStatus, GuideStep, InfiniteScrollOptions } from 'along-ui'
```

配合 `<script setup lang="ts">` 时，全量引入的全局组件需要 Volar / Vue - Official 插件配合 `vue-tsc` 做模板类型检查。若模板中报「找不到组件」，改为在使用处具名导入即可获得最佳类型体验。

## Vite 配置注意点

大多数场景无需额外配置。以下几点在使用过程中容易踩坑：

### 1. 排除依赖预构建

`along-ui` 的入口是未编译的 TS，并会 import `.vue` 单文件组件。Vite 的依赖预构建（esbuild）无法处理 `.vue`，需要把它排除：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['along-ui', '@along-ui/components']
  }
})
```

### 2. 确保 Sass 可用

只要装了 `sass`，Vite 6 无需任何额外配置即可编译组件库的 `.scss`。若使用旧版 Sass 且出现 `@use` 相关告警，可切换到新 API：

```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' }
    }
  }
})
```

### 3. 不要对样式做 sideEffects 裁剪

`along-ui` 已在 `package.json` 中声明 `"sideEffects": ["**/*.scss"]`。如果你的构建配置强制 `sideEffects: false`，样式会被误删导致组件「无样式」，请勿覆盖该字段。

### 4. 暂无自动按需解析器

当前版本尚未提供 `unplugin-vue-components` 的官方 Resolver，因此不支持「写标签自动引入组件与样式」。请使用上文的显式按需引入方式。

### 5. SSR / Nuxt

组件内部存在直接访问 `window` / `document` 的实现（如 Guide 的定位、BackTop 的滚动监听）。在 SSR 场景请把相关组件包在 `<ClientOnly>` 中，或用 `import()` 动态引入。

## 本地开发组件库

如果你 clone 了 alongUI 仓库参与开发：

```bash
# 安装依赖
pnpm install

# 启动 play 沙盒（实时预览调试）
pnpm dev

# 启动文档站点
pnpm dev:docs

# 类型检查 / 测试 / 代码规范
pnpm typecheck
pnpm test
pnpm lint
```

## 下一步

- [主题定制](./theming.md) —— 覆盖设计 Token 与暗色主题切换
- [组件总览](../components/button.md) —— 从 Button 开始浏览全部组件
