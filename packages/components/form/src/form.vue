<template>
  <form
    class="al-form"
    :class="[`al-form--label-${labelPosition}`, `al-form--${size}`]"
    @submit.prevent
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { formContextKey, formProps, type FormContext, type FormItemContext, type FormRule } from './form'

defineOptions({
  name: 'AlForm'
})

const props = defineProps(formProps)

const fields = ref<FormItemContext[]>([])

function addField(field: FormItemContext) {
  fields.value.push(field)
}

function removeField(field: FormItemContext) {
  const index = fields.value.indexOf(field)
  if (index > -1) {
    fields.value.splice(index, 1)
  }
}

function getRules(prop: string): FormRule[] {
  if (props.rules && props.rules[prop]) {
    return props.rules[prop]
  }
  return []
}

async function validate(): Promise<true> {
  const errors: string[] = []
  const results = await Promise.all(
    fields.value.map((field) =>
      field.validate().then((err) => {
        if (err) errors.push(err)
      })
    )
  )
  if (errors.length) {
    return Promise.reject(errors)
  }
  return true
}

function resetFields() {
  fields.value.forEach((field) => field.resetField())
}

function clearValidate() {
  fields.value.forEach((field) => field.clearValidate())
}

const context: FormContext = {
  model: props.model,
  rules: props.rules,
  labelWidth: props.labelWidth,
  labelPosition: props.labelPosition,
  disabled: props.disabled,
  size: props.size,
  addField,
  removeField,
  getRules
}

provide(formContextKey, context)

defineExpose({
  validate,
  resetFields,
  clearValidate
})
</script>
