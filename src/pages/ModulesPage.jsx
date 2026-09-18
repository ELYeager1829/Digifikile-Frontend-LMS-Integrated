/**
 * @file ModulesPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for learner modules (AppLayout + ModuleList).
 */

import AppLayout from '../components/layout/AppLayout'
import { ModuleList } from '../features/content'

export default function ModulesPage() {
  return (
    <AppLayout section="My Modules">
      <ModuleList />
    </AppLayout>
  )
}
