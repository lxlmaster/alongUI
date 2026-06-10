import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'alongUI',
  description: 'Vue 3 enterprise UI component library',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [{ text: '快速开始', link: '/guide/getting-started' }]
      },
      {
        text: '组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Icon 图标', link: '/components/icon' },
          { text: 'Tooltip 文字提示', link: '/components/tooltip' },
          { text: 'Loading 加载', link: '/components/loading' }
        ]
      }
    ]
  }
})
