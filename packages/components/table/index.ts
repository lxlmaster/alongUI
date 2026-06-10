import { withInstall } from '@along-ui/utils'
import Table from './src/table.vue'
import TableColumn from './src/table-column.vue'

export const AlTable = withInstall(Table)
export const AlTableColumn = withInstall(TableColumn)

export * from './src/table'
export default AlTable
