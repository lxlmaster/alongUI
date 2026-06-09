# ▎alongUI 组件设计文档

> 面向 Vue 3 的企业级 UI 组件库 · 像 Element UI 一样全面，像 Apple 一样精致
> 技术栈：Vue 3 + TypeScript + Scss + Vite

---

## 目录

1. [通用设计规范](#1-通用设计规范)
2. [Basic 基础组件](#2-basic-基础组件)
3. [Form 表单组件](#3-form-表单组件)
4. [Data 数据展示](#4-data-数据展示)
5. [Feedback 反馈组件](#5-feedback-反馈组件)
6. [Navigation 导航](#6-navigation-导航)
7. [Layout 布局](#7-layout-布局)
8. [Other 其他](#8-other-其他)
9. [组件清单总表](#9-组件清单总表)

---

## 1. 通用设计规范

### 1.1 Vue 3 API 风格

| 模式 | 规范 |
|------|------|
| 双向绑定 | 统一使用 `v-model`（值 + `update:modelValue` emit） |
| 事件 | `@click`, `@change` 等原生风格 emit |
| 插槽 | 使用 named slots + default slot |
| 自定义内容 | `#prefix`, `#suffix`, `#title`, `#footer` |
| 类型 | 所有 Props 使用 TypeScript 类型标注 |
| 受控 / 非受控 | 支持 `v-model` 受控和默认非受控两种模式 |

### 1.2 组件尺寸体系

```ts
type ComponentSize = 'small' | 'default' | 'large'
```

| size | 高度 | 场景 |
|------|------|------|
| `small` | 28px | 紧凑表格/工具栏 |
| `default` | 36px | **默认** |
| `large` | 44px | 突出操作/大页面 |

### 1.3 通用 Props

所有可交互组件共享以下 Props：

```ts
interface CommonProps {
  size?: ComponentSize
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  clearable?: boolean         // 可清空
}
```

### 1.4 禁用态规范

```scss
.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### 1.5 Focus 规范

使用 `:focus-visible` 显示 focus ring（键盘导航时），鼠标点击不显示。

---

## 2. Basic 基础组件

### 2.1 Button 按钮

```vue
<al-button type="primary" size="default" @click="handleClick">
  主要按钮
</al-button>

<al-button :icon="Search" circle />
<al-button type="primary" loading>加载中</al-button>
<al-button-group>
  <al-button>左</al-button>
  <al-button>中</al-button>
  <al-button>右</al-button>
</al-button-group>
```

**Props：**

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` | 类型 |
| size | `'large' \| 'default' \| 'small'` | `'default'` | 尺寸 |
| plain | `boolean` | `false` | 朴素按钮 |
| round | `boolean` | `false` | 圆角按钮 |
| circle | `boolean` | `false` | 圆形按钮 |
| loading | `boolean` | `false` | 加载中 |
| disabled | `boolean` | `false` | 禁用 |
| icon | `Component` | — | 图标组件 |
| native-type | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生 type |

**事件：** `@click`

**Slots：** `default`、`icon`

### 2.2 Icon 图标

沿用 Element Plus 的图标体系，提供 300+ 个 SVG 图标，支持：

```vue
<al-icon :size="20" color="#0071e3">
  <Search />
</al-icon>
```

### 2.3 Link 文字链接

```vue
<al-link href="https://example.com" target="_blank">超链接</al-link>
<al-link type="primary">主要链接</al-link>
<al-link :underline="false">无下划线</al-link>
<al-link disabled>禁用链接</al-link>
<al-link icon="Edit">带图标</al-link>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| href | `string` | — | 跳转链接 |
| target | `'_self' \| '_blank'` | `'_self'` | 打开方式 |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` | 类型 |
| underline | `boolean` | `true` | 是否显示下划线 |
| disabled | `boolean` | `false` | 禁用 |
| icon | `Component` | — | 图标 |

---

### 2.4 Typography 排版

```vue
<al-text type="primary">正文</al-text>
<al-text type="secondary">辅助文字</al-text>
<al-text type="disabled">禁用</al-text>
<al-text truncated>超长文字自动省略</al-text>

<al-title :level="1">一级标题</al-title>
```

---

## 3. Form 表单组件

### 3.1 Input 输入框

```vue
<al-input v-model="value" placeholder="请输入" clearable />
<al-input v-model="value" type="textarea" :rows="4" />
<al-input v-model="value" maxlength="20" show-word-limit />
<al-input v-model="value" disabled />
<al-input v-model="value">
  <template #prefix>
    <al-icon><Search /></al-icon>
  </template>
  <template #suffix>
    <al-icon><Close /></al-icon>
  </template>
</al-input>
```

**Props：**

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| type | `'text' \| 'textarea' \| 'password'` | `'text'` | 输入类型 |
| modelValue | `string \| number` | — | v-model 绑定值 |
| size | `'large' \| 'default' \| 'small'` | `'default'` | 尺寸 |
| disabled | `boolean` | `false` | 禁用 |
| readonly | `boolean` | `false` | 只读 |
| placeholder | `string` | — | 占位符 |
| clearable | `boolean` | `false` | 可清空 |
| show-password | `boolean` | `false` | 密码切换可见 |
| maxlength | `number` | — | 最大长度 |
| show-word-limit | `boolean` | `false` | 字数统计 |
| rows | `number` | `3` | textarea 行数 |
| autosize | `boolean \| { minRows, maxRows }` | `false` | textarea 自适应 |

**事件：** `@input`、`@change`、`@focus`、`@blur`、`@clear`

**Slots：** `prefix`、`suffix`、`prepend`、`append`

### 3.2 Select 选择器

```vue
<al-select v-model="value" placeholder="请选择">
  <al-option label="选项一" value="1" />
  <al-option label="选项二" value="2" disabled />
  <al-option-group label="分组">
    <al-option label="选项三" value="3" />
  </al-option-group>
</al-select>

<al-select v-model="value" multiple collapse-tags placeholder="多选" />
<al-select v-model="value" filterable allow-create placeholder="可搜索" />
```

**Props：**

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | `string \| number \| any[]` | — | v-model |
| multiple | `boolean` | `false` | 多选 |
| disabled | `boolean` | `false` | 禁用 |
| clearable | `boolean` | `false` | 可清空 |
| filterable | `boolean` | `false` | 可搜索 |
| allow-create | `boolean` | `false` | 允许创建 |
| collapse-tags | `boolean` | `false` | 多选折叠标签 |
| placeholder | `string` | — | 占位符 |
| size | `ComponentSize` | `'default'` | 尺寸 |
| loading | `boolean` | `false` | 加载中 |
| remote | `boolean` | `false` | 远程搜索（配合 filterable） |

### 3.3 Cascader 级联选择器

```vue
<al-cascader v-model="value" :options="options" placeholder="请选择" />
<al-cascader v-model="value" :props="{ multiple: true }" />
```

### 3.4 Switch 开关

```vue
<al-switch v-model="value" />
<al-switch v-model="value" active-text="开启" inactive-text="关闭" />
<al-switch v-model="value" loading />
```

### 3.5 Checkbox 复选框

```vue
<al-checkbox v-model="checked">选项</al-checkbox>
<al-checkbox v-model="checked" indeterminate>全选</al-checkbox>

<al-checkbox-group v-model="checkList">
  <al-checkbox label="A">A</al-checkbox>
  <al-checkbox label="B">B</al-checkbox>
</al-checkbox-group>
```

### 3.6 Radio 单选框

```vue
<al-radio v-model="value" label="1">选项一</al-radio>

<al-radio-group v-model="value">
  <al-radio label="1">选项一</al-radio>
  <al-radio label="2">选项二</al-radio>
</al-radio-group>
```

### 3.7 DatePicker 日期选择器

```vue
<al-date-picker v-model="value" type="date" placeholder="选择日期" />
<al-date-picker v-model="value" type="datetime" />
<al-date-picker v-model="value" type="daterange" />
<al-date-picker v-model="value" type="month" />
```

### 3.8 TimePicker 时间选择器

```vue
<al-time-picker v-model="value" placeholder="选择时间" />
<al-time-picker v-model="value" is-range arrow-control />
```

### 3.9 Upload 上传

```vue
<al-upload action="/api/upload" :on-success="handleSuccess">
  <al-button type="primary">点击上传</al-button>
  <template #tip>
    <div>只能上传 jpg/png</div>
  </template>
</al-upload>

<al-upload action="/api/upload" drag>
  <al-icon><UploadFilled /></al-icon>
  <div>将文件拖到此处</div>
</al-upload>
```

### 3.10 Form 表单

```vue
<al-form ref="formRef" :model="form" :rules="rules" label-width="120px">
  <al-form-item label="用户名" prop="name">
    <al-input v-model="form.name" />
  </al-form-item>
  <al-form-item label="密码" prop="password">
    <al-input v-model="form.password" type="password" />
  </al-form-item>
  <al-form-item>
    <al-button type="primary" @click="submit">提交</al-button>
  </al-form-item>
</al-form>
```

**Props：**

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| model | `Record<string, any>` | — | 表单数据对象 |
| rules | `FormRules` | — | 校验规则 |
| label-width | `string \| number` | — | 标签宽度 |
| label-position | `'left' \| 'right' \| 'top'` | `'right'` | 标签对齐 |
| size | `ComponentSize` | `'default'` | 尺寸 |
| disabled | `boolean` | `false` | 禁用全部表单组件 |

**FormItem Props：**

| Prop | 说明 |
|------|------|
| label | 标签文本 |
| prop | 字段名（关联 model） |
| required | 必填标记 |
| rules | 单项校验规则 |
| error | 自定义错误信息 |

**Form 方法：** `validate()`、`resetFields()`、`clearValidate()`

---

## 4. Data 数据展示

### 4.1 Table 表格

企业级数据表格，覆盖 95% 场景。

```vue
<al-table :data="tableData" stripe border style="width: 100%">
  <al-table-column prop="date" label="日期" width="180" />
  <al-table-column prop="name" label="姓名" width="180" />
  <al-table-column prop="address" label="地址" />
  <al-table-column label="操作" fixed="right" width="120">
    <template #default="scope">
      <al-button text type="primary" @click="edit(scope.row)">编辑</al-button>
    </template>
  </al-table-column>
</al-table>
```

**al-table Props：**

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| data | `any[]` | `[]` | 表格数据 |
| border | `boolean` | `false` | 纵向边框 |
| stripe | `boolean` | `false` | 斑马纹 |
| size | `'large' \| 'default' \| 'small'` | `'default'` | 尺寸 |
| max-height | `string \| number` | — | 最大高度 |
| height | `string \| number` | — | 固定高度 |
| loading | `boolean` | `false` | 加载中 |
| highlight-current-row | `boolean` | `false` | 高亮当前行 |
| empty-text | `string` | `'暂无数据'` | 空数据文案 |
| default-sort | `object` | — | 默认排序 |
| row-key | `string` | — | 行 key |
| fit | `boolean` | `true` | 列宽自适应 |
| show-header | `boolean` | `true` | 显示表头 |

**al-table-column Props：**

| Prop | 说明 |
|------|------|
| prop | 字段名 |
| label | 列标题 |
| width | 列宽 |
| fixed | `'left' \| 'right'` 固定列 |
| sortable | 是否可排序 |
| align | `'left' \| 'center' \| 'right'` |
| formatter | `(row, column, cellValue) => string` |
| min-width | 最小宽度 |

### 4.2 Pagination 分页

```vue
<al-pagination
  v-model:current="currentPage"
  v-model:page-size="pageSize"
  :total="100"
  :page-sizes="[10, 20, 50, 100]"
  layout="total, sizes, prev, pager, next, jumper"
/>
```

**Props：**

| Prop | 默认 | 说明 |
|------|------|------|
| total | `0` | 总数 |
| current | — | 当前页（v-model） |
| page-size | `10` | 每页条数（v-model） |
| page-sizes | `[10, 20, 30, 40]` | 每页选择 |
| layout | `'prev, pager, next'` | 布局 |
| disabled | `false` | 禁用 |
| small | `false` | 小型 |
| background | `false` | 带背景 |

### 4.3 Tree 树形控件

```vue
<al-tree :data="treeData" :props="defaultProps" @node-click="handleClick" />
<al-tree :data="treeData" show-checkbox default-expand-all />
<al-tree :data="treeData" draggable />
```

### 4.4 Tag 标签

```vue
<al-tag>标签一</al-tag>
<al-tag type="success">标签二</al-tag>
<al-tag closable @close="handleClose">可关闭</al-tag>
<al-tag hit :type="type" effect="dark">dark 模式</al-tag>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| type | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| closable | `boolean` | `false` | 可关闭 |
| hit | `boolean` | `false` | 高亮 |
| effect | `'dark' \| 'light' \| 'plain'` | `'light'` | 主题 |
| size | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸 |

### 4.5 Badge 徽标

```vue
<al-badge :value="12">
  <al-button>消息</al-button>
</al-badge>
<al-badge :value="200" :max="99" />
<al-badge is-dot>小圆点</al-badge>
```

### 4.6 Progress 进度条

```vue
<al-progress :percentage="50" />
<al-progress :percentage="100" status="success" />
<al-progress :percentage="80" color="#0071e3" />
<al-progress :percentage="50" type="circle" :width="120" />
```

### 4.7 Collapse 折叠面板

```vue
<al-collapse v-model="activeNames">
  <al-collapse-item title="面板一" name="1">
    <div>内容</div>
  </al-collapse-item>
</al-collapse>
```

### 4.8 Descriptions 描述列表

```vue
<al-descriptions title="用户信息" :column="2" border>
  <al-descriptions-item label="用户名">along</al-descriptions-item>
  <al-descriptions-item label="手机号">138****0000</al-descriptions-item>
</al-descriptions>
```

### 4.9 Empty 空状态

```vue
<al-empty description="暂无数据" />
<al-empty image="custom.png">
  <al-button type="primary">新建</al-button>
</al-empty>
```

### 4.10 Skeleton 骨架屏

```vue
<al-skeleton :loading="loading" animated>
  <template #default>
    <!-- 真实内容 -->
  </template>
</al-skeleton>
```

---

## 5. Feedback 反馈组件

### 5.1 Dialog 对话框

```vue
<al-dialog v-model="visible" title="提示" width="500px">
  <span>内容</span>
  <template #footer>
    <al-button @click="visible = false">取消</al-button>
    <al-button type="primary" @click="confirm">确定</al-button>
  </template>
</al-dialog>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | `boolean` | — | 显示/隐藏 |
| title | `string` | — | 标题 |
| width | `string \| number` | `'50%'` | 宽度 |
| fullscreen | `boolean` | `false` | 全屏 |
| top | `string` | `'15vh'` | 顶部距离 |
| modal | `boolean` | `true` | 遮罩层 |
| close-on-click-modal | `boolean` | `true` | 点击遮罩关闭 |
| close-on-press-escape | `boolean` | `true` | ESC 关闭 |
| show-close | `boolean` | `true` | 显示关闭按钮 |
| draggable | `boolean` | `false` | 可拖拽 |
| destroy-on-close | `boolean` | `false` | 关闭销毁 |

**Slots：** `default`、`footer`、`header`

### 5.2 Drawer 抽屉

```vue
<al-drawer v-model="visible" title="详情" direction="rtl" size="30%">
  <span>内容</span>
</al-drawer>
```

| Prop | 默认 | 说明 |
|------|------|------|
| direction | `'rtl'` | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` |
| size | `'30%'` | 宽度/高度 |
| with-header | `true` | 显示标题栏 |

### 5.3 Message 消息提示

```ts
// 命令式 API
ElMessage.success('操作成功')
ElMessage.warning('请注意')
ElMessage.error('操作失败')
ElMessage.info('这是一条消息')
```

| 参数 | 类型 | 默认 | 说明 |
|------|------|------|------|
| message | `string \| VNode` | — | 消息内容 |
| type | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` | 类型 |
| duration | `number` | `3000` | 持续时间，0 不关闭 |
| show-close | `boolean` | `false` | 显示关闭 |
| on-close | `Function` | — | 关闭回调 |

### 5.4 Notification 通知

```ts
ElNotification({
  title: '标题',
  message: '内容',
  type: 'success',
  duration: 4500,
})
```

### 5.5 MessageBox 弹框

```ts
// 三种快捷方式
ElMessageBox.alert('内容', '标题')
ElMessageBox.confirm('确定删除？', '提示', { type: 'warning' })
ElMessageBox.prompt('请输入', '标题')
```

### 5.6 Popover 弹出框

```vue
<al-popover trigger="click" title="标题" :content="内容">
  <template #reference>
    <al-button>点击触发</al-button>
  </template>
</al-popover>
```

### 5.7 Dropdown 下拉菜单

```vue
<al-dropdown trigger="click" :menu="menuOptions">
  <al-button>更多操作</al-button>
  <template #dropdown>
    <al-dropdown-menu>
      <al-dropdown-item command="edit">编辑</al-dropdown-item>
      <al-dropdown-item command="delete" divided>删除</al-dropdown-item>
    </al-dropdown-menu>
  </template>
</al-dropdown>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| trigger | `'hover' \| 'click'` | `'hover'` | 触发方式 |
| menu | `MenuItem[]` | — | 快捷模式：通过数组定义菜单 |
| placement | `'bottom' \| 'bottom-start' \| 'bottom-end' \| 'top' \| 'top-start' \| 'top-end'` | `'bottom'` | 弹出位置 |
| hide-on-click | `boolean` | `true` | 点击菜单项后关闭 |

**Slots：** `default`（触发元素）、`dropdown`（自定义下拉内容）

---

### 5.8 Tooltip 文字提示

```vue
<al-tooltip content="提示内容" placement="top">
  <al-button>hover</al-button>
</al-tooltip>
```

### 5.9 Loading 加载

```vue
<!-- 指令式 -->
<div v-loading="isLoading">内容</div>

<!-- 服务式 -->
ElLoading.service({ fullscreen: true })
```

---

## 6. Navigation 导航

### 6.1 Menu 菜单

```vue
<al-menu :default-active="activeIndex" mode="vertical">
  <al-menu-item index="1">
    <al-icon><Home /></al-icon>
    <span>首页</span>
  </al-menu-item>
  <al-sub-menu index="2">
    <template #title>
      <al-icon><Setting /></al-icon>
      <span>设置</span>
    </template>
    <al-menu-item index="2-1">基础设置</al-menu-item>
    <al-menu-item index="2-2">高级设置</al-menu-item>
  </al-sub-menu>
</al-menu>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| mode | `'vertical' \| 'horizontal'` | `'vertical'` | 模式 |
| default-active | `string` | — | 默认激活 |
| collapse | `boolean` | `false` | 折叠（vertical） |
| background-color | `string` | — | 背景色 |
| text-color | `string` | — | 文字色 |
| active-text-color | `string` | — | 激活文字色 |

### 6.2 Tabs 标签页

```vue
<al-tabs v-model="activeName">
  <al-tab-pane label="用户管理" name="first">内容一</al-tab-pane>
  <al-tab-pane label="配置管理" name="second">内容二</al-tab-pane>
</al-tabs>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| type | `'line' \| 'card' \| 'border-card'` | `'line'` | 风格 |
| closable | `boolean` | `false` | 可关闭 |
| addable | `boolean` | `false` | 可新增 |
| tab-position | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 标签位置 |

### 6.3 Breadcrumb 面包屑

```vue
<al-breadcrumb separator=">">
  <al-breadcrumb-item :to="{ path: '/' }">首页</al-breadcrumb-item>
  <al-breadcrumb-item>活动管理</al-breadcrumb-item>
</al-breadcrumb>
```

### 6.4 Steps 步骤条

```vue
<al-steps :active="active" align-center>
  <al-step title="步骤一" description="描述" />
  <al-step title="步骤二" />
  <al-step title="步骤三" />
</al-steps>
```

### 6.5 Pagination 分页

分页组件主归属为 Data 数据展示，Navigation 中仅作为后台页面导航能力引用，详细 API 见 [4.2 Pagination 分页](#42-pagination-分页)。

---

## 7. Layout 布局

### 7.0 设计理念

alongUI 的布局体系拥抱 **CSS 原生能力**，舍弃传统 24 列栅格（Row/Col）。开发者只需"描述意图"，不用"量格子"。

**三层结构：**

```
Container  → 约束宽度、居中、断点响应
  └─ Stack / Grid → 决定排列方式（横/竖、间距、换行）
       └─ Center / Spacer / Divider → 微调
```

### 7.1 AlContainer 内容容器

最外层布局容器，约束内容宽度，自动居中，随断点响应。

```vue
<!-- 预设宽度 -->
<al-container size="md">
  <!-- sm=640px / md=768px / lg=1024px / xl=1200px -->
</al-container>

<!-- 自定义宽度 -->
<al-container max-width="1200px">
  内容自动居中
</al-container>

<!-- 全屏 -->
<al-container fluid>
  不限制宽度，充满父容器
</al-container>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| size | `'sm' \| 'md' \| 'lg' \| 'xl'` | — | 预设宽度 |
| max-width | `string` | — | 自定义最大宽度 |
| fluid | `boolean` | `false` | 流体模式（无宽度限制） |
| padding | `number` | `6` | 左右内边距（映射 --al-spacing） |

### 7.2 AlStack 智能堆叠

**沿UI最核心的布局组件。** Flex 容器的极简封装。一个 `spacing` 属性解决排列间距。

```vue
<!-- 垂直排列（默认），间距 16px — 覆盖 90% 场景 -->
<al-stack spacing="4">
  <al-button>按钮1</al-button>
  <al-button>按钮2</al-button>
</al-stack>

<!-- 水平排列 -->
<al-stack direction="row" spacing="3" wrap>
  <al-tag>A</al-tag>
  <al-tag>B</al-tag>
  <al-tag>C</al-tag>
</al-stack>

<!-- 智能平分：子元素自动撑满 -->
<al-stack direction="row" distributed>
  <div>左</div>
  <div>中</div>
  <div>右</div>
</al-stack>

<!-- 水平居中排列 -->
<al-stack direction="row" justify="center" spacing="3">
  <al-button>确定</al-button>
  <al-button>取消</al-button>
</al-stack>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| direction | `'row' \| 'column'` | `'column'` | 排列方向 |
| spacing | `number` | `4` | 间距（`4` = 16px，对应 `--al-spacing-4`） |
| wrap | `boolean` | `false` | 换行 |
| distributed | `boolean` | `false` | 子元素均分剩余空间 |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | 交叉轴对齐 |
| justify | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | 主轴对齐 |

### 7.3 AlGrid 原生网格

CSS Grid 的极简封装。不再需要计算 `span` / `offset` / `push` / `pull`。

```vue
<!-- 3 列等宽 -->
<al-grid :columns="3" spacing="4">
  <div v-for="i in 6" :key="i">项目{{ i }}</div>
</al-grid>

<!-- 响应式：容器宽度自动调整列数 -->
<al-grid :columns="{ xs:1, sm:2, md:3, lg:4 }" spacing="4">
  <div v-for="i in 12" :key="i">卡片{{ i }}</div>
</al-grid>

<!-- 自定义模板 -->
<al-grid template="200px 1fr 200px" rows="auto 1fr auto">
  <header>Header</header>
  <aside>Sidebar</aside>
  <main>Main</main>
  <footer>Footer</footer>
</al-grid>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| columns | `number \| Record<string, number>` | — | 列数或响应式列数配置 |
| template | `string` | — | 自定义 grid-template-columns |
| rows | `string` | — | 自定义 grid-template-rows |
| spacing | `number` | `4` | 间距（`--al-spacing-*`） |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | align-items |
| justify | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | justify-items |

### 7.4 AlCenter 居中容器

```vue
<!-- 水平居中 -->
<al-center>居中内容</al-center>

<!-- 水平+垂直居中（空状态、加载页） -->
<al-center both>
  <al-empty description="暂无数据" />
</al-center>

<!-- 限定宽度居中 -->
<al-center max-width="600px">
  阅读区域内容
</al-center>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| both | `boolean` | `false` | 同时水平和垂直居中 |
| max-width | `string` | — | 内容最大宽度 |

### 7.5 AlSpacer 弹性撑开

```vue
<al-stack direction="row">
  <span>左对齐</span>
  <al-spacer />
  <span>右对齐</span>
</al-stack>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| — | — | — | 无 Props。等价于 `flex: 1` |

### 7.6 AlDivider 分割线

```vue
<al-divider />
<al-divider content-position="left">文字说明</al-divider>
<al-divider dashed />
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| dashed | `boolean` | `false` | 虚线 |
| content-position | `'left' \| 'center' \| 'right'` | `'center'` | 文字位置 |
| spacing | `number` | `6` | 上下间距 |

### 7.7 AlPage 页面布局（复合组件）

快速搭建标准中后台页面结构：

```vue
<al-page>
  <template #header>
    <al-page-title title="用户管理" description="管理所有系统用户" />
  </template>
  <template #actions>
    <al-button type="primary">新建用户</al-button>
  </template>
  <template #default>
    <!-- 表格或表单内容 -->
  </template>
</al-page>
```

| Slot | 说明 |
|------|------|
| header | 页面标题区 |
| actions | 操作按钮区 |
| default | 主内容区 |

### 7.8 与传统方案的对比

| 场景 | ~~Row/Col 24列~~ | ✅ alongUI 方案 |
|------|----------------|--------------|
| 3 等分 | `<Row><Col span="8"/>×3` | `<al-grid :columns="3" />` |
| 表单垂直排列 | `<Space direction="vertical">` | `<al-stack>` |
| 头像+文字一行 | `<Row align="middle">` | `<al-stack direction="row">` |
| 自适应卡片网格 | `<Row :gutter="16"> + v-for Col` | `<al-grid :columns="{xs:1,md:2,lg:4}" />` |
| 居中布局 | 手动写 flex 样式 | `<al-center>` |
| 左右弹开 | 手动 flex + justify-between | `<al-stack direction="row" distributed>` |
| 任意间距 | `<Space>` | `<al-stack spacing="X">` |

---

## 8. Other 其他

### 8.1 Avatar 头像

```vue
<al-avatar :size="40" src="avatar.jpg" />
<al-avatar :size="40" icon="UserFilled" />
<al-avatar :size="40">A</al-avatar>
```

### 8.2 Card 卡片

```vue
<al-card title="卡片标题" shadow="hover">
  <div>卡片内容</div>
</al-card>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| header | `string` | — | 标题 |
| shadow | `'always' \| 'hover' \| 'never'` | `'always'` | 阴影时机 |
| body-style | `object` | — | 内容样式 |

### 8.3 Carousel 走马灯

```vue
<al-carousel :interval="4000" type="card">
  <al-carousel-item v-for="item in 4" :key="item">
    <div>slide {{ item }}</div>
  </al-carousel-item>
</al-carousel>
```

### 8.4 Calendar 日历

```vue
<al-calendar v-model="date" />
```

### 8.5 Image 图片

```vue
<al-image src="image.jpg" fit="cover" :preview-src-list="srcList" />
```

### 8.6 Video / Audio 媒体

```vue
<al-video src="video.mp4" :autoplay="false" controls />
```

### 8.7 ColorPicker 颜色选择器

```vue
<al-color-picker v-model="color" />
```

### 8.8 Slider 滑块

```vue
<al-slider v-model="value" :min="0" :max="100" />
<al-slider v-model="range" range />
```

### 8.9 Rate 评分

```vue
<al-rate v-model="value" :max="5" />
<al-rate v-model="value" show-text />
```

### 8.10 Affix 固钉

```vue
<al-affix :offset="20">
  <al-button type="primary">固定在顶部</al-button>
</al-affix>
```

### 8.11 BackTop 回到顶部

```vue
<!-- 默认滚动 400px 后显示 -->
<al-back-top />

<!-- 自定义显示位置 -->
<al-back-top :right="40" :bottom="60" />

<!-- 自定义内容 -->
<al-back-top>
  <al-icon><ArrowUp /></al-icon>
</al-back-top>
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| visibility-height | `number` | `400` | 滚动到该高度后显示 |
| right | `number` | `40` | 距右距离 |
| bottom | `number` | `40` | 距底距离 |

**事件：** `@click`

```vue
<al-affix :offset="20">
  <al-button type="primary">固定在顶部</al-button>
</al-affix>
```

---

## 9. 组件清单总表

### 9.1 完整清单

| # | 组件 | 分类 | 优先级 | 预估工时 | 说明 |
|---|------|------|--------|---------|------|
| # | 组件 | 分类 | 优先级 | 预估工时 | 说明 |
|---|------|------|--------|---------|------|
| 1 | **Button** | Basic | P0 | 1d | 含 ButtonGroup |
| 2 | **Icon** | Basic | P0 | 0.5d | SVG 图标体系 |
| 3 | **Link** | Basic | P2 | 0.5d | 文字链接 |
| 4 | **Typography** | Basic | P2 | 0.5d | Text / Title |
| 5 | **Input** | Form | P0 | 1d | 含 Textarea |
| 6 | **Select** | Form | P0 | 2d | 含 Option / OptionGroup |
| 7 | **Cascader** | Form | P2 | 2d | 级联选择 |
| 8 | **Switch** | Form | P0 | 0.5d | — |
| 9 | **Checkbox** | Form | P1 | 0.5d | 含 CheckboxGroup |
| 10 | **Radio** | Form | P1 | 0.5d | 含 RadioGroup |
| 11 | **DatePicker** | Form | P1 | 3d | 最复杂组件之一 |
| 12 | **TimePicker** | Form | P2 | 1.5d | — |
| 13 | **Upload** | Form | P1 | 2d | 含拖拽上传 |
| 14 | **Form** | Form | P0 | 2d | 含 FormItem、校验 |
| 15 | **ColorPicker** | Form | P3 | 1d | — |
| 16 | **Slider** | Form | P2 | 1d | — |
| 17 | **Rate** | Form | P3 | 0.5d | — |
| 18 | **Table** | Data | P0 | 3d | 含 Column、排序、固定列 |
| 19 | **Pagination** | Data | P0 | 1d | — |
| 20 | **Tree** | Data | P1 | 2d | 含复选框、拖拽 |
| 21 | **Tag** | Data | P1 | 0.5d | — |
| 22 | **Badge** | Data | P1 | 0.5d | — |
| 23 | **Progress** | Data | P1 | 0.5d | 含线型/环形 |
| 24 | **Collapse** | Data | P2 | 0.5d | — |
| 25 | **Descriptions** | Data | P2 | 1d | — |
| 26 | **Empty** | Data | P1 | 0.5d | — |
| 27 | **Skeleton** | Data | P1 | 0.5d | — |
| 28 | **Dialog** | Feedback | P0 | 1.5d | 模态框 |
| 29 | **Drawer** | Feedback | P1 | 1d | — |
| 30 | **Message** | Feedback | P0 | 1d | 命令式 API |
| 31 | **Notification** | Feedback | P1 | 0.5d | 命令式 API |
| 32 | **MessageBox** | Feedback | P1 | 1d | 命令式 API |
| 33 | **Popover** | Feedback | P1 | 1d | — |
| 34 | **Dropdown** | Feedback | P1 | 1d | 下拉菜单 |
| 35 | **Tooltip** | Feedback | P0 | 0.5d | — |
| 36 | **Loading** | Feedback | P0 | 0.5d | 指令式 + 服务式 |
| 37 | **Menu** | Nav | P0 | 2d | 含 SubMenu / MenuGroup |
| 38 | **Tabs** | Nav | P1 | 1.5d | — |
| 39 | **Breadcrumb** | Nav | P2 | 0.5d | — |
| 40 | **Steps** | Nav | P2 | 1d | — |
| 41 | **Container** | Layout | P1 | 1d | 宽度约束容器 |
| 42 | **AlStack** | Layout | P1 | 1d | 智能堆叠，代替 Space+Row |
| 43 | **AlGrid** | Layout | P1 | 1d | CSS Grid 原生网格，代替 Row/Col |
| 44 | **Divider** | Layout | P2 | 0.5d | — |
| 45 | **AlCenter** | Layout | P2 | 0.5d | 居中容器 |
| 46 | **AlSpacer** | Layout | P2 | 0.5d | 弹性撑开 |
| 47 | **AlPage** | Layout | P2 | 1d | 页面框架 |
| 48 | **Avatar** | Other | P1 | 0.5d | — |
| 49 | **Card** | Other | P1 | 0.5d | — |
| 50 | **Carousel** | Other | P3 | 1d | — |
| 51 | **Calendar** | Other | P3 | 2d | — |
| 52 | **Image** | Other | P2 | 1d | 含图片预览 |
| 53 | **Video** | Other | P3 | 1d | — |
| 54 | **Affix** | Other | P3 | 0.5d | — |
| 55 | **BackTop** | Other | P3 | 0.5d | 回到顶部 |
> 共 **55 个组件**，对标 Element UI 的组件广度，覆盖中后台 95%+ 场景。
> API 设计遵循 Vue 3 生态惯例，使用者从 Element / Ant Design Vue 迁移几乎无学习成本。
