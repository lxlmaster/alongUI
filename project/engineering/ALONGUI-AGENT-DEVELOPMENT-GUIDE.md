# alongUI Agent 开发手册

> 目的：在设计重开、研发暂停期间，为后续 Agent 提供一份可以直接执行的组件开发说明。
> 本手册基于当前仓库真实结构整理，不依赖推测。

## 1. 当前仓库结论

- 组件源码目录：`packages/components`
- 当前真实组件数：`55`
- 全量安装入口：`packages/along-ui/src/index.ts`
- 组件导出汇总：`packages/components/index.ts`
- 全量样式聚合：`packages/components/style/index.scss`
- 本地联调沙盒：`play/src/app.vue`
- 文档站：`docs`
- 公共工具：`packages/utils`
- 公共 hooks：`packages/hooks`

> 说明：`packages/components` 下还存在 `style` 和 `node_modules` 目录，它们不是组件目录。

## 2. 组件清单

### Basic

`button`, `icon`, `link`, `typography`, `avatar`, `card`

### Form

`input`, `select`, `cascader`, `switch`, `checkbox`, `radio`, `date-picker`, `time-picker`, `upload`, `form`, `color-picker`, `slider`, `rate`

### Data

`table`, `pagination`, `tree`, `tag`, `badge`, `progress`, `collapse`, `descriptions`, `empty`, `skeleton`, `calendar`, `image`, `carousel`, `video`

### Feedback

`dialog`, `drawer`, `message`, `notification`, `message-box`, `popover`, `dropdown`, `tooltip`, `loading`

### Navigation

`menu`, `tabs`, `breadcrumb`, `steps`

### Layout

`container`, `stack`, `grid`, `center`, `spacer`, `page`, `divider`

### Other

`affix`, `backtop`

## 3. Agent 应先理解的开发模式

### 模式 A：普通单文件组件

适用：
`button`, `input`, `switch`, `tag`, `progress`, `empty`, `card`, `link`, `divider`, `rate`

典型结构：

```text
packages/components/<name>/
  index.ts
  src/
    <name>.ts
    <name>.vue
  style/
    index.scss
  __tests__/   # 按风险决定是否需要
```

入口模式：

```ts
import { withInstall } from '@along-ui/utils'
import Component from './src/component.vue'

export const AlComponent = withInstall(Component)
export * from './src/component'
export default AlComponent
```

参考：
- [packages/components/button/index.ts](/D:/codex/alongUI/packages/components/button/index.ts)
- [packages/utils/src/install.ts](/D:/codex/alongUI/packages/utils/src/install.ts)

### 模式 B：组合型父子组件

适用：
`table + table-column`, `tabs + tab-pane`, `steps + step`, `breadcrumb + breadcrumb-item`, `menu + menu-item + sub-menu`, `collapse + collapse-item`, `carousel + carousel-item`, `checkbox + checkbox-group`, `radio + radio-group`, `form + form-item`

典型特征：

- 父组件在 `src/*.ts` 中定义 `InjectionKey`
- 父组件 `provide(...)`
- 子组件 `inject(...)`
- `index.ts` 中导出多个安装项

参考：
- [packages/components/table/src/table.ts](/D:/codex/alongUI/packages/components/table/src/table.ts)
- [packages/components/table/src/table.vue](/D:/codex/alongUI/packages/components/table/src/table.vue)
- [packages/components/table/src/table-column.vue](/D:/codex/alongUI/packages/components/table/src/table-column.vue)
- [packages/components/tabs/src/tabs.ts](/D:/codex/alongUI/packages/components/tabs/src/tabs.ts)

### 模式 C：服务型 / 命令式组件

适用：
`loading`, `message`, `notification`, `message-box`

典型特征：

- 不只是模板组件
- 可能包含 service、directive、dom 挂载逻辑
- 常配合 `packages/utils/src/vnode.ts`

参考：
- [packages/components/loading/index.ts](/D:/codex/alongUI/packages/components/loading/index.ts)
- [packages/components/loading/src/service.ts](/D:/codex/alongUI/packages/components/loading/src/service.ts)
- [packages/components/message/src/index.ts](/D:/codex/alongUI/packages/components/message/src/index.ts)
- [packages/components/notification/src/index.ts](/D:/codex/alongUI/packages/components/notification/src/index.ts)

### 模式 D：结构型组件族

适用：
`container`, `typography`, `button-group`, `page`

典型特征：

- 一个目录下导出多个并列组件
- 不一定依赖 provide/inject
- 更偏结构和布局

参考：
- [packages/components/container/index.ts](/D:/codex/alongUI/packages/components/container/index.ts)
- [packages/components/typography/index.ts](/D:/codex/alongUI/packages/components/typography/index.ts)
- [packages/components/button/src/button-group.vue](/D:/codex/alongUI/packages/components/button/src/button-group.vue)

## 4. 组件新增或重构的标准链路

