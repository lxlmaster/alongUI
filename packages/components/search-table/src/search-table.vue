<template>
  <div class="al-search-table">
    <!-- Search form -->
    <div v-if="searchFields.length" class="al-search-table__form">
      <div class="al-search-table__form-inner">
        <div
          v-for="field in searchFields"
          :key="field.prop"
          class="al-search-table__form-item"
        >
          <label class="al-search-table__form-label">{{ field.label }}</label>
          <input
            v-if="!field.component || field.component === 'input'"
            v-model="formValues[field.prop]"
            class="al-search-table__form-input"
            :placeholder="field.placeholder || '请输入'"
          />
          <select
            v-else-if="field.component === 'select'"
            v-model="formValues[field.prop]"
            class="al-search-table__form-select"
          >
            <option value="">{{ field.placeholder || '请选择' }}</option>
            <option
              v-for="opt in field.options"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="al-search-table__form-actions">
        <button class="al-search-table__btn al-search-table__btn--primary" @click="handleSearch">
          查询
        </button>
        <button class="al-search-table__btn" @click="handleReset">
          重置
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="al-search-table__table-wrap">
      <al-table
        :data="data"
        :stripe="stripe"
        :border="border"
        :max-height="maxHeight"
        :loading="loading"
      >
        <al-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :align="col.align || 'left'"
          :sortable="col.sortable"
        >
          <template v-if="col.render" #default="{ row }">
            <component :is="col.render(row)" />
          </template>
        </al-table-column>
      </al-table>
    </div>

    <!-- Pagination -->
    <div class="al-search-table__pagination">
      <al-pagination
        :current="current"
        :page-size="pageSize"
        :total="total"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next"
        @update:current="handlePageChange"
        @update:page-size="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { searchTableProps } from './search-table'

defineOptions({
  name: 'AlSearchTable'
})

const props = defineProps(searchTableProps)
const emit = defineEmits<{
  search: [values: Record<string, any>]
  reset: []
  'update:current': [value: number]
  'update:page-size': [value: number]
  'update:search-values': [values: Record<string, any>]
}>()

const formValues = reactive<Record<string, any>>({ ...props.searchValues })

watch(() => props.searchValues, (val) => {
  Object.assign(formValues, val)
}, { deep: true })

function handleSearch() {
  emit('update:search-values', { ...formValues })
  emit('search', { ...formValues })
}

function handleReset() {
  Object.keys(formValues).forEach(k => { formValues[k] = '' })
  emit('reset')
  emit('update:search-values', { ...formValues })
}

function handlePageChange(page: number) {
  emit('update:current', page)
}

function handleSizeChange(size: number) {
  emit('update:page-size', size)
}
</script>
