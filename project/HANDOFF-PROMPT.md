# 交接提示词：把 alongUI 的本地改动拆成 17 个 PR 提交到 GitHub

> 用法：把下面 `===== PROMPT START =====` 到 `===== PROMPT END =====` 之间的全部内容，
> 复制粘贴给另一个有 GitHub 推送权限的 AI（或在你本机能推送的环境里执行）。
> 该提示词是自包含的，不需要额外上下文。

---

===== PROMPT START =====

# 任务：将 alongUI 仓库的本地改动，按「一个问题 = 一个分支 = 一个 PR」拆成 17 个 PR 提交到 GitHub

## 你的身份

你是 alongUI 项目的**发布工程师**。alongUI 是一个 Vue 3 + TypeScript + SCSS 的企业级 PC 后台组件库，pnpm monorepo，GitHub 仓库 `lxlmaster/alongUI`，本地路径 `D:\wb\GitHub\alongUI`（Windows，建议用 Git Bash）。

## 背景

一个 AI 团队已经在本地磁盘完成了大量开发工作（构建配置、Apple 设计规范对齐、~32 个新单元测试、文档、CI、设计架构文档），共 **59 处文件改动**，但因为当时环境的 GitHub 权限是只读、且沙箱内 git 提交异常，**这些改动全部还停留在本地工作区，没有进入 git 历史，也没有推到 GitHub**。

你的工作**不是写新功能**，而是把这些已完成的改动**正确地分组、提交、推送、开 PR**。

## ⚠️ 开工前必读的三个关键前提

### 前提 1：必须先修 `.gitignore`，否则构建配置永远提交不上去（重要根因）

仓库 `.gitignore` 第 7 行有一条 `build/` 规则（本意是忽略构建产物），但它**同时把 `internal/build/` 这个源码目录也忽略了**。这就是为什么远端仓库里 `internal/build/` 目录不存在、而 `package.json` 里的 `pnpm build` 脚本却指向 `internal/build/vite.*.config.ts` —— 构建链路一直是断的。

验证方式：
```bash
cd /d/wb/GitHub/alongUI
git check-ignore -v internal/build/utils.ts
# 会输出：.gitignore:7:build/	internal/build/utils.ts
```

因此在 **PR #1** 里，你必须同时修改 `.gitignore`，把宽泛的 `build/` 收窄。推荐改法（保留忽略构建产物的意图，但放行源码目录）：

```gitignore
# Build outputs
dist/
coverage/
# 只忽略各包的构建产物，不要忽略 internal/build 这类源码目录
packages/*/build/
```

或者保留 `build/` 但显式放行：
```gitignore
build/
!internal/build/
!internal/build/**
```

任选其一，但**必须先确认** `git check-ignore -v internal/build/utils.ts` 不再命中，再 `git add internal/build/`。

### 前提 2：git 身份

如果 `git config user.email` 为空，先设置仓库级身份（**不要**改全局配置）：
```bash
git config user.email "you@example.com"
git config user.name "Your Name"
```

### 前提 3：每次提交后必须校验，防止「根提交」异常

之前的环境出现过 `git commit` 变成孤儿根提交（把 415 个文件一次性提交）的异常。每次 commit 后立刻校验：

```bash
PARENT=$(git log -1 --format=%P)
[ -z "$PARENT" ] && echo "❌ 异常：出现根提交，立即 git checkout -f main 并停止" && exit 1
FILES=$(git show --stat --oneline HEAD | tail -1)
echo "本次提交文件数：$(git show --name-only --format= HEAD | wc -l)"
```
如果某次提交的文件数远超预期（比如你只想提交 2 个文件却提交了 400 个），说明出现异常，执行 `git reset --soft HEAD~1` 回退后重新精确 `git add`。

## 标准操作流程（每个 PR 都严格照做）

对下面清单里的**每一个** PR，依次执行：

