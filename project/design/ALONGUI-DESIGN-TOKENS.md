# alongUI · Design Tokens

> 基于 Apple 色板 · PC 端适配 · 可直接复制到代码

---

## 颜色变量

```css
:root {
  /* === 主交互色 === */
  --al-blue:          #007AFF;
  --al-blue-hover:    #3395FF;
  --al-blue-active:   #0055CC;
  --al-blue-bg:       #E8F2FF;

  /* === 语义色 === */
  --al-green:         #34C759;   /* 开关/成功 */
  --al-red:           #FF3B30;   /* 删除/错误 */
  --al-orange:        #FF9500;   /* 警告 */
  --al-yellow:        #FFCC00;   /* 注意 */

  /* === 系统灰 === */
  --al-gray:          #8E8E93;   /* 辅助/占位 */
  --al-gray-border:   #D1D1D6;
  --al-gray-divider:  #E5E5EA;
  --al-gray-input:    #F2F2F7;

  /* === 背景 === */
  --al-bg-page:       #F5F5F7;
  --al-bg-card:       #FFFFFF;
  --al-bg-elevated:   #FAFAFA;
  --al-bg-dark:       #1C1C1E;

  /* === 文字 === */
  --al-text-primary:   #1D1D1F;
  --al-text-secondary: #3A3A3C;
  --al-text-tertiary:  #8E8E93;
  --al-text-inverse:   #FFFFFF;

  /* === 圆角 === */
  --al-radius-sm:     6px;     /* 灰色按钮/标签 */
  --al-radius-md:     8px;     /* 卡片/下拉 */
  --al-radius-lg:     10px;    /* 输入框/搜索栏 */
  --al-radius-xl:     12px;    /* 填充按钮/弹窗 */
  --al-radius-full:   999px;   /* Switch/胶囊 */

  /* === 阴影 === */
  --al-shadow-sm:     0 1px 2px rgba(0,0,0,0.04);
  --al-shadow-md:     0 2px 8px rgba(0,0,0,0.06);
  --al-shadow-lg:     0 8px 24px rgba(0,0,0,0.10);

  /* === 字号（PC 端） === */
  --al-font-size-title:  28px;
  --al-font-size-body:   14px;   /* 正文 */
  --al-font-size-btn:    15px;   /* 按钮 */
  --al-font-size-small:  13px;   /* 辅助 */
  --al-font-size-label:  12px;   /* 小标签 */

  /* === 字重 === */
  --al-weight-regular:  400;
  --al-weight-medium:   500;
  --al-weight-semibold: 600;
  --al-weight-bold:     700;

  /* === 间距（8px 网格） === */
  --al-space-1:  4px;
  --al-space-2:  8px;
  --al-space-3:  12px;
  --al-space-4:  16px;
  --al-space-5:  20px;
  --al-space-6:  24px;
  --al-space-8:  32px;
  --al-space-10: 40px;
  --al-space-12: 48px;
}
```
