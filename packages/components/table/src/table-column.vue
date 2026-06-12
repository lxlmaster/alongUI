<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'AlTableColumn',
  props: {
    prop: { type: String, default: undefined },
    label: { type: String, default: '' },
    width: { type: [String, Number], default: undefined },
    fixed: { type: String as import('vue').PropType<'left' | 'right'>, default: undefined },
    sortable: Boolean,
    align: { type: String as import('vue').PropType<'left' | 'center' | 'right'>, default: 'left' }
  },
  render() {
    return h('span', { style: 'display:none' }, this.$slots.default?.())
  }
})
</script>


