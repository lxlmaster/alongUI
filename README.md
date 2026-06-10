# alongUI

Vue 3 + TypeScript + Scss + Vite based UI component library for PC admin systems.

alongUI aims to provide Element Plus-like component coverage with a cleaner, restrained visual language inspired by Apple-style neutral tones, subtle radius, and strong design token consistency.

## Documents

- [Project plan](./ALONGUI-PROJECT-PLAN.md)
- [Component design](./ALONGUI-COMPONENTS.md)
- [Design tokens](./ALONGUI-DESIGN-TOKENS.md)
- [Color preview](./ALONGUI-COLOR-PREVIEW.html)

## Status

The project is currently in the engineering scaffold stage. The monorepo structure, package boundaries, theme entry, Button/Icon/Tooltip/Loading foundations, play sandbox, and VitePress documentation skeleton have been created.

## Workspace

```text
packages/
  components/   Component source, styles, and tests
  theme/        Design tokens and global styles
  hooks/        Composition API utilities
  icons/        Icon components
  utils/        Shared utilities
  along-ui/     Full install entry
docs/           VitePress documentation
play/           Local development sandbox
internal/       Build and internal tooling config
```

## Development

```bash
pnpm install
pnpm dev
pnpm dev:docs
```
