# Stack 堆叠

Stack 是 Flexbox 布局的高阶封装，通过 `direction` 和 `gap` 快速排列子元素。

## 基础用法

```vue
<template>
  <al-stack>
    <al-button>按钮一</al-button>
    <al-button>按钮二</al-button>
    <al-button>按钮三</al-button>
  </al-stack>
</template>
```

## 垂直排列

```vue
<template>
  <al-stack direction="column" :gap="16">
    <al-button>上</al-button>
    <al-button>中</al-button>
    <al-button>下</al-button>
  </al-stack>
</template>
```

## Stack Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` | 排列方向 |
| gap | `number \| string` | `'8px'` | 子元素间距 |
| justify | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | 主轴对齐方式 |
| align | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'center'` | 交叉轴对齐方式 |
| wrap | `boolean` | `false` | 是否允许换行 |
| tag | `string` | `'div'` | 渲染的 HTML 标签 |

## Stack Slots

| 插槽名 | 说明 |
|--------|------|
| default | 需要堆叠排列的子元素 |

## 设计说明

- Stack 通过 `gap` 属性统一管理子元素间距，避免手动在每个子元素上设置 margin。
- 水平排列时默认垂直居中对齐，垂直排列时默认左对齐。
- 作为布局语法糖，不引入额外的 CSS 副作用，可与任何组件自由组合。
