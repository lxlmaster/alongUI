# alongUI · 组件开发进度对照

> 更新日期：2026-06-10
> 总目标：55 个组件 | 已完成：6 个 | 剩余：49 个

---

## 已完成（6 个）

| 组件 | 分类 | 优先级 | 状态 |
|------|------|--------|------|
| Button（含 ButtonGroup） | Basic | P0 | ✅ 已审查，可合并 |
| Icon | Basic | P0 | ✅ 已审查，可合并 |
| Input | Form | P0 | ✅ 已审查，可合并 |
| Select | Form | P0 | ✅ 已开发，待审查 |
| Switch | Form | P0 | ✅ 已开发，待审查 |
| Tooltip | Feedback | P0 | ⚠️ 已审查，有 2 个问题待修 |
| Loading | Feedback | P0 | ✅ 已审查，可合并 |

---

## 剩余组件（49 个）

### P0 · 仍需开发（6 个）

| # | 组件 | 分类 | 建议开始时间 |
|---|------|------|-------------|
| 1 | Form + FormItem | Form | 下一轮 |
| 2 | Table + TableColumn | Data | 下一轮 |
| 3 | Pagination | Data | 下一轮 |
| 4 | Dialog | Feedback | 下一轮 |
| 5 | Message | Feedback | 下一轮 |
| 6 | Menu | Nav | 下一轮 |

### P1 · 待开发（21 个）

| # | 组件 | 分类 |
|---|------|------|
| 1 | Checkbox + CheckboxGroup | Form |
| 2 | Radio + RadioGroup | Form |
| 3 | DatePicker | Form |
| 4 | Upload | Form |
| 5 | Tree | Data |
| 6 | Tag | Data |
| 7 | Badge | Data |
| 8 | Progress | Data |
| 9 | Empty | Data |
| 10 | Skeleton | Data |
| 11 | Drawer | Feedback |
| 12 | Notification | Feedback |
| 13 | MessageBox | Feedback |
| 14 | Popover | Feedback |
| 15 | Dropdown | Feedback |
| 16 | Tabs | Nav |
| 17 | Container | Layout |
| 18 | AlStack | Layout |
| 19 | AlGrid | Layout |
| 20 | Avatar | Other |
| 21 | Card | Other |

### P2 · 待开发（14 个）

Link、Typography、Cascader、TimePicker、Slider、Collapse、Descriptions、Breadcrumb、Steps、Divider、AlCenter、AlSpacer、AlPage、Image

### P3 · 待开发（7 个）

ColorPicker、Rate、Carousel、Calendar、Video、Affix、BackTop

---

## 缺失的关键基础设施

| 项目 | 状态 | 说明 |
|------|------|------|
| 文档站点（VitePress） | ✅ 已搭建 | docs/ 目录存在 |
| 主题系统 | ✅ 已完成 | variables.scss + dark mode |
| 图标集（@along-ui/icons） | ⚠️ 仅 LoadingIcon | 缺完整的图标库 |
| 按需构建配置 | ✅ 已完成 | vite.components.config.ts |
| 全量构建配置 | ✅ 已完成 | vite.full.config.ts |
| Play 沙盒 | ✅ 已完成 | play/ 目录可用 |
| 单元测试 | ⚠️ 部分 | Button/Icon/Input/Loading/Tooltip 有，Select/Switch 有待审查 |
| VitePress 文档 | ❌ 未开始 | 没有组件文档 .md 页面 |

---

## 下一轮建议开发顺序

```
Round 1: Form → Table → Dialog        (核心表单+数据+反馈体系)
Round 2: Menu → Pagination → Message  (导航+分页+消息)
Round 3: Checkbox → Radio → Tag       (基础补充，可与 Round 1 并行)
```
