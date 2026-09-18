/**
 * @file TrainingProvidersPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + TrainingProviderList.
 */

import AppLayout from '../components/layout/AppLayout'
import { TrainingProviderList } from '../features/providers'

export default function TrainingProvidersPage() {
  return (
    <AppLayout section="Training Providers">
      <TrainingProviderList />
    </AppLayout>
  )
}
