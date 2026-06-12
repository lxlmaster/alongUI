# Tabs 标签页

Tabs 用于切换不同内容区域，将同类信息收纳在标签中，减少页面跳转。

## 基础用法

```vue
<template>
  <al-tabs v-model="activeTab">
    <al-tab-pane label="用户管理" name="users">用户内容</al-tab-pane>
    <al-tab-pane label="权限配置" name="roles">权限内容</al-tab-pane>
    <al-tab-pane label="系统设置" name="settings">设置内容</al-tab-pane>
  </al-tabs>
</template>
```

## 卡片风格

```vue
<template>
  <al-tabs v-model="activeTab" type="card">
    <al-tab-pane label="Tab A" name="a">内容 A</al-tab-pane>
    <al-tab-pane label="Tab B" name="b">内容 B</al-tab-pane>
  </al-tabs>
</template>
```

## Tabs Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| number` | `''` | 当前激活标签的 `name` |
| type | `'line' \| 'card'` | `'line'` | 标签风格 |
| closable | `boolean` | `false` | 标签是否可关闭（显示关闭按钮） |
| addable | `boolean` | `false` | 是否显示添加标签按钮 |
| editable | `boolean` | `false` | 等同于 `closable + addable` |
| tabPosition | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | 标签栏位置 |
| stretch | `boolean` | `false` | 标签是否等宽撑满 |
| beforeLeave | `(newName, oldName) => boolean \| Promise` | `undefined` | 切换前的钩子，返回 false 阻止切换 |

## Tabs Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(name: string \| number)` | 激活标签变化时触发 |
| tabClick | `(pane)` | 点击标签时触发 |
| tabRemove | `(name)` | 关闭标签时触发 |
| tabAdd | `()` | 点击添加按钮时触发 |
| edit | `(action, name)` | 编辑标签时触发 |

## TabPane Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | `''` | 标签标题文字 |
| name | `string \| number` | `undefined` | 标签唯一标识，未设置时按顺序取 index |
| disabled | `boolean` | `false` | 是否禁用 |
| closable | `boolean` | `false` | 是否可关闭，优先级高于 Tabs 的 `closable` |
| lazy | `boolean` | `false` | 是否惰性渲染（切换到时才渲染内容） |

## TabPane Slots

| 插槽名 | 说明 |
|--------|------|
| default | 标签内容区域 |
| label | 自定义标签标题 |

## 设计说明

- `line` 类型使用底部指示条（underline）标识当前激活标签，保持简洁。
- `card` 类型为每个标签绘制独立容器，适合嵌套在卡片等组件中使用。
- 提供 `beforeLeave` 钩子，允许在切换前进行表单校验或数据保存确认。
- 惰性渲染（`lazy`）可减少初始渲染开销，适合内容较重的 TabPane。
