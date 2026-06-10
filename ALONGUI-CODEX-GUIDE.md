# ▎alongUI · Codex 开发指导手册

> **写给 Codex 的操作说明书** — 不是设计文档，是执行指令
> 目标是：Codex 按本手册产出的代码，视觉上像 Apple 做的，而不是像"又一个管理后台"

---

## 重要声明

Codex 你好，我是 alongUI 的设计师。以下是你开发时**必须遵守的硬性规则**。

这个 UI 库的设计语言对标 Apple（苹果公司），不是 Element Plus、不是 Ant Design、不是 Material Design。

你之前做 UI 习惯用蓝色主色、白色输入框、4px 圆角、蓝色 focus ring——**这些在这里全部禁用**。

---

## 第一章 · 颜色系统

### 1.1 核心色板（直接复制）

```scss
// ===== 中性色 · Apple 冷灰阶梯 =====
// 背景色
$bg-page:         #F5F5F7;   // 页面主背景（重要：不是白色）
$bg-card:         #FFFFFF;   // 卡片/浮层背景
$bg-sidebar:      #EBEBF0;   // 侧栏/面板背景
$bg-hover:        #E2E2E8;   // 悬浮/按压底色
$bg-input:        #F5F5F7;   // 输入框背景（重要：同页面色，不是白色）
$bg-elevated:     #FAFAFA;   // 悬浮高亮

// 文字色
$text-primary:    #1D1D1F;   // 标题/正文（重要：不是#333，不是#000）
$text-regular:    #3A3A3C;   // 常规文字
$text-secondary:  #6E6E73;   // 辅助文字
$text-placeholder:#AEAEB2;   // 占位符
$text-disabled:   #C7C7CC;   // 禁用文字
$text-inverse:    #FFFFFF;   // 反色（暗底用）

// 边框色
$border-default:  #D2D2D7;   // 默认边框
$border-light:    #E5E5EA;   // 浅边框
$border-lighter:  #F2F2F7;   // 极浅边框

// 品牌色（重要：用黑色为主色，不是蓝色）
$primary:         #1D1D1F;   // 主色 = 黑色（Apple 风格）
$primary-hover:   #3A3A3C;   // hover = 中灰
$primary-active:  #000000;   // active = 纯黑
$primary-bg:      #F5F5F7;   // 浅背景

// 语义色（Apple 原生色）
$success:         #30D158;   // Apple Green
$warning:         #FF9F0A;   // Apple Orange
$danger:          #FF453A;   // Apple Red
$info:            #007AFF;   // Apple Blue（只用作信息，不能做主色）
```

### 1.2 颜色使用线

#### ✅ 正确用法

| 元素 | 用哪个变量 | 为什么 |
|------|-----------|--------|
| 页面背景 | `$bg-page` / `#F5F5F7` | Apple 所有页面都是浅灰底 |
| 卡片背景 | `$bg-card` / `#FFFFFF` | 白色是浮层色，不能铺满页面 |
| 输入框背景 | `$bg-input` / `#F5F5F7` | **这一点最重要**——Apple 的输入框从来不是白色 |
| 标题文字 | `$text-primary` / `#1D1D1F` | 近黑不是纯黑，更柔和 |
| 辅助文字 | `$text-secondary` / `#6E6E73` | Apple 官网的副标题就是这个色 |
| 按钮主色 | `$primary` / `#1D1D1F` | **不是蓝色** |
| 成功状态 | `$success` / `#30D158` | Apple 原生绿 |
| 错误状态 | `$danger` / `#FF453A` | Apple 原生红 |

#### ❌ 常见错误（Codex 你最容易犯的）

```
✗ 用 #1890FF 或 #409EFF 或 #1677FF 做主色       → 改成 #1D1D1F
✗ 用 #333 或 #000 做文字色                       → 改成 #1D1D1F
✗ 用 #fff 做页面背景                             → 改成 #F5F5F7
✗ 用白色做输入框背景                              → 改成 #F5F5F7
✗ 用 #dc3545 或 #f5222d 做错误色                 → 改成 #FF453A
✗ 用 #52c41a 做成功色                            → 改成 #30D158
✗ 用 #faad14 做警告色                            → 改成 #FF9F0A
✗ 用 #ddd 或 #e8e8e8 做边框                      → 改成 #D2D2D7 或 #E5E5EA
✗ 用 box-shadow: 0 2px 8px rgba(0,0,0,0.15)     → 透明度不得超过 0.1
```

