# alongUI

Vue 3 + TypeScript + Scss + Vite based UI component library for PC admin systems.

alongUI aims to provide Element Plus-like component coverage with a cleaner, restrained visual language inspired by Apple-style neutral tones, subtle radius, and strong design token consistency.

## Documents

- [Project materials index](./project/README.md)
- [Project plan](./project/planning/ALONGUI-PROJECT-PLAN.md)
- [Component design](./project/planning/ALONGUI-COMPONENTS.md)
- [Design tokens](./project/design/ALONGUI-DESIGN-TOKENS.md)
- [Color preview](./project/design/ALONGUI-COLOR-PREVIEW.html)

## Status

The project is currently in the engineering scaffold stage. The monorepo structure, package boundaries, theme entry, Button/Input/Icon/Tooltip/Loading foundations, play sandbox, and VitePress documentation skeleton have been created.

The current visual direction follows `project/engineering/ALONGUI-CODEX-GUIDE.md` and `project/design/ALONGUI-APPLE-SPEC.md`: black primary actions, Apple neutral surfaces, 6px control radius, gray input backgrounds, and restrained shadows.

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
project/        Planning, design, engineering, and review materials
```

## Development

```bash
pnpm install
pnpm dev
pnpm dev:docs
```
