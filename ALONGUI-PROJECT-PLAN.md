# ▎alongUI 项目立项书

> 项目经理案 · 完整研发规划

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术选型](#2-技术选型)
3. [项目目录结构](#3-项目目录结构)
4. [研发路线图](#4-研发路线图)
5. [详细 Sprint 规划](#5-详细-sprint-规划)
6. [组件研发顺序](#6-组件研发顺序)
7. [工程规范](#7-工程规范)
8. [构建与发布](#8-构建与发布)
9. [测试策略](#9-测试策略)
10. [文档策略](#10-文档策略)
11. [版本规划](#11-版本规划)
12. [关键风险与应对](#12-关键风险与应对)

---

## 1. 项目概述

### 1.1 基本信息

| 项目 | 内容 |
|------|------|
| 项目名称 | alongUI |
| 技术栈 | Vue 3 + TypeScript + Scss + Vite |
| 设计风格 | Apple 设计语言（冷灰阶梯 + 品牌色点缀） |
| 对标产品 | Element UI / Element Plus |
| 目标场景 | PC 端中后台系统 |
| 组件总数 | 55 个（首批 P0: 13 个） |
| 包管理 | pnpm workspace（monorepo） |

### 1.2 项目定位

**一句话：** Vue 3 生态下，像 Element Plus 一样全面、开箱即用，但设计上像 Apple 一样精致克制的中后台 UI 组件库。

### 1.3 核心竞争力

| 维度 | 说明 |
|------|------|
| **设计质感** | Apple 式洁净灰阶 + 微圆角 + 留白，不同于市面所有竞品的蓝白/蓝黑风格 |
| **Vue 3 原生** | 不搞兼容层，全面拥抱 Composition API + TypeScript |
| **开箱即用** | 对标 Element Plus 的组件覆盖度，零额外配置接入 |
| **主题灵活** | CSS Variables 全量暴露，换肤不改源码 |

### 1.4 竞品分析

| 竞品 | 优点 | 缺点 | alongUI 对策 |
|------|------|------|------------|
| **Element Plus** | 社区最大、组件最全 | 设计老旧、视觉疲劳 | 形成更克制、精致的视觉识别 |
| **Ant Design Vue** | 企业级功能丰富 | 重量级、定制困难 | 保持轻量、主题灵活 |
| **Naive UI** | TypeScript 支持好 | 组件不够全、文档一般 | 完整覆盖 + 精致文档 |
| **Arco Design Vue** | 设计现代 | 生态小、用户少 | 抓紧窗口期 |

### 1.5 目标用户与核心场景

| 用户类型 | 主要诉求 | alongUI 需要解决的问题 |
|---------|---------|----------------------|
| 中后台前端开发者 | 快速搭建稳定页面 | 提供开箱即用的表单、表格、弹窗、导航、布局组件 |
| SaaS / 企业内部系统团队 | 统一产品体验与研发规范 | 通过统一设计 Token、组件 API、文档示例降低协作成本 |
| 设计与前端协作团队 | 保持视觉一致性 | 将颜色、间距、尺寸、圆角、状态等沉淀为可复用规范 |
| 从 Element Plus 迁移的团队 | 降低迁移成本 | 保持核心 API 认知相近，并提供迁移差异说明 |

首批重点覆盖以下业务场景：

- 数据录入：登录、查询筛选、编辑表单、分步提交。
- 数据展示：列表页、表格页、详情页、状态标签、空状态。
- 操作反馈：加载、消息提示、确认弹窗、抽屉编辑。
- 系统框架：后台菜单、面包屑、Tabs、分页、页面布局。

### 1.6 产品边界

| 类型 | 范围 |
|------|------|
| 必须做 | Vue 3 PC 端中后台组件库、主题系统、文档站、按需引入、类型声明 |
| 优先做 | Element Plus 常用组件兼容、暗色主题、基础无障碍能力、迁移指南 |
| 暂不做 | 移动端组件、图表库、低代码搭建器、复杂数据可视化、业务模板市场 |
| 明确排除 | Vue 2 兼容层、React 版本、完整设计软件插件、服务端业务 SDK |

### 1.7 MVP 验收标准

| 版本 | 验收标准 |
|------|---------|
| v0.1.0 Alpha | P0 组件完成；支持全量引入；Button/Input/Select/Form/Table/Dialog/Message 有文档和测试；play 沙盒可运行 |
| v0.5.0 Beta | P0 + P1 组件完成；支持按需引入；主题变量可覆盖；文档站上线；核心组件可用于真实后台页面 |
| v0.9.0 RC | 55 个组件完成；单测覆盖率 > 80%；迁移指南完成；暗色主题完成；API 表格完整 |
| v1.0.0 Stable | 构建、类型、文档、测试、发布链路稳定；完成至少 1 个真实项目试用反馈闭环 |

---

## 2. 技术选型

### 2.1 核心栈

| 技术 | 版本 | 选型理由 |
|------|------|---------|
| Vue | 3.5+ | 最新稳定版，Composition API + 响应式系统 |
| TypeScript | 5.x | 完整类型推导、组件 Props 类型导出 |
| Vite | 6.x | 极速开发体验、库模式构建 |
| Scss | — | CSS Variables + Scss 双主题系统 |
| pnpm | 9.x | monorepo 管理、依赖隔离 |

### 2.2 构建工具

| 用途 | 工具 | 说明 |
|------|------|------|
| 组件构建 | Vite lib mode | 按需构建 + 全量构建双模式 |
| 样式构建 | Scss + PostCSS | 自动添加前缀，兼容性处理 |
| 类型导出 | vue-tsc | 生成 .d.ts 类型声明文件 |
| 代码检查 | ESLint + Prettier | 统一代码风格 |
| 提交规范 | commitlint + husky | 标准化 commit |
| 测试 | Vitest + Vue Test Utils | 单元测试 + 组件测试 |
| 文档 | VitePress | 组件文档站点 |

### 2.3 兼容性矩阵

| 项目 | 支持范围 | 说明 |
|------|---------|------|
| Vue | 3.5+ | 使用 Composition API，不提供 Vue 2 兼容 |
| TypeScript | 5.x | 组件 Props、Emits、实例方法均需导出类型 |
| Node.js | 20 LTS+ | 统一本地开发、CI、发布环境 |
| pnpm | 9.x | monorepo 工作区管理 |
| 浏览器 | Chrome / Edge / Firefox / Safari 最近两个稳定大版本 | 不主动兼容 IE |
| 构建工具 | Vite 6.x 优先 | 产物需保持 ESM 友好，支持现代 bundler |
| SSR / Nuxt | v1.0 前不作为强验收 | 组件内部避免直接在 setup 顶层访问 `window` / `document` |
| 暗色主题 | v0.9.0 前完成 | 通过 `[data-theme="dark"]` 和 CSS Variables 实现 |
| 国际化 | v1.0 前提供基础机制 | 日期、空状态、分页等内置文案可覆盖 |
| RTL | 暂不纳入首版 | 后续根据真实需求评估 |

### 2.4 monorepo 结构

```
along-ui/
├── packages/
│   ├── components/       # 所有组件源码
│   ├── theme/            # 主题系统 (CSS Variables + Scss)
│   ├── hooks/            # Composition API 工具函数
│   ├── icons/            # SVG 图标
│   ├── utils/            # 通用工具函数
│   └── along-ui/         # 聚合包（全量导出）
├── docs/                 # VitePress 文档站点
├── play/                 # 本地开发调试环境
├── internal/             # 构建配置工具链
└── ...
```

---

## 3. 项目目录结构

```
along-ui/
├── .github/
│   └── workflows/        # CI/CD 配置
├── docs/                 # VitePress 文档
│   ├── .vitepress/
│   ├── guide/            # 使用指南
│   ├── components/       # 组件文档
│   └── package.json
├── internal/
│   ├── build/            # 构建配置
│   └── eslint-config/    # ESLint 共享配置
├── packages/
│   ├── components/       # 组件库核心
│   │   ├── button/
│   │   │   ├── src/
│   │   │   │   ├── button.vue
│   │   │   │   ├── button.ts       # Props/Emits 类型
│   │   │   │   └── button-group.vue
│   │   │   ├── style/
│   │   │   │   └── index.scss
│   │   │   ├── __tests__/
│   │   │   └── index.ts            # 注册导出
│   │   ├── input/
│   │   ├── select/
│   │   └── ...
│   ├── hooks/            # 共享 hooks
│   │   ├── use-form/
│   │   └── use-focus/
│   ├── icons/            # SVG 图标
│   ├── theme/            # 主题
│   │   ├── src/
│   │   │   ├── variables.scss
│   │   │   ├── reset.scss
│   │   │   └── index.scss
│   │   └── package.json
│   ├── utils/            # 工具函数
│   │   ├── install.ts    # 组件注册辅助
│   │   └── dom.ts
│   └── along-ui/         # 聚合入口
│       ├── src/
│       │   └── index.ts
│       └── package.json
├── play/                 # 本地开发沙盒
│   ├── src/
│   │   └── app.vue
│   └── vite.config.ts
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

---

## 4. 研发路线图

### 4.1 总览

```
Phase 1 ──── Phase 2 ──── Phase 3 ──── Phase 4 ──── Phase 5
  基础搭建    核心组件    全面覆盖    文档发布     持续迭代
  2 周        6 周        6 周        2 周        永久
```

### 4.2 Phase 1：工程搭建（第 1-2 周）

| 任务 | 工时 | 产出 |
|------|------|------|
| 初始化 monorepo + pnpm workspace | 1d | 项目骨架 |
| 配置 TypeScript + ESLint + Prettier + commitlint + husky | 1d | 规范体系 |
| 搭建 Vite lib 构建配置 | 2d | 按需/全量构建 |
| 实现主题系统（CSS Variables + Scss） | 2d | `@along-ui/theme` 包 |
| 封装工具库（install.ts、dom.ts、shared 类型） | 1d | `@along-ui/utils` 包 |
| 搭建 play 开发沙盒 | 0.5d | 本地调试环境 |
| 搭建 VitePress 文档站点框架 | 1d | 文档站点基本结构 |
| 第一个组件（Button）完整开发 | 2d | Button + 文档 + 测试 |
| 定义组件开发模板和规范 | 0.5d | 组件开发标准 |

### 4.3 Phase 2：核心组件（第 3-8 周）

按以下顺序完成 13 个 P0 组件，每个组件包含：
- 组件代码（.vue + .ts）
- 样式代码（.scss）
- 单元测试（__tests__/）
- 文档页面（md）

详见 [Sprint 规划](#5-详细-sprint-规划)

### 4.4 Phase 3：全面覆盖（第 9-14 周）

完成 P1 和 P2 组件，完善图标系统，补充边缘情况处理。

### 4.5 Phase 4：文档与发布（第 15-16 周）

- 文档站全面审校
- 编写快速上手指南
- 迁移指南（Element Plus → alongUI 对照表）
- CHANGELOG 整理
- npm 发包

### 4.6 Phase 5：持续迭代

- Bug 修复
- 社区问题响应
- 性能优化
- P3 组件补充

---

## 5. 详细 Sprint 规划

### 5.1 Sprint 1-2：工程底座 + Button（2 周）

**目标：** 跑通完整的"开发 → 构建 → 演示 → 文档"链路。

```
Week 1 │ monorepo │ ts │ eslint │ vite build │ theme │ utils │ play
Week 2 │ Button 完整实现（5 variants × 3 sizes × loading/disabled/icon）
       │ Button  单元测试覆盖
       │ Button  文档页
       │ 组件开发模板定稿
```

### 5.2 Sprint 3：Icon + Tooltip + Loading（1 周）

```
Day 1-2 │ Icon 组件 + 图标集选取（先集成 heroicons 或自建 30+ 核心图标）
Day 3   │ Tooltip 组件（popper.js 轻量替代）
Day 4   │ Loading 指令 + 服务
Day 5   │ 单元测试 + 文档
```

### 5.3 Sprint 4：Input + Switch（1 周）

```
Day 1-3 │ Input（含 Textarea、prefix/suffix、clearable、字数统计）
Day 4   │ Switch
Day 5   │ 测试 + 文档
```

### 5.4 Sprint 5：Select（1.5 周）

```
Day 1-2 │ Select 基础功能（单选 + 搜索）
Day 3-4 │ Option + OptionGroup + 多选 + collapse-tags
Day 5-6 │ allow-create + remote 搜索
Day 7   │ 测试 + 文档
```

### 5.5 Sprint 6：Form（1.5 周）

```
Day 1-2 │ FormItem 组件 + 布局
Day 3-5 │ 校验引擎（支持 async、自定义校验、trigger 配置）
Day 6   │ 接入 Input / Select / Switch 的表单联动
Day 7   │ 测试 + 文档
```

### 5.6 Sprint 7：Table（2 周）

```
Week 1  │ Table 基础（data rendering、prop、slot、stripe、border）
        │ TableColumn（width、min-width、align、fixed）
Week 2  │ sortable、filter、highlight-current-row
        │ Table + Pagination 联动
        │ 测试 + 文档
```

### 5.7 Sprint 8：Pagination + Dialog + Message（1.5 周）

```
Day 1-2 │ Pagination（完整 layout 控制）
Day 3-5 │ Dialog（modal、拖拽、全屏、焦点锁定）
Day 6   │ Message（命令式 API）
Day 7   │ 测试 + 文档
```

### 5.8 Sprint 9：Menu 导航（1 周）

```
Day 1-3 │ Menu（vertical + horizontal 模式、SubMenu 展开/折叠）
Day 4-5 │ collapse 折叠模式、router 集成
Day 6-7 │ 测试 + 文档
```

### 5.9 Sprint 10+：P1/P2 组件

Sprint 10-11：Checkbox、Radio、DatePicker（基础版）
Sprint 12-13：Upload、Tree、Drawer、Notification、MessageBox、Popover
Sprint 14-16：Tabs、Stack、Grid、Center、Spacer、Container、Card、Tag、Badge、Progress、Skeleton、Empty、Avatar、Collapse、Breadcrumb、Steps、Divider、AlPage
Sprint 17-18：Cascader、Descriptions、Image、TimePicker、Slider、ColorPicker、Rate
Sprint 19-20：剩余 P3 组件 + 全量测试覆盖 + 文档完善

---

## 6. 组件研发顺序

### 6.1 依赖关系图

组件之间有依赖，正确的顺序可以减少返工。

```
第一阶段（无依赖，可并行）
├── Button
├── Icon
├── Tooltip        ← 依赖 Popper 核心
├── Loading        ← 依赖 vnode 渲染工具

第二阶段（依赖基础组件）
├── Input
├── Switch
├── Checkbox       ← 复用 Switch 的 checked 逻辑
├── Radio          ← 同 Checkbox

第三阶段（依赖表单+浮层）
├── Select         ← 依赖 Input + Tooltip + Dropdown(Popper)
├── Form           ← 依赖 Input/Select/Switch/Checkbox/Radio
├── Dialog         ← 依赖 Portal + FocusTrap + ScrollLocker
├── Message        ← 依赖 Portal + vnode 渲染

第四阶段（数据展示）
├── Table          ← 依赖 Checkbox + Pagination + Loading
├── Pagination     ← 依赖 Button
├── Menu           ← 依赖 Icon + Popper

第五阶段（后续组件，依赖基础 + 浮层体系）
├── DatePicker     ← 依赖 Input + Button + Popper
├── Upload         ← 依赖 Button + Progress
├── Tree           ← 依赖 Checkbox
├── Drawer         ← 依赖 Portal + ScrollLocker
├── Popover        ← 依赖 Popper
├── Notification   ← 依赖 vnode 渲染
├── Tabs
├── ...
```

### 6.2 研发批次

| 批次 | 组件 | 依赖 | 批次目标 |
|------|------|------|---------|
| **A** | Button、Icon | 无 | 跑通完整链路 |
| **B** | Tooltip、Loading | A | 浮层基础 + 指令基础 |
| **C** | Input、Switch、Checkbox、Radio | A | 表单基础 |
| **D** | Select、Form | A+B+C | 核心表单体系 |
| **E** | Table、Pagination | A+C | 数据展示核心 |
| **F** | Dialog、Message | A+B | 反馈体系基础 |
| **G** | Menu | A+B | 导航体系基础 |
| **H-Z** | 其余全部 | 以上 | 全面覆盖 |

---

## 7. 工程规范

### 7.1 编码规范

| 规范 | 标准 |
|------|------|
| 语言 | TypeScript 严格模式 |
| Vue API | `<script setup lang="ts"> + Composition API |
| 命名 | PascalCase（组件）/ camelCase（变量）/ kebab-case（文件） |
| Props 定义 | 使用 `defineProps` + 类型标注 |
| Emits 定义 | 使用 `defineEmits` + 类型标注 |
| 样式 | Scss + BEM 命名 |
| 代码检查 | ESLint + @typescript-eslint + vue-eslint-parser |
| 格式化 | Prettier（单引号、尾逗号、printWidth 100） |

### 7.2 组件规范

每个组件的标配：

```
component-name/
├── src/
│   ├── component-name.vue     # 模板 + 逻辑
│   ├── component-name.ts      # Props/Emits 类型定义
│   └── sub-component.vue      # 子组件（可选）
├── style/
│   └── index.scss             # 样式（BEM）
├── __tests__/
│   └── component-name.test.ts # 单元测试
├── index.ts                   # 导出 + 注册方法
└── README.md                  # 组件内部说明（可选）
```

### 7.3 Props 定义规范

```ts
// button.ts
import type { ExtractPropTypes, PropType } from 'vue'

export const buttonProps = {
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'>,
    default: 'default',
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default',
  },
  loading: Boolean,
  disabled: Boolean,
  // ...
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
```

### 7.4 Emits 定义规范

```ts
// button.ts
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceOf MouseEvent,
}
```

### 7.5 BEM 样式规范

```scss
// BEM: Block__Element--Modifier
.al-button { /* Block */ }
.al-button__text { /* Element */ }
.al-button--primary { /* Modifier */ }
.al-button.is-loading { /* State */ }
```

### 7.6 Git 规范

| 规范 | 标准 |
|------|------|
| 分支模型 | main / dev / feat/xxx / fix/xxx |
| Commit 格式 | `type(scope): message`（conventional commits） |
| Commit 类型 | feat / fix / style / refactor / test / docs / chore |
| 示例 | `feat(button): add circle variant` |
| | `fix(input): fix placeholder color in dark mode` |

### 7.7 代码审查清单

每个 MR 必须通过以下检查：

- [ ] TypeScript 编译无报错
- [ ] ESLint 无 error
- [ ] 单元测试全部通过
- [ ] 新组件有对应文档
- [ ] Props 有 JSDoc 注释
- [ ] 主题变量使用 CSS Variables，而非硬编码
- [ ] 键盘交互可用（Tab / Enter / Escape）
- [ ] 无 `any` 类型（特殊场景加 `// eslint-disable-next-line` 并说明理由）

### 7.8 API 兼容策略

alongUI 以 Element Plus 的主流使用心智为参考，但不承诺 100% API 复制。兼容策略如下：

| 类型 | 策略 | 示例 |
|------|------|------|
| 保持一致 | 高频组件、高频 Props、事件命名尽量贴近 Element Plus | `v-model`、`disabled`、`size`、`clearable` |
| 适度优化 | 对命名不清晰或历史包袱较重的 API，可采用更符合 Vue 3 的命名 | 组合式 hooks、类型导出、主题变量 |
| 明确标注 | 与 Element Plus 不一致的 API 必须在文档中标注差异 | 迁移指南、组件 API 表格 |
| 暂不支持 | 复杂但低频的能力可以延后，避免拖慢核心组件稳定性 | 高级动画、极端配置、历史兼容行为 |

每个核心组件文档需包含“与 Element Plus 差异”小节，至少说明：

- API 完全兼容项。
- API 命名差异。
- 暂未支持能力。
- 推荐迁移写法。

### 7.9 可访问性规范

| 组件类型 | 要求 |
|---------|------|
| 所有可交互组件 | 支持键盘聚焦，使用 `:focus-visible` 显示焦点环 |
| Button / Link | 正确设置原生语义，禁用态不可触发交互 |
| Input / Select / Form | 错误状态可被屏幕阅读器识别，错误文案与控件建立关联 |
| Dialog / Drawer | 打开后焦点进入浮层，关闭后焦点回到触发元素，支持 Esc 关闭 |
| Dropdown / Tooltip / Popover | 触发方式、展开状态、浮层内容需具备合理 ARIA 属性 |
| Table | 表头、排序状态、空状态语义清晰，复杂表格保留原生表格结构优先 |

基础标准：

- 色彩对比度满足 WCAG AA。
- 所有核心流程可通过键盘完成。
- 不依赖颜色作为唯一状态表达。
- 动画不得影响内容理解，后续可支持 `prefers-reduced-motion`。

### 7.10 质量门禁

每个 MR 合并前必须通过：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:docs
```

组件级完成定义：

- 组件代码、样式、类型、导出入口齐全。
- Props / Events / Slots / Exposes 文档完整。
- 默认态、禁用态、加载态、错误态、暗色主题至少覆盖基础样式。
- 单元测试覆盖基础渲染、Props、事件、插槽、关键交互。
- 复杂组件需要补充键盘交互和边界数据测试。
- 文档示例可直接复制运行。

---

## 8. 构建与发布

### 8.1 构建方案

双模式构建：

```bash
# 全量构建 — 输出一个完整 JS + CSS 文件
pnpm build:full

# 按需构建 — 每个组件独立输出
pnpm build:components
```

输出结构：

```
dist/
├── along-ui.js          # 全量（UMD）
├── along-ui.esm.js      # 全量（ESM）
├── along-ui.css         # 全量样式
├── button/
│   ├── index.js         # 按需
│   ├── style.css        # 按需样式
│   └── index.d.ts       # 类型
├── input/
└── ...
```

### 8.2 按需引入方案

```ts
// 手动按需
import { AlButton } from '@along-ui/components/button'
import '@along-ui/components/button/style'

// 推荐：使用 unplugin-vue-components 自动按需
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { AlongUIResolver } from 'along-ui-resolver'

export default {
  plugins: [
    Components({
      resolvers: [AlongUIResolver()],
    }),
  ],
}
```

### 8.3 发布策略

```bash
# npm 包结构
@along-ui/components     # 核心组件库
@along-ui/icons          # 图标库（可选）
@along-ui/hooks          # Composition API 工具
@along-ui/utils          # 工具函数
@along-ui/theme          # 主题系统
along-ui                 # 聚合入口（全量引入时用）
```

### 8.4 版本号规范

遵循 Semver（语义化版本）：

```
v0.1.0  — Alpha 内测
v0.9.0  — Beta 公测
v1.0.0  — 稳定版发布
v1.1.0  — 功能新增
v1.1.1  — Bug 修复
```

### 8.5 CI/CD

GitHub Actions：

```
on: push / pull request (main, dev)

jobs:
  lint:        ESLint + Prettier 检查
  type-check:  vue-tsc 类型检查
  test:        Vitest 单元测试
  build:       Vite 构建验证
  publish:     pnpm publish (on tag)
```

---

## 9. 测试策略

### 9.1 测试金字塔

```
     ╱╲
    ╱ E2E ╲          极少，关键用户流程
   ╱────────╲
  ╱ 组件测试  ╲      每个组件必测，覆盖交互状态
 ╱──────────────╲
╱  单元测试       ╲  工具函数、hooks、纯逻辑
╱──────────────────╲
```

### 9.2 组件测试覆盖标准

| 测试项 | 要求 | 示例 |
|--------|------|------|
| 渲染 | 默认渲染是否正确 | Button 渲染为 `<button>` |
| Props | 每种 Prop 组合 | `type="primary"` 添加对应 class |
| Slots | 插槽内容渲染 | `#prefix` 在输入框前面渲染 |
| Events | 事件触发 | `@click` 触发 `click` emit |
| 状态 | disabled/loading/readonly | disabled 时点击不触发事件 |
| 边界 | 空值、极长文本、特殊字符 | Input 空值不报错 |

### 9.3 测试工具

```ts
// vitest 配置
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      lines: 80,
      functions: 80,
      branches: 75,
    },
  },
})
```

### 9.4 组件测试示例

```ts
// button/__tests__/button.test.ts
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlButton } from '../index'

describe('Button.vue', () => {
  test('renders default button', () => {
    const wrapper = mount(AlButton, {
      slots: { default: 'Click Me' },
    })
    expect(wrapper.text()).toBe('Click Me')
    expect(wrapper.classes()).toContain('al-button')
  })

  test('type prop adds corresponding class', () => {
    const wrapper = mount(AlButton, {
      props: { type: 'primary' },
    })
    expect(wrapper.classes()).toContain('al-button--primary')
  })

  test('disabled prevents click', async () => {
    const wrapper = mount(AlButton, {
      props: { disabled: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  test('loading shows spinner', () => {
    const wrapper = mount(AlButton, {
      props: { loading: true },
    })
    expect(wrapper.find('.al-loading').exists()).toBe(true)
  })
})
```

---

## 10. 文档策略

### 10.1 VitePress 站点结构

```
docs/
├── index.md                 # 首页
├── guide/
│   ├── installation.md      # 安装指南
│   ├── quickstart.md        # 快速开始
│   ├── migration.md         # 从 Element Plus 迁移
│   └── theme.md             # 主题定制
├── components/              # 组件文档
│   ├── button.md
│   ├── input.md
│   └── ...
└── resources/
    └── changelog.md
```

### 10.2 每个组件文档页的标准结构

```
---
title: Button 按钮
description: 常用操作按钮，支持多种类型和尺寸。
---

# Button 按钮

## 基础用法
（代码示例 + 实时演示）

## 按钮类型
（type variants）

## 尺寸
（size variants）

## 状态
（loading / disabled）

## 按钮组
（ButtonGroup）

## API
### Props
（自动生成表格）

### Events
（自动生成表格）

### Slots
（自动生成表格）
```

### 10.3 文档设施

- 所有组件文档包含**在线演示**（VitePress 内置 Vue 组件渲染）
- Props/Events/Slots 表格**自动生成**（从 .ts 类型推导）
- 提供**中文版 + 英文版**（可选）
- 每个示例提供"复制代码"按钮

---

## 11. 版本规划

### 11.1 Release 计划

| 版本 | 时间 | 说明 |
|------|------|------|
| v0.1.0 | 第 8 周 | Alpha：P0 13 组件可用，可内部试用 |
| v0.5.0 | 第 12 周 | Beta：P0 + P1 组件（约 27 个），文档上线 |
| v0.9.0 | 第 16 周 | RC：全量 55 组件，文档完整，测试覆盖率 > 80% |
| v1.0.0 | 第 18 周 | 正式发布 |

### 11.2 里程碑

```
M1 ───── M2 ───── M3 ───── M4 ───── M5
脚手架    Alpha    Beta     RC       v1.0.0
第2周     第8周    第12周   第16周    第18周
```

### 11.3 发布检查清单

- [ ] 55 个组件全部实现
- [ ] 单元测试覆盖率 > 80%
- [ ] P0/P1 组件完成键盘交互自测
- [ ] 暗色主题核心页面走查通过
- [ ] TypeScript 类型完整导出
- [ ] 全量构建 + 按需构建验证通过
- [ ] Tree-shaking 验证通过，按需引入不包含无关组件代码
- [ ] SSR 构建无明显顶层 DOM 访问问题
- [ ] VitePress 文档完整
- [ ] 快速开始示例跑通
- [ ] 迁移指南编写完成
- [ ] Element Plus 差异说明覆盖 P0/P1 组件
- [ ] CHANGELOG 整理
- [ ] npm 包发布配置完成
- [ ] GitHub 仓库 README + 徽章 + 许可证

### 11.4 版本退出标准

| 阶段 | 退出标准 |
|------|---------|
| Alpha | P0 组件在 play 沙盒完成组合验证；内部后台页面可试用；无阻塞级构建问题 |
| Beta | P0/P1 组件 API 基本冻结；文档站可公开访问；按需引入链路稳定 |
| RC | 全量组件完成；破坏性 API 调整停止；只接受 Bug 修复、文档补充和小范围体验优化 |
| Stable | 完成真实项目试用反馈；发布流程可重复；CHANGELOG、迁移指南、README 完整 |

---

## 12. 关键风险与应对

| 风险 | 概率 | 影响 | 应对方案 |
|------|------|------|---------|
| DatePicker 实现复杂，远超预估 | 高 | 高 | 先做基础版（日期选择 + 范围），不追求日历动画、快捷选项等高级功能 |
| Table 固定列、排序、选择、展开等能力耦合复杂 | 高 | 高 | 先定义最小可用功能集，复杂能力分阶段实现并补充专项测试 |
| Select / Dropdown / Popover 浮层定位和键盘交互不稳定 | 中 | 高 | 优先沉淀 Popper 能力和焦点管理工具，复用统一浮层基础设施 |
| 组件间依赖导致阻塞 | 中 | 中 | 预处理依赖图，批次规划；被阻塞的团队先做独立组件 |
| 文档编写占用大量开发时间 | 高 | 中 | 每个组件实现后立即写文档，不积压；组件 API 表格自动化生成 |
| 与 Element Plus 的 API 不一致，用户迁移成本高 | 中 | 中 | 核心组件 API 设计参照 Element Plus，差异化部分在文档中加注 |
| 样式主题系统维护成本 | 中 | 低 | 严格 CSS Variables + Scss 双覆盖，不接受硬编码颜色值 |
| 按需加载导致构建产物体积大 | 低 | 中 | 每个组件独立构建，Tree-shaking 友好 |
| UI 库视觉一致性难以把控 | 低 | 高 | 建立组件审查制度，所有 MR 需要设计层面的 review |
| 暗色主题与语义色对比度不足 | 中 | 中 | 暗色主题单独走查，核心状态色补充对比度校验 |
| 真实业务使用反馈不足 | 中 | 高 | v0.5.0 后选择至少 1 个内部后台页面试用，问题进入版本退出标准 |

---

## 附录 A：工具链速查

```bash
# 开发
pnpm dev              # 启动 play 沙盒
pnpm dev:docs         # 启动文档站

# 代码质量
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm typecheck        # vue-tsc

# 测试
pnpm test             # 单次测试
pnpm test:watch       # 监听模式
pnpm test:coverage    # 覆盖率报告

# 构建
pnpm build            # 全量构建
pnpm build:components # 按需构建

# 发布
pnpm release          # 版本发布
```

## 附录 B：组件开发快速模板

```vue
<script setup lang="ts">
// component-name.ts 中定义 props 和 emits
import { componentNameProps, componentNameEmits } from './component-name'

defineOptions({ name: 'AlComponentName' })

const props = defineProps(componentNameProps)
const emit = defineEmits(componentNameEmits)

// 逻辑
</script>

<template>
  <div class="al-component-name"
    :class="[
      `al-component-name--${props.type}`,
      { 'is-disabled': props.disabled }
    ]"
  >
    <slot />
  </div>
</template>
```

```scss
// style/index.scss
@use '../../theme/src/variables' as *;

.al-component-name {
  // Block styles

  &--primary {
    // Modifier styles
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

```ts
// index.ts
import { withInstall } from '@along-ui/utils'
import _ComponentName from './src/component-name.vue'

export const AlComponentName = withInstall(_ComponentName)
export default AlComponentName
export * from './src/component-name'
```
