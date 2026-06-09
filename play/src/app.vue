<template>
  <main class="play-page">
    <section class="play-section">
      <p class="play-eyebrow">alongUI Play</p>
      <h1>Button</h1>
      <div class="play-row">
        <al-button>默认按钮</al-button>
        <al-button type="primary">主要按钮</al-button>
        <al-button type="success">成功按钮</al-button>
        <al-button type="warning">警告按钮</al-button>
        <al-button type="danger">危险按钮</al-button>
      </div>
      <div class="play-row">
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
  </main>
</template>

<style scoped>
.play-page {
  min-height: 100vh;
  padding: 48px;
  background: var(--al-bg-color);
}

.play-section {
  max-width: 960px;
  margin: 0 auto;
}

.play-eyebrow {
  margin: 0 0 8px;
  color: var(--al-text-color-secondary);
}

h1 {
  margin: 0 0 24px;
  color: var(--al-text-color-primary);
}

.play-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
</style>

