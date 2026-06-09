# 快速开始

## 安装依赖

```bash
pnpm install
```

## 本地调试

```bash
pnpm dev
```

## 文档开发

```bash
pnpm dev:docs
```

## 全量引入

```ts
import { createApp } from 'vue'
import AlongUI from 'along-ui'

import App from './app.vue'

createApp(App).use(AlongUI).mount('#app')
```

## 按需引入

```ts
import { AlButton } from '@along-ui/components'
import '@along-ui/components/button/style/index.scss'
```

