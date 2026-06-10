# Dialog 对话框

Dialog 用于承载需要用户关注或操作的内容，以模态形式打开。

## 基础用法

```vue
<template>
  <al-button @click="visible = true">打开对话框</al-button>
  <al-dialog v-model="visible" title="提示">
    <p>这是对话框内容</p>
    <template #footer>
      <al-button @click="visible = false">取消</al-button>
      <al-button type="primary" @click="visible = false">确认</al-button>
    </template>
  </al-dialog>
</template>
```

## 自定义宽度

```vue
<template>
  <al-dialog v-model="visible" title="大对话框" width="600px">
    ...
  </al-dialog>
</template>
```

## Dialog Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `boolean` | `false` | 对话框是否可见 |
| title | `string` | `undefined` | 对话框标题 |
| width | `string` | `'420px'` | 对话框宽度 |
| top | `string` | `'15vh'` | 对话框距顶部距离 |
| closeOnClickModal | `boolean` | `true` | 点击遮罩层是否关闭 |
| closeOnPressEscape | `boolean` | `true` | 按 Esc 键是否关闭 |
| showClose | `boolean` | `true` | 是否显示关闭按钮 |
| draggable | `boolean` | `false` | 是否可拖拽移动 |
| fullscreen | `boolean` | `false` | 是否全屏显示 |
| destroyOnClose | `boolean` | `false` | 关闭时是否销毁内容 |

## Dialog Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value: boolean)` | 可见状态变化时触发 |
| open | `()` | 对话框打开时触发 |
| close | `()` | 对话框关闭时触发 |
| opened | `()` | 打开动画完成时触发 |
| closed | `()` | 关闭动画完成时触发 |

## Dialog Slots

| 插槽名 | 说明 |
|--------|------|
| default | 对话框主体内容 |
| title | 自定义标题区域 |
| footer | 底部操作区 |

## 设计说明

- 对话框宽度默认 420px，适合表单等常见内容，全屏模式覆盖整个视口。
- 点击遮罩层默认可关闭，用户需要强确认时可设置 `closeOnClickModal={false}`。
- 标题区域固定，body 区域在内容溢出时自动滚动，footer 使用 Flexbox 右对齐。
