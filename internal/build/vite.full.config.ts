import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const dirname = fileURLToPath(new URL('.', import.meta.url))
// 仓库根目录（monorepo root），所有路径以此为基准
const root = resolve(dirname, '../..')

/**
 * 将包名转成 UMD 全局变量名，例如 "along-ui" -> "AlongUI"。
 */
function toGlobalName(name: string): string {
  return name
    .split(/[-_/]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/**
 * 内联等价实现（原 utils.ts 中的 makeLibConfig 不存在，此处内联）。
 *
 * 生成一个「库构建」配置：以单个 entry 打包为 es / umd 产物，
 * 并支持把给定模块列表（含子路径）标记为 external。
 */
interface LibConfigOptions {
  /** 包名，同时作为 UMD 全局名与产物名前缀 */
  name: string
  /** 入口文件（相对 root 或绝对路径） */
  entry: string
  /** 输出目录（相对 root 或绝对路径） */
  outDir: string
  /** 需要 external 的模块（精确名或前缀，如 "@along-ui/components" 也会匹配其任意子路径） */
  externals?: string[]
  /** 产物格式，默认同时产出 es 与 umd */
  formats?: Array<'es' | 'cjs' | 'umd' | 'iife'>
}

function makeLibConfig(options: LibConfigOptions): UserConfig {
  const {
    name,
    entry,
    outDir,
    externals = [],
    formats = ['es', 'umd'],
  } = options

  const fileName = (format: string): string => {
    if (format === 'es') return 'index.js'
    if (format === 'cjs') return `${name}.cjs`
    return `${name}.${format}.cjs`
  }

  // external 匹配：精确相等，或 id 以 "xxx/" 开头（子路径导入）
  const isExternal = (id: string): boolean =>
    externals.some(
      (dep) => id === dep || id.startsWith(`${dep}/`) || id === `${dep}/index.scss`,
    )

  return {
    root,
    plugins: [vue()],
    build: {
      outDir,
      emptyOutDir: true,
      // 全量包为单产物，合并 CSS 以便消费方一次引入
      cssCodeSplit: false,
      sourcemap: true,
      lib: {
        entry,
        name: toGlobalName(name),
        formats,
        fileName,
      },
      rollupOptions: {
        external: (id) => isExternal(id),
        output: {
          // UMD 产物将 vue 等外部依赖暴露为全局变量（仅 umd/iife 生效）
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
    name: 'along-ui',
    entry: resolve(root, 'packages/along-ui/src/index.ts'),
    outDir: resolve(root, 'packages/along-ui/dist'),
    externals: [
      'vue',
      '@along-ui/components',
      '@along-ui/hooks',
      '@along-ui/icons',
      '@along-ui/theme',
      '@along-ui/utils',
    ],
  }),
)
