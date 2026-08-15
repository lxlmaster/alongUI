#!/usr/bin/env bash
# alongUI · 一键把本地改动按「一问题一分支一 PR」推上 GitHub
# 用法（在仓库根目录、且已 gh auth login 的机器上）：
#   cd D:\wb\GitHub\alongUI
#   bash project/scripts/submit-prs.sh
set -uo pipefail

REPO="lxlmaster/alongUI"
BASE="main"

git checkout -f "$BASE"
git pull origin "$BASE" 2>/dev/null || true

if ! command -v gh >/dev/null 2>&1; then
  echo "需要 gh CLI，请先安装并登录：https://cli.github.com / gh auth login"
  exit 1
fi
gh auth status >/dev/null 2>&1 || { echo "请先 gh auth login"; exit 1; }

make_pr () {
  local branch="$1"; local msg="$2"; local title="$3"; local body="$4"; shift 4
  echo "===== PR: $branch ====="
  git checkout -f "$BASE"
  git branch -D "$branch" 2>/dev/null || true
  git checkout -b "$branch"
  local added=0
  for f in "$@"; do
    if [ -e "$f" ]; then git add -- "$f" && added=1; else echo "  (skip missing: $f)"; fi
  done
  if [ "$added" -eq 0 ]; then echo "  没有可提交文件，跳过"; git checkout -f "$BASE"; return; fi
  git commit -m "$msg"
  if git push -u origin "$branch" 2>/dev/null; then
    gh pr create --repo "$REPO" --base "$BASE" --head "$branch" --title "$title" --body "$body" \
      || echo "  PR 已存在或创建失败，请到 GitHub 查看"
  else
    echo "  push 失败（可能分支已存在或无推送权限）"
  fi
  git checkout -f "$BASE"
}

make_pr "chore/build-config" \
  "chore(build): 补齐 internal/build vite 配置与子包 build 脚本" \
  "chore: 补齐 internal/build 构建配置，让 pnpm build 跑通" \
  "新增 internal/build/utils.ts（makeLibConfig 工厂）、vite.components.config.ts、vite.full.config.ts；根 package.json 增加 vite-plugin-dts；6 个子包增加 build 脚本。\n\n关联 project/STATUS.md 阶段1（地基）。" \
  internal/build/utils.ts internal/build/vite.components.config.ts internal/build/vite.full.config.ts \
  package.json packages/components/package.json packages/along-ui/package.json \
  packages/hooks/package.json packages/icons/package.json packages/utils/package.json packages/theme/package.json

make_pr "fix/switch" \
  "fix(switch): 开启态使用 iOS 绿 Token" \
  "fix: Switch 开启态对齐 iOS 绿 #34C759" \
  "关闭态改用 --al-border-color-light 浅灰 Token；开启态确认为 iOS 绿 --al-color-success。保持胶囊形状与尺寸。" \
  packages/components/switch/style/index.scss

make_pr "fix/focus" \
  "fix(theme): 移除黑色 focus outline，改用主蓝 focus-visible 微光" \
  "fix: 全局 focus 改为 Apple 式蓝色微光环" \
  "variables.scss 新增 --al-focus-ring；reset.scss 移除 2px 黑色 outline，改为 :focus-visible 主蓝低透明 box-shadow 微光。" \
  packages/theme/src/variables.scss packages/theme/src/reset.scss

make_pr "fix/dialog" \
  "fix(dialog): 对齐 iOS Alert 风格" \
  "fix: Dialog 对齐 iOS Alert（400px / 12px / 分隔线 footer）" \
  "宽度 520→400px；非全屏注入 12px 圆角 Token；footer 改为顶部分隔线 + 等宽按钮布局。" \
  packages/components/dialog/src/dialog.vue

make_pr "fix/button" \
  "fix(button): 清理未使用的 isLinkType 计算属性" \
  "fix: Button 清理死代码（视觉已对齐 Apple）" \
  "删除 button.vue 中定义但从未引用的 isLinkType。经核查 button 类型体系/颜色已对齐 Apple，无需改视觉。" \
  packages/components/button/src/button.vue

make_pr "test/table-pagination" \
  "test: 补充 table 与 pagination 单元测试" \
  "test: table / pagination 单测" \
  "覆盖渲染、关键 prop 反射、行点击与翻页事件。" \
  packages/components/table/__tests__/table.test.ts packages/components/pagination/__tests__/pagination.test.ts

make_pr "test/message-family" \
  "test: 补充 message / message-box / notification 单元测试" \
  "test: message 系列单测" \
  "覆盖函数式调用渲染、type/is-closable 反射、关闭/确认/取消交互。" \
  packages/components/message/__tests__/message.test.ts \
  packages/components/message-box/__tests__/message-box.test.ts \
  packages/components/notification/__tests__/notification.test.ts

