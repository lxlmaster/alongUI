import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'LoadingIcon',
  render() {
    return h(
      'svg',
      {
        viewBox: '0 0 24 24',
        fill: 'none',
        'aria-hidden': 'true'
      },
      [
        h('circle', {
          cx: '12',
          cy: '12',
          r: '9',
          stroke: 'currentColor',
          'stroke-width': '2',
          opacity: '0.25'
        }),
        h('path', {
          d: 'M21 12a9 9 0 0 0-9-9',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round'
        })
      ]
    )
  }
})

