import { ENDPOINTS } from '../constants/api'
import { api } from '../lib/api'

const ROLE_KEY = 'digifikile-role'
const AUTH_KEY = 'digifikile-authenticated'

const backendRoleToFrontend = (role) => {
  if (role === 'SystemAdministrator') return 'system-admin'
  if (role === 'SetaAdministrator') return 'seta-admin'
  if (role === 'Student') return 'student'
  if (role === 'TrainingProvider') return 'training-provider'
  if (role === 'Facilitator') return 'facilitator'
  if (role === 'Moderator') return 'moderator'
  return String(role || '').toLowerCase()
}

const unwrap = (response) => {
  const body = response?.data
  if (body?.isSuccess === false) {
    throw new Error(body.error || body.errors?.join(', ') || 'Request failed')
  }
  return body?.data ?? body
}

export const getApiErrorMessage = (error, fallback = 'Request failed.') =>
  error?.response?.data?.error ||
  error?.response?.data?.errors?.join?.(', ') ||
  error?.message ||
  fallback

/**
 * Current login screen is e-mail based. For this integration pass it accepts the two
 * administrator roles being wired now: System Administrator first, then SETA Administrator.
 */
export const login = async ({ email, password }) => {
  const payload = { email: email.trim().toLowerCase(), password }

  try {
    return unwrap(await api.post(ENDPOINTS.AUTH.SYSTEM_ADMIN_LOGIN, payload))
  } catch (error) {
    if (error?.response?.status !== 401) throw error
  }

  return unwrap(await api.post(ENDPOINTS.AUTH.SETA_ADMIN_LOGIN, payload))
}

export const verifyLoginOtp = async ({ email, otp }) => {
  const data = unwrap(await api.post(ENDPOINTS.AUTH.VERIFY_OTP, { email, otp }))

  localStorage.setItem('token', data.token)
  localStorage.setItem(ROLE_KEY, backendRoleToFrontend(data.role))
  localStorage.setItem(AUTH_KEY, 'true')

  return data
}

export const resendLoginOtp = async (email) =>
  unwrap(await api.post(ENDPOINTS.AUTH.RESEND_OTP, { email }))

export const requestPasswordReset = async (email) =>
  unwrap(await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email: email.trim().toLowerCase() }))

export const verifyPasswordResetOtp = async ({ email, otp }) =>
  unwrap(await api.post(ENDPOINTS.AUTH.VERIFY_PASSWORD_RESET_OTP, { email, otp }))

export const resetPassword = async ({ email, resetToken, newPassword }) =>
  unwrap(await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, { email, resetToken, newPassword }))

export const changePassword = async ({ currentPassword, newPassword }) =>
  unwrap(await api.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, { currentPassword, newPassword }))

export const logout = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem(ROLE_KEY)
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem('digifikile-current-user')
  localStorage.removeItem('digifikile-user-name')
}

const cacheCurrentUser = (user) => {
  if (!user) return user
  const normalized = {
    ...user,
    username: user.username || user.email || '',
    fullName: [user.name, user.surname].filter(Boolean).join(' ').trim(),
    frontendRole: backendRoleToFrontend(user.role),
  }
  localStorage.setItem('digifikile-current-user', JSON.stringify(normalized))
  localStorage.setItem('digifikile-user-name', normalized.fullName || normalized.email || 'DigiFikile User')
  if (normalized.frontendRole) localStorage.setItem(ROLE_KEY, normalized.frontendRole)
  window.dispatchEvent(new CustomEvent('digifikile-current-user-updated', { detail: normalized }))
  return normalized
}

export const getCurrentUser = async () =>
  cacheCurrentUser(unwrap(await api.get(ENDPOINTS.AUTH.CURRENT_USER)))

export const updateCurrentUserProfile = async ({ name, surname, phone, address }) =>
  cacheCurrentUser(unwrap(await api.put(ENDPOINTS.AUTH.UPDATE_CURRENT_USER_PROFILE, { name, surname, phone, address })))

export const getCachedCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem('digifikile-current-user') || 'null') }
  catch { return null }
}

export const refreshToken = async () => {
  throw new Error('Refresh token endpoint is not available in the current backend.')
}
export const register = async () => {
  throw new Error('Use the role-specific registration endpoint for this account type.')
}

export const AUTH_ENDPOINTS = ENDPOINTS.AUTH
