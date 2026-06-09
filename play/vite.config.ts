import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'along-ui': resolve(__dirname, '../packages/along-ui/src/index.ts'),
      '@along-ui/components': resolve(__dirname, '../packages/components/index.ts'),
      '@along-ui/theme': resolve(__dirname, '../packages/theme/src/index.scss'),
      '@along-ui/hooks': resolve(__dirname, '../packages/hooks/src/index.ts'),
      '@along-ui/icons': resolve(__dirname, '../packages/icons/src/index.ts'),
      '@along-ui/utils': resolve(__dirname, '../packages/utils/src/index.ts')
    }
  }
})

