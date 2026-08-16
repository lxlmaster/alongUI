# Changelog

> alongUI 组件库 v1.0 贡献拆分 —— 按 issue 分批、PR 化提交（一个问题 = 一个分支 = 一个 PR）。

## PR 清单（17 个）

### 构建 / 修复
- `fix/build-config` — 根构建与 pnpm 配置修正（新增 @types/node，typecheck 7→1 错误）

### 新特性
- `feat/theme-tokens` — 主题 token 体系
- `feat/focus-visible` — focus-visible 无障碍样式
- `feat/switch-ios-green` — Switch iOS 绿色风格
- `feat/dialog-ios-alert` — Dialog iOS alert 风格

### 重构
- `refactor/button-cleanup` — Button 组件清理

### 文档
- `docs/contributing` — 贡献指南
- `docs/guide-pages` — 指南页
- `docs/missing-components` — 缺失组件文档

### 测试
- `test/core-data` — 核心数据组件测试
- `test/feedback` — 反馈类组件测试（message / message-box / notification）
- `test/navigation` — 导航类组件测试
- `test/display` — 展示类组件测试（tag / badge / progress / skeleton / empty / avatar）
- `test/content` — 内容类组件测试
- `test/layout-misc` — 布局/杂项组件测试（drawer / image / grid / popover / upload）

### 工程
- `chore/project-docs` — 项目文档
- `chore/ci-changelog` — CI 工作流与本文档（本 PR）
