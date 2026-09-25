/**
 * @file index.js — DigiFikile LMS Frontend
 * @layer Feature Public API
 *
 * WHAT THIS FILE IS:
 *   Public barrel for the enrollment feature.
 *
 * RELATED FILES:
 *   - features/enrollment/components/* — internal UI
 *   - pages/EnrollmentRequestsPage.jsx — list consumer
 *   - pages/EnrollmentRequestDetailPage.jsx — detail consumer
 */

export { default as EnrollmentRequestList } from './components/EnrollmentRequestList'
export { default as EnrollmentRequestDetail } from './components/EnrollmentRequestDetail'
