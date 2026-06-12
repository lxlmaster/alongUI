import type { ExtractPropTypes } from 'vue'

export const calendarProps = {
  modelValue: {
    type: Date,
    default: () => new Date()
  }
} as const

export type CalendarProps = ExtractPropTypes<typeof calendarProps>
