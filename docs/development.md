# 开发约定

## 目录职责

| 目录 | 职责 |
|------|------|
| `packages/components` | 组件源码、样式、测试 |
| `packages/theme` | 设计 Token、reset、主题入口 |
| `packages/utils` | 安装器、DOM 工具、通用方法 |
| `packages/hooks` | Composition API 工具 |
| `packages/icons` | 图标组件 |
| `packages/along-ui` | 全量聚合入口 |
| `play` | 本地组件调试沙盒 |
| `docs` | VitePress 文档 |
| `internal` | 构建与内部工具配置 |

## 新增组件流程

1. 在 `packages/components/<component>` 创建 `src`、`style`、`__tests__`。
2. 在 `src/<component>.ts` 定义 Props、Emits 和导出类型。
3. 在 `src/<component>.vue` 实现组件。
4. 在 `style/index.scss` 写组件样式，使用 `--al-*` 变量。
5. 在 `packages/components/index.ts` 导出组件。
6. 在 `packages/along-ui/src/index.ts` 加入全量安装列表。
7. 在 `docs/components` 新增组件文档。

