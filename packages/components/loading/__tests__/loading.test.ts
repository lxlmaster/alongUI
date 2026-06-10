import { describe, expect, it } from 'vitest'
import { LoadingService } from '../index'

describe('LoadingService', () => {
  it('creates and closes loading mask', () => {
    const instance = LoadingService({
      text: 'Loading'
    })

    expect(document.querySelector('.al-loading-mask')).not.toBeNull()

    instance.close()

    expect(document.querySelector('.al-loading-mask')).toBeNull()
  })
})