```bash
cd /d/wb/GitHub/alongUI

# 1. 回到最新 main（显式指定起点，避免孤儿分支）
git checkout main
git pull origin main

# 2. 从 main 建分支（必须显式写 main 作为起点）
git checkout -b <分支名> main

# 3. 只暂存本 PR 的文件（精确路径，禁止 git add . / git add -A）
git add <文件1> <文件2> ...

# 4. 确认暂存内容正确
git status --short

# 5. 提交
git commit -m "<commit message>"

# 6. 校验（见前提 3）
git log -1 --format=%P    # 必须非空
git show --name-only --format= HEAD    # 文件清单必须与预期一致

# 7. 推送
git push -u origin <分支名>

# 8. 开 PR
gh pr create --base main --head <分支名> --title "<PR 标题>" --body "<PR 正文>"

# 9. 回到 main，准备下一个
git checkout main
```

**硬性约束**：
- 禁止 `git add .` / `git add -A` / `git commit -a` —— 必须逐个精确指定文件路径，否则会把其他 PR 的改动混进来。
- **绝不 merge PR**，全部留给人工 review。
- 如果某个 PR 的文件在磁盘上不存在，跳过该 PR 并在最终报告里说明，不要凭空创造文件内容。
- 如果 `gh` 未安装或未登录：先 `gh auth login`；若无法使用 `gh`，则只完成 push，并在报告里列出每个分支对应的 PR 创建链接（`https://github.com/lxlmaster/alongUI/compare/main...<分支名>`）。

---

## 17 个 PR 清单

### PR #1 — 修复构建链路（P0，最重要，必须第一个做）

- **分支**：`fix/build-config`
- **文件**：
  - `.gitignore` （按前提 1 修改）
  - `internal/build/utils.ts`
  - `internal/build/vite.components.config.ts`
  - `internal/build/vite.full.config.ts`
  - `package.json`（根，新增 `vite-plugin-dts` devDependency）
  - `packages/along-ui/package.json`
  - `packages/components/package.json`
  - `packages/hooks/package.json`
  - `packages/icons/package.json`
  - `packages/theme/package.json`
  - `packages/utils/package.json`
- **commit**：`fix(build): add missing internal/build configs and unignore them`
- **PR 标题**：`fix(build): 修复断裂的构建链路（internal/build 被 .gitignore 吞掉）`
- **PR 正文要点**：
  - 根因：`.gitignore` 的 `build/` 规则误伤 `internal/build/` 源码目录，导致构建配置从未入库，`pnpm build` 必然失败。
  - 改动：收窄 `.gitignore`；补齐 `internal/build/` 下 3 个 Vite library-mode 配置（`makeLibConfig` 工厂 + components/full 两个入口）；根 `package.json` 加 `vite-plugin-dts`；6 个子包补 `build` 脚本。
  - 已知遗留：`hooks/icons/utils/theme` 的 `build` 脚本指向尚未创建的 `vite.<pkg>.config.ts`，单独构建这几个包会失败，留待后续 PR 补（根 `pnpm build` 不受影响）。

### PR #2 — 设计 Token 校准

- **分支**：`feat/theme-tokens`
- **文件**：`packages/theme/src/variables.scss`
- **commit**：`feat(theme): align design tokens with Apple HIG`
- **PR 标题**：`feat(theme): 设计 Token 对齐 Apple HIG`
- **正文要点**：说明主色 `#007AFF`、语义色（success `#34C759` 等）、圆角/间距/字体 Token 的现状与调整；注明 `project/reviews/PRD-vs-CODE-GAP.md` 是过时文档，Token 实际已大部分对齐。

### PR #3 — Focus 样式

- **分支**：`feat/focus-visible`
- **文件**：`packages/theme/src/reset.scss`
- **commit**：`feat(theme): replace black focus outline with subtle focus-visible ring`
- **PR 标题**：`feat(theme): 去掉黑色 focus outline，改为 Apple 式蓝色微光环`
- **正文要点**：原 2px 黑色 outline 不符合 Apple 规范；改为 `:focus-visible` 下低透明度主色光环，保留键盘可达性。

