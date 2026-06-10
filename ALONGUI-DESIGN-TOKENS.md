# ▎alongUI Design Tokens

> 面向 Vue 3 的企业级 UI 组件库 · Apple 设计语言 · 极致洁净 · 高级克制

---

## 设计原则

| # | 原则 | 说明 |
|---|------|------|
| 1 | **洁净** | 少即是多。留白、克制、不堆砌。 |
| 2 | **一致** | 视觉风格、交互模式、API 命名全局统一。 |
| 3 | **完整** | 覆盖中后台 95% 以上场景，开箱即用。 |
| 4 | **可定制** | 主题变量化，CSS Variables + Scss 双覆盖，轻松换肤。 |
| 5 | **无障碍** | 色彩对比度达标（WCAG AA），键盘导航完备。 |

---

## 1. 色彩体系

Apple 设计语言的冷灰阶梯 + 品牌色点缀。中性色带一丝暖调，不偏冷。

### 1.1 Neutral / 中性色

```css
/* 纯色 */
--al-color-white:        #ffffff;
--al-color-black:        #000000;

/* 背景色 */
--al-bg-color:           #f5f5f7;   /* 页面主背景 */
--al-bg-color-page:      #e8e8ed;   /* 页面深一阶 */
--al-bg-color-overlay:   #ffffff;   /* 卡片 / 浮层背景 */
--al-bg-color-elevated:  #fafafa;   /* 悬浮高亮 */

/* 文字色 */
--al-text-color-primary:    #1d1d1f;  /* 标题 / 正文 */
--al-text-color-regular:    #3a3a3c;  /* 常规文字 */
--al-text-color-secondary:  #6e6e73;  /* 辅助文字 */
--al-text-color-placeholder:#aeaeb2;  /* 占位符 */
--al-text-color-disabled:   #c7c7cc;  /* 禁用文字 */
--al-text-color-inverse:    #ffffff;  /* 反色 */

/* 边框色 */
--al-border-color:          #d2d2d7;  /* 默认边框 */
--al-border-color-light:    #e5e5ea;  /* 浅边框 */
--al-border-color-lighter:  #f2f2f7;  /* 极浅边框 */
```

### 1.2 Brand / 品牌色

使用 Apple 风格黑色作为主操作色。蓝色仅作为 `info` 语义色，不作为主色。

```css
--al-color-primary:          #1d1d1f;  /* 主色 */
--al-color-primary-hover:    #3a3a3c;  /* hover */
--al-color-primary-light:    #f5f5f7;  /* 浅色背景 */
--al-color-primary-dark:     #000000;  /* active / pressed */
```

### 1.3 Semantic / 语义色

沿用 Apple 原生语义色，干净明亮。

```css
--al-color-success:       #30d158;  /* 成功 */
--al-color-warning:       #ff9f0a;  /* 警告 */
--al-color-danger:        #ff453a;  /* 危险 */
--al-color-info:          #007aff;  /* 信息 */
```

---

## 2. 排版

### 2.1 Font Family

```css
--al-font-family:         -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif;
--al-font-family-mono:    'SF Mono', 'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
```

### 2.2 Font Size

```css
--al-font-size-extra-large: 20px;
--al-font-size-large:       18px;
--al-font-size-medium:      16px;
--al-font-size-base:        14px;    /* 默认 */
--al-font-size-small:       13px;
--al-font-size-extra-small: 12px;
```

### 2.3 Font Weight

```css
--al-font-weight-light:    300;
--al-font-weight-primary:  400;
--al-font-weight-medium:   500;
--al-font-weight-bold:     600;
```

---

## 3. 间距

4px 基准递增。

```css
--al-spacing-1:  4px;
--al-spacing-2:  8px;
--al-spacing-3:  12px;
--al-spacing-4:  16px;
--al-spacing-5:  20px;
--al-spacing-6:  24px;
--al-spacing-7:  28px;
--al-spacing-8:  32px;
--al-spacing-9:  36px;
--al-spacing-10: 40px;
```

---

## 4. 圆角

