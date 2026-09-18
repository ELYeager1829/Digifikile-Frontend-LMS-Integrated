import { api } from '../lib/api'

const endpoint = '/Complaints'
const unwrap = ({ data }) => {
  if (data?.isSuccess === false) throw new Error(data.error || 'Unable to complete the complaint request.')
  return data?.data ?? data
}

function normalizeComplaint(item) {
  if (!item) return item
  return {
    ...item,
    subject: item.subject || item.title || '',
    userId: item.userId ?? item.complainantUserId,
    userName: item.userName || item.complainantName || '',
    email: item.email || item.complainantEmail || '',
    priority: item.priority || null,
    history: Array.isArray(item.history) ? item.history : [],
  }
}

export const complaintService = {
  async list(signal, status = null) {
    const result = unwrap(await api.get(endpoint, { params: status ? { status } : {}, signal }))
    const items = Array.isArray(result) ? result : result?.items || []
    return items.map(normalizeComplaint)
  },
  async detail(id, signal) {
    return normalizeComplaint(unwrap(await api.get(`${endpoint}/${id}`, { signal })))
  },
  async mine(signal) {
    const result = unwrap(await api.get(`${endpoint}/mine`, { signal }))
    return (Array.isArray(result) ? result : []).map(normalizeComplaint)
  },
  async updateStatus(id, status, _version = null, resolutionNotes = null) {
    return normalizeComplaint(unwrap(await api.put(`${endpoint}/${id}/status`, { status, resolutionNotes })))
  },
  async respond(id, response, status) {
    return normalizeComplaint(unwrap(await api.put(`${endpoint}/${id}/status`, {
      status,
      resolutionNotes: response,
    })))
  },
}
