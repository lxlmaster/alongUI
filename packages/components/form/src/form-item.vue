<template>
  <div
    class="al-form-item"
    :class="[
      `al-form-item--${formSize}`,
      {
        'is-error': validateState === 'error',
        'is-validating': validateState === 'validating',
        'is-required': isRequired,
        'is-disabled': formDisabled
      }
    ]"
  >
    <label
      v-if="label || $slots.label"
      class="al-form-item__label"
      :style="labelStyle"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div class="al-form-item__content">
      <slot />
      <div
        v-if="validateState === 'error' && errorMessage"
        class="al-form-item__error"
      >
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { formContextKey, type FormRule } from './form'

defineOptions({
  name: 'AlFormItem'
})

const props = defineProps({
  label: String,
  prop: {
    type: String,
    default: ''
  },
  rules: {
    type: [Object, Array] as unknown as () => FormRule | FormRule[]
  },
  required: Boolean,
  labelWidth: {
    type: [String, Number]
  },
  size: {
    type: String as () => 'small' | 'default' | 'large'
  }
})

const formContext = inject(formContextKey, null)

const validateState = ref<'idle' | 'success' | 'error' | 'validating'>('idle')
const errorMessage = ref('')

const formSize = computed(() => props.size || formContext?.size || 'default')
const formDisabled = computed(() => formContext?.disabled || false)

const isRequired = computed(() => {
  if (props.required) return true
  const rules = getFilteredRules()
  return rules.some((rule) => rule.required)
})

const labelStyle = computed(() => {
  if (!formContext) return {}
  const width = props.labelWidth || formContext.labelWidth
  if (width !== undefined && width !== null) {
    return { width: typeof width === 'number' ? `${width}px` : width }
  }
  return {}
})

function getFilteredRules(): FormRule[] {
  const rules: FormRule[] = []
  if (props.rules) {
    if (Array.isArray(props.rules)) {
      rules.push(...props.rules)
    } else {
      rules.push(props.rules)
    }
  }
  if (props.prop && formContext?.rules && formContext.rules[props.prop]) {
    rules.push(...formContext.rules[props.prop])
  }
  return rules
}

function getFieldValue(): any {
  if (!props.prop || !formContext?.model) return undefined
  const keys = props.prop.split('.')
  let value: any = formContext.model
  for (const key of keys) {
    if (value === undefined || value === null) break
    value = (value as Record<string, any>)[key]
  }
  return value
}

async function validate(trigger?: string): Promise<string | null> {
  if (!props.prop) return null

  const rules = getFilteredRules()
  const filteredRules = trigger
    ? rules.filter((rule) => !rule.trigger || rule.trigger === trigger)
    : rules

  if (!filteredRules.length) return null

  const value = getFieldValue()
  validateState.value = 'validating'

  for (const rule of filteredRules) {
    const error = await validateRule(rule, value)
    if (error) {
      validateState.value = 'error'
      errorMessage.value = error
      return error
    }
  }

  validateState.value = 'success'
  errorMessage.value = ''
  return null
}

function validateRule(rule: FormRule, value: any): Promise<string | null> {
  return new Promise((resolve) => {
    if (rule.required) {
      if (value === undefined || value === null || value === '') {
        resolve(rule.message || 'This field is required')
        return
      }
    }

    if (rule.min !== undefined) {
      if (typeof value === 'string' && value.length < rule.min) {
        resolve(rule.message || `Minimum ${rule.min} characters`)
        return
      }
      if (typeof value === 'number' && value < rule.min) {
        resolve(rule.message || `Minimum value is ${rule.min}`)
        return
      }
    }

    if (rule.max !== undefined) {
      if (typeof value === 'string' && value.length > rule.max) {
        resolve(rule.message || `Maximum ${rule.max} characters`)
        return
      }
      if (typeof value === 'number' && value > rule.max) {
        resolve(rule.message || `Maximum value is ${rule.max}`)
        return
      }
    }

    if (rule.pattern && !rule.pattern.test(String(value))) {
      resolve(rule.message || 'Invalid format')
      return
    }

    if (rule.validator) {
      rule.validator(rule, value, (error) => {
        resolve(error ? error.message || error.toString() : null)
      })
      return
    }

    resolve(null)
  })
}

function resetField() {
  if (!props.prop || !formContext?.model) return
  const keys = props.prop.split('.')
  const lastKey = keys.pop()!
  let target: any = formContext.model
  for (const key of keys) {
    target = target[key]
  }
  target[lastKey] = undefined
  validateState.value = 'idle'
  errorMessage.value = ''
}

function clearValidate() {
  validateState.value = 'idle'
  errorMessage.value = ''
}

watch(
  () => (props.prop ? getFieldValue() : undefined),
  () => {
    if (validateState.value === 'error' || validateState.value === 'success') {
      validate('change')
    }
  }
)

const fieldContext = {
  prop: props.prop,
  validate,
  clearValidate,
  resetField
}

onMounted(() => {
  if (props.prop) {
    formContext?.addField(fieldContext)
  }
})

onBeforeUnmount(() => {
  if (props.prop) {
    formContext?.removeField(fieldContext)
  }
})

defineExpose({
  validate,
  resetField,
  clearValidate,
  validateState,
  errorMessage
})
</script>
