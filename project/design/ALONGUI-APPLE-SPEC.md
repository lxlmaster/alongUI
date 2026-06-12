# alongUI · Apple 设计语言规格书

> PC 端企业级 UI 组件库 · 取 Apple 的视觉基因但不照搬移动端
> 色彩系统源自 iOS/macOS，交互适配桌面场景

---

## 核心原则

```
我们取 Apple 的：
• 色彩体系 — #007AFF 交互蓝、#34C759 开关绿、#FF3B30 删除红
• 输入框风格 — 灰底无边框 10pt 圆角（macOS 搜索栏特征）
• 按钮风格 — 文字按钮为主，填充按钮为强调
• 间距留白 — 8px 网格体系
• 克制阴影 — 极淡阴影区分层级
• 毛玻璃 — backdrop-filter 适度使用

我们不抄的：
• 44pt 触摸目标 → PC 用 36px 默认高度
• 底部 Tab Bar → PC 用侧栏/顶部导航
• iOS 大标题导航栏 → PC 用标准页面标题
• 底部安全区域 → PC 没有 safe area
• hover 效果 → iOS 无 hover，但 PC 场景需要有 hover（浅色微变即可）
```

---

## 一、色彩体系

### 1.1 核心色板（来自 iOS/macOS）

```css
/* 主交互色 — 所有可点击/可交互的元素 */
--al-blue:           #007AFF;   /* 按钮/链接/选中/焦点 */
--al-blue-hover:     #3395FF;   /* 桌面 hover */
--al-blue-active:    #0055CC;   /* 点击态 */

/* 语义色 — Apple 标准 */
--al-green:          #34C759;   /* 开关/成功 */
--al-red:            #FF3B30;   /* 删除/错误 */
--al-orange:         #FF9500;   /* 警告 */
--al-yellow:         #FFCC00;   /* 注意 */

/* 系统灰 */
--al-gray:           #8E8E93;   /* 辅助文字/占位符/未选中 */
--al-gray2:          #AEAEB2;
--al-gray3:          #C7C7CC;
--al-gray4:          #D1D1D6;   /* 边框 */
--al-gray5:          #E5E5EA;   /* 分割线 */
--al-gray6:          #F2F2F7;   /* 输入框/分段控件背景 */

/* 背景色 */
--al-bg-page:        #F5F5F7;   /* 页面背景 */
--al-bg-card:        #FFFFFF;   /* 卡片/内容区 */
--al-bg-elevated:    #FAFAFA;   /* 悬浮高亮 */
--al-bg-input:       #F2F2F7;   /* 输入框背景 */

/* 文字色 */
--al-text-primary:   #1D1D1F;   /* 标题/正文 */
--al-text-secondary: #3A3A3C;   /* 次要文字 */
--al-text-tertiary:  #8E8E93;   /* 辅助/占位符 */
--al-text-inverse:   #FFFFFF;   /* 反色 */

/* 边框 */
--al-border:         #D1D1D6;
--al-border-light:   #E5E5EA;
--al-border-lighter: #F2F2F7;
```

### 1.2 暗色模式

```css
[data-theme="dark"] {
  --al-bg-page:     #1C1C1E;
  --al-bg-card:     #2C2C2E;
  --al-bg-input:    #3A3A3C;
  --al-text-primary:#F5F5F7;
  --al-text-secondary:#E5E5EA;
  --al-text-tertiary:#8E8E93;
  --al-border:      #48484A;
  --al-border-light:#3A3A3C;
}
```

---

## 二、按钮 Button

PC Web 场景下，我们做 **3 种按钮**：

### 2.1 文字按钮（最常用）

类似 macOS 的纯文字操作，适用于绝大多数场景。

