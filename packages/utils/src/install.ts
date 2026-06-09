import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T extends { name?: string }>(component: T) {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    if (component.name) {
      app.component(component.name, component)
    }
  }

  return component as SFCWithInstall<T>
}

export function makeInstaller(components: Plugin[] = []) {
  return {
    install(app: App) {
      components.forEach((component) => {
        app.use(component)
      })
    }
  }
}

