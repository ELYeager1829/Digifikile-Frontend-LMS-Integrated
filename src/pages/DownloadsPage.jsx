/**
 * @file DownloadsPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for offline downloads.
 *
 * RELATED FILES:
 *   - features/downloads — DownloadsPanel
 *   - constants/routes.js — ROUTES.DOWNLOADS
 */

import AppLayout from '../components/layout/AppLayout'
import { DownloadsPanel } from '../features/downloads'

export default function DownloadsPage() {
  return (
    <AppLayout section="Downloads">
      <DownloadsPanel />
    </AppLayout>
  )
}
