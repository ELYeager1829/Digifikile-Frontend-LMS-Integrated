/**
 * @file QuizList.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Quizzes / assessments list UI (no AppLayout).
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CorrectAnswerIcon, IncorrectAnswerIcon, TotalQuestionsIcon } from '../../../components/ui/Icons';
import { ROUTES } from '../../../constants/routes'
import { useLanguage } from '../../../i18n/LanguageContext'

const quizCards = [
  {
    id: 1,
    label: 'Due Today',
    title: 'JavaScript Fundamentals...',
    module: 'Module 3',
    questions: 25,
    duration: '45 mins',
    durationSeconds: 45 * 60,
    maxAttempts: 3,
    attempts: '1/3',
    cta: 'Start Quiz',
    accent: 'orange',
  },
  {
    id: 2,
    label: 'Upcoming',
    title: 'React Components & State...',
    module: 'Module 4',
    questions: 15,
    duration: '30 mins',
    durationSeconds: 30 * 60,
    maxAttempts: 2,
    attempts: '0/2',
    cta: 'Start Quiz',
    accent: 'gray',
  },
  {
    id: 3,
    label: 'Upcoming',
    title: 'CSS Grid & Flexbox Mastery...',
    module: 'Module 1',
    questions: 20,
    duration: '40 mins',
    durationSeconds: 40 * 60,
    maxAttempts: 1,
    attempts: '0/1',
    cta: 'Start Quiz',
    accent: 'gray',
  },
]

const ACTIVE_ATTEMPT_META_KEY = 'digifikile-quiz-active-attempt-meta'
const ATTEMPT_HISTORY_KEY = 'digifikile-quiz-attempt-history'

const quizQuestions = [
  {
    id: 'q1',
    type: 'multiple-choice',
    prompt: 'Which option best describes a variable in programming?',
    options: [
      'A reusable block of code',
      'A container that stores data',
      'A repeating condition',
      'A style for the interface',
    ],
    correctAnswer: 'A container that stores data',
    feedback: 'Variables hold data that the program can read, update, and reuse during execution.',
    explanation: 'A variable stores information so a program can reference and manipulate it during execution.',
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    prompt: 'What is the result of 10 + 5 * 2 in JavaScript?',
    options: ['20', '30', '25', '15'],
    correctAnswer: '20',
    feedback: 'JavaScript applies multiplication before addition, so 5 * 2 = 10 and 10 + 10 = 20.',
    explanation: 'Operator precedence means multiplication runs before addition.',
  },
  {
    id: 'q3',
    type: 'short-answer',
    prompt: 'In one sentence, explain what a function does.',
    correctAnswer: 'A function bundles reusable logic that performs a task and can return a result.',
    acceptedAnswers: [
      'function bundles reusable logic',
      'reusable block of code',
      'performs a task and can return a result',
    ],
    feedback: 'A function allows you to define a reusable set of steps and call it whenever needed.',
    explanation: 'Functions encapsulate specific logic so it can be reused instead of duplicated.',
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    prompt: 'A for loop is useful when you know the number of iterations in advance.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    feedback: 'For loops are ideal when the iteration count is known ahead of time.',
    explanation: 'A for loop is designed for predictable iteration counts.',
  },
];

const QUIZ_STORAGE_KEY = 'digifikile-quiz-attempts-v1';
const assessmentDuration = quizQuestions.length * 90;

const normalizeAnswer = (value) => String(value ?? '')
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ');

const isQuestionAnsweredCorrectly = (question, answer) => {
  if (question.type === 'short-answer') {
    const input = normalizeAnswer(answer);
    const accepted = [question.correctAnswer, ...(question.acceptedAnswers || [])];
    return accepted.some((candidate) => {
      const normalizedCandidate = normalizeAnswer(candidate);
      return normalizedCandidate === input || normalizedCandidate.includes(input) || input.includes(normalizedCandidate);
    });
  }

  return normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
};

const getStoredAttempts = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const persistAttempts = (attempts) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(attempts));
};

const buildAttemptSummary = (quizAttempt, answers) => {
  const summary = quizQuestions.map((question) => {
    const userAnswer = answers[question.id];
    const isCorrect = isQuestionAnsweredCorrectly(question, userAnswer);

    return {
      ...question,
      userAnswer,
      isCorrect,
      selectedAnswerLabel: userAnswer ?? 'No answer entered',
      correctAnswerLabel: question.correctAnswer,
    };
  });

  const correctCount = summary.filter((item) => item.isCorrect).length;
  const incorrectCount = summary.length - correctCount;
  const scorePercent = Math.round((correctCount / summary.length) * 100);

  return {
    ...quizAttempt,
    answers,
    summary,
    correctCount,
    incorrectCount,
    scorePercent,
    status: quizAttempt.status,
    facilitatorFeedback: quizAttempt.facilitatorFeedback || 'You completed the assessment. Review the feedback below to see where you can improve.',
  };
};

const earnedCertificates = [
  {
    id: 'digital-literacy-basics',
    title: 'Digital Literacy Basics',
    course: 'DigiFikile Foundation Programme',
    issuedAt: '2026-09-10',
    score: 82,
    issuer: 'DigiFikile LMS',
    instructor: 'Learning Success Team',
    badge: 'Certificate of Completion',
    description: 'Awarded for successful completion of the Digital Literacy Basics assessment.',
    shareUrl: 'https://example.com/certificates/digital-literacy-basics',
  },
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    course: 'Frontend Development Path',
    issuedAt: '2026-08-05',
    score: 91,
    issuer: 'DigiFikile LMS',
    instructor: 'Frontend Academy',
    badge: 'Certificate of Achievement',
    description: 'Recognises advanced understanding of React fundamentals and component design.',
    shareUrl: 'https://example.com/certificates/react-fundamentals',
  },
];

export default function QuizList() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showResults, setShowResults] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('digifikile-quiz-results') === 'true';
  });
  const [showCertificateView, setShowCertificateView] = useState(false);
  const [selectedCertificateId, setSelectedCertificateId] = useState(earnedCertificates[0].id);
  const [shareMessage, setShareMessage] = useState('');

  const selectedCertificate = earnedCertificates.find((certificate) => certificate.id === selectedCertificateId) || earnedCertificates[0];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      persistAttempts(attemptStore);
    }
  }, [attemptStore]);

  useEffect(() => {
    if (!showCertificateView) {
      setShareMessage('');
    }
  }, [showCertificateView]);

  const handleStartQuiz = () => {
    setShowResults(true);
    setShowCertificateView(false);
  };

  const handleReturnToQuizzes = () => {
    setShowResults(false);
    setReviewAttemptId(null);
    setIsQuizActive(false);
    setSelectedQuizId(null);
    setActiveAttemptId(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(assessmentDuration);
  };

  const finalizeAttempt = (completionType = 'submitted') => {
    if (!selectedQuizId || !activeAttemptId) {
      return;
    }

    const attempts = attemptStore.filter((attempt) => attempt.id !== activeAttemptId);
    const originalAttempt = attemptStore.find((attempt) => attempt.id === activeAttemptId);

    if (!originalAttempt) {
      return;
    }

    const currentResults = quizQuestions.map((question) => ({
      ...question,
      userAnswer: selectedAnswers[question.id],
      isCorrect: isQuestionAnsweredCorrectly(question, selectedAnswers[question.id]),
    }));

    const correctCount = currentResults.filter((item) => item.isCorrect).length;
    const incorrectCount = currentResults.length - correctCount;
    const scorePercent = Math.round((correctCount / currentResults.length) * 100);
    const finalAttempt = {
      ...originalAttempt,
      answers: selectedAnswers,
      timeLeft: 0,
      status: completionType === 'expired' ? 'expired' : 'submitted',
      submittedAt: Date.now(),
      correctCount,
      incorrectCount,
      scorePercent,
      facilitatorFeedback: completionType === 'expired'
        ? 'The timer expired before this attempt was completed. Review the responses and use this as a timed attempt record.'
        : 'Good effort. Review the detailed feedback below to identify the areas to revisit and improve.',
    };

    const updatedAttempts = [...attempts, finalAttempt];
    setAttemptStore(updatedAttempts);
    setReviewAttemptId(finalAttempt.id);
    setShowResults(true);
    setIsQuizActive(false);
    setSelectedAnswers(finalAttempt.answers || {});
    setCurrentQuestionIndex(0);
    setTimeLeft(0);
  };

  const handleSelectCertificate = (certificateId) => {
    setSelectedCertificateId(certificateId);
    setShowCertificateView(true);
  };

  const handleDownloadCertificate = () => {
    const certificateMarkup = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${selectedCertificate.title} Certificate</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              background: #f5f7fb;
              color: #1d2d42;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .certificate {
              width: 920px;
              min-height: 620px;
              background: white;
              border: 12px solid #dfeafc;
              border-radius: 18px;
              padding: 48px 54px;
              box-sizing: border-box;
              text-align: center;
              box-shadow: 0 20px 40px rgba(29, 45, 66, 0.08);
            }
            .label {
              letter-spacing: 0.18em;
              text-transform: uppercase;
              color: #1d6ef2;
              font-weight: 700;
              font-size: 16px;
            }
            h1 {
              margin: 18px 0 10px;
              font-size: 44px;
              color: #1d2d42;
            }
            .subtitle {
              font-size: 18px;
              margin-bottom: 28px;
              color: #45576c;
            }
            .name {
              font-size: 32px;
              font-weight: 700;
              margin: 24px 0 10px;
            }
            .meta {
              font-size: 16px;
              color: #45576c;
              line-height: 1.8;
            }
            .seal {
              margin-top: 28px;
              font-size: 18px;
              font-weight: 700;
              color: #1d6ef2;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="label">${selectedCertificate.badge}</div>
            <h1>${selectedCertificate.title}</h1>
            <div class="subtitle">Issued by ${selectedCertificate.issuer}</div>
            <div class="name">Learner Achievement</div>
            <div class="meta">
              This certifies that the learner has successfully completed<br />
              <strong>${selectedCertificate.course}</strong><br />
              with a score of <strong>${selectedCertificate.score}%</strong> on <strong>${selectedCertificate.issuedAt}</strong>
            </div>
            <div class="seal">Authorized by ${selectedCertificate.instructor}</div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) return;

    printWindow.document.write(certificateMarkup);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleShareCertificate = async () => {
    const shareUrl = selectedCertificate.shareUrl;
    const shareText = `I earned the ${selectedCertificate.title} certificate on DigiFikile LMS.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedCertificate.title,
          text: shareText,
          url: shareUrl,
        });
        setShareMessage('Certificate shared successfully.');
        return;
      } catch (error) {
        setShareMessage('Sharing was cancelled.');
        return;
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setShareMessage('Certificate link copied to clipboard.');
        return;
      } catch (error) {
        setShareMessage('Copy failed. Use the social share option below.');
      }
    }

    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
    setShareMessage('Opened social share window.');
  };

  if (showResults) {
    if (showCertificateView) {
      return (
        <div className="certificate-page-shell">
          <div className="certificate-page-header">
            <button className="quiz-results-back" type="button" onClick={handleReturnToQuizzes}>
              ← Back to Quizzes
            </button>
            <button className="quiz-congrats-back" type="button" onClick={() => navigate(ROUTES.DASHBOARD)}>
              ← Return to Dashboard
            </button>
          </div>

              <h2 className="quiz-congrats-title">{t('quizList', 'congratulations')}</h2>
              <p className="quiz-congrats-copy">
                {t('quizList', 'completionText')}
              </p>

              <div className="quiz-congrats-actions">
                <button className="quiz-congrats-primary" type="button" onClick={handleDownloadCertificate}>
                  ↓ {t('quizList', 'downloadCertificate')}
                </button>
                <button className="quiz-congrats-secondary" type="button" onClick={() => setShowCertificateView(true)}>
                  ◉ {t('quizList', 'viewCertificate')}
                </button>
              </div>

              <button className="quiz-congrats-back" type="button" onClick={() => navigate(ROUTES.DASHBOARD)}>
                ← {t('quizList', 'returnToDashboard')}
              </button>
        </div>
      );
    }
  }

  if (screenMode === 'review' && reviewAttempt && reviewQuiz) {
    return (
      <div className="learner-quiz-results-page">
          <button className="quiz-results-back" type="button" onClick={handleReturnToQuizzes}>
            ← {t('quizList', 'returnToQuizzes')}
          </button>

          <div className="quiz-results-layout">
            <div className="quiz-results-card">
              <div className="quiz-score-ring" aria-label={t('quizList', 'scoreAria')}>
                <div className="quiz-score-inner">
                  <div className="quiz-score-value">82%</div>
                  <div className="quiz-score-label">{t('quizList', 'score')} </div>
                </div>
              </div>

              <h2>{t('quizList', 'greatJob')}</h2>
              <p>{t('quizList', 'resultText')}</p>

              <div className="quiz-results-actions">
                <button className="quiz-feedback-btn" type="button">✓ {t('common', 'viewFeedback')}</button>
                <button className="quiz-try-btn" type="button" onClick={handleViewCertificate}> {t('quizList', 'downloadCertificate')} </button>
              </div>
            </div>

          <div className="quiz-review-column">
            <div className="quiz-stats-panel">
              <div className="quiz-stat-box">
                <div className="quiz-stat-icon total"><TotalQuestionsIcon size={28} /></div>
                <div className="quiz-stat-text">
                  <span>{t('quizList', 'totalQuestions')}</span>
                  <strong>{quizResult.totalQuestions}</strong>
                </div>
              </div>

              <div className="quiz-stat-box">
                <div className="quiz-stat-icon danger"><IncorrectAnswerIcon size={28} /></div>
                <div className="quiz-stat-text">
                  <span>{t('quizList', 'incorrect')}</span>
                  <strong>{quizResult.incorrect}</strong>
                </div>
              </div>

              <div className="quiz-stat-box">
                <div className="quiz-stat-icon success"><CorrectAnswerIcon size={28} /></div>
                <div className="quiz-stat-text">
                  <span>{t('quizList', 'correct')}</span>
                  <strong>{quizResult.correct}</strong>
                </div>
              </div>
            </div>

            {completedAttempts.length > 1 && (
              <div className="quiz-attempt-switcher">
                {completedAttempts.map((attempt, index) => (
                  <button
                    key={attempt.id}
                    type="button"
                    className={attempt.id === (reviewAttempt?.id || attempt.id) ? 'quiz-tab active' : 'quiz-tab'}
                    onClick={() => setReviewAttemptId(attempt.id)}
                  >
                    Attempt {completedAttempts.length - index}
                  </button>
                ))}
              </div>
            )}

            <div className="assessment-feedback-list quiz-review-feedback">
              <div className="assessment-feedback-item" style={{ background: 'rgba(29, 110, 242, 0.04)' }}>
                <div className="assessment-feedback-topline">
                  <span>Attempt Summary</span>
                  <strong className={scorePercent >= 50 ? 'correct' : 'incorrect'}>
                    {scorePercent >= 50 ? 'Pass' : 'Needs Review'}
                  </strong>
                </div>
                <p>{attemptToReview?.facilitatorFeedback || 'Review the feedback below to understand the result.'}</p>
              </div>

              {latestResults.map((question, index) => {
                const learnerAnswer = question.userAnswer ?? 'No answer entered';
                const isCorrect = question.isCorrect;

                return (
                  <div key={question.id} className="assessment-feedback-item">
                    <div className="assessment-feedback-topline">
                      <span>Q{index + 1}</span>
                      <strong className={isCorrect ? 'correct' : 'incorrect'}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </strong>
                    </div>

                    <p>{question.prompt}</p>

                    <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                      <div>
                        <strong style={{ display: 'block', marginBottom: 4 }}>Your selected answer</strong>
                        <span>{learnerAnswer}</span>
                      </div>
                      <div>
                        <strong style={{ display: 'block', marginBottom: 4 }}>Correct answer</strong>
                        <span>{question.correctAnswer}</span>
                      </div>
                    </div>

                    <small style={{ display: 'block', marginTop: 10 }}>
                      {question.explanation || question.feedback}
                    </small>
                  </div>
                );
              })}
            </div>

            <section className="quiz-attempt-history" aria-label="Attempt history">
              <h3>Attempt History</h3>
              <div className="quiz-attempt-history-list">
                {reviewHistory.slice().reverse().map((attempt) => (
                  <article key={attempt.attemptId} className={`quiz-attempt-history-item ${attempt.attemptId === reviewAttempt.attemptId ? 'active' : ''}`}>
                    <div className="quiz-attempt-history-item-top">
                      <strong>Attempt {attempt.attemptNumber}</strong>
                      <span>{attempt.score}%</span>
                    </div>
                    <p>{formatAttemptDate(attempt.completedAt)}</p>
                    <small>{attempt.feedback}</small>
                    <button type="button" className="quiz-attempt-history-review-btn" onClick={() => handleOpenReview(attempt)}>
                      Review
                    </button>
                  </article>
                ))}
              </div>
            </section>

            {reviewAttempt.questionBreakdown.length > 0 && (
              <section className="quiz-question-review" aria-label="Question-by-question review">
                <h3>Question Review</h3>
                <div className="quiz-question-review-list">
                  {reviewAttempt.questionBreakdown.map((item, index) => {
                    const statusLabel = item.isAnswered
                      ? item.isCorrect
                        ? 'Correct'
                        : 'Incorrect'
                      : 'Not Answered'

                    return (
                      <article key={item.questionId} className="quiz-question-review-item">
                        <div className="quiz-question-review-top">
                          <strong>Question {index + 1}</strong>
                          <span className={`quiz-question-status ${statusLabel.toLowerCase().replace(/\s+/g, '-')}`}>
                            {statusLabel}
                          </span>
                        </div>

                        <p>{item.questionText}</p>

                        <div className="quiz-answer-summary">
                          <div>
                            <span>Selected answer</span>
                            <strong>{formatAnswer(item.answer)}</strong>
                          </div>
                          <div>
                            <span>Correct answer</span>
                            <strong>{item.correctAnswerText}</strong>
                          </div>
                        </div>

                        {!item.isCorrect && isChoiceQuestion(item.questionType) && item.options.length > 0 && (
                          <div className="quiz-review-corrections">
                            <div className="quiz-review-correct-answer">
                              Correct answer: {getCorrectAnswerLabel(item)}
                            </div>

                            <ul className="quiz-review-options-list">
                              {item.options.map((option) => {
                                const selectedByLearner = getQuestionChoiceAnswerText(item, option)
                                const correctOption = isOptionCorrect(item, option)

                                return (
                                  <li
                                    key={`${item.questionId}-${option}`}
                                    className={`quiz-review-option ${selectedByLearner ? 'selected' : ''} ${correctOption ? 'correct-option' : ''}`}
                                  >
                                    <span>{option}</span>
                                    <div className="quiz-review-option-flags">
                                      {selectedByLearner && <em className="learner-pick">Your choice</em>}
                                      {correctOption && <em className="correct-pick">Correct</em>}
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        )}

                        {item.explanation && (
                          <p className="quiz-review-explanation">
                            {item.isCorrect ? 'Why this is correct: ' : 'Why this is incorrect: '}
                            {item.explanation}
                          </p>
                        )}
                      </article>
                    )
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="learner-quizzes-page">
        <div className="quizzes-header-block">
          <h1 className="quizzes-title">{t('quizList', 'title')}</h1>
          <p className="quizzes-subtitle">{t('quizList', 'subtitle')}</p>
        </div>

        <div className="quizzes-tabs" aria-label={t('quizList', 'tabsLabel')}>
          <button className="quiz-tab active" type="button">{t('quizList', 'availableTab')}</button>
          <button className="quiz-tab" type="button">{t('quizList', 'completedTab')}</button>
        </div>

      <div className="quiz-cards-grid">
        {quizCards.map((quiz) => {
          const completedCount = attemptStore.filter((attempt) => attempt.quizId === quiz.id && attempt.status !== 'active').length;
          const remainingAttempts = Math.max(0, quiz.maxAttempts - completedCount);
          const activeQuizAttempt = attemptStore.find(
            (attempt) => attempt.quizId === quiz.id && attempt.status === 'active'
          );
          const disableStart = remainingAttempts <= 0 && !activeQuizAttempt;
          const actionLabel = activeQuizAttempt ? 'Continue Quiz' : 'Start Quiz';

          return (
            <article key={quiz.id} className="quiz-card">
              <div className="quiz-card-top">
                <span className={`quiz-card-tag ${quiz.accent === 'orange' ? 'tag-orange' : 'tag-muted'}`}>
                  {quiz.label}
                </span>
                <button className="quiz-menu-btn" type="button" aria-label="Quiz options">
                  ⋮
                </button>
              </div>

              <div className="quiz-card-body">
                <div className="quiz-module-label">{t('quizList', 'moduleLabel')} {quiz.module.split(' ')[1]}</div>
                <h3>{quiz.title}</h3>
              </div>

              <div className="quiz-meta-row">
                <div className="quiz-meta-item">
                  <span className="quiz-meta-icon">◔</span>
                  <span>{t('quizList', 'questions')}</span>
                  <strong>{quiz.questions}</strong>
                </div>
                <div className="quiz-meta-item">
                  <span className="quiz-meta-icon">◷</span>
                  <span>{t('quizList', 'duration')}</span>
                  <strong>{quiz.duration}</strong>
                </div>
              </div>

              <div className="quiz-meta-row bottom-row">
                <div className="quiz-meta-item attempts-item">
                  <span className="quiz-meta-icon">◌</span>
                  <span>{t('quizList', 'attempts')}</span>
                  <strong>{quiz.attempts}</strong>
                </div>
              </div>

              <button className="quiz-action-btn" type="button" onClick={handleStartQuiz}>
                {t('quizList', 'startQuiz')} →
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
