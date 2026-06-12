# Menu 菜单

Menu 提供垂直或水平的导航菜单，支持子菜单展开和路由跳转。

## 基础用法

```vue
<template>
  <al-menu :default-active="'1'">
    <al-menu-item index="1">首页</al-menu-item>
    <al-menu-item index="2">文档</al-menu-item>
    <al-menu-item index="3">关于</al-menu-item>
  </al-menu>
</template>
```

## 含子菜单

```vue
<template>
  <al-menu>
    <al-menu-item index="1">首页</al-menu-item>
    <al-sub-menu index="2">
      <template #title>设置</template>
      <al-menu-item index="2-1">个人资料</al-menu-item>
      <al-menu-item index="2-2">安全设置</al-menu-item>
    </al-sub-menu>
  </al-menu>
</template>
```

## Menu Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| mode | `'vertical' \| 'horizontal'` | `'vertical'` | 菜单模式 |
| defaultActive | `string` | `''` | 默认激活项 index |
| defaultOpeneds | `string[]` | `[]` | 默认展开的子菜单 index 数组 |
| collapse | `boolean` | `false` | 是否折叠（仅垂直模式） |
| router | `boolean` | `false` | 是否启用 Vue Router 模式 |
| backgroundColor | `string` | `undefined` | 菜单背景色 |
| textColor | `string` | `undefined` | 菜单文字色 |
| activeTextColor | `string` | `undefined` | 激活态文字色 |

## Menu Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| select | `(index: string)` | 菜单项被选中时触发 |
| open | `(index: string)` | SubMenu 展开时触发 |
| close | `(index: string)` | SubMenu 收起时触发 |

## Menu Slots

| 插槽名 | 说明 |
|--------|------|
| default | MenuItem 和 SubMenu |

## MenuItem Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| index | `string` | `undefined` | 唯一标识 |
| disabled | `boolean` | `false` | 是否禁用 |
| route | `string \| Location` | `undefined` | Vue Router 路径 |

## SubMenu Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| index | `string` | `undefined` | 唯一标识 |
| disabled | `boolean` | `false` | 是否禁用 |

## SubMenu Slots

| 插槽名 | 说明 |
|--------|------|
| title | 子菜单标题区 |
| default | MenuItem 子项 |

## 设计说明

- 折叠模式仅支持垂直方向，折叠后只显示图标，鼠标悬停时展开子菜单。
- 水平模式不支持折叠，子菜单向下弹出。
- 不预设背景色，由使用者通过主题系统自定义，确保灵活适配不同品牌色。
