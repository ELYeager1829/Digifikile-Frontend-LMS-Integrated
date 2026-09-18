/**
 * @file ModuleDetailPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen for a module by moduleId (AppLayout + ModuleDetailView).
 */

import { useParams } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import { ModuleDetailView } from '../features/content'

export default function ModuleDetailPage() {
  const { moduleId } = useParams()

  return (
    <AppLayout section="Modules">
      <ModuleDetailView key={moduleId} />
    </AppLayout>
  )
}