### 1.3 暗色色板

```
亮色                 →  暗色
#F5F5F7  页面背景     →  #1C1C1E   （不是 #000）
#FFFFFF  卡片背景      →  #2C2C2E
#EBEBF0  侧栏         →  #3A3A3C
#1D1D1F  标题字       →  #F5F5F7
#6E6E73  辅助字       →  #AEAEB2
#D2D2D7  边框         →  #48484A
```

暗色规则：不用纯黑背景（伤眼），不用纯白文字（刺眼），卡片之间靠色阶区分（不加阴影）。

---

## 第二章 · 圆角系统

### 2.1 固定数值（直接复制）

```scss
$radius-xs:    4px;    // Badge、Tag、极小元素
$radius-sm:    6px;    // Button、Input、Select、Tooltip  ← 最常用
$radius-md:    8px;    // Card、Dropdown、普通卡片
$radius-lg:    12px;   // Modal、Drawer、Popover、大卡片
$radius-xl:    16px;   // 特大卡片、页面级容器
$radius-full:  999px;  // Switch 轨道、Tag 胶囊、Badge
```

### 2.2 圆角匹配表（照着做就行）

| 组件 | 尺寸 | 圆角 | 等于 |
|------|------|------|------|
| Button | 28-44px | 6px | `$radius-sm` |
| Input | 36px | 6px | `$radius-sm` |
| Select | 36px | 6px | `$radius-sm` |
| Card | ~200-400px | 8px | `$radius-md` |
| Modal | ~520px | 12px | `$radius-lg` |
| Tooltip | 小浮层 | 6px | `$radius-sm` |
| Tag | 小标签 | 999px | `$radius-full` |
| Switch | 24px 高 | 999px | `$radius-full` |

### 2.3 常见错误

```
✗ 所有组件统一 4px 圆角                → 改成 6px
✗ 卡片用 4px 圆角                     → 改成 8px
✗ 弹窗用 4px 或 8px                   → 改成 12px
✗ Tag 用 4px 圆角                     → 改成 999px（胶囊）
✗ 按钮用 20px 圆角                    → 改成 6px
```

---

## 第三章 · 间距系统

### 3.1 间距变量

```scss
$space-1:   4px;    // 图标与文字间距
$space-2:   8px;    // 紧凑间距
$space-3:   12px;   // 按钮水平内边距
$space-4:   16px;   // 卡片 padding / 组件间距
$space-5:   20px;   // 宽松间距
$space-6:   24px;   // 表单项间距
$space-8:   32px;   // 章节间距
$space-10:  40px;   // 大区块
$space-12:  48px;   // 页面级
$space-16:  64px;   // 超大
```

### 3.2 间距速查表

| 场景 | 数值 | 变量 |
|------|------|------|
| 按钮文字左右边距 | 16px | `$space-4` |
| 按钮文字与图标间距 | 4px | `$space-1` |
| 卡片 padding | 16px | `$space-4` |
| 输入框文字左右边距 | 12px | `$space-3` |
| 表单项间距（上下） | 24px | `$space-6` |
| 表格单元格 padding | 12px | `$space-3` |
| 弹窗 footer 上边距 | 20px | `$space-5` |
| 弹窗 padding | 24px | `$space-6` |

### 3.3 错误

```
✗ 间距用 10px、14px、18px 等非 4 倍数       → 改成 8/12/16/20/24
✗ 按钮内边距用 10px                         → 改成 12px 或 16px
✗ 卡片 padding 用 20px or 24px              → 统一 16px（Apple 标准）
✗ 弹窗 padding 用 16px                      → 改成 24px
```

---

## 第四章 · 阴影系统

### 4.1 阴影值

