/**
 * @file ModuleList.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Learner enrolled-modules grid with search/filters.
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, CodeIcon, PencilIcon, DatabaseIcon, EnrolledModulesIcon, ResourceIcon, DownloadIcon } from '../../../components/ui/Icons';
import { learnerModules } from '../../../data/mockData';
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'

export default function ModuleList() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const translatedStatusLabel = (status) => {
    if (status === 'in-progress') return t('moduleList', 'statusInProgress')
    if (status === 'not-started') return t('moduleList', 'statusNotStarted')
    if (status === 'completed') return t('moduleList', 'statusCompleted')
    return status
  }

  const translatedModuleDetails = (module) => {
    const titleKeyMap = {
      'LM-001': 'titles.introductionToProgramming',
      'LM-002': 'titles.uiUxFundamentals',
      'LM-003': 'titles.databaseManagementSystems',
    }

    const subtitleKeyMap = {
      'LM-001': 'subtitles.informationTechnology',
      'LM-002': 'subtitles.digitalDesign',
      'LM-003': 'subtitles.informationTechnology',
    }

    return {
      title: t('moduleList', titleKeyMap[module.id] || 'titleFallback'),
      subtitle: t('moduleList', subtitleKeyMap[module.id] || 'subtitleFallback'),
    }
  }

  const filteredModules = useMemo(() => {
    let result = [...learnerModules];

    // Search filter
    if (query.trim()) {
      const text = query.trim().toLowerCase();
      result = result.filter((module) =>
        module.title.toLowerCase().includes(text) || 
        module.subtitle.toLowerCase().includes(text)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((module) => module.status === statusFilter);
    }

    return result;
  }, [query, statusFilter]);

  return (
    <div className="learner-modules-page">
        <div className="modules-header">
          <div>
            <h1 className="modules-title">{t('moduleList', 'title')}</h1>
            <p className="modules-subtitle">{t('moduleList', 'subtitle')}</p>
          </div>
        </div>

        <div className="modules-controls">
          <div className="modules-search-wrap">
            <input
              type="text"
              className="modules-search"
              placeholder={t('moduleList', 'searchPlaceholder')}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="modules-search-icon"><SearchIcon size={18} /></span>
          </div>

          <div className="modules-filters">
            <select
              className="modules-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{t('moduleList', 'statusAll')}</option>
              <option value="not-started">{t('moduleList', 'statusNotStarted')}</option>
              <option value="in-progress">{t('moduleList', 'statusInProgress')}</option>
              <option value="completed">{t('moduleList', 'statusCompleted')}</option>
            </select>

            <select className="modules-filter-select">
              <option>{t('moduleList', 'programmeAll')}</option>
            </select>
          </div>
        </div>

        <div className="modules-grid">
          {filteredModules.map((module) => {
            const moduleDetails = translatedModuleDetails(module)

            return (
            <div className="module-card" key={module.id}>
              <div className="module-card-header">
                <span className="module-icon"><>{module.title === 'UI/UX Fundamentals' ? <PencilIcon size={28} color="#454d68" /> : module.title === 'Database Management Systems' ? <DatabaseIcon size={28} color="#454d68" /> : <CodeIcon size={28} color="#000000" />}</></span>
                <button type="button" className="module-download" aria-label={`Download ${module.title}`}><DownloadIcon size={18} color="#086ac2" /></button>
                <span className={`module-status-badge status-${module.status}`}>
                  {translatedStatusLabel(module.status)}
                </span>
              </div>

              <div className="module-card-content">
                <h3 className="module-title">{moduleDetails.title}</h3>
                <p className="module-subtitle">{moduleDetails.subtitle}</p>

                <div className="module-progress-section">
                  <div className="module-progress-bar-container">
                    <div
                      className="module-progress-bar"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>

                <div className="module-info">
                  <div className="module-info-item">
                    <span className="info-icon"><EnrolledModulesIcon size={17} color="#596575" /></span>
                    <span className="info-label">{t('moduleList', 'lessons').replace('{count}', module.lessons)}</span>
                  </div>
                  <div className="module-info-item">
                    <span className="info-icon"><ResourceIcon size={17} color="#596575" /></span>
                    <span className="info-label">{t('moduleList', 'resources').replace('{count}', module.resources)}</span>
                  </div>
                  <span className="module-info-percent">{module.progress}%</span>
                </div>

                <button
                  type="button"
                  className={`module-button module-button-${module.buttonStyle}`}
                  onClick={() => navigate(ROUTES.MODULE_DETAIL(module.slug || module.id))}
                >
                  {module.status === 'in-progress' ? t('moduleList', 'continue') : t('moduleList', 'start')}
                </button>
              </div>
            </div>
            )
          })}
        </div>
      </div>
  );
}