Apple 式微圆角，整体柔和

```css
--al-border-radius-none:   0;
--al-border-radius-small:  6px;
--al-border-radius-base:   8px;
--al-border-radius-medium: 10px;
--al-border-radius-large:  14px;
--al-border-radius-round:  24px;
--al-border-radius-circle: 50%;
```

---

## 5. 阴影

轻盈柔和，多层次。

```css
--al-box-shadow-light:     0 1px 3px rgba(0,0,0,0.04);
--al-box-shadow-base:      0 2px 8px rgba(0,0,0,0.06);
--al-box-shadow-dropdown:  0 4px 12px rgba(0,0,0,0.08);
--al-box-shadow-modal:     0 8px 24px rgba(0,0,0,0.10);
```

---

## 6. Z-index

```css
--al-z-index-normal:       1;
--al-z-index-dropdown:     1000;
--al-z-index-popper:       2000;
--al-z-index-tooltip:      3000;
--al-z-index-overlay:      4000;
--al-z-index-modal:        5000;
--al-z-index-message:      6000;
--al-z-index-notification: 7000;
```

---

## 7. 过渡

```css
--al-transition-duration:        0.3s;
--al-transition-duration-fast:   0.2s;
--al-transition-function:        cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 8. 断点

```css
--al-breakpoint-xs: 0px;
--al-breakpoint-sm: 768px;
--al-breakpoint-md: 992px;
--al-breakpoint-lg: 1200px;
--al-breakpoint-xl: 1920px;
```

---



---

## 9. 暗色主题

暗色主题下，仅反转中性色阶，品牌色与语义色保持不变，降低维护成本。

```css
[data-theme="dark"] {
  /* 背景色反转 */
  --al-bg-color:           #1c1c1e;
  --al-bg-color-page:      #2c2c2e;
  --al-bg-color-overlay:   #2c2c2e;
  --al-bg-color-elevated:  #3a3a3c;

  /* 文字色反转 */
  --al-text-color-primary:    #f5f5f7;
  --al-text-color-regular:    #e5e5ea;
  --al-text-color-secondary:  #aeaeb2;
  --al-text-color-placeholder:#636366;
  --al-text-color-disabled:   #48484a;
  --al-text-color-inverse:    #1c1c1e;

  /* 边框色反转 */
  --al-border-color:          #48484a;
  --al-border-color-light:    #3a3a3c;
  --al-border-color-lighter:  #2c2c2e;

  /* 填充色 */
  --al-fill-color:          #3a3a3c;
  --al-fill-color-light:    #2c2c2e;
  --al-fill-color-lighter:  #1c1c1e;

  /* 阴影加深（暗色背景下阴影需要更明显） */
  --al-box-shadow-light:     0 1px 3px rgba(0,0,0,0.3);
  --al-box-shadow-base:      0 2px 8px rgba(0,0,0,0.4);
  --al-box-shadow-dropdown:  0 4px 12px rgba(0,0,0,0.5);
  --al-box-shadow-modal:     0 8px 24px rgba(0,0,0,0.6);
}
```

---

## 10. 命名约定

所有 Token 遵循 `--al-{category}-{property}` 格式。

| 前缀 | 类别 | 示例 |
|------|------|------|
| `--al-bg-` | 背景 | `--al-bg-color-page` |
| `--al-text-` | 文字 | `--al-text-color-primary` |
| `--al-border-` | 边框 | `--al-border-color-light` |
| `--al-color-` | 颜色 | `--al-color-primary` |
| `--al-font-` | 字体 | `--al-font-size-base` |
| `--al-spacing-` | 间距 | `--al-spacing-4` |
| `--al-border-radius-` | 圆角 | `--al-border-radius-base` |
| `--al-box-shadow-` | 阴影 | `--al-box-shadow-base` |
| `--al-z-index-` | 层级 | `--al-z-index-modal` |
| `--al-transition-` | 动效 | `--al-transition-duration` |
| `--al-breakpoint-` | 断点 | `--al-breakpoint-lg` |
