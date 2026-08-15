# 安装

## 环境要求

- Node.js >= 18
- pnpm >= 9

## 安装组件库

```bash
pnpm add @along-ui/along-ui
```

## 完整引入

```ts
import { createApp } from 'vue'
import AlongUI from '@along-ui/along-ui'
import '@along-ui/theme/dist/index.css'

createApp(App).use(AlongUI).mount('#app')
```

## 按需引入（规划中）

基于 unplugin 的按需解析器已在路线图中，暂未发布。当前完整引入即可获得全部组件。
