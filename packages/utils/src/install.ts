import type { App, Component, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(component: T) {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as { name?: string }).name

    if (name) {
      app.component(name, component as Component)
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
