import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

/**
 * 子包 library-mode 构建配置工厂。
 *
 * 各子包（components / along-ui / hooks / icons / utils / theme）的专用
 * `vite.<pkg>.config.ts` 都应调用本工厂来生成基础配置，避免在多个包里
 * 重复粘贴相同的打包逻辑。
 */
export interface MakeLibConfigOptions {
  /** 构建入口（相对该子包目录的路径，如 `src/index.ts`）。 */
  entry: string
  /** 暴露到全局的 UMD/IIFE 变量名（ESM/CJS 模式不强制，但建议填写）。 */
  name: string
  /** 产物输出目录（相对该子包目录，如 `dist`）。 */
  outDir: string
  /**
   * 额外的 rollup 外部依赖。默认已经 externals 了 `vue` 和所有
   * `@along-ui/*` 包，这里只补充非 @along-ui 的第三方依赖（如 `lodash`）。
   */
  externals?: (string | RegExp)[]
  /** 覆盖默认的打包格式，默认 `['es', 'cjs']`。 */
  formats?: ('es' | 'cjs' | 'umd' | 'iife')[]
}

export function makeLibConfig(opts: MakeLibConfigOptions): UserConfig {
  const formats = opts.formats ?? ['es', 'cjs']

  // 默认外部化 Vue 与所有 workspace 内的 @along-ui 子包，
  // 再合并调用方显式指定的第三方依赖，避免把它们打进产物。
  const external = [
    'vue',
    /^@along-ui\//,
    ...(opts.externals ?? []),
  ]

  return defineConfig({
    plugins: [
      // 处理 .vue 单文件组件（components / along-ui 包需要）。
      vue(),
      // 根据源码生成 .d.ts 类型声明，并插入统一的类型入口文件。
      dts({
        insertTypesEntry: true,
      }),
    ],
    build: {
      // 库模式：单入口 + 多格式产物。
      lib: {
        entry: opts.entry,
        name: opts.name,
        formats,
        // ESM 产物扩展名用 .mjs，CJS 用 .cjs，符合现代打包惯例。
        fileName: (format) => `${opts.name}.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      outDir: opts.outDir,
      // 压缩交给各平台（npm/CDN）处理，库本身只出未压缩源码级产物更利于 tree-shaking。
      minify: false,
      rollupOptions: {
        external,
        output: {
          // 让 externals 的裸模块在 CJS 里走 require、ESM 里走 import。
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
}
