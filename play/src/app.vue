<template>
  <main class="workbench" :data-theme="isDark ? 'dark' : undefined">
    <aside class="sidebar">
      <div>
        <p class="eyebrow">alongUI</p>
        <h1>组件工作台</h1>
      </div>
      <nav class="nav-list" aria-label="组件列表">
        <a href="#button">Button</a>
        <a href="#icon">Icon</a>
        <a href="#tooltip">Tooltip</a>
        <a href="#loading">Loading</a>
      </nav>
      <al-button class="theme-toggle" :type="isDark ? 'primary' : 'default'" @click="toggleTheme">
        {{ isDark ? '浅色模式' : '暗色模式' }}
      </al-button>
    </aside>

    <section class="stage">
      <header class="stage-header">
        <div>
          <p class="eyebrow">Sprint 3</p>
          <h2>基础反馈与图标能力</h2>
        </div>
        <al-tooltip content="当前工作台展示已注册组件">
          <al-button type="primary">已注册 4 项</al-button>
        </al-tooltip>
      </header>

      <section id="button" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Basic</p>
          <h3>Button</h3>
        </div>
        <div class="preview-row">
          <al-button>默认按钮</al-button>
          <al-button type="primary">主要按钮</al-button>
          <al-button type="success">成功按钮</al-button>
          <al-button type="warning">警告按钮</al-button>
          <al-button type="danger">危险按钮</al-button>
        </div>
        <div class="preview-row">
          <al-button size="small">小按钮</al-button>
          <al-button>默认尺寸</al-button>
          <al-button size="large">大按钮</al-button>
          <al-button type="primary" loading>加载中</al-button>
          <al-button disabled>禁用按钮</al-button>
        </div>
        <al-button-group>
          <al-button>左</al-button>
          <al-button>中</al-button>
          <al-button>右</al-button>
        </al-button-group>
      </section>

      <section id="icon" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Basic</p>
          <h3>Icon</h3>
        </div>
        <div class="icon-row">
          <al-icon :size="18" color="#0071e3"><SearchIcon /></al-icon>
          <al-icon :size="24" color="#30d158"><CheckIcon /></al-icon>
          <al-icon :size="28" color="#ff9f0a"><AlertIcon /></al-icon>
        </div>
      </section>

      <section id="tooltip" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Feedback</p>
          <h3>Tooltip</h3>
        </div>
        <div class="preview-row">
          <al-tooltip content="保存当前配置" placement="top">
            <al-button type="primary">Hover Top</al-button>
          </al-tooltip>
          <al-tooltip content="底部提示内容" placement="bottom">
            <al-button>Hover Bottom</al-button>
          </al-tooltip>
          <al-tooltip content="点击切换显示" trigger="click" placement="right">
            <al-button>Click Right</al-button>
          </al-tooltip>
        </div>
      </section>

      <section id="loading" v-loading="panelLoading" class="component-section loading-demo">
        <div class="section-title">
          <p class="eyebrow">Feedback</p>
          <h3>Loading</h3>
        </div>
        <p class="demo-copy">用于覆盖局部内容，避免提交、刷新和远程请求期间出现重复操作。</p>
        <div class="preview-row">
          <al-button type="primary" @click="showPanelLoading">局部加载 1.2s</al-button>
          <al-button @click="showFullLoading">全屏加载 1.2s</al-button>
        </div>
      </section>
    </section>

    <aside class="inspector">
      <p class="eyebrow">Tokens</p>
      <h2>当前主题</h2>
      <div class="token-list">
        <span style="--swatch: var(--al-color-primary)">Primary</span>
        <span style="--swatch: var(--al-color-success)">Success</span>
        <span style="--swatch: var(--al-color-warning)">Warning</span>
        <span style="--swatch: var(--al-color-danger)">Danger</span>
      </div>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { LoadingService } from '@along-ui/components'

const isDark = ref(false)
const panelLoading = ref(false)

const SearchIcon = {
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('circle', { cx: '11', cy: '11', r: '7', stroke: 'currentColor', 'stroke-width': '2' }),
      h('path', { d: 'M16.5 16.5 21 21', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' })
    ])
}

const CheckIcon = {
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M5 12.5 9.5 17 19 7', stroke: 'currentColor', 'stroke-width': '2.2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
}

const AlertIcon = {
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M12 4 21 20H3L12 4Z', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linejoin': 'round' }),
      h('path', { d: 'M12 9v5', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }),
      h('circle', { cx: '12', cy: '17', r: '1', fill: 'currentColor' })
    ])
}

function toggleTheme() {
  isDark.value = !isDark.value
}

function showPanelLoading() {
  panelLoading.value = true
  window.setTimeout(() => {
    panelLoading.value = false
  }, 1200)
}

function showFullLoading() {
  const instance = LoadingService({
    text: '同步组件状态',
    fullscreen: true
  })

  window.setTimeout(() => {
    instance.close()
  }, 1200)
}
</script>

<style scoped>
.workbench {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 240px;
  min-height: 100vh;
  color: var(--al-text-color-primary);
  background: var(--al-bg-color);
}

.workbench[data-theme='dark'] {
  color-scheme: dark;
}

.sidebar,
.inspector {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 28px;
  background: var(--al-bg-color-overlay);
  border-color: var(--al-border-color-light);
}

.sidebar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--al-border-color-light);
}

.inspector {
  border-left: 1px solid var(--al-border-color-light);
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--al-text-color-secondary);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  margin: 0;
  letter-spacing: 0;
}

h1 {
  font-size: 24px;
}

h2 {
  font-size: 22px;
}

h3 {
  font-size: 18px;
}

.nav-list {
  display: grid;
  gap: 6px;
  margin: 36px 0;
}

.nav-list a {
  padding: 9px 0;
  color: var(--al-text-color-secondary);
  text-decoration: none;
}

.nav-list a:hover {
  color: var(--al-color-primary);
}

.theme-toggle {
  margin-top: auto;
}

.stage {
  padding: 36px;
}

.stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.component-section {
  position: relative;
  padding: 28px 0;
  border-top: 1px solid var(--al-border-color-light);
}

.component-section:first-of-type {
  border-top: 0;
}

.section-title {
  margin-bottom: 18px;
}

.preview-row,
.icon-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.icon-row {
  gap: 20px;
}

.loading-demo {
  min-height: 180px;
}

.demo-copy {
  max-width: 560px;
  margin: 0 0 18px;
  color: var(--al-text-color-secondary);
  line-height: 1.7;
}

.token-list {
  display: grid;
  gap: 14px;
  margin-top: 20px;
}

.token-list span {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--al-text-color-regular);
}

.token-list span::before {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--swatch);
  content: '';
}

@media (max-width: 960px) {
  .workbench {
    grid-template-columns: 1fr;
  }

  .sidebar,
  .inspector {
    position: static;
    height: auto;
    border: 0;
  }

  .stage {
    padding: 24px;
  }

  .stage-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
