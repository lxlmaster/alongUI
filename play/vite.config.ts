import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: dirname,
  plugins: [vue()],
  resolve: {
    alias: {
      'along-ui': resolve(dirname, '../packages/along-ui/src/index.ts'),
      '@along-ui/components': resolve(dirname, '../packages/components/index.ts'),
      '@along-ui/theme': resolve(dirname, '../packages/theme/src/index.scss'),
      '@along-ui/hooks': resolve(dirname, '../packages/hooks/src/index.ts'),
      '@along-ui/icons': resolve(dirname, '../packages/icons/src/index.ts'),
      '@along-ui/utils': resolve(dirname, '../packages/utils/src/index.ts')
    }
  }
})
