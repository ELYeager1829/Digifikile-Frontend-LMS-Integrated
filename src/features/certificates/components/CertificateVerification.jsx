import { useState } from 'react'
import { BadgeCheck, Search } from '../../../components/ui/Icons'
import { useLanguage } from '../../../i18n/LanguageContext'
import { verifyCertificate } from '../certificateVerificationService'

const STATUS_COPY = {
  Valid: 'This certificate is authentic and currently valid.',
  Expired: 'This certificate exists but is no longer valid because its expiry date has passed.',
  Revoked: 'This certificate exists but has been revoked.',
}

const DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function formatDate(value) {
  return DATE_FORMATTER.format(new Date(`${value}T00:00:00`))
}

export default function CertificateVerification() {
  const { t } = useLanguage()
  const [certificateNumber, setCertificateNumber] = useState('')
  const [result, setResult] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setHasSearched(true)
    setResult(verifyCertificate(certificateNumber))
  }

  return (
    <div className="certificate-verification-page">
      <div className="page-header">
        <div>
          <h1>{t('certificateVerification', 'title')}</h1>
          <p>{t('certificateVerification', 'intro')}</p>
        </div>
      </div>

      <section className="certificate-search-card" aria-labelledby="certificate-search-heading">
        <div className="certificate-section-heading">
          <div className="certificate-section-icon"><BadgeCheck size={22} color="var(--primary-color)" /></div>
          <div>
            <h2 id="certificate-search-heading">{t('certificateVerification', 'searchHeading')}</h2>
            <p>{t('certificateVerification', 'searchSubtext')}</p>
          </div>
        </div>
        <form className="certificate-search-form" onSubmit={handleSubmit}>
          <label htmlFor="certificate-number">{t('certificateVerification', 'certificateNumberLabel')}</label>
          <div className="certificate-search-control">
            <Search size={18} color="#687586" />
            <input
              id="certificate-number"
              type="search"
              value={certificateNumber}
              onChange={(event) => setCertificateNumber(event.target.value)}
              placeholder={t('certificateVerification', 'searchPlaceholder')}
              autoComplete="off"
            />
            <button type="submit" className="certificate-verify-btn">{t('certificateVerification', 'verifyButton')}</button>
          </div>
        </form>
      </section>

      {!hasSearched && (
        <section className="certificate-feedback-card certificate-empty-state" aria-live="polite">
          <BadgeCheck size={30} color="#7a8492" />
          <h2>{t('certificateVerification', 'readyTitle')}</h2>
          <p>{t('certificateVerification', 'readyText')}</p>
        </section>
      )}

      {hasSearched && !result && (
        <section className="certificate-feedback-card certificate-not-found" aria-live="polite">
          <div className="certificate-status-badge not-found">{t('certificateVerification', 'notFoundBadge')}</div>
          <h2>{t('certificateVerification', 'notFoundTitle')}</h2>
          <p>{t('certificateVerification', 'notFoundText')}</p>
        </section>
      )}

      {result && (
        <section className="certificate-result-stack" aria-live="polite">
          <div className={`certificate-status-banner ${result.status.toLowerCase()}`}>
            <div>
              <span className="certificate-result-label">{t('certificateVerification', 'statusLabel')}</span>
              <strong>{result.status}</strong>
              <p>{STATUS_COPY[result.status]}</p>
            </div>
            <BadgeCheck size={36} color="currentColor" />
          </div>

          <div className="certificate-information-card">
            <div className="certificate-card-heading">
              <div>
                <h2>{t('certificateVerification', 'infoHeading')}</h2>
                <p>{t('certificateVerification', 'infoSubtext')}</p>
              </div>
              <span className={`certificate-status-badge ${result.status.toLowerCase()}`}>{result.status}</span>
            </div>
            <dl className="certificate-information-grid">
              <div><dt>{t('certificateVerification', 'learnerName')}</dt><dd>{result.learnerName}<small>{result.learnerDetails}</small></dd></div>
              <div><dt>{t('certificateVerification', 'certificateNumber')}</dt><dd>{result.certificateNumber}</dd></div>
              <div><dt>{t('certificateVerification', 'certificateName')}</dt><dd>{result.certificateName}</dd></div>
              <div><dt>{t('certificateVerification', 'issueDate')}</dt><dd>{formatDate(result.issueDate)}</dd></div>
              <div><dt>{t('certificateVerification', 'expiryDate')}</dt><dd>{formatDate(result.expiryDate)}</dd></div>
              <div><dt>{t('certificateVerification', 'issuingAuthority')}</dt><dd>{result.issuingAuthority}</dd></div>
            </dl>
          </div>
        </section>
      )}
    </div>
  )
}