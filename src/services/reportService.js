/**
 * @file reportService.js — DigiFikile LMS Frontend
 * @layer Service
 *
 * The existing Reports screen is a different aggregate shape from the available backend
 * endpoints. These wrappers expose the real endpoints without fabricating data in the UI.
 */
import { ENDPOINTS } from '../constants/api'
import { api } from '../lib/api'

function unwrap(response) {
  const body = response?.data
  if (body && typeof body === 'object' && 'isSuccess' in body) {
    if (!body.isSuccess) throw new Error(body.error || body.errors?.join(', ') || 'Request failed')
    return body.data
  }
  return body
}

export const fetchCompletionReport = async (trainingProviderId, params = {}) =>
  unwrap(await api.get(ENDPOINTS.REPORTS.COMPLETION(trainingProviderId), { params }))

export const fetchAssessmentPerformanceReport = async (trainingProviderId, params = {}) =>
  unwrap(await api.get(ENDPOINTS.REPORTS.ASSESSMENT_PERFORMANCE(trainingProviderId), { params }))

export const fetchCourseAnalyticsReport = async (courseId) =>
  unwrap(await api.get(ENDPOINTS.REPORTS.COURSE_ANALYTICS(courseId)))

export const fetchUserActivityReport = async ({ from, to }) =>
  unwrap(await api.get(ENDPOINTS.REPORTS.USER_ACTIVITY, { params: { from, to } }))

export const REPORT_ENDPOINTS = ENDPOINTS.REPORTS