make_pr "test/nav-components" \
  "test: 补充 menu / tabs / breadcrumb / steps 单元测试" \
  "test: 导航类组件单测" \
  "覆盖渲染、mode/collapse/current 等 prop 反射、select/tab-click/expand 交互。" \
  packages/components/menu/__tests__/menu.test.ts \
  packages/components/tabs/__tests__/tabs.test.ts \
  packages/components/breadcrumb/__tests__/breadcrumb.test.ts \
  packages/components/steps/__tests__/steps.test.ts

make_pr "test/display-components" \
  "test: 补充 tag / badge / progress / skeleton / empty / avatar 单元测试" \
  "test: 展示类组件单测" \
  "覆盖渲染、type/value 反射、close/error 等交互。" \
  packages/components/tag/__tests__/tag.test.ts \
  packages/components/badge/__tests__/badge.test.ts \
  packages/components/progress/__tests__/progress.test.ts \
  packages/components/skeleton/__tests__/skeleton.test.ts \
  packages/components/empty/__tests__/empty.test.ts \
  packages/components/avatar/__tests__/avatar.test.ts

make_pr "test/card-link-typography" \
  "test: 补充 card / link / typography / divider / tree 单元测试" \
  "test: 卡片/链接/排版类单测" \
  "覆盖渲染、shadow/type/level 反射、link 点击与 tree 展开/勾选交互。" \
  packages/components/card/__tests__/card.test.ts \
  packages/components/link/__tests__/link.test.ts \
  packages/components/typography/__tests__/typography.test.ts \
  packages/components/divider/__tests__/divider.test.ts \
  packages/components/tree/__tests__/tree.test.ts

make_pr "test/remaining-components" \
  "test: 补充剩余 12 个组件单元测试" \
  "test: 剩余组件单测（上传/弹层/布局等）" \
  "覆盖渲染、关键 prop 反射与基础交互；布局类验证 slot 渲染。" \
  packages/components/upload/__tests__/upload.test.ts \
  packages/components/popover/__tests__/popover.test.ts \
  packages/components/drawer/__tests__/drawer.test.ts \
  packages/components/collapse/__tests__/collapse.test.ts \
  packages/components/descriptions/__tests__/descriptions.test.ts \
  packages/components/image/__tests__/image.test.ts \
  packages/components/container/__tests__/container.test.ts \
  packages/components/stack/__tests__/stack.test.ts \
  packages/components/grid/__tests__/grid.test.ts \
  packages/components/center/__tests__/center.test.ts \
  packages/components/spacer/__tests__/spacer.test.ts \
  packages/components/page/__tests__/page.test.ts

make_pr "docs/design-arch" \
  "docs(design): 新增设计系统 & 组件架构文档" \
  "docs: 设计系统 & 组件架构文档" \
  "project/design/DESIGN-ARCHITECTURE.md：Token 契约、主题机制、组件架构、构建打包、Apple 对齐结论。" \
  project/design/DESIGN-ARCHITECTURE.md

make_pr "chore/ci-changelog" \
  "chore(ci): 完善 CI 工作流并初始化 CHANGELOG" \
  "chore: CI 工作流 + CHANGELOG" \
  "ci.yml 拆 install/typecheck/test/build/docs-build 五个 job；CHANGELOG 采用 Keep-a-Changelog。" \
  .github/workflows/ci.yml CHANGELOG.md

make_pr "docs/contributing" \
  "docs: 新增贡献指南（一问题一分支一 PR）" \
  "docs: 贡献指南" \
  "说明分支+PR 流、提交信息规范与本地校验命令。" \
  CONTRIBUTING.md

make_pr "docs/guide" \
  "docs: 新增安装 / 主题 / 迁移指南" \
  "docs: 指南文档" \
  "docs/guide 下 installation / theme / migration / getting-started / theming。" \
  docs/guide/installation.md docs/guide/theme.md docs/guide/migration.md \
  docs/guide/getting-started.md docs/guide/theming.md

make_pr "docs/components" \
  "docs: 补齐 timeline / result / infinite-scroll / guide 组件文档" \
  "docs: 补齐 4 个组件文档" \
  "对照源码校准 Props/Events/Slots/示例。" \
  docs/components/timeline.md docs/components/result.md \
  docs/components/infinite-scroll.md docs/components/guide.md

echo "===== 完成：已尝试创建以上 PR ====="
echo "若某些 PR 未创建，请到 https://github.com/$REPO/pulls 查看或手动 gh pr create。"