```scss
$shadow-sm:  0 1px 3px rgba(0,0,0,0.04);    // 卡片 · 几乎看不见
$shadow-md:  0 2px 8px rgba(0,0,0,0.06);    // Dropdown · 极淡
$shadow-lg:  0 8px 24px rgba(0,0,0,0.10);   // Modal · 最大
```

### 4.2 使用对照

```
卡片         → $shadow-sm
下拉菜单      → $shadow-md
Popover      → $shadow-md
Tooltip      → $shadow-sm
Modal        → $shadow-lg
Drawer       → $shadow-lg
Toast        → $shadow-md
```

### 4.3 红线

```
✗ 透明度超过 0.1                         → Apple 的阴影极其克制
✗ 使用 spread（第四值）                  → 不要用
✗ 使用 inset                            → 不要用
✗ 使用彩色阴影                           → 只用黑色 rgba
✗ 给所有元素都加阴影                      → 只有浮层才加阴影
```

---

## 第五章 · 排版系统

### 5.1 字号

```scss
$font-size-title1:    28px;   // 页面标题（Apple 最小大标题）
$font-size-title2:    22px;   // 模块标题
$font-size-title3:    18px;   // 卡片标题
$font-size-headline:  15px;   // 强调正文（600 weight）
$font-size-body:      14px;   // 默认正文
$font-size-callout:   13px;   // 标注
$font-size-subhead:   12px;   // 脚注
$font-size-footnote:  11px;   // 极小
```

### 5.2 字重

```scss
$weight-regular:  400;   // 正文
$weight-medium:   500;   // 按钮、Tab、标签栏
$weight-semibold: 600;   // 卡片标题
$weight-bold:     700;   // 大标题
```

### 5.3 字体栈

```scss
$font-sans: -apple-system, 'SF Pro SC', 'SF Pro Text', 'Helvetica Neue',
            'PingFang SC', 'Microsoft YaHei', sans-serif;
$font-mono: 'SF Mono', 'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
```

### 5.4 使用规范

```
页面大标题                 → 28px Bold
卡片标题                   → 15px Semibold
正文                       → 14px Regular
辅助文字                   → 13px Regular
小标签文字                 → 12px Medium
按钮文字                   → 14px Medium
表格表头                   → 12px Semibold（全部大写）
表格内容                   → 13px Regular
```

---

## 第六章 · 组件模板

以下是你开发每个组件时的**精确模板**。

### 6.1 Button 按钮

```vue
<template>
  <button
    class="al-button"
    :class="[
      `al-button--${type}`,
      `al-button--${size}`,
      { 'is-disabled': disabled },
      { 'is-loading': loading },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="al-button__spinner" />
    <span v-if="icon && !loading" class="al-button__icon">
      <component :is="icon" />
    </span>
    <span v-if="$slots.default" class="al-button__text">
      <slot />
    </span>
  </button>
</template>
```

**样式要点：**
```scss
.al-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;                    // 默认高度
  padding: 0 16px;                 // 左右内边距
  border: none;
  border-radius: 6px;              // $radius-sm
  font-size: 14px;                 // 按钮文字
  font-weight: 500;                // $weight-medium
  cursor: pointer;
  gap: 6px;                        // 图标与文字的间距
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:active { transform: scale(0.97); }

  // 类型
  &--fill { background: #1D1D1F; color: #FFFFFF; }
  &--fill:hover { background: #3A3A3C; }
  &--gray { background: #F5F5F7; color: #1D1D1F; }
  &--gray:hover { background: #E2E2E8; }
  &--text { background: transparent; color: #1D1D1F; padding: 0 8px; }
  &--text:hover { text-decoration: underline; }

  // 尺寸
  &--small { height: 28px; padding: 0 12px; font-size: 13px; }
  &--large { height: 44px; padding: 0 20px; font-size: 15px; }

  // 禁用态（不准用红色）
  &.is-disabled { opacity: 0.4; pointer-events: none; }
}
```

### 6.2 Input 输入框

