/**
 * @file courseService.js — DigiFikile LMS Frontend
 * @layer Service
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

export const fetchCourses = async (page = 1, pageSize = 200) =>
  unwrap(await api.get(ENDPOINTS.COURSES.LIST, { params: { page, pageSize } }))

export const fetchCourseById = async (courseId) =>
  unwrap(await api.get(ENDPOINTS.COURSES.BY_ID(courseId)))

export const createCourse = async (payload) =>
  unwrap(await api.post(ENDPOINTS.COURSES.CREATE, payload))

export const updateCourse = async (courseId, payload) =>
  unwrap(await api.put(ENDPOINTS.COURSES.UPDATE(courseId), payload))

export const deleteCourse = async (courseId) =>
  unwrap(await api.delete(ENDPOINTS.COURSES.DELETE(courseId)))

export const COURSE_ENDPOINTS = ENDPOINTS.COURSES
