import { resolve } from 'path'
import { defineConfig } from 'vitepress'

const sidebar = {
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '主题定制', link: '/guide/theme' },
        { text: '从 Element Plus 迁移', link: '/guide/migration' },
      ]
    }
  ],
  '/components/': [
    {
      text: 'Basic 基础',
      items: [
        { text: 'Button 按钮', link: '/components/button' },
        { text: 'Icon 图标', link: '/components/icon' },
        { text: 'Link 链接', link: '/components/link' },
        { text: 'Typography 排版', link: '/components/typography' },
      ]
    },
    {
      text: 'Form 表单',
      collapsed: false,
      items: [
        { text: 'Input 输入框', link: '/components/input' },
        { text: 'Select 选择器', link: '/components/select' },
        { text: 'Cascader 级联选择', link: '/components/cascader' },
        { text: 'Switch 开关', link: '/components/switch' },
        { text: 'Checkbox 复选框', link: '/components/checkbox' },
        { text: 'Radio 单选框', link: '/components/radio' },
        { text: 'DatePicker 日期选择', link: '/components/date-picker' },
        { text: 'TimePicker 时间选择', link: '/components/time-picker' },
        { text: 'Upload 上传', link: '/components/upload' },
        { text: 'Form 表单', link: '/components/form' },
        { text: 'ColorPicker 颜色选择', link: '/components/color-picker' },
        { text: 'Slider 滑块', link: '/components/slider' },
        { text: 'Rate 评分', link: '/components/rate' },
      ]
    },
    {
      text: 'Data 数据展示',
      collapsed: false,
      items: [
        { text: 'Table 表格', link: '/components/table' },
        { text: 'Pagination 分页', link: '/components/pagination' },
        { text: 'Tree 树形控件', link: '/components/tree' },
        { text: 'Tag 标签', link: '/components/tag' },
        { text: 'Badge 徽标', link: '/components/badge' },
        { text: 'Progress 进度条', link: '/components/progress' },
        { text: 'Collapse 折叠面板', link: '/components/collapse' },
        { text: 'Descriptions 描述列表', link: '/components/descriptions' },
        { text: 'Empty 空状态', link: '/components/empty' },
        { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
        { text: 'Calendar 日历', link: '/components/calendar' },
        { text: 'Image 图片', link: '/components/image' },
        { text: 'Carousel 走马灯', link: '/components/carousel' },
        { text: 'Video 视频', link: '/components/video' },
      ]
    },
    {
      text: 'Feedback 反馈',
      collapsed: false,
      items: [
        { text: 'Dialog 对话框', link: '/components/dialog' },
        { text: 'Drawer 抽屉', link: '/components/drawer' },
        { text: 'Message 消息提示', link: '/components/message' },
        { text: 'Notification 通知', link: '/components/notification' },
        { text: 'MessageBox 弹框', link: '/components/message-box' },
        { text: 'Popover 弹出框', link: '/components/popover' },
        { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
        { text: 'Tooltip 文字提示', link: '/components/tooltip' },
        { text: 'Loading 加载', link: '/components/loading' },
      ]
    },
    {
      text: 'Navigation 导航',
      collapsed: false,
      items: [
        { text: 'Menu 菜单', link: '/components/menu' },
        { text: 'Tabs 标签页', link: '/components/tabs' },
        { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
        { text: 'Steps 步骤条', link: '/components/steps' },
      ]
    },
    {
      text: 'Layout 布局',
      collapsed: false,
      items: [
        { text: 'Container 容器', link: '/components/container' },
        { text: 'Stack 堆叠', link: '/components/stack' },
        { text: 'Grid 网格', link: '/components/grid' },
        { text: 'Center 居中', link: '/components/center' },
        { text: 'Spacer 撑开', link: '/components/spacer' },
        { text: 'Page 页面框架', link: '/components/page' },
        { text: 'Divider 分割线', link: '/components/divider' },
      ]
    },
    {
      text: 'Other 其他',
      collapsed: false,
      items: [
        { text: 'Avatar 头像', link: '/components/avatar' },
        { text: 'Card 卡片', link: '/components/card' },
        { text: 'Affix 固钉', link: '/components/affix' },
        { text: 'BackTop 回到顶部', link: '/components/backtop' },
        { text: 'ColorPicker 颜色选择', link: '/components/color-picker' },
        { text: 'Rate 评分', link: '/components/rate' },
        { text: 'Slider 滑块', link: '/components/slider' },
      ]
    },
  ]
}

export default defineConfig({
  title: 'alongUI',
  description: 'Vue 3 企业级 UI 组件库 · Apple 设计语言',
  vite: {
    resolve: {
      alias: [
        { find: 'along-ui', replacement: resolve(__dirname, '../../packages/along-ui/src/index.ts') },
        { find: '@along-ui/components/style', replacement: resolve(__dirname, '../../packages/components/style/index.scss') },
        { find: '@along-ui/components', replacement: resolve(__dirname, '../../packages/components/index.ts') },
        { find: '@along-ui/theme', replacement: resolve(__dirname, '../../packages/theme/src/index.scss') },
        { find: '@along-ui/hooks', replacement: resolve(__dirname, '../../packages/hooks/src/index.ts') },
        { find: '@along-ui/icons', replacement: resolve(__dirname, '../../packages/icons/src/index.ts') },
        { find: '@along-ui/utils', replacement: resolve(__dirname, '../../packages/utils/src/index.ts') }
      ]
    }
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button' }
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/along-ui/along-ui' }
    ]
  }
})
