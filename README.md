# alongUI

基于 **Vue 3 + TypeScript + SCSS + Vite** 的企业级 PC 后台 UI 组件库。

alongUI 旨在提供覆盖 Element Plus 级别完整度的组件体系，同时在视觉语言上追求更简洁、克制的表达——受 Apple 设计风格启发的中性色调、微圆角、强一致的设计 Token 系统。

---

## 特性

- 🧩 **60+ 组件** — 从布局、导航、表单到数据展示、反馈，覆盖后台系统全场景
- 🎨 **Apple 风格视觉** — 黑色主色调、中性灰表面、6px 圆角、克制约束与呼吸感留白
- 📐 **强 Token 系统** — 全局设计 Token 驱动，一键换肤，风格统一
- ⚡ **TypeScript 优先** — 完整的类型推导，IDE 智能提示拉满
- 🧪 **Play 沙盒** — 本地开发实时预览调试
- 📖 **VitePress 文档** — 组件文档与示例一体化

## 组件一览

| 类别 | 组件 |
|------|------|
| 基础 | Button、Icon、Link、Typography、Center |
| 布局 | Container、Grid、Spacer、Stack、Divider |
| 导航 | Menu、Tabs、Breadcrumb、Dropdown、Pagination、Steps、Affix |
| 表单 | Input、Select、Switch、Radio、Checkbox、Form、Rate、Slider、ColorPicker、DatePicker、TimePicker、Cascader、Upload |
| 数据展示 | Table、Tree、Card、Collapse、Carousel、Calendar、Descriptions、Image、Video、Skeleton、Tag、Badge、Avatar、Progress |
| 反馈 | Dialog、Drawer、Message、MessageBox、Notification、Popover、Tooltip、Loading |
| 其他 | Empty、Page、Backtop |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发沙盒
pnpm dev

# 启动文档站点
pnpm dev:docs
```

## 目录结构

```text
packages/
  components/    组件源码、样式、测试
  theme/         设计 Token 与全局样式
  hooks/         组合式 API 工具函数
  icons/         图标组件
  utils/         通用工具
  along-ui/      完整安装入口
docs/            VitePress 文档站点
play/            本地开发沙盒
internal/        构建与内部工具配置
project/         项目规划与设计文档
```

## 文档与资源

- [项目规划](./project/planning/ALONGUI-PROJECT-PLAN.md)
- [组件设计](./project/planning/ALONGUI-COMPONENTS.md)
- [设计 Token](./project/design/ALONGUI-DESIGN-TOKENS.md)
- [色彩预览](./project/design/ALONGUI-COLOR-PREVIEW.html)

## 开发

```bash
# 构建组件库
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint
```

---

> alongUI — 简洁、克制、一致。