### PR #4 — Switch 开启态 iOS 绿

- **分支**：`feat/switch-ios-green`
- **文件**：`packages/components/switch/style/index.scss`
- **commit**：`feat(switch): use iOS green for checked track`
- **PR 标题**：`feat(switch): 开关开启态改为 iOS 绿 #34C759`

### PR #5 — Dialog iOS Alert 风格

- **分支**：`feat/dialog-ios-alert`
- **文件**：`packages/components/dialog/src/dialog.vue`
- **commit**：`feat(dialog): align dialog with iOS Alert style`
- **PR 标题**：`feat(dialog): 弹窗对齐 iOS Alert 风格（12px 圆角 / 400px 宽 / 分隔线按钮区）`

### PR #6 — Button 清理

- **分支**：`refactor/button-cleanup`
- **文件**：`packages/components/button/src/button.vue`
- **commit**：`refactor(button): clean up dead code and token usage`
- **PR 标题**：`refactor(button): 清理死代码，统一使用设计 Token`
- **正文要点**：经核查 Button 大部分已符合 Apple 规范，本次仅做最小化清理，不改公共 API。

### PR #7 — 贡献指南

- **分支**：`docs/contributing`
- **文件**：`CONTRIBUTING.md`
- **commit**：`docs: add CONTRIBUTING.md describing branch+PR workflow`
- **PR 标题**：`docs: 新增贡献指南（一问题一分支一 PR · 文档先行）`

### PR #8 — 指南类文档

- **分支**：`docs/guide-pages`
- **文件**：
  - `docs/guide/getting-started.md`
  - `docs/guide/installation.md`
  - `docs/guide/theme.md`
  - `docs/guide/theming.md`
  - `docs/guide/migration.md`
- **commit**：`docs(guide): add installation, theming and migration guides`
- **PR 标题**：`docs(guide): 补齐安装 / 主题定制 / 迁移指南`
- **注意**：`theme.md` 与 `theming.md` 内容可能重叠（由不同 Agent 分别产出）。开 PR 前请对比二者，若重复则保留更完整的一个、删掉另一个，并在 PR 正文说明；同时检查 `docs/.vitepress/config.ts` 的侧边栏是否需要登记这些新页面（如需要，把 config 改动一并放进本 PR）。

### PR #9 — 补齐 4 个缺失的组件文档

- **分支**：`docs/missing-components`
- **文件**：
  - `docs/components/guide.md`
  - `docs/components/infinite-scroll.md`
  - `docs/components/result.md`
  - `docs/components/timeline.md`
- **commit**：`docs(components): add docs for guide, infinite-scroll, result, timeline`
- **PR 标题**：`docs(components): 补齐 guide / infinite-scroll / result / timeline 文档`
- **注意**：同样检查 `docs/.vitepress/config.ts` 侧边栏是否需登记。

### PR #10 — CI 与 CHANGELOG

- **分支**：`chore/ci-changelog`
- **文件**：
  - `.github/workflows/ci.yml`（整个 `.github/` 目录是新增的）
  - `CHANGELOG.md`
- **commit**：`chore(ci): add GitHub Actions workflow and initialize CHANGELOG`
- **PR 标题**：`chore(ci): 新增 CI 工作流与 CHANGELOG`
- **正文要点**：CI 覆盖 install / typecheck / test / build / docs-build（pnpm 9 + Node 20）。
- **注意**：这个 PR 一旦合并，后续所有 PR 都会触发 CI。如果本地依赖从未安装过、typecheck/test 从未验证过，**建议把这个 PR 放到最后开**，或在正文里注明「首次 CI 可能失败，需据结果修正」。

### PR #11 ~ #16 — 单元测试（6 组）

每组独立分支、独立 PR。文件均为 `packages/components/<name>/__tests__/<name>.test.ts`。

