import type { ExtractPropTypes, PropType } from 'vue'

export const uploadProps = {
  action: {
    type: String,
    default: ''
  },
  multiple: Boolean,
  accept: String,
  drag: Boolean,
  disabled: Boolean,
  withCredentials: Boolean,
  headers: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  data: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  name: {
    type: String,
    default: 'file'
  },
  limit: Number,
  fileSize: Number,
  listType: {
    type: String as PropType<'text' | 'picture' | 'picture-card'>,
    default: 'text'
  }
} as const

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export type UploadFile = {
  uid: number
  name: string
  size: number
  percentage: number
  status: UploadStatus
  raw: File
  url?: string
  response?: any
}
