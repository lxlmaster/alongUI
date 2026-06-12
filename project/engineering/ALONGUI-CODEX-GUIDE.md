# alongUI · Codex 开发指导手册

> PC 端 · iOS 设计基因 · 不是移动端

---

## 核心颜色

```scss
// 主色
$blue:        #007AFF;   // 所有交互元素
$blue-hover:  #3395FF;
$blue-active: #0055CC;

// 语义色（Apple 标准）
$green:       #34C759;   // 开关绿
$red:         #FF3B30;   // 删除红
$orange:      #FF9500;   // 警告橙

// 系统灰
$gray:        #8E8E93;   // 占位符/辅助
$gray-input:  #F2F2F7;   // 输入框背景

// 背景
$bg-page:     #F5F5F7;
$bg-card:     #FFFFFF;

// 文字
$text-primary:   #1D1D1F;
$text-secondary: #3A3A3C;
$text-tertiary:  #8E8E93;
```

---

## 组件精确模板

### Button

```vue
<!-- 文字按钮（最常用） -->
<al-button type="link">完成</al-button>
<al-button type="link" danger>删除</al-button>

<!-- 蓝色填充胶囊（主要操作） -->
<al-button type="primary">存储</al-button>

<!-- 灰色胶囊（次要操作） -->
<al-button type="default">取消</al-button>
```

### Input

```scss
// iOS/macOS 风格：灰底、无边框、10pt 圆角
.al-input__inner {
  background: #F2F2F7;
  border: none;
  border-radius: 10px;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  color: #1D1D1F;
  outline: none;
  &::placeholder { color: #8E8E93; }
  &:focus { background: #E8E8ED; }
}
```

### Switch

```scss
// 开启态 #34C759，不是黑色
.al-switch-track.is-checked {
  background: #34C759;
}
```

---

## 错误对照

```
✗ 旧写法                  ✓ 新写法
──────────────────────   ──────────────────────
--al-color-primary: #1D1D1F  #007AFF
--al-color-success: #30D158  #34C759
--al-color-danger: #FF453A   #FF3B30
--al-color-warning: #FF9F0A  #FF9500
--al-bg-color-input: #F5F5F7 #F2F2F7
Button 填充矩形             文字按钮
Input 灰底+边框             灰底无边框 10pt
Switch 黑色                 #34C759 绿色
Focus 黑色 outline          无/蓝色发光
```
