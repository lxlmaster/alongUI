# alongUI 交付路线图

## 1. 当前基线

- 组件目录与聚合导出：
  - `packages/components/*` 与 `packages/components/index.ts` 基本已覆盖 PRD 55 个组件。
  - `packages/along-ui/src/index.ts` 已恢复为全量安装入口。
- 工程状态：
  - `pnpm typecheck` 通过。
  - `pnpm test` 通过。
  - `play` 可运行，当前工作台主要展示基础组件与少量表单/反馈组件。
- 文档状态：
  - `docs/components` 仅完成部分页面，仍有大量组件缺文档页。
  - `docs/.vitepress/config.ts` 侧边栏已声明大量页面，但对应文件未全部补齐。
- 指南状态：
  - `docs/guide` 当前仅有 `getting-started.md`。
  - `theme.md`、`migration.md` 等仍缺失。

## 2. 主要缺口

### 2.1 需要补文档的组件

当前缺少组件文档页的重点目录：

- Data：
  - `table`
  - `pagination`
  - `tree`
  - `tag`
  - `badge`
  - `progress`
  - `collapse`
  - `descriptions`
  - `empty`
  - `skeleton`
  - `calendar`
  - `image`
  - `carousel`
  - `video`
- Feedback：
  - `dialog`
  - `drawer`
  - `message`
  - `notification`
  - `message-box`
  - `popover`
  - `dropdown`
- Nav：
  - `menu`
  - `tabs`
  - `breadcrumb`
  - `steps`
- Layout / Other：
  - `container`
  - `stack`
  - `grid`
  - `center`
  - `spacer`
  - `page`
  - `divider`
  - `avatar`
  - `card`
  - `affix`
  - `backtop`

### 2.2 需要补测试的重点组件

当前优先补齐：

- `packages/components/table/__tests__/`
- `packages/components/pagination/__tests__/`
- `packages/components/message/__tests__/`
- `packages/components/message-box/__tests__/`
- `packages/components/dialog/__tests__/`

### 2.3 需要补演示接入

当前 `play/src/app.vue` 仅展示：

- `button`
- `input`
- `select`
- `switch`
- `icon`
- `tooltip`
- `loading`

需要扩展为可验证的模块化工作台，优先增加：

- P0：
  - `form`
  - `table`
  - `pagination`
  - `dialog`
  - `message`
  - `menu`
- P1：
  - `checkbox`
  - `radio`
  - `tag`
  - `badge`
  - `progress`
  - `empty`
  - `skeleton`
  - `drawer`
  - `tabs`

### 2.4 需要补指南与发布资料

优先补齐以下文件：

- `docs/guide/theme.md`
- `docs/guide/migration.md`
- `docs/guide/installation.md` 或补强 `getting-started.md`
- `README.md`
- `CHANGELOG.md`

### 2.5 需要补工程接入验证

- 全量构建验证：
  - `pnpm build`
- 文档站验证：
  - `pnpm dev:docs`
  - `pnpm build:docs`
- 后续需要补：
  - GitHub Actions
  - 发布脚本
  - 按需引入与 tree-shaking 验证
  - SSR 顶层 DOM 访问检查

## 3. 开发批次

### 批次 A：P0 发布面收口

目标：让 P0 组件达到“能演示、能查文档、能测试、能全量接入”。

涉及组件：

- `button`
- `icon`
- `input`
- `select`
- `switch`
- `form`
- `table`
- `pagination`
- `dialog`
- `message`
- `tooltip`
- `loading`
- `menu`

需要修改：

- 组件测试：
  - `packages/components/{table,pagination,dialog,message}/__tests__/*`
- 文档：
  - `docs/components/{table,pagination,dialog,message,menu}.md`
- 工作台：
  - `play/src/app.vue`
- 首页/导航：
  - `docs/index.md`
  - `docs/.vitepress/config.ts`

### 批次 B：P1 业务常用组件收口

目标：补齐中后台常用能力，形成可试用版本。

涉及组件：

- `checkbox`
- `radio`
- `upload`
- `date-picker`
- `tree`
- `tag`
- `badge`
- `progress`
- `empty`
- `skeleton`
- `drawer`
- `notification`
- `message-box`
- `popover`
- `dropdown`
- `tabs`
- `container`
- `stack`
- `grid`
- `avatar`
- `card`

需要修改：

- 文档：
  - `docs/components/*.md`
- 工作台：
  - `play/src/app.vue`
- 必要时补测试：
  - `packages/components/*/__tests__/*`

### 批次 C：P2 / P3 完整覆盖

目标：把 PRD 55 组件从“目录存在”推进到“可交付”。

涉及组件：

- `link`
- `typography`
- `cascader`
- `time-picker`
- `slider`
- `rate`
- `collapse`
- `descriptions`
- `calendar`
- `image`
- `video`
- `breadcrumb`
- `steps`
- `center`
- `spacer`
- `page`
- `divider`
- `affix`
- `backtop`
- `carousel`

需要修改：

- `docs/components/*.md`
- `play/src/app.vue`
- 必要时对应 `__tests__`

## 4. 非组件交付项

除了组件本身，正式交付前还要完成：

- 文档站完整导航与落地页梳理
- 快速开始、主题定制、迁移指南
- README 对外说明
- CHANGELOG
- 构建与发布链路验证
- CI 基础检查

## 5. 建议执行顺序

1. 先完成批次 A，确保 P0 完整闭环。
2. 再完成批次 B，把常用业务组件做成 Beta 级别。
3. 最后完成批次 C 与发布资料，进入 RC / 1.0 交付准备。

## 6. 当前并行安排

- 文档补齐：
  - 由子代理推进 `docs/**`
- 测试补齐：
  - 由子代理推进 `packages/components/**/__tests__/**`
- 主线程后续负责：
  - 汇总盘点
  - 处理演示接入
  - 控制批次顺序
  - 做最终联调与验收