| PR | 分支 | 覆盖组件 |
|----|------|---------|
| #11 | `test/core-data` | `table`、`pagination` |
| #12 | `test/feedback` | `message`、`message-box`、`notification` |
| #13 | `test/navigation` | `menu`、`tabs`、`breadcrumb`、`steps` |
| #14 | `test/display` | `tag`、`badge`、`progress`、`skeleton`、`empty`、`avatar` |
| #15 | `test/content` | `card`、`link`、`typography`、`divider`、`tree` |
| #16 | `test/layout-misc` | `upload`、`popover`、`drawer`、`container`、`stack`、`grid`、`center`、`spacer`、`page`、`collapse`、`descriptions`、`image` |

- **commit 格式**：`test(<scope>): add unit tests for <组件列表>`
- **PR 标题格式**：`test(<scope>): 补充 <组件列表> 单元测试`
- **PR 正文统一要点**：测试基于 Vitest + @vue/test-utils + jsdom，覆盖渲染 / 关键 prop 反射 / 基础交互；**这些测试尚未在真实环境运行过**（编写时无 node_modules），请在 CI 或本地 `pnpm test` 结果基础上修正失败用例。

### PR #17 — 项目文档与脚本

- **分支**：`chore/project-docs`
- **文件**：
  - `project/STATUS.md`
  - `project/design/DESIGN-ARCHITECTURE.md`
  - `project/scripts/`（下的脚本文件）
  - `project/HANDOFF-PROMPT.md`（本文件，可选）
- **commit**：`chore(project): add status tracking, design architecture doc and scripts`
- **PR 标题**：`chore(project): 新增进度跟踪 / 设计架构文档 / 提交脚本`

---

## 强烈建议的执行顺序

1. **先做 PR #1**（构建链路，P0 根因）。
2. 然后 PR #2 ~ #9、#11 ~ #17。
3. **PR #10（CI）放最后**，避免在 typecheck/test 尚未验证时就让每个 PR 都挂红。

如果条件允许，在开始之前先跑一次 `pnpm install && pnpm typecheck && pnpm test && pnpm build`，把真实失败结果记录下来 —— 这能让你在 PR 正文里写出准确的验证状态，而不是「未验证」。若 install 失败（网络/权限），如实说明并跳过验证，不要卡死。

## 完成后请汇报

1. 成功创建的 PR 列表（编号 / 分支 / PR 链接）。
2. 跳过或失败的项，以及原因。
3. `pnpm install / typecheck / test / build` 的真实结果（若跑过）。
4. 你发现的、需要人工决策的问题（例如 `theme.md` 与 `theming.md` 是否重复、CI 首跑失败项）。
5. 最终确认：本地已回到 `main` 分支、工作区干净、**没有任何 PR 被自动 merge**。

===== PROMPT END =====

---

## 附：本地改动清单（59 项，供核对）

```
 M docs/guide/getting-started.md
 M package.json
 M packages/along-ui/package.json
 M packages/components/button/src/button.vue
 M packages/components/dialog/src/dialog.vue
 M packages/components/package.json
 M packages/components/switch/style/index.scss
 M packages/hooks/package.json
 M packages/icons/package.json
 M packages/theme/package.json
 M packages/theme/src/reset.scss
 M packages/theme/src/variables.scss
 M packages/utils/package.json
?? .github/
?? CHANGELOG.md
?? CONTRIBUTING.md
?? docs/components/{guide,infinite-scroll,result,timeline}.md
?? docs/guide/{installation,migration,theme,theming}.md
?? packages/components/*/[32 个 __tests__ 目录]
?? project/STATUS.md
?? project/design/DESIGN-ARCHITECTURE.md
?? project/scripts/
```

被 `.gitignore` 隐藏、但确实存在于磁盘的文件（**必须在 PR #1 里放行**）：
```
internal/build/utils.ts
internal/build/vite.components.config.ts
internal/build/vite.full.config.ts
```
