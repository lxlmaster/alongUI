import { ref } from 'vue'

export function useFocus() {
  const focused = ref(false)

  const handleFocus = () => {
    focused.value = true
  }

  const handleBlur = () => {
    focused.value = false
  }

  return {
    focused,
    handleFocus,
    handleBlur
  }
}