```css
.al-button--link {
  background: transparent;
  border: none;
  color: #007AFF;
  font-size: 15px;
  font-weight: 600;         /* Semibold */
  height: auto;
  padding: 4px 0;
  min-width: 0;
  cursor: pointer;
}
.al-button--link:hover {
  color: #3395FF;           /* 桌面 hover */
}
.al-button--link.is-danger {
  color: #FF3B30;           /* 删除操作 */
}
.al-button--link.is-disabled {
  opacity: 0.4;
  pointer-events: none;
}
```

### 2.2 填充按钮（仅主要操作）

类似 iOS 填充按钮，12px 圆角胶囊，用于「保存」「提交」「确定」。

```css
.al-button--primary {
  background: #007AFF;
  color: #FFFFFF;
  border-radius: 12px;       /* 大圆角 */
  height: 36px;              /* PC 默认高度 */
  padding: 0 20px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.al-button--primary:hover {
  background: #3395FF;
}
```

### 2.3 灰色胶囊按钮（次要操作）

macOS 标准按钮风格，用于「取消」「返回」「关闭」。

```css
.al-button--default {
  background: #F0F0F0;
  color: #1D1D1F;
  border-radius: 6px;
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
.al-button--default:hover {
  background: #E5E5E5;
}
```

---

## 三、输入框 Input

### PC 端输入框

采用 macOS 搜索栏风格：灰底无边框 + 10pt 圆角。**不是 iOS 的白底有框，也不是 Element 那种带边框的 Web 风格。**

```css
.al-input__inner {
  background: #F2F2F7;       /* 灰底 */
  border: none;               /* 无边框 */
  border-radius: 10px;        /* 10pt 圆角 — macOS 搜索栏特征 */
  height: 36px;               /* PC 标准高度 */
  padding: 0 12px;
  font-size: 14px;
  color: #1D1D1F;
  outline: none;
  font-family: inherit;
  transition: background 0.15s;
}
.al-input__inner::placeholder {
  color: #8E8E93;
}
.al-input__inner:hover {
  background: #E8E8ED;
}
.al-input__inner:focus {
  background: #E8E8ED;      /* 聚焦时背景微深，不加边框 */
}
```

Textarea 同样风格：

```css
.al-input__textarea {
  background: #F2F2F7;
  border: none;
  border-radius: 10px;
  padding: 12px;
  min-height: 84px;
  font-size: 14px;
  color: #1D1D1F;
  outline: none;
  line-height: 1.5;
  resize: vertical;
}
```

---

## 四、选择器 Select

与 Input 统一：灰底无边框 10pt 圆角。

```css
.al-select__trigger {
  background: #F2F2F7;
  border: none;
  border-radius: 10px;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  color: #1D1D1F;
  cursor: pointer;
}
.al-select__trigger:hover {
  background: #E8E8ED;
}
```

下拉面板：白色背景、8px 圆角、极淡阴影。

---

## 五、Switch 开关

采用 iOS 标志性绿色开关。

```css
.al-switch-track {
  width: 44px;
  height: 26px;
  border-radius: 999px;
  background: #E9E9EA;          /* 关闭态浅灰 */
  transition: background 0.2s;
  cursor: pointer;
}
.al-switch-track.is-checked {
  background: #34C759;          /* iOS 绿，不是黑色 */
}

.al-switch-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 0.2s;
}
.is-checked .al-switch-thumb {
  left: 20px;
}
```

---

## 六、弹窗 Dialog

混合 iOS Alert 的排版和 PC 的交互。

```css
/* 弹窗容器 */
.al-dialog {
  background: #FFFFFF;
  border-radius: 12px;          /* 14px iOS → PC 12px */
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
  padding: 24px;
  width: 440px;
}

/* 标题 */
.al-dialog__title {
  font-size: 17px;              /* iOS 17pt */
  font-weight: 600;             /* Semibold */
  margin-bottom: 8px;
}

/* 正文 */
.al-dialog__body {
  font-size: 13px;
  color: #8E8E93;               /* iOS 辅助灰色 */
  line-height: 1.6;
}

/* 操作区 */
.al-dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}
```

