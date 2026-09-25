/**
 * @file DownloadsPanel.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Downloads / offline materials panel (no AppLayout).
 */

import { DownloadModuleIcon, PdfDocumentIcon, StudyNoteIcon, SyncedOfflineIcon, Trash } from '../../../components/ui/Icons';
import Button from '../../../components/ui/Button'

const downloadedModules = [
  {
    id: 1,
    title: 'Introduction to Digital Literacy',
    size: '450 MB',
    offline: true,
    icon: '▣',
    accent: 'blue',
  },
  {
    id: 2,
    title: 'Advanced Mathematics - Section 2',
    size: '210 MB',
    offline: true,
    icon: '▣',
    accent: 'blue',
  },
];

const pdfDocs = [
  { id: 1, title: 'Syllabus', size: '2.4 MB', color: 'red' },
  { id: 2, title: 'Assignment', size: '1.1 MB', color: 'red' },
  { id: 3, title: 'Study_Note', size: '500 KB', color: 'blue' },
];

const video = {
  title: 'Lecture 3: Understanding Cloud Architecture',
  size: '280 MB',
  saved: true,
  duration: '12:45',
};

export default function DownloadsPanel() {
  return (
    <div className="learner-downloads-page">
        <div className="downloads-header-block">
          <h1 className="downloads-title">Downloaded Content</h1>
          <p className="downloads-subtitle">Manage your files available for offline viewing.</p>
        </div>

        <div className="sync-status-pill">
          <span className="sync-check"><SyncedOfflineIcon size={18} /></span>
          <span>Synced &amp; Ready Offline</span>
        </div>

        <div className="usage-panel">
          <div className="usage-label">Storage Used</div>
          <div className="usage-bar-wrap">
            <div className="usage-bar" />
          </div>
          <div className="usage-meta">
            <span>1.2 GB</span>
            <span>/ 5 GB</span>
          </div>
        </div>

        <div className="downloads-content-grid">
          <section className="downloads-panel modules-panel">
            <div className="downloads-panel-header">
              <h2>Downloaded Modules</h2>
            </div>

            <div className="downloaded-module-list">
              {downloadedModules.map((module) => (
                <div key={module.id} className="download-module-row">
                  <div className="module-left">
                    <div className={`module-square ${module.accent}`}><DownloadModuleIcon size={25} /></div>
                    <div className="module-copy">
                      <div className="module-name">{module.title}</div>
                      <div className="module-meta">
                        <span>Module</span>
                        <span className="module-meta-divider">•</span>
                        <span>{module.size}</span>
                        {module.offline && <span className="offline-badge">Available Offline</span>}
                      </div>
                    </div>
                  </div>

                  <Button type="button" variant="destructive" size="icon" aria-label="Delete module"><Trash size={18} color="#4b5563" /></Button>
                </div>
              ))}
            </div>
          </section>

          <section className="downloads-panel docs-panel">
            <div className="downloads-panel-header right-header">
              <h2>PDFs &amp; Documents</h2>
            </div>

            <div className="pdf-list">
              {pdfDocs.map((doc) => (
                <div key={doc.id} className="pdf-row">
                  <div className="pdf-left">
                    <div className={`pdf-icon ${doc.color}`}>
                      {doc.title === 'Study_Note' ? <StudyNoteIcon size={25} /> : <PdfDocumentIcon size={25} />}
                    </div>
                    <div className="pdf-copy">
                      <div className="pdf-name">{doc.title}</div>
                      <div className="pdf-meta">
                        <span>{doc.size}</span>
                        <span className="pdf-ready-check">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="downloads-panel video-panel">
          <h2>Videos</h2>
          <div className="video-card">
            <div className="video-preview">
              <button type="button" className="video-play-btn" aria-label="Play video">▶</button>
              <span className="video-duration">12:45</span>
            </div>

            <div className="video-info-row">
              <div className="video-title">{video.title}</div>
            </div>

            <div className="video-meta-row">
              <span>{video.size}</span>
              <span className="saved-badge">✓ Saved</span>
              <button type="button" className="download-small-btn large" aria-label="Download video">↓</button>
            </div>
          </div>
        </section>
      </div>
  );
}