后续 Agent 开发任何一个新组件，必须至少检查下面 8 个接入点：

1. `packages/components/<name>/src/*.ts`
2. `packages/components/<name>/src/*.vue`
3. `packages/components/<name>/style/index.scss`
4. `packages/components/<name>/index.ts`
5. `packages/components/index.ts`
6. `packages/components/style/index.scss`
7. `packages/along-ui/src/index.ts`
8. `play/src/app.vue`

如果需要文档和长期维护，再补下面 2 个：

9. `docs/components/<name>.md`
10. `docs/.vitepress/config.ts`

## 5. 当前代码约定

### 命名

- 组件名统一为 `AlXxx`
- 导出名统一为 `AlXxx`
- Props / Emits 定义在 `src/<name>.ts`
- 组件 SFC 里使用 `defineOptions({ name: 'AlXxx' })`

### 类型

- Props 通常使用 `ExtractPropTypes`
- 组合组件上下文用 `InjectionKey<T>`
- 事件尽量显式声明

### 样式

- 样式变量统一走 `--al-*`
- 全量样式需要补到 [packages/components/style/index.scss](/D:/codex/alongUI/packages/components/style/index.scss)
- Apple 风格红线延续 [docs/development.md](/D:/codex/alongUI/docs/development.md)

### 安装

- 常规组件使用 `withInstall`
- 全量包使用 `makeInstaller`
- 指令或 service 组件可自定义 `install(app)`

## 6. 当前公共依赖层

### utils

入口：
- [packages/utils/src/index.ts](/D:/codex/alongUI/packages/utils/src/index.ts)

关键能力：
- `install.ts`：`withInstall`、`makeInstaller`
- `dom.ts`：DOM 相关工具
- `vnode.ts`：运行时挂载/卸载 VNode
- `style.ts`：样式辅助

### hooks

入口：
- [packages/hooks/src/index.ts](/D:/codex/alongUI/packages/hooks/src/index.ts)

当前已有：
- `use-focus`
- `use-click-outside`
- `use-focus-trap`
- `use-scroll-lock`
- `use-portal`
- `use-popper`

适合场景：
- 弹层定位
- 外部点击关闭
- 焦点陷阱
- body 滚动锁定

## 7. 已知坑位

### 1. 文档站 alias 不要再粗暴覆盖 VitePress 默认别名

`docs/.vitepress/config.ts` 里如果直接用对象式 alias 覆盖不当，容易把 VitePress 自己的 `@theme` 打坏。

当前可用做法：
- 文档主题文件优先用相对路径引用仓库源码
- 文档额外 alias 用数组追加

### 2. 组合组件不能只“注册父组件”

如果组件有子组件：
- 子组件必须在 `index.ts` 导出
- 子组件必须在 `packages/along-ui/src/index.ts` 全量安装列表中补上
- `play/src/app.vue` 里要给出可见示例

### 3. 全量样式漏挂会导致“组件存在但没样式”

新增组件后，必须补：
- `packages/components/style/index.scss`

### 4. 服务型组件不要硬套普通组件模板

`loading`, `message`, `notification`, `message-box` 这类需要优先看：
- 是否要 directive
- 是否要 service
- 是否要动态挂载 DOM

### 5. 弹层类组件要特别小心遮罩残留

`dialog`, `drawer`, `popover`, `dropdown`, `tooltip` 一旦处理不好，就会出现遮罩挡住页面或浮层残留。

建议每次改动后都在 `play` 中实际点一遍。

### 6. 描述类/表格类子组件不要依赖脆弱的挂载顺序

像 `descriptions-item`、`table-column` 这类子节点，优先基于插槽/VNode/上下文做稳定收集，不要只靠 `onMounted` 顺序碰运气。

## 8. 推荐的 Agent 开发顺序

如果后续重新开工，建议 Agent 按下面顺序做，而不是四处并发乱接：

1. 先确定组件属于哪种模式
2. 先补 `src/*.ts` 的类型和上下文
3. 再写 `src/*.vue`
4. 再补 `index.ts`
5. 再补 `style/index.scss`
6. 再补全量导出和安装
7. 再补 `play/src/app.vue`
8. 最后补文档与测试

## 9. 最低验证清单

### 基础验证

```bash
pnpm typecheck
pnpm test
```

### 文档验证

```bash
pnpm build:docs
pnpm dev:docs
```

### 联调验证

```bash
pnpm dev
```

重点手查：
- 组件是否被全量安装
- 样式是否生效
- `play` 是否可见
- 文档页是否可打开
- 浮层是否可关闭
- 组合子组件是否正常注册

## 10. 给下一个 Agent 的一句话

在 alongUI 里，开发一个组件不只是把 `.vue` 写出来，而是要把：

`源码 -> 类型 -> 样式 -> 导出 -> 全量安装 -> play 联调 -> docs 页面 -> 测试`

这一整条链路补完整。
