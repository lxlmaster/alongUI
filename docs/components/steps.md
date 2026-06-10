# Steps 步骤条

Steps 引导用户按照预先设定的步骤完成任务，适用于表单填写的多步骤场景。

## 基础用法

```vue
<template>
  <al-steps :active="1">
    <al-step title="填写信息" />
    <al-step title="确认提交" />
    <al-step title="完成" />
  </al-steps>
</template>
```

## 含描述

```vue
<template>
  <al-steps :active="2">
    <al-step title="注册" description="创建账户信息" />
    <al-step title="验证" description="验证邮箱地址" />
    <al-step title="完成" description="开始使用" />
  </al-steps>
</template>
```

## Steps Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| active | `number` | `0` | 当前激活步骤索引（从 0 开始） |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |
| finishStatus | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `'finish'` | 已完成步骤的状态 |
| processStatus | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `'process'` | 当前步骤的状态 |
| space | `number \| string` | `undefined` | 步骤间距，不设置时自动均分 |
| alignCenter | `boolean` | `false` | 是否居中对齐 |
| simple | `boolean` | `false` | 是否简洁模式 |

## Step Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `''` | 步骤标题 |
| description | `string` | `undefined` | 步骤描述 |
| icon | `Component` | `undefined` | 自定义图标 |
| status | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `undefined` | 步骤状态，未设置时由 Steps 统一控制 |

## Steps Slots

| 插槽名 | 说明 |
|--------|------|
| default | Step 子项 |

## Step Slots

| 插槽名 | 说明 |
|--------|------|
| title | 自定义标题 |
| description | 自定义描述 |

## 设计说明

- 水平模式在小屏幕（< 480px）上自动切换为垂直模式，保证可读性。
- 已完成步骤显示绿色对勾，当前步骤高亮标题，未完成步骤置灰。
- 简洁模式去掉序号圆圈和连接线，只保留文字和状态色，适合次级步骤导航。
