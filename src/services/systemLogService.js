import { api } from '../lib/api'
import { ENDPOINTS } from '../constants/api'

function unwrap(response) {
  const body = response?.data
  if (body && typeof body === 'object' && 'isSuccess' in body) {
    if (!body.isSuccess) throw new Error(body.error || body.errors?.join(', ') || 'Request failed')
    return body.data
  }
  return body
}


export const fetchSystemLogsPage = async (page = 1, pageSize = 50) => {
  const data = unwrap(await api.get(ENDPOINTS.SYSTEM_LOGS.LIST, { params: { page, pageSize } }))
  const items = Array.isArray(data) ? data : data?.items || []
  return { items, totalCount: Array.isArray(data) ? data.length : (data?.totalCount ?? items.length) }
}

export const fetchSystemLogs = async () => {
  const data = unwrap(await api.get(ENDPOINTS.SYSTEM_LOGS.LIST, { params: { page: 1, pageSize: 500 } }))
  return Array.isArray(data) ? data : data?.items || []
}

export const exportSystemLogs = async (params = {}) => {
  const response = await api.get(ENDPOINTS.SYSTEM_LOGS.EXPORT, { params, responseType: 'blob' })
  const disposition = response.headers?.['content-disposition'] || ''
  const match = disposition.match(/filename="?([^";]+)"?/i)
  const filename = match?.[1] || 'digifikile-system-log.csv'
  const url = URL.createObjectURL(response.data)
  const link = document.createElement('a'); link.href = url; link.download = filename; link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
