# 贡献指南（alongUI）

alongUI 采用 **「一个问题 = 一个分支 = 一个 PR」** 的贡献流，并坚持 **文档先行**。

## 流程

1. 从 `main` 拉取最新：`git checkout main && git pull origin main`
2. 开分支：`git checkout -b <type>/<slug>`
   - `type` ∈ `fix` / `feat` / `test` / `docs` / `chore`
   - 例：`fix/build-config`、`feat/apple-tokens`、`test/table`、`docs/guide`
3. **文档先行**：先在 `project/` 写问题说明（现象 / 根因 / 方案 / 验收），必要时再写代码。
4. 只做这一个问题，提交：`git commit -m "<type>(<scope>): <简述>"`
5. 推送并开 PR：`git push -u origin <branch>`，PR 目标分支为 `main`。
6. **不自动 merge**，留给维护者 review。

## 提交信息规范

```
<type>(<scope>): 简短中文描述

可选的正文，说明为什么这么做。
```

- `fix`：修复缺陷
- `feat`：新组件 / 新能力
- `test`：补充测试
- `docs`：文档
- `chore`：构建 / 工程配置

## 本地校验

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm lint
```

## 进度跟踪

长期交付进度见 [`project/STATUS.md`](./project/STATUS.md)，按阶段（地基 → 质量 → 文档 → 收口）推进。
