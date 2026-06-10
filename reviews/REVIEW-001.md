# alongUI Review Report · #001

**日期：** 2026-06-10
**审查对象：** Phase 1 基础工程 + Button / Input / Icon / Tooltip / Loading
**审查人：** alongUI Reviewer

---

## 1. 总体评价

工程底座质量不错。色板准确，组件结构规范。但存在 4 个需要修复的问题和 3 个可以优化的建议。整体评分 **B+**。

---

## 2. 视觉问题

| # | 组件 | 问题 | 严重程度 | 依据 |
|---|------|------|---------|------|
| 1 | **全局** | `:focus-visible` 颜色正确但缺了 dark 模式适配 | 🟡 中等 | reset.scss 中 outline 用 var(--al-color-primary) 在暗色下会是 #1D1D1F 黑色，但暗色背景上黑色 outline 看不见，必须改为亮暗色自适应 |
| 2 | **Button** | large 尺寸字号写了 16px 但规范是 15px | 🟢 轻微 | Apple 规范 large 按钮字号为 15px，代码里是 16px |
| 3 | **Tooltip** | 背景用了硬编码 rgba(29,29,31,0.94) 而不是 CSS 变量 | 🟢 轻微 | 应该用 --al-bg-color-elevated 等变量，保证暗色下自动适配 |
| 4 | **Loading** | 遮罩背景硬编码白色 rgba(255,255,255,0.72)，暗色硬编码 dark，但代码是亮的 | 🟡 中等 | 应该统一用 CSS 变量，而非在两个地方手写 |

---

## 3. 功能问题

| # | 组件 | 问题 | 严重程度 |
|---|------|------|---------|
| 1 | **Tooltip** | `display: inline-flex` 导致 Tooltip 包裹块级元素时布局异常 | 🟡 中等 | 应该考虑 block/ inline 自适应 |
| 2 | **Input** | `showWordLimit` 拼写应为 `show-word-limit`（kebab-case），但 TS Prop 是 `showWordLimit`（camelCase），建议保持一致但需确认文档对齐 | 🟢 轻微 |

---

## 4. 共性问题

| # | 问题 | 涉及组件 |
|---|------|---------|
| 1 | 部分样式用了硬编码色值而不是 CSS 变量 | Tooltip、Loading |
| 2 | `:focus-visible` 只在亮色下可见，暗色背景不可见 | 全局 reset |

---

## 5. 改进建议

### 5.1 优先级高（建议立即改）

**1. 暗色模式下的 focus-visible 不可见**

reset.scss 中：
```scss
*:focus-visible {
  outline: 2px solid var(--al-color-primary);  // 暗色下 = #1D1D1F 黑底黑框
}
```
应该改成加 outline 亮度适应：
```scss
*:focus-visible {
  outline: 2px solid var(--al-color-primary);
  outline-offset: 2px;
}
[data-theme="dark"] *:focus-visible {
  outline-color: var(--al-text-color-primary);  // #F5F5F7 白色 outline
}
```

### 5.2 优先级中（下个迭代改）

**2. Button large 字号 16px → 15px**

### 5.3 优先级低（后续优化）

**3. Tooltip 硬编码颜色收进 CSS 变量**
**4. Input 的 `has()` 选择器兼容性注意**

---

## 6. 做对了的（值得肯定 👍）

| 项目 | 说明 |
|------|------|
| 色板 | Apple 色板完全正确，一个错色都没有 |
| Button 默认态 | 灰底 `#F5F5F7`，完美 |
| Button focus-visible | 用 `var(--al-color-primary)` 而不是蓝色，正确 |
| Input 背景 | 灰色 `var(--al-bg-color-input)` 而不是白色 ✅ |
| Input focus 边框 | `var(--al-color-primary)` 黑色而不是蓝色 ✅ |
| 禁用态 | `opacity: 0.4` ✅ 没有变红/变灰 |
| 组件目录结构 | 完全符合规范，src/style/__tests__/index.ts 齐备 |
| BEM 命名 | 正确 |
| Button Group | 实现正确（-1px margin + 首尾圆角处理） |
| Loading 毛玻璃 | `backdrop-filter: blur(12px)` Apple 风格 ✅ |
| Icon 组件 | 简洁，`1em` 设计 ✅ |

---

## 7. 附件

### 组件完成度

| 组件 | 状态 | 问题数 |
|------|------|--------|
| Button | ✅ 可合并 | 1 轻微 |
| ButtonGroup | ✅ 可合并 | 0 |
| Icon | ✅ 可合并 | 0 |
| Input | ✅ 可合并 | 1 轻微建议 |
| Tooltip | ⚠️ 建议修复后合并 | 2 中等 |
| Loading | ✅ 可合并 | 1 轻微 |

**总评：** 可以合并，建议下个迭代修复标注的问题。
