import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

/**
 * 与 internal/build/utils.ts 中预期 `makeLibConfig` 等价的 library-mode 配置。
 * 由于 utils.ts 当前不存在，这里内联实现，保证该文件可独立使用。
 */
interface MakeLibConfigOptions {
  /** 库名（同时作为 UMD 全局变量名前缀） */
  name: string
  /** 库的入口文件 */
  entry: string
  /** 产物输出目录 */
  outDir: string
  /** 需要 external 的依赖（除 vue 与 @along-ui/* 之外可额外指定） */
  externals?: Array<string | RegExp>
  /** 输出格式，默认 es + cjs */
  formats?: Array<'es' | 'cjs' | 'umd'>
}

function makeLibConfig(options: MakeLibConfigOptions): UserConfig {
  const {
    name,
    entry,
    outDir,
    externals = [],
    formats = ['es', 'cjs'],
  } = options

  return {
    plugins: [
      vue(),
      dts({
        entryRoot: entry.replace(/\/index\.ts$/, ''),
        outDir,
        tsconfigPath: 'tsconfig.json',
      }),
    ],
    build: {
      outDir,
      emptyOutDir: true,
      sourcemap: true,
      lib: {
        entry,
        name,
        formats,
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        // 外部化 vue 以及所有 @along-ui/* 包，避免将依赖打进产物
        external: ['vue', /^@along-ui\//, ...externals],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
}

export default defineConfig(
  makeLibConfig({
    name: '@along-ui/components',
    entry: 'packages/components/index.ts',
    outDir: 'packages/components/dist',
    externals: ['vue', '@along-ui/icons', '@along-ui/utils'],
    formats: ['es', 'cjs'],
  }),
)
