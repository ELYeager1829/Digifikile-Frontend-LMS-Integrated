/**
 * @file RegisterForm.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Create-account registration form.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockIcon, VisibilityIcon } from '../../../components/ui/Icons';
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'

export default function RegisterForm() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const role = formData.get('role');
    const fullName = String(formData.get('fullName') || '').trim();
    localStorage.setItem('digifikile-user-name', fullName);
    localStorage.setItem('digifikile-role', role === 'Student' ? 'student' : 'admin');
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="auth-layout">
      <aside className="auth-hero-panel">
        <div className="brand-header">
          <img src="/logo.png" alt="DigiFikile LMS" className="hero-brand-image" />
        </div>

        <h1 className="auth-hero-title">{t('auth', 'heroTitle')}</h1>

        <div className="auth-hero-copy">
          <p>{t('auth', 'heroSubtitle')}</p>
        </div>

        <div className="laptop-figure" aria-hidden="true" />

        <div className="auth-footer-copy">
          <strong>2026 DigiFikile LMS</strong>
          <span>All rights reserved</span>
        </div>
      </aside>

      <main className="auth-form-panel">
        <div className="auth-card-shell create-shell">
          <h2>{t('auth', 'createYourAccount')}</h2>
          <p className="auth-subtitle small">{t('auth', 'createYourAccountSubtitle')}</p>

          <form onSubmit={handleSubmit} className="auth-form auth-form-wide">
            <label className="field-label" htmlFor="fullName">{t('auth', 'fullName')}</label>
            <input id="fullName" name="fullName" type="text" className="auth-input" required />

            <label className="field-label" htmlFor="email">{t('auth', 'emailOrUsername')}</label>
            <input id="email" type="email" className="auth-input" required />

            <label className="field-label" htmlFor="password">{t('auth', 'password')}</label>
            <div className="auth-input-wrap">
              <span className="input-icon"><LockIcon size={20} color="#454d5c" /></span>
              <input id="password" type={isPasswordVisible ? 'text' : 'password'} className="auth-input with-icon" required />
              <button type="button" className="password-visibility-toggle" aria-label={isPasswordVisible ? 'Hide password' : 'Show password'} onClick={() => setIsPasswordVisible((visible) => !visible)}>
                <VisibilityIcon size={22} color="#454d5c" isVisible={isPasswordVisible} />
              </button>
            </div>

            <label className="field-label" htmlFor="confirmPassword">{t('auth', 'confirmPassword')}</label>
            <div className="auth-input-wrap">
              <span className="input-icon"><LockIcon size={20} color="#454d5c" /></span>
              <input id="confirmPassword" type={isConfirmPasswordVisible ? 'text' : 'password'} className="auth-input with-icon" required />
              <button type="button" className="password-visibility-toggle" aria-label={isConfirmPasswordVisible ? 'Hide confirm password' : 'Show confirm password'} onClick={() => setIsConfirmPasswordVisible((visible) => !visible)}>
                <VisibilityIcon size={22} color="#454d5c" isVisible={isConfirmPasswordVisible} />
              </button>
            </div>

            <label className="field-label" htmlFor="role">{t('auth', 'role')}</label>
            <div className="select-shell">
              <select id="role" name="role" className="auth-input select-input">
                <option>Student</option>
              </select>
              <span className="select-caret">V</span>
            </div>

            <label className="checkbox-row create-checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>{t('auth', 'agreeTerms').replace('Terms of service', 'Terms of service').replace('Privacy Policy', 'Privacy Policy')}</span>
            </label>

            <button type="submit" className="primary-btn large create-btn">{t('auth', 'createAccountButton')}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
