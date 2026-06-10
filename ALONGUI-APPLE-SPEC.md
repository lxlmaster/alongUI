# ▎alongUI · Apple HIG 设计语言规格书

> 设计师案 · 纯正 Apple 视觉基因 · 直接指导工程实现
> 对标：macOS / visionOS 设计语言，降维到 Web 中后台场景

---

## 目录

1. [Apple 设计哲学](#1-apple-设计哲学)
2. [色彩体系](#2-色彩体系)
3. [排版体系](#3-排版体系)
4. [圆角体系](#4-圆角体系)
5. [阴影与层级](#5-阴影与层级)
6. [间距与留白](#6-间距与留白)
7. [材质与动效](#7-材质与动效)
8. [图标风格](#8-图标风格)
9. [按钮规范](#9-按钮规范)
10. [表单规范](#10-表单规范)
11. [组件尺寸锚点](#11-组件尺寸锚点)
12. [暗色主题](#12-暗色主题)
13. [与竞品的视觉差异](#13-与竞品的视觉差异)
14. [设计资源](#14-设计资源)

---

## 1. Apple 设计哲学

### 1.1 核心原则

Apple 的 UI 语言不是"极简主义"——而是**明晰**、**沉浸**、**尊重内容**。

| 原则 | 说明 | 在沿UI中的体现 |
|------|------|---------------|
| **Deference（尊重内容）** | UI 不应争夺注意力，内容为王 | 大面积留白、低干扰背景、克制的色彩 |
| **Clarity（明晰）** | 一屏只做一件事，信息层级清晰 | 文字层级泾渭分明、无冗余装饰 |
| **Depth（纵深）** | 通过分层建立空间感 | 阴影层级、z-index 体系、Mac 式毛玻璃 |

### 1.2 视觉锚点

```
┌──────────────────────────────────────────┐
│  Apple 的 UI ≈ 干净的白底 + 灰色阶梯     │
│              7px 圆角 + 1px 浅灰边框     │
│              三档阴影 + 内容撑满留白      │
│              正文 14px + 大标题 30px      │
└──────────────────────────────────────────┘
```

### 1.3 灵魂三问（设计决策判断标准）

做每个组件时，问三个问题：

1. **去掉这个元素，页面会更好吗？** → 是 → 去掉
2. **这个边框真的需要吗？** → 不需要 → 用分割线或留白代替
3. **这个颜色有语义吗？** → 只是好看 → 换成灰色

---

## 2. 色彩体系

### 2.1 完整色板

Apple 的灰阶不是纯灰（#333 这种），而是**带暖调的冷灰**，视觉上更"高级"。

```
Light Mode 亮色主题：

 背景色                              文字色                           边框色
 ┌────────────┐                     ┌────────────┐                  ┌────────────┐
 │ #FFFFFF    │ 卡片/浮层            │ #1D1D1F    │ 标题/正文       │ #D2D2D7    │ 默认边框
 │ #F5F5F7    │ 页面背景(app背景)    │ #3A3A3C    │ 常规文字       │ #E5E5EA    │ 浅边框
 │ #EBEBF0    │ 侧栏/面板背景       │ #6E6E73    │ 辅助/说明      │ #F2F2F7    │ 极浅
 │ #E2E2E8    │ 悬停/按压底色       │ #AEAEB2    │ 占位符         │            │
 │ #FAFAFA    │ 悬浮高亮            │ #C7C7CC    │ 禁用文字        │            │
 └────────────┘                     │ #FFFFFF    │ 反色(暗底)      │            │
                                    └────────────┘                            
```

**关键色值记忆口诀：**

| 角色 | 色值 | 一句话 |
|------|------|--------|
| 页面底 | `#F5F5F7` | Apple 官网背景色，一级浅灰 |
| 卡片底 | `#FFFFFF` | 纯白做浮层 |
| 侧栏底 | `#EBEBF0` | Apple 设置面板侧栏色 |
| 标题字 | `#1D1D1F` | Apple.com 标题色，近黑但不过纯黑 |
| 辅助字 | `#6E6E73` | Apple 副标题色，舒服的中灰 |
| 默认边 | `#D2D2D7` | 最常用的边框色，不刺眼 |

### 2.2 Brand 品牌色

**不要用蓝色作为主色。** 既然定位"Apple 风格"，那就走 Apple 的核心识别色：

```css
/* 建议方案 A：Apple 经典蓝（保守） */
--al-color-primary:          #007AFF;  /* Apple 系统蓝 */
--al-color-primary-hover:    #4DA3FF;  /* hover 提亮 30% */
--al-color-primary-active:   #0055CC;  /* pressed 压暗 */
--al-color-primary-bg:       #E8F2FF;  /* 浅蓝底 */

/* 建议方案 B：纯黑白（激进 · 更 Apple） */
--al-color-primary:          #1D1D1F;  /* 主色 = 纯黑 */
--al-color-primary-hover:    #3A3A3C;  /* hover = 中灰 */
--al-color-primary-active:   #000000;  /* pressed = 纯黑 */
--al-color-primary-bg:       #F5F5F7;  /* 浅色背景 = 页面色 */
```

**推荐方案 B。** 原因：Apple 官网和 macOS 里，"主操作"往往就是黑色文字/黑色按钮。蓝色在这个框架里显得突兀。

### 2.3 Semantic 语义色

**直接搬 Apple 的原生语义色，** 这是 Apple 用户最熟悉的视觉语言：

```css
--al-color-success:       #30D158;  /* Apple Green */
--al-color-warning:       #FF9F0A;  /* Apple Orange */
--al-color-danger:        #FF453A;  /* Apple Red */
--al-color-info:          #007AFF;  /* Apple Blue（只做信息用途） */
```

**重要规则：**
- 语义色**只用在有明确语义的场景**（成功/错误/警告），不能做装饰色
- 禁用态不用红色：`opacity: 0.4` 而不是变红

### 2.4 颜色使用红线

```
✅ 正确用法                              ❌ 错误用法
──────────────────────────────────────────────────────
按钮 hover 用 --primary-hover           按钮 hover 随意选色
卡片边框用 --border-color-light         卡片边框用 #ccc
成功提示用 --color-success              随便用个绿色
页面背景用 --bg-color                   用 #fff 做全部背景
分割线用 --border-color-lighter         分割线用 #ddd
```

---

## 3. 排版体系

### 3.1 字体栈

**中英文混排的最佳实践：**

```css
--al-font-family: -apple-system, 'SF Pro SC', 'SF Pro Text', 'Helvetica Neue',
                  'PingFang SC', 'Microsoft YaHei', sans-serif;
```

- `-apple-system`：macOS/iOS 用户直接调用 SF Pro（Apple 官方字体）
- `SF Pro SC`：中文版 SF（macOS 15+ 自带）
- `PingFang SC`：苹方，macOS 中文回退
- 优先保留数字和英文用 SF，中文自动切换到苹方

### 3.2 字号阶梯

**Apple 的字号设计哲学：** 基础字号略大，层级数少，层级之间跨度明显。

```css
--al-font-size-title1:    28px;   /* 大标题 — 页面级标题，Apple 最小的大标题 */
--al-font-size-title2:    22px;   /* 中标题 — 模块标题 */
--al-font-size-title3:    18px;   /* 小标题 — 卡片标题 */
--al-font-size-headline:  15px;   /* 强调正文 — 带 600 weight */
--al-font-size-body:      14px;   /* 正文 — 默认字号，Apple 最小正文字号 */
--al-font-size-callout:   13px;   /* 标注 — 辅助说明 */
--al-font-size-subhead:   12px;   /* 脚注 — 最小字号 */
--al-font-size-footnote:  11px;   /* 极小型 — Tab 标签数字等 */
```

**字号命名规则说明：** 不使用 `xs/sm/base/lg` 而用 `body/callout/footnote` 等语义化命名。这是 Apple HIG 的命名方式，开发者看到 `--al-font-size-callout` 就知道这是"标注"字号，而不用猜"lg 是多大"。

### 3.3 字重

```css
--al-font-weight-regular:  400;
--al-font-weight-medium:   500;
--al-font-weight-semibold: 600;
--al-font-weight-bold:     700;
```

**使用规则：**
- 正文：400 Regular
- 按钮 / Tab / Segmented Control：500 Medium
- 卡片标题：600 Semibold
- 页面大标题：700 Bold

### 3.4 行高

Apple 喜欢宽松的行高，让文本透气：

```css
--al-font-leading-tight:   1.2;    /* 标题用，紧凑 */
--al-font-leading-body:    1.5;    /* 正文用，舒适 */
--al-font-leading-loose:   1.8;    /* 说明文字，宽松 */
```

### 3.5 实战对照

```
Apple.com 标题     →  28px Bold    →  --al-font-size-title1 + 700
Apple.com 正文     →  14px Regular →  --al-font-size-body + 400
macOS 侧栏标签     →  12px Medium  →  --al-font-size-subhead + 500
macOS 按钮文字     →  14px Medium  →  --al-font-size-body + 500
iOS 大标题         →  28px Bold    →  --al-font-size-title1 + 700
```

---

## 4. 圆角体系

### 4.1 Apple 圆角哲学

Apple 的圆角**不是固定的数学倍数**，而是随着元素大小变化——**越大的元素圆角越大**。这叫做 "continuous corner radius"，Apple 为此申请了设计专利。

### 4.2 圆角阶梯

```css
--al-radius-xs:    4px;    /* 极小元素：Badge、Tag、小图标 */
--al-radius-sm:    6px;    /* 小元素：Input、Button、Select */
--al-radius-md:    8px;    /* 中元素：Card、Dropdown、Tooltip */
--al-radius-lg:    12px;   /* 大元素：Modal、Drawer、Popover */
--al-radius-xl:    16px;   /* 特大：大卡片、页面卡片区 */
--al-radius-full:  999px;  /* 胶囊：Tag、Switch */
```

### 4.3 圆角对照表

| 元素 | 尺寸 | 圆角 | Token |
|------|------|------|-------|
| Button | 28-44px | 6px | `--al-radius-sm` |
| Input | 36px | 6px | `--al-radius-sm` |
| Card（小） | ~200px | 8px | `--al-radius-md` |
| Card（中） | ~400px | 12px | `--al-radius-lg` |
| Modal | ~520px | 12px | `--al-radius-lg` |
| Tooltip | 小浮层 | 6px | `--al-radius-sm` |
| Tag | 小标签 | 4px | `--al-radius-xs` |
| Switch | 28px 轨道 | 999px | `--al-radius-full` |
| Avatar | 40px | 50% | `--al-radius-circle` |

### 4.4 苹果的圆角分布曲线

```
圆角 ↗  16 │
      12 │              ●  Modal
       8 │        ●  Card
       6 │  ●  Button/Input
       4 │●  Tag
       ──┴─────────────────────→ 元素尺寸
         小              大
```

---

## 5. 阴影与层级

### 5.1 三层阴影体系

Apple 的阴影极其克制——几乎感觉不到阴影存在，但又能感知层次。

| 层级 | 用途 | Token | 值 | 感觉 |
|------|------|-------|-----|------|
| Level 1 | 卡片、下拉菜单 | `--al-shadow-sm` | `0 1px 3px rgba(0,0,0,0.04)` | 几乎看不见，只有位置感 |
| Level 2 | Dropdown、Popover、浮层 | `--al-shadow-md` | `0 2px 8px rgba(0,0,0,0.06)` | 极淡影子，明确分层 |
| Level 3 | Modal、Drawer、Notification | `--al-shadow-lg` | `0 8px 24px rgba(0,0,0,0.10)` | 最大高度，仍很克制 |

### 5.2 暗色阴影

暗色模式下，阴影不是变黑，而是**发光（light source from behind）**：

```css
[data-theme="dark"] {
  --al-shadow-sm:  0 1px 3px rgba(255,255,255,0.04);
  --al-shadow-md:  0 2px 8px rgba(255,255,255,0.06);
  --al-shadow-lg:  0 8px 24px rgba(255,255,255,0.08);
}
```

### 5.3 阴影使用红线

```
✅ 卡片用 --al-shadow-sm               ❌ 卡片用 box-shadow: 0 4px 20px
✅ 弹窗用 --al-shadow-lg               ❌ 弹窗阴影大到发光
✅ Menu 用 --al-shadow-md              ❌ 每个元素都加阴影
```

---

## 6. 间距与留白

### 6.1 8px 基准网格

Apple 使用 **8px 基准网格**（部分场景 4px 微调）：

```css
--al-space-1:  4px;    /* 微间距：图标与文字之间 */
--al-space-2:  8px;    /* 基准：元素内部紧凑间距 */
--al-space-3:  12px;   /* 按钮内边距水平 */
--al-space-4:  16px;   /* 卡片 padding / 组件间距 */
--al-space-5:  20px;   /* 宽松间距 */
--al-space-6:  24px;   /* 表单组间距 */
--al-space-8:  32px;   /* 章节间距 */
--al-space-10: 40px;   /* 大区块间距 */
--al-space-12: 48px;   /* 页面级间距 */
--al-space-16: 64px;   /* 超大间距 */
```

### 6.2 关键间距对照

| 场景 | 间距 | Token |
|------|------|-------|
| 按钮左右内边距 | 12px-16px | `--al-space-3` 到 `--al-space-4` |
| 图标与文字间距 | 4px | `--al-space-1` |
| 卡片内边距 | 16px | `--al-space-4` |
| 输入框内边距 | 8px 12px | `--al-space-2` - `--al-space-3` |
| 表单项间距 | 24px | `--al-space-6` |
| 页面左右安全边距 | 20-40px | `--al-space-5` - `--al-space-10` |
| Section 间距 | 48px | `--al-space-12` |

### 6.3 Apple 留白原则

1. **宁可空，不要满。** 如果内容不够，放大间距而不是加装饰。
2. **信息越重要，周围留白越多。** 标题上面的间距 > 标题下面的间距。
3. **行宽控制：** 正文每行 600-700px 为最佳阅读宽度。

---

## 7. 材质与动效

### 7.1 毛玻璃（Vibrancy）

Apple 的标志性材质效果。在中后台适度使用：

```css
.al-material {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

[data-theme="dark"] .al-material {
  background: rgba(28, 28, 30, 0.72);
  backdrop-filter: blur(20px);
}
```

**应用场景：** 导航栏、侧栏、浮动面板（非卡片）。

### 7.2 动效曲线

Apple 不使用 `ease-in-out`，使用自定义的 **SF Motion 曲线**：

```css
--al-motion-ease:       cubic-bezier(0.4, 0, 0.2, 1);   /* 标准交互 */
--al-motion-ease-out:  cubic-bezier(0, 0, 0.2, 1);      /* 入场（更快） */
--al-motion-ease-in:   cubic-bezier(0.4, 0, 1, 1);      /* 出场（渐慢） */
--al-motion-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性反馈 */
```

- 所有交互响应：**200ms**（不能长，Apple 标准是 200-300ms）
- 淡入淡出：**200ms**
- 页面切换：**300ms**
- Modal 进出：**300ms + ease-out**
- 列表插入：**400ms + spring**

### 7.3 过渡使用规则

```
✅ 按钮 hover → 200ms      ❌ 按钮 hover → 1s 动画
✅ Modal 进出 → 300ms      ❌ 所有动画一律 300ms
✅ 列表渐入 → stagger 50ms  ❌ 不带动画，卡片直接闪现
```

---

## 8. 图标风格

### 8.1 Apple 图标特征

| 特征 | 规范 |
|------|------|
| 线条粗细 | 1.5px - 2px（中等粗细） |
| 端点 | 圆头（round cap） |
| 连接点 | 圆角连接（round join） |
| 风格 | 线性（outline），填充图标只用于 Tab/状态栏 |
| 大小 | 16x16 / 20x20 / 24x24（16 为基准） |
| 与文字间距 | 4px（--al-space-1） |

### 8.2 推荐图标集

| 方案 | 推荐度 | 说明 |
|------|--------|------|
| **Apple SF Symbols** | ★★★ | 官方 6000+ 图标，需要 Apple 设备提取 |
| **Lucide** | ★★★ | 开源、一致性好、风格接近 SF Symbols |
| **Heroicons** | ★★☆ | 粗细匹配(1.5px)，圆头风格 |
| **自建** | ★☆☆ | 后续考虑 |

**推荐先用 Lucide 过渡，后续逐渐替换为自建图标集。**

---

## 9. 按钮规范

### 9.1 按钮类型

Apple 的按钮哲学：**不区分"Primary/Secondary"**，而是根据场景选择：

```vue
<!-- 填充按钮 — 用在需要强调的操作（仅此一个） -->
<al-button type="fill">存储</al-button>

<!-- 灰色按钮 — 次要操作 -->
<al-button type="gray">取消</al-button>

<!-- 文字按钮 — 低强调 -->
<al-button type="text">查看全部 ›</al-button>

<!-- 仅限 dark 模式下的白色按钮 -->
<al-button type="white">开始使用</al-button>
```

### 9.2 按钮尺寸

```css
--al-btn-height-sm:   28px;   /* 内联/紧凑场景 */
--al-btn-height-md:   36px;   /* 默认 */
--al-btn-height-lg:   44px;   /* 页面主操作（Apple 最小触摸目标） */

--al-btn-padding-x:   16px;   /* 左右内边距 */
--al-btn-padding-x-sm: 12px;  /* 小型按钮 */
--al-btn-radius:      6px;    /* 固定 6px */
```

### 9.3 按钮视觉规格

| 类型 | 背景 | 文字 | Hover | Active | 边框 |
|------|------|------|-------|--------|------|
| fill | `#1D1D1F` | `#FFFFFF` | `#3A3A3C` | `#000000` | 无 |
| gray | `#F5F5F7` | `#1D1D1F` | `#EBEBF0` | `#E2E2E8` | 无 |
| text | transparent | `#1D1D1F` | underline | 同 hover | 无 |
| white | `#FFFFFF` | `#1D1D1F` | `#F5F5F7` | `#EBEBF0` | `#D2D2D7` |

### 9.4 多按钮排列

```
✅ [取消] [确定]      → 次要在左，主要左右
✅ [确定]             → 单一操作，大间距
❌ [取消]  [确定]     → 不要加 icon 在文字按钮上
❌ 主按钮用蓝色       → 这是 Element 的做法
```

---

## 10. 表单规范

### 10.1 输入框

```css
--al-input-height:     36px;       /* 默认高度 */
--al-input-radius:     6px;        /* 圆角 */
--al-input-padding-x:  12px;       /* 水平内边距 */
--al-input-bg:         #F5F5F7;    /* 背景色：与页面同色 */
--al-input-border:     #D2D2D7;    /* 边框：标准边框 */
--al-input-bg-hover:   #EBEBF0;    /* hover 背景稍暗 */
--al-input-border-focus: #1D1D1F;  /* focus 边框变黑 */
--al-input-bg-disabled:#F5F5F7;    /* 禁用时不变色，仅 opacity 0.4 */
```

**Form 设计要点（区别于 Element Plus）：**

1. **输入框背景用 `#F5F5F7`（同页面背景）**——Apple 几乎所有输入框都是灰色背景，不是白色。白色背景在 Apple 的体系里是"卡片/浮层"的专属。

2. **Focus 时边框变黑** —— Apple 不用蓝色 focus ring。聚焦时一条黑色边框就够了。

3. **Label 在上方（top-aligned）** —— Apple 表单几乎都是标签在上方，页面上方垂直滚动浏览，不是左右对齐。

4. **无 bottom-line 风格** —— Apple 不用 Material Design 的下划线输入框。

### 10.2 选择器（Select / Picker）

与 Input 统一风格：灰色背景、6px 圆角、黑色 focus。

```css
--al-select-height:    36px;
--al-select-radius:    6px;
--al-select-bg:        #F5F5F7;
--al-select-border:    #D2D2D7;
```

### 10.3 Checkbox & Radio

Apple 所有选择控件**没有边框容器**——就是一个小小的方形/圆形加 label：

```css
--al-checkbox-size:    18px;       /* Apple 标准选择框大小 */
--al-checkbox-radius:  5px;        /* 微圆角方形 */
--al-radio-size:       18px;
--al-radio-dot-size:   8px;        /* 选中时内部圆点 */
```

- 选中态：填充 `#1D1D1F` + 白色勾号
- 未选中：`#D2D2D7` 边框
- 与 label 间距：`6px`

### 10.4 Switch

```css
--al-switch-height:    24px;       /* Apple 标准开关 */
--al-switch-width:     44px;       /* 比例 ~1.83:1 */
--al-switch-thumb-size:20px;       /* 滑块大小 */
--al-switch-on:        #30D158;    /* Apple Green */
--al-switch-off:       #D2D2D7;    /* 灰色背景 */
```

---

## 11. 组件尺寸锚点

所有组件的尺寸以 36px 为基准高度。这在 Apple 体系里是最舒服的触摸/点击目标。

| 组件 | 默认高度 | 小 | 大 |
|------|---------|----|-----|
| Button | 36px | 28px | 44px |
| Input | 36px | 28px | 44px |
| Select | 36px | 28px | 44px |
| Switch | 24px | 20px | 28px |
| Checkbox | 18px | — | — |
| Radio | 18px | — | — |
| Badge | 18px | 14px | 22px |
| Tag | 22px | 18px | 26px |
| Tooltip | 28px（auto） | — | — |
| Dialog 标题栏 | 44px | — | — |
| Menu Item | 36px | — | — |
| Table Row | 40px | 32px | 48px |

**36px 的来历：** Apple 的最小触摸目标是 44x44pt，但 Web 场景下 44px 偏大。36px 是介于 macOS 的 32px 和 iOS 的 44px 之间的"Sweet Spot"。

---

## 12. 暗色主题

### 12.1 色值对应

| 亮色 | 暗色 | 说明 |
|------|------|------|
| `#F5F5F7` 页面背景 | `#1C1C1E` | Apple 暗色模式背景 |
| `#FFFFFF` 卡片 | `#2C2C2E` | Apple 暗色卡片 |
| `#EBEBF0` 面板 | `#3A3A3C` | 二级背景 |
| `#1D1D1F` 标题 | `#F5F5F7` | 反色 |
| `#6E6E73` 辅助 | `#AEAEB2` | 反色提亮 |
| `#D2D2D7` 边框 | `#48484A` | 暗色边框更暗一点 |

### 12.2 暗色特性

- 不要纯黑背景（`#000000` 很伤眼），用 `#1C1C1E`
- 文字不要用纯白（`#FFFFFF` 太刺眼），用 `#F5F5F7`
- 卡片之间用 `#3A3A3C` 分割，不要加阴影
- 暗色下的语义色饱和度降低 20%

### 12.3 暗色开关

```css
[data-theme="dark"] {
  /* 套用上述色值 */
}
```

---

## 13. 与竞品的视觉差异

| 维度 | Element Plus | Ant Design Vue | alongUI (Apple) |
|------|-------------|----------------|-----------------|
| 主色 | #409EFF 蓝 | #1677FF 蓝 | #1D1D1F 黑 |
| 背景色 | #F5F7FA | #F5F5F5 | #F5F5F7 |
| 卡片背景 | #FFFFFF | #FFFFFF | #FFFFFF（有阴影） |
| 输入框背景 | #FFFFFF | #FFFFFF | **#F5F5F7** |
| 圆角风格 | 4px 方形 | 6px 中等 | **6-12px 动态** |
| 按钮风格 | 蓝底白字 | 蓝底白字 | **灰底黑字/黑底白字** |
| 阴影 | 明显 | 较明显 | **极克制** |
| 分割线 | 细直线 | 细直线 | **#E5E5EA 浅灰** |
| 暗色支持 | 有 | 有 | **亮暗色完整双主题** |
| Focus 样式 | 蓝色边框 | 蓝色边框 | **黑色边框（Apple 风格）** |

**一句话总结差异：**
> 用 Element Plus 做出来的页面像"管理系统"；用 alongUI 做出来的页面像"Apple 产品"。

---

## 14. Apple 设计参考资源

### 14.1 必读

| 资源 | 链接 |
|------|------|
| Apple HIG（人机交互指南） | developer.apple.com/design/human-interface-guidelines |
| macOS Design Resources | developer.apple.com/design/resources |
| SF Symbols | developer.apple.com/sf-symbols |
| Apple Design Principles | developer.apple.com/design |

### 14.2 色彩速查

```
直接打开 Apple 官网 → 取色器取背景色 → #F5F5F7
打开 macOS 设置 → 取左侧栏 → #EBEBF0
打开 Apple Music → 取卡片 → #FFFFFF + 0 1px 3px shadow
打开 iOS 日历 → 取文字 → #1D1D1F
打开 Xcode → 取侧栏选择态 → #E2E2E8
```

---

> **本规格书是 alongUI 的视觉宪法。**
> 任何组件在实现前，先查这个文档。如果找不到对应规范，说明这个组件可能不应该存在。

---

### 附录：设计师自查清单

每个组件上线前过一遍：

- [ ] 颜色是否都在色彩体系内？
- [ ] 圆角是否符合尺寸-圆角对应表？
- [ ] 阴影是否用了 shadow token？
- [ ] 间距是否是 4 或 8 的倍数？
- [ ] 字号是否在字号阶梯中？
- [ ] 暗色模式是否有对应实现？
- [ ] Focus 是黑色边框而不是蓝色？
- [ ] 禁用态只是 opacity 0.4，没有变色？
- [ ] 能把一个元素去掉而不影响功能吗？
- [ ] 这个组件看起来像是苹果做的吗？
