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

const isSetaAdmin = () => localStorage.getItem('digifikile-role') === 'seta-admin'

function splitName(value = '') {
  const parts = String(value).trim().split(/\s+/).filter(Boolean)
  return { firstName: parts.shift() || '', lastName: parts.join(' ') }
}

function generateTemporaryPassword() {
  const bytes = new Uint32Array(4)
  crypto.getRandomValues(bytes)
  return `Df!${Array.from(bytes).map(value => value.toString(36)).join('').slice(0, 14)}aA1`
}

export function mapUser(user) {
  if (!user) return user
  const fullName = [user.name, user.surname].filter(Boolean).join(' ').trim()
  const role = user.role || (user.studentNumber ? 'Student' : 'Unassigned')
  return {
    ...user,
    name: fullName || user.email,
    firstName: user.name || '',
    lastName: user.surname || '',
    role,
    roleId: user.roleId ?? null,
    status: user.isActive === false ? 'Inactive' : 'Active',
    permissions: Array.isArray(user.permissions) ? user.permissions : [],
    createdAt: user.createdAt || user.enrolledAt
      ? new Date(user.createdAt || user.enrolledAt).toLocaleDateString()
      : '',
  }
}

export const fetchUsers = async () => {
  if (isSetaAdmin()) {
    const data = unwrap(await api.get(ENDPOINTS.STUDENTS.LIST, { params: { page: 1, pageSize: 200 } }))
    const items = Array.isArray(data) ? data : data?.items || []
    return items.map(mapUser)
  }

  const data = unwrap(await api.get(ENDPOINTS.USERS.LIST, { params: { pageNumber: 1, pageSize: 200 } }))
  const items = Array.isArray(data) ? data : data?.items || []
  return items.map(mapUser)
}

export const fetchUserById = async (userId) => {
  const endpoint = isSetaAdmin() ? ENDPOINTS.STUDENTS.BY_ID(userId) : ENDPOINTS.USERS.BY_ID(userId)
  return mapUser(unwrap(await api.get(endpoint)))
}

export const createUser = async (payload) => {
  if (isSetaAdmin()) {
    const { firstName, lastName } = splitName(payload.name)
    const body = {
      name: firstName,
      surname: lastName,
      email: String(payload.email || '').trim().toLowerCase(),
      password: generateTemporaryPassword(),
      phone: payload.phone || null,
      address: payload.address || null,
      studentNumber: payload.studentNumber || null,
    }
    let created = mapUser(unwrap(await api.post(ENDPOINTS.STUDENTS.CREATE, body)))
    if (String(payload.status || 'Active').toLowerCase() === 'inactive') {
      created = mapUser(unwrap(await api.put(ENDPOINTS.STUDENTS.UPDATE(created.id), {
        name: created.firstName,
        surname: created.lastName,
        email: created.email,
        phone: created.phone || null,
        address: created.address || null,
        isActive: false,
      })))
    }
    return created
  }

  return mapUser(unwrap(await api.post(ENDPOINTS.USERS.CREATE, payload)))
}

export const updateUser = async (userId, payload) => {
  const body = {}
  if (payload.name != null) Object.assign(body, splitName(payload.name))
  if (payload.firstName != null) body.name = payload.firstName
  if (payload.lastName != null) body.surname = payload.lastName
  if (payload.phone !== undefined) body.phone = payload.phone
  if (payload.address !== undefined) body.address = payload.address
  if (payload.email !== undefined) body.email = payload.email
  if (payload.status != null) body.isActive = String(payload.status).toLowerCase() === 'active'
  if (payload.isActive != null) body.isActive = Boolean(payload.isActive)

  if (isSetaAdmin()) {
    if ('firstName' in body) { body.name = body.firstName; delete body.firstName }
    if ('lastName' in body) { body.surname = body.lastName; delete body.lastName }
    return mapUser(unwrap(await api.put(ENDPOINTS.STUDENTS.UPDATE(userId), body)))
  }

  return mapUser(unwrap(await api.put(ENDPOINTS.USERS.UPDATE(userId), body)))
}

export const fetchRoles = async () => {
  if (isSetaAdmin()) return []
  const data = unwrap(await api.get(ENDPOINTS.ROLES.LIST))
  return Array.isArray(data) ? data : []
}

export const fetchRoleById = async (roleId) => unwrap(await api.get(ENDPOINTS.ROLES.BY_ID(roleId)))

export const fetchPermissions = async () => {
  if (isSetaAdmin()) return []
  const data = unwrap(await api.get(ENDPOINTS.PERMISSIONS.LIST))
  return Array.isArray(data) ? data : []
}

export const assignRole = async (userId, roleId) => {
  if (isSetaAdmin()) throw new Error('SETA Administrators cannot grant elevated roles.')
  return mapUser(unwrap(await api.post(ENDPOINTS.ROLES.ASSIGN(userId), { roleId: Number(roleId) })))
}

export const assignPermission = async (roleId, permissionId) => {
  if (isSetaAdmin()) throw new Error('SETA Administrators cannot change role permissions.')
  return unwrap(await api.post(ENDPOINTS.ROLES.ASSIGN_PERMISSION(roleId, permissionId)))
}

export const removePermission = async (roleId, permissionId) => {
  if (isSetaAdmin()) throw new Error('SETA Administrators cannot change role permissions.')
  return unwrap(await api.delete(ENDPOINTS.ROLES.REMOVE_PERMISSION(roleId, permissionId)))
}

export const USER_ENDPOINTS = ENDPOINTS.USERS
export const ROLE_ENDPOINTS = ENDPOINTS.ROLES

export default { fetchUsers, fetchUserById, createUser, updateUser, fetchRoles, fetchRoleById, fetchPermissions, assignRole, assignPermission, removePermission }