---

## 七、表格 Table

PC 数据密集场景，不模仿 iOS 的 TableView。

```css
.al-table th {
  font-size: 12px;
  font-weight: 600;
  color: #8E8E93;               /* iOS 系统灰 */
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid #E5E5EA;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.al-table td {
  padding: 12px;
  font-size: 13px;
  color: #1D1D1F;
  border-bottom: 1px solid #F2F2F7;
}

.al-table tr:hover td {
  background: #FAFAFA;
}
```

---

## 八、弹窗 MessageBox

Alert 风格：

```css
.al-message-box {
  background: #FFFFFF;
  border-radius: 12px;
  width: 400px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
}

.al-message-box__title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
}

.al-message-box__content {
  font-size: 13px;
  color: #8E8E93;
  margin-bottom: 16px;
}

.al-message-box__btns {
  display: flex;
  border-top: 1px solid #E5E5EA;
  margin: 0 -24px;
}

.al-message-box__btns button {
  flex: 1;
  height: 44px;
  background: transparent;
  border: none;
  font-size: 17px;
  font-family: inherit;
  cursor: pointer;
}

.al-message-box__btns .btn-cancel {
  font-weight: 400;
  color: #007AFF;
}

.al-message-box__btns .btn-confirm {
  font-weight: 700;
  color: #FF3B30;
  border-left: 1px solid #E5E5EA;
}
```

---

## 九、颜色对照速查

```
旧系统（已废弃）             新系统（当前）
───────────────────────     ───────────────────────
--al-color-primary: #1D1D1F  #007AFF（蓝）
--al-color-success: #30D158  #34C759（iOS 绿）
--al-color-danger: #FF453A   #FF3B30（iOS 红）
--al-color-warning: #FF9F0A  #FF9500（iOS 橙）
--al-text-placeholder: #AEAEB2 #8E8E93
--al-bg-color-input: #F5F5F7 #F2F2F7
Button 填充矩形               文字按钮/填充胶囊
Input 灰底+边框               灰底无边框 10pt 圆角
Switch 黑色                   iOS 绿 #34C759
Focus 黑色 outline            无变化或蓝色发光
```

---

## 十、字号与间距

### PC 端字号

| 角色 | 字号 | 字重 |
|------|------|------|
| 页面大标题 | 28px | Bold (700) |
| 卡片标题 | 15px | Semibold (600) |
| 正文 | 14px | Regular (400) |
| 按钮文字（填充） | 15px | Semibold (600) |
| 按钮文字（链接） | 15px | Semibold (600) |
| 按钮（macOS 灰色） | 14px | Regular (400) |
| 辅助文字 | 13px | Regular (400) |
| 小标签 | 12px | Medium (500) |

### 8px 网格间距

```css
--al-space-1:  4px;
--al-space-2:  8px;
--al-space-3:  12px;
--al-space-4:  16px;   /* 卡片 padding */
--al-space-5:  20px;
--al-space-6:  24px;   /* 表单项间距 */
--al-space-8:  32px;   /* 章节间距 */
--al-space-10: 40px;
--al-space-12: 48px;
```

---

## 十一、PC 端适配说明

| iOS 特性 | PC 端处理 |
|---------|----------|
| 44pt 最小触摸目标 | 降为 **36px** 默认高度，大按钮 44px |
| hover 效果 | 保留，但颜色变化克制（只微变背景色） |
| 底部 Tab Bar | 改为侧栏/顶部导航 |
| 毛玻璃 | CSS `backdrop-filter` 适度使用 |
| Force Touch | 不需要 |
| 安全区域 | 不需要 |
| 间距 | iOS 偏大，PC 适当缩小 |

---

## 十二、一句话总结

> **色板用 iOS 的，交互做 PC 的。** 
> 核心识别特征：蓝色 `#007AFF` 主交互、文字按钮、灰底无边框 10pt 圆角输入框、绿色 `#34C759` 开关。
