# Timeline 时间线

## 简介

Timeline 垂直展示一组按时间排列的事件，适用于操作日志、审批流转、版本历程、物流轨迹等场景。

组件由容器 `al-timeline` 与节点 `al-timeline-item` 组成，容器通过 provide/inject 向子节点下发排布方式。

## 基础用法

每个节点通过 `timestamp` 传入时间点，默认内容在时间戳右侧。

```vue
<template>
  <al-timeline>
    <al-timeline-item timestamp="2026-06-01">组件库立项</al-timeline-item>
    <al-timeline-item timestamp="2026-07-12">完成设计 Token 体系</al-timeline-item>
    <al-timeline-item timestamp="2026-08-15">v0.x 内部试用</al-timeline-item>
  </al-timeline>
</template>
```

## 节点类型

`type` 决定节点圆点的颜色，可选 `primary` / `success` / `warning` / `danger` / `info`，默认 `info`。

```vue
<template>
  <al-timeline>
    <al-timeline-item timestamp="10:00" type="primary">提交申请</al-timeline-item>
    <al-timeline-item timestamp="10:24" type="success">审批通过</al-timeline-item>
    <al-timeline-item timestamp="11:03" type="warning">等待补充材料</al-timeline-item>
    <al-timeline-item timestamp="11:40" type="danger">审批驳回</al-timeline-item>
  </al-timeline>
</template>
```

## 自定义颜色与尺寸

`color` 优先级高于 `type`，会同时覆盖圆点的边框色与背景色。`size` 可选 `default`（24px）与 `large`（32px）。

```vue
<template>
  <al-timeline>
    <al-timeline-item timestamp="2026-08-01" color="#5856d6">紫色节点</al-timeline-item>
    <al-timeline-item timestamp="2026-08-02" color="#30d158" size="large">
      放大的绿色节点
    </al-timeline-item>
  </al-timeline>
</template>
```

## 时间戳位置

`placement` 为 `right` 时时间戳渲染在内容右侧。节点级 `placement` 优先于容器级 `placement`。

```vue
<template>
  <!-- 容器统一设置 -->
  <al-timeline placement="right">
    <al-timeline-item timestamp="2026-08-01">时间戳在右侧</al-timeline-item>
    <al-timeline-item timestamp="2026-08-02">时间戳在右侧</al-timeline-item>
    <!-- 单个节点覆盖回左侧 -->
    <al-timeline-item timestamp="2026-08-03" placement="left">
      这一条时间戳在左侧
    </al-timeline-item>
  </al-timeline>
</template>
```

## 隐藏时间戳

`hide-timestamp` 只隐藏时间戳文本，节点圆点与轴线仍保留。

```vue
<template>
  <al-timeline>
    <al-timeline-item timestamp="2026-08-01">显示时间</al-timeline-item>
    <al-timeline-item hide-timestamp>不显示时间</al-timeline-item>
  </al-timeline>
</template>
```

## 自定义圆点

通过 `dot` 插槽替换默认圆点。注意插槽内容渲染在固定尺寸（24px / 32px）的圆形容器内，容器背景色仍由 `type` 或 `color` 控制。

```vue
<template>
  <al-timeline>
    <al-timeline-item timestamp="2026-08-01" type="success">
      <template #dot>
        <al-icon name="check" />
      </template>
      自定义图标节点
    </al-timeline-item>
  </al-timeline>
</template>
```

## 富文本内容

默认插槽可以放入任意结构，例如卡片式的日志条目。

```vue
<template>
  <al-timeline>
    <al-timeline-item
      v-for="log in logs"
      :key="log.id"
      :timestamp="log.time"
      :type="log.type"
    >
      <div style="font-weight: 600">{{ log.title }}</div>
      <div style="color: var(--al-text-color-secondary); font-size: 13px">
        操作人：{{ log.operator }}
      </div>
    </al-timeline-item>
  </al-timeline>
</template>

<script setup lang="ts">
const logs = [
  { id: 1, time: '2026-08-15 09:12', type: 'primary', title: '创建工单', operator: '张三' },
  { id: 2, time: '2026-08-15 10:30', type: 'success', title: '处理完成', operator: '李四' }
]
</script>
```

## Timeline Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| reverse | `boolean` | `false` | 是否反向排列节点，会在根元素追加 `al-timeline--reverse` 类名 |
| placement | `'left' \| 'right' \| 'alternate'` | `'left'` | 时间戳相对内容的位置，下发给所有子节点 |

## TimelineItem Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| timestamp | `string` | `''` | 时间点文本 |
| hideTimestamp | `boolean` | `false` | 是否隐藏时间戳 |
| placement | `'left' \| 'right'` | `undefined` | 时间戳位置，未设置时继承 Timeline 的 `placement` |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` | 节点颜色类型 |
| size | `'default' \| 'large'` | `'default'` | 节点尺寸，`default` 为 24px，`large` 为 32px |
| color | `string` | `undefined` | 自定义节点颜色，设置后覆盖 `type` 对应的颜色 |
| icon | `string \| Record<string, any>` | `undefined` | 节点图标。**当前版本尚未在模板中消费，请使用 `dot` 插槽代替** |

## Timeline Slots

| 插槽名 | 说明 |
|--------|------|
| default | TimelineItem 子节点 |

## TimelineItem Slots

| 插槽名 | 说明 |
|--------|------|
| default | 节点内容 |
| dot | 自定义节点圆点，替换默认的 8px 白色小圆点 |

## Events

Timeline 与 TimelineItem 均为纯展示组件，当前版本不派发任何自定义事件。交互需求请在默认插槽内容上自行绑定原生事件。

## 设计说明

- 节点圆点默认色板取自 Apple 系统色：`primary` `#007aff`、`success` `#30d158`、`warning` `#ff9f0a`、`danger` `#ff453a`、`info` `#c7c7cc`。
- 轴线颜色使用 `--al-border-color-light`，最后一个节点自动隐藏轴线。
- 时间戳最小宽度 80px 且左置时右对齐，多条记录的时间列能自然对齐。
- `placement="alternate"` 的左右交替样式仍在完善中，生产环境建议先使用 `left` 或 `right`。