```vue
<template>
  <div class="al-input" :class="{ 'is-disabled': disabled, 'is-focused': isFocused }">
    <span v-if="$slots.prefix" class="al-input__prefix"><slot name="prefix" /></span>
    <input
      class="al-input__inner"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <span v-if="clearable && modelValue" class="al-input__suffix" @click="onClear">✕</span>
    <span v-if="$slots.suffix" class="al-input__suffix"><slot name="suffix" /></span>
  </div>
</template>
```

**样式要点（** 最重要的一条 **）：**
```scss
.al-input__inner {
  width: 100%;
  height: 36px;                          // 默认高度
  padding: 0 12px;                       // 左右内边距
  border: 1px solid #D2D2D7;            // $border-default
  border-radius: 6px;                   // $radius-sm
  background: #F5F5F7;                  // ← 关键：灰色背景，不是白色
  font-size: 14px;                      // $font-size-body
  color: #1D1D1F;                       // $text-primary
  outline: none;
  transition: border-color 0.2s;

  &::placeholder { color: #AEAEB2; }    // $text-placeholder

  &:focus { border-color: #1D1D1F; }    // ← 关键：聚焦边框变黑，不是蓝色
  &:hover { background: #E2E2E8; }      // ← hover 背景微变
}
```

### 6.3 Select 选择器

与 Input 完全一样的视觉风格：

```scss
.al-select {
  // 跟 Input 完全一样
  height: 36px;
  padding: 0 12px;
  border: 1px solid #D2D2D7;
  border-radius: 6px;
  background: #F5F5F7;                  // ← 灰色背景
  font-size: 14px;
  color: #1D1D1F;
  outline: none;
  // 自定义下拉箭头（SVG）
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}
```

### 6.4 Checkbox

```scss
.al-checkbox-box {
  width: 18px;                         // 固定大小
  height: 18px;
  border: 1.5px solid #D2D2D7;        // 默认边框色
  border-radius: 5px;                  // 微圆角
  background: white;

  &.checked {
    background: #1D1D1F;               // 选中变黑
    border-color: #1D1D1F;
    // 白色勾号
    &::after {
      content: '';
      width: 5px; height: 9px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}
```

### 6.5 Switch

```scss
.al-switch-track {
  width: 44px;                         // 宽度
  height: 24px;                        // 高度（比例 ~1.83:1）
  background: #D2D2D7;                 // 关态灰色
  border-radius: 999px;                // 全圆角
  position: relative;
  cursor: pointer;

  &.on { background: #30D158; }        // Apple Green

  .al-switch-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: left 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);

    .on & { left: 22px; }             // 滑到右侧
  }
}
```

### 6.6 Modal 弹窗

```scss
.al-modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.3);         // Apple 遮罩
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}

.al-modal {
  background: #FFFFFF;
  border-radius: 12px;                 // $radius-lg
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);  // $shadow-lg
  width: 480px;
  padding: 24px;                       // 弹窗 padding = 24px（大于卡片）
}

.al-modal__title {
  font-size: 15px;                     // 弹窗标题
  font-weight: 600;
  margin-bottom: 12px;
}

.al-modal__footer {
  display: flex; justify-content: flex-end; gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #E5E5EA;      // $border-light
}
```

### 6.7 Table 表格

```scss
.al-table {
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 10px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #6E6E73;                   // 表头用小号辅助色
    border-bottom: 1px solid #E5E5EA;
    letter-spacing: 0.3px;
    text-transform: uppercase;        // 表头大写（Apple 风格）
  }

  td {
    padding: 12px;
    font-size: 13px;
    border-bottom: 1px solid #F2F2F7; // 行分割线极浅
  }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #FAFAFA; }
}
```

### 6.8 Card 卡片

```scss
.al-card {
  background: #FFFFFF;
  border-radius: 8px;                  // $radius-md
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);  // $shadow-sm（极淡）
  padding: 16px;                       // 卡片 padding 统一 16px
}
```

**不要**加边框。Apple 的卡片靠极淡阴影区分，不是靠边框。

---

## 第七章 · 焦点样式

### 7.1 最常被忽略的规则

