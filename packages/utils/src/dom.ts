export function isClient() {
  return typeof window !== 'undefined'
}

export function isElement(value: unknown): value is Element {
  return typeof Element !== 'undefined' && value instanceof Element
}

export function addUnit(value?: string | number) {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  return typeof value === 'number' ? `${value}px` : value
}

