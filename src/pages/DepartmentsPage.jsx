/**
 * @file DepartmentsPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for academic departments.
 *
 * RELATED FILES:
 *   - features/departments — DepartmentList
 *   - constants/routes.js — ROUTES.DEPARTMENTS
 */

import AppLayout from '../components/layout/AppLayout'
import { DepartmentList } from '../features/departments'

export default function DepartmentsPage() {
  return (
    <AppLayout section="Departments">
      <DepartmentList />
    </AppLayout>
  )
}
