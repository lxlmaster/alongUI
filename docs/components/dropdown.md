# Dropdown 下拉菜单

Dropdown 用于将一组操作收纳在触发元素之后，减少界面上的直接暴露。

## 基础用法

```vue
<template>
  <al-dropdown>
    <al-button>更多操作</al-button>
    <template #menu>
      <al-dropdown-item command="edit">编辑</al-dropdown-item>
      <al-dropdown-item command="delete">删除</al-dropdown-item>
    </template>
  </al-dropdown>
</template>
```

## 触发方式

```vue
<template>
  <al-dropdown trigger="click">
    <al-button>点击打开</al-button>
    <template #menu>
      <al-dropdown-item command="a">选项 A</al-dropdown-item>
      <al-dropdown-item command="b">选项 B</al-dropdown-item>
    </template>
  </al-dropdown>
</template>
```

## Dropdown Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| trigger | `'hover' \| 'click'` | `'hover'` | 触发方式 |
| placement | `'bottom' \| 'bottom-start' \| 'bottom-end' \| 'top' \| 'top-start' \| 'top-end'` | `'bottom'` | 菜单弹出位置 |
| disabled | `boolean` | `false` | 是否禁用 |
| hideOnClick | `boolean` | `true` | 点击菜单项后是否自动关闭 |

## Dropdown Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| command | `(command: string \| number)` | 点击菜单项时触发，回传该项的 `command` 值 |
| visibleChange | `(visible: boolean)` | 菜单展开/关闭时触发 |

## Dropdown Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发菜单的元素 |
| menu | 菜单内容，需包含 `DropdownItem` |

## DropdownItem Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| command | `string \| number` | `undefined` | 菜单项唯一标识 |
| disabled | `boolean` | `false` | 是否禁用该项 |
| divided | `boolean` | `false` | 是否显示分割线 |

## 设计说明

- 默认 hover 触发，适合工具栏等高频操作场景；点击触发用于需要明确确认的交互。
- 菜单项通过 `command` 标识事件，避免直接在模板中绑定多个 click 处理函数。
- 菜单面板使用最简定位实现，复杂的边界翻转场景暂不覆盖。
