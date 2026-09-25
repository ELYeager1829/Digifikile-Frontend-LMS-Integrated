import { ENDPOINTS } from '../constants/api'
import { api } from '../lib/api'

const unwrap = (response) => {
  const body = response?.data
  if (body?.isSuccess === false) {
    throw new Error(body.error || body.errors?.join(', ') || 'Request failed')
  }
  return body?.data ?? body
}

const normalizeSetaAdmin = (admin) => {
  if (!admin) return admin
  return {
    ...admin,
    id: admin.id ?? admin.setaAdministratorId,
    userId: admin.userId,
    name: admin.name ?? admin.firstName ?? '',
    surname: admin.surname ?? admin.lastName ?? '',
    email: admin.email ?? admin.username ?? '',
    phone: admin.phone ?? admin.contactNumber ?? '',
    address: admin.address ?? '',
    isActive: admin.isActive !== false,
    status: admin.isActive === false ? 'Inactive' : 'Active',
  }
}

export const fetchSetaAdministrators = async (page = 1, pageSize = 100) => {
  const result = unwrap(await api.get(ENDPOINTS.SYSTEM_ADMIN.SETA_ADMINS, { params: { page, pageSize } }))
  const items = Array.isArray(result) ? result : result?.items || []
  return { ...(result || {}), items: items.map(normalizeSetaAdmin) }
}

export const fetchSetaAdministratorById = async (adminId) =>
  normalizeSetaAdmin(unwrap(await api.get(ENDPOINTS.SYSTEM_ADMIN.SETA_ADMIN_BY_ID(adminId))))

export const provisionSetaAdministrator = async (payload) =>
  normalizeSetaAdmin(unwrap(await api.post(ENDPOINTS.SYSTEM_ADMIN.PROVISION_SETA_ADMIN, payload)))

export const updateSetaAdministrator = async (adminId, payload) =>
  normalizeSetaAdmin(unwrap(await api.put(ENDPOINTS.SYSTEM_ADMIN.UPDATE_SETA_ADMIN(adminId), payload)))

export const activateSetaAdministrator = async (adminId) =>
  unwrap(await api.put(ENDPOINTS.SYSTEM_ADMIN.ACTIVATE_SETA_ADMIN(adminId)))

export const deactivateSetaAdministrator = async (adminId) =>
  unwrap(await api.put(ENDPOINTS.SYSTEM_ADMIN.DEACTIVATE_SETA_ADMIN(adminId)))

export const deleteSetaAdministrator = async (adminId) =>
  unwrap(await api.delete(ENDPOINTS.SYSTEM_ADMIN.DELETE_SETA_ADMIN(adminId)))
