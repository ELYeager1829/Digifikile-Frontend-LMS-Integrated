import { api } from '../lib/api'
import { ENDPOINTS } from '../constants/api'

const unwrap = (response) => {
  const body = response?.data
  if (body?.isSuccess === false) throw new Error(body.error || body.errors?.join?.(', ') || 'Request failed')
  return body?.data ?? body
}

export const fetchMyGroups = async () => unwrap(await api.get(ENDPOINTS.GROUPS.MINE)) || []
export const createGroup = async ({ name, description, setaProgrammeId = null }) =>
  unwrap(await api.post(ENDPOINTS.GROUPS.CREATE, { groupName: name, description, setaProgrammeId }))
export const updateGroup = async (id, { name, description }) =>
  unwrap(await api.put(ENDPOINTS.GROUPS.UPDATE(id), { groupName: name, description }))
export const deleteGroup = async (id) => unwrap(await api.delete(ENDPOINTS.GROUPS.DELETE(id)))
export const fetchGroupStudents = async (id) => unwrap(await api.get(ENDPOINTS.GROUPS.STUDENTS(id))) || []
export const assignStudentsToGroup = async (id, studentIds) =>
  unwrap(await api.post(ENDPOINTS.GROUPS.STUDENTS(id), { studentIds }))
export const removeStudentFromGroup = async (id, studentId) =>
  unwrap(await api.delete(ENDPOINTS.GROUPS.REMOVE_STUDENT(id, studentId)))
