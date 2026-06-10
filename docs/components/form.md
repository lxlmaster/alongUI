# Form 表单

Form 用于表单验证与数据收集，通过 `AlForm` 和 `AlFormItem` 配合使用。表单验证采用内置规则校验，不依赖第三方校验库。

## 基础用法

```vue
<template>
  <al-form ref="formRef" :model="formData" :rules="rules">
    <al-form-item label="用户名" prop="username">
      <al-input v-model="formData.username" placeholder="请输入用户名" />
    </al-form-item>
    <al-form-item label="邮箱" prop="email">
      <al-input v-model="formData.email" placeholder="请输入邮箱" />
    </al-form-item>
    <al-form-item>
      <al-button type="primary" @click="handleSubmit">提交</al-button>
      <al-button @click="handleReset">重置</al-button>
    </al-form-item>
  </al-form>
</template>

<script setup>
const formRef = ref(null)
const formData = ref({
  username: '',
  email: ''
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 12, message: '用户名长度 2-12 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(e => e)
  if (valid === true) {
    // 提交逻辑
  }
}

function handleReset() {
  formRef.value?.resetFields()
}
</script>
```

## 内联验证

```vue
<template>
  <al-form :model="formData">
    <al-form-item label="手机号" prop="phone" :rules="{ pattern: /^1\d{10}$/, message: '手机号格式错误' }">
      <al-input v-model="formData.phone" />
    </al-form-item>
  </al-form>
</template>
```

## 表单禁用

```vue
<template>
  <al-form :model="formData" disabled>
    <al-form-item label="只读字段">
      <al-input v-model="formData.field" />
    </al-form-item>
  </al-form>
</template>
```

## Form Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| model | `Record<string, any>` | `{}` | 表单数据对象 |
| rules | `Record<string, FormRule[]>` | `undefined` | 校验规则 |
| labelWidth | `string \| number` | `undefined` | 标签宽度 |
| labelPosition | `'left' \| 'right' \| 'top'` | `'top'` | 标签位置 |
| size | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸 |
| disabled | `boolean` | `false` | 是否禁用整个表单 |

## FormItem Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | `undefined` | 标签文字 |
| prop | `string` | `''` | 对应 model 的字段路径，支持 `user.name` 点语法 |
| rules | `FormRule \| FormRule[]` | `undefined` | 单独给此项添加的校验规则 |
| required | `boolean` | `false` | 是否必填，标记星号 |
| labelWidth | `string \| number` | `undefined` | 单独设置标签宽度 |
| size | `'small' \| 'default' \| 'large'` | `undefined` | 单独设置尺寸 |

## FormRule 类型

| 属性 | 类型 | 说明 |
|------|------|------|
| required | `boolean` | 是否为必填 |
| message | `string` | 校验失败提示信息 |
| min | `number` | 最小值（字符串为最小长度，数值为最小值） |
| max | `number` | 最大值 |
| pattern | `RegExp` | 正则匹配 |
| trigger | `'blur' \| 'change' \| ''` | 触发校验的时机 |
| validator | `Function` | 自定义校验函数 |

## Form Exposed Methods

| 方法 | 说明 |
|------|------|
| validate | 校验整个表单，返回 `Promise<true>`，失败返回错误信息数组 |
| resetFields | 重置所有字段值并清除校验状态 |
| clearValidate | 仅清除校验状态，不改动字段值 |

## FormItem Slots

| 插槽名 | 说明 |
|--------|------|
| default | 表单项内容 |
| label | 自定义标签内容 |

## 设计说明

- 标签位置默认 `top`（标签在上、输入在下），而非 Element Plus 的左侧排列。这在移动端和窄屏场景下更友好，也符合 Apple 表单的布局习惯。
- 校验规则直接定义在 JavaScript 中，不依赖 async-validator 等第三方库。内置支持 `required`、`min`/`max`、`pattern`、自定义 `validator` 四种规则。
- 校验时机通过 `trigger` 控制，支持 `blur`（失焦）和 `change`（值变化）两种触发方式。
- 错误信息紧随输入框下方显示，采用红色 12px 字体。
- Form 层 `disabled` 会传递到所有子组件，无需逐个设置。
