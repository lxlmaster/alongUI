# alongUI · 设计PRD vs 实际代码差异报告

## 🔴 根本冲突：设计方向完全相反

### 1. 主色冲突（最严重）
| 项目 | 设计 PRD (Apple Spec) | 当前代码 (variables.scss) |
|------|----------------------|--------------------------|
| 主色 | `#007AFF` **蓝色** (iOS蓝) | `#1D1D1F` **黑色** |
| 信息来源 | Apple Spec §1.1 / iOS Exact §九 | `--al-color-primary` |

### 2. Button 按钮
| 项目 | 设计 PRD | 当前代码 |
|------|---------|---------|
| 类型体系 | `default`(灰胶囊) / `primary`(蓝填充12px) / `danger`(红文字) / `link`(蓝文字) | `default/primary/success/warning/danger/info` (Element式6种填充) |
| primary 样式 | 蓝色填充 + 12px 圆角胶囊 | 黑色填充 + 6px 小圆角 |
| default 样式 | 灰色胶囊 (macOS 风格 #F0F0F0) | 浅灰底黑色文字 |
| link 类型 | ✅ 蓝色文字按钮 (PRD要求) | ❌ **不存在** |
| 圆角 | primary=12px, default=6px | 全部=6px |
| 尺寸 | 36px 默认高度 | ✅ 36px 默认高度 |

### 3. Input 输入框
| 项目 | 设计 PRD | 当前代码 |
|------|---------|---------|
| 边框 | **无边框** (iOS搜索栏风格) | ❌ 有 `1px solid` 边框 |
| 圆角 | **10px** (macOS搜索栏特征) | ❌ 6px |
| 背景色 | `#F2F2F7` | `#F5F5F7` (轻微偏差) |
| 聚焦效果 | 背景微深, 不加边框/outline | ❌ 变边框颜色为黑色 |
| textarea | 同样无边框+10px圆角 | ❌ 有边框+6px圆角 |

### 4. Switch 开关
| 项目 | 设计 PRD (iOS) | 当前代码 |
|------|----------------|---------|
| 开启态颜色 | `#34C759` **iOS绿** | ❌ `#1D1D1F` **黑色** |
| 关闭态颜色 | `#E9E9EA` 浅灰 | `#D2D2D7` |
| 轨道尺寸 | 44×26px | ✅ 44×24px (接近) |
| 圆角 | 999px 胶囊 | ✅ 正确 |

### 5. Focus 样式
| 项目 | 设计 PRD | 当前代码 |
|------|---------|---------|
| 规则 | 聚焦时不加 outline, 仅背景微变 (iOS风格) | ❌ 2px 黑色 outline + offset |
| Button focus | 无变化 | 黑色 outline |
| Switch focus | 无变化 | 黑色 outline |
| Input focus | 背景变深 #E8E8ED | ❌ 边框变黑色 |

### 6. 语义色精确值
| 色值 | 设计 PRD (iOS) | 当前代码 |
|------|----------------|---------|
| 成功绿 | `#34C759` | `#30D158` |
| 危险红 | `#FF3B30` | `#FF453A` |
| 警告橙 | `#FF9500` | `#FF9F0A` |
| 辅助灰 | `#8E8E93` | `#6E6E73` (文本副色) |
| 占位灰 | `#8E8E93` | `#AEAEB2` |

### 7. Dialog 弹窗
| 项目 | 设计 PRD (iOS Alert) | 当前代码 |
|------|---------------------|---------|
| 圆角 | 14pt (iOS) / 12pt (PC适配) | ❌ 未知（需检查） |
| 按钮布局 | iOS Alert style (border-top 分隔线) | ❌ Element式 footer |
| 宽度 | 270pt (iOS) / 400px (PC) | 520px (偏大) |

### 8. Missing: 完整的设计 Token 覆盖
- `--al-bg-color-input` 在PRD中应为 `#F2F2F7`，代码中是 `#F5F5F7`
- Input hover 效果 PRD要求 `#E8E8ED`，代码中 `var(--al-bg-color-hover)` = `#E2E2E8`

## 总结：必须修改的内容

### P0 - 必须先改（影响所有组件视觉）
1. **主色** `--al-color-primary` → `#007AFF`
2. **Button 类型** 从6种Element式改为4种Apple式 (`default/primary/danger/link`)
3. **Input** 去掉边框、圆角改为10px、聚焦效果改为背景微深
4. **Switch** 开启态从黑色改为iOS绿 `#34C759`
5. **Focus** 去掉全局黑色 outline，改为无/focus-visible蓝色微光
6. **语义色** 对齐iOS精确色值

### P1 - 重要但不紧急
1. Dialog 对齐 iOS Alert 风格
2. 所有组件统一使用新的设计 Token

### P2 - 可以后续
1. 补充 link button 类型
2. 更新 play 沙盒
3. 更新文档