```scss
// ✅ 正确的 focus 样式
*:focus-visible {
  outline: 2px solid #1D1D1F;          // 黑色 outline，不是蓝色
  outline-offset: 2px;
}

// ❌ 错误
*:focus { outline: none; }             // 永远不要裸移除 outline
*:focus-visible { outline: 2px solid #007AFF; }  // 不准用蓝色
```

### 7.2 规则

- 使用 `:focus-visible`（不是 `:focus`），鼠标点击时不显示 focus ring
- Focus ring 颜色 = `#1D1D1F`（黑色），宽度 = 2px，偏移 = 2px
- 圆角匹配当前元素的 border-radius

---

## 第八章 · 布局组件规范

### 8.1 AlContainer

```scss
.al-container {
  margin: 0 auto;                      // 居中
  width: 100%;
  padding: 0 16px;                     // 左右安全边距

  &.is-fluid { max-width: none; }
  &.size-sm { max-width: 640px; }
  &.size-md { max-width: 768px; }
  &.size-lg { max-width: 1024px; }
  &.size-xl { max-width: 1200px; }
}
```

### 8.2 AlStack

基于 Flex 的智能堆叠：

```scss
.al-stack {
  display: flex;
  flex-direction: column;              // 默认垂直
  gap: 16px;                           // 默认间距 4 → 映射到 $space-4

  &.is-row { flex-direction: row; }
  &.is-wrap { flex-wrap: wrap; }
  &.is-distributed { > * { flex: 1; } }
}
```

`spacing` 属性映射：`spacing="2"` → `gap: 8px`（$space-2），`spacing="6"` → `gap: 24px`（$space-6）。

### 8.3 AlGrid

```scss
.al-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);  // 默认 3 列
}
```

`columns` 为数字时生成 `repeat(N, 1fr)`。为对象时适配响应式。

---

## 第九章 · 开发验收清单

**每个组件在做 PR 前必须自检的清单。**

```
□ 颜色全部来自 Apple 色板，没有硬编码的 #1890FF、#333、#ddd、#fff
□ 输入框背景是 #F5F5F7 而不是白色
□ 按钮主色是 #1D1D1F（黑色）而不是蓝色
□ Focus 样式是黑色 (2px #1D1D1F) 而不是蓝色
□ 圆角符合大小对应表（Button=6px, Card=8px, Modal=12px）
□ 字体用了 -apple-system，字号在 Apple 阶梯里
□ 阴影透明度不超过 0.1
□ 禁用态用 opacity:0.4，没有变色
□ 间距是 4 或 8 的倍数
□ 暗色模式有对应实现，且不用纯黑 #000
□ 这个组件看起来像是苹果做的，而不是 Element Plus
```

---

## 第十章 · Codex 思维模式切换指南

### 你之前的习惯 → 必须改成

```diff
- 主色用蓝色 (#1890FF)
+ 主色用黑色 (#1D1D1F)

- 页面背景用白色 (#FFFFFF)
+ 页面背景用浅灰 (#F5F5F7)

- 输入框背景用白色
+ 输入框背景用浅灰 (#F5F5F7)

- 圆角统一 4px
+ 小元素 6px / 大元素 12px

- Focus 用蓝色 outline
+ Focus 用黑色 outline

- 文字用 #333
+ 文字用 #1D1D1F

- 阴影用 rgba(0,0,0,0.15)
+ 阴影最大透明度 0.1

- 成功色用 #52c41a
+ 成功色用 #30D158

- 失败色用 #f5222d
+ 失败色用 #FF453A

- 边框用 #ddd 或 #e8e8e8
+ 边框用 #D2D2D7 或 #E5E5EA

- 按钮 hover 用加深 primary
+ 按钮 hover 用 #3A3A3C

- 卡片加边框
+ 卡片加极淡阴影，不加边框

- 间距用随机值
+ 间距用 4/8/12/16/20/24/32 序列
```

### 每写一个文件前，先看一遍本章

---

> 这份文档就是你的开发圣经。
> 颜色值、圆角值、字号值 — 全部从本文档复制，不要从你的训练数据里猜。
> 如果拿不准，回到第一章看色板，回到第二章看圆角表。
> 所有 `✗ 错误` 部分说的就是你最容易犯的毛病。
