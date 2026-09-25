export const trainingProviders = [
  { id: 'TP-001', name: 'Eastern Cape Skills Institute', region: 'Eastern Cape', contact: 'n.mahlangu@ecsi.ac.za', courses: 12, status: 'active' },
  { id: 'TP-002', name: 'Ubuntu Learning Collective', region: 'Gauteng', contact: 'admin@ubuntulearn.org', courses: 8, status: 'active' },
  { id: 'TP-003', name: 'Karoo Digital Academy', region: 'Northern Cape', contact: 'info@karoodigital.co.za', courses: 5, status: 'pending' },
  { id: 'TP-004', name: 'Limpopo Trade College', region: 'Limpopo', contact: 'registrar@ltc.edu.za', courses: 15, status: 'active' },
  { id: 'TP-005', name: 'Coastal Youth Foundation', region: 'KwaZulu-Natal', contact: 'programs@coastalyouth.org', courses: 3, status: 'inactive' },
];

export const departments = [
  { id: 'D-01', name: 'Foundational Literacy', head: 'Dr. Thandiwe Nkosi', modules: 9, learners: 412 },
  { id: 'D-02', name: 'Digital Skills', head: 'Sipho Radebe', modules: 14, learners: 638 },
  { id: 'D-03', name: 'Numeracy & STEM', head: 'Anet van der Merwe', modules: 11, learners: 501 },
  { id: 'D-04', name: 'Life Skills & Wellbeing', head: 'Nomvula Dlamini', modules: 6, learners: 289 },
];



export const courses = [
  { id: 'C-101', title: 'Intro to Computer Literacy', department: 'Digital Skills', modules: 6, enrolled: 214, status: 'active' },
  { id: 'C-102', title: 'Reading for Meaning', department: 'Foundational Literacy', modules: 5, enrolled: 187, status: 'active' },
  { id: 'C-103', title: 'Basic Financial Numeracy', department: 'Numeracy & STEM', modules: 8, enrolled: 156, status: 'active' },
  { id: 'C-104', title: 'Mental Health First Steps', department: 'Life Skills & Wellbeing', modules: 4, enrolled: 98, status: 'draft' },
  { id: 'C-105', title: 'Mobile Data & Connectivity', department: 'Digital Skills', modules: 3, enrolled: 267, status: 'active' },
];

export const modules = [
  { id: 'M-201', title: 'Using a Touchscreen Device', course: 'Intro to Computer Literacy', lessons: 4, duration: '45 min' },
  { id: 'M-202', title: 'Sending Your First Email', course: 'Intro to Computer Literacy', lessons: 3, duration: '30 min' },
  { id: 'M-203', title: 'Phonics & Sight Words', course: 'Reading for Meaning', lessons: 6, duration: '60 min' },
  { id: 'M-204', title: 'Budgeting Basics', course: 'Basic Financial Numeracy', lessons: 5, duration: '50 min' },
  { id: 'M-205', title: 'Understanding Airtime & Data', course: 'Mobile Data & Connectivity', lessons: 2, duration: '20 min' },
];

export const enrollmentRequests = [
  { id: 'ER-3301', learner: 'Buhle Zondi', course: 'Intro to Computer Literacy', provider: 'Ubuntu Learning Collective', date: '2026-08-24', status: 'pending' },
  { id: 'ER-3302', learner: 'Karabo Molefe', course: 'Basic Financial Numeracy', provider: 'Limpopo Trade College', date: '2026-08-25', status: 'pending' },
  { id: 'ER-3303', learner: 'Aisha Petersen', course: 'Reading for Meaning', provider: 'Eastern Cape Skills Institute', date: '2026-08-22', status: 'approved' },
  { id: 'ER-3304', learner: 'Thabo Mahlangu', course: 'Mobile Data & Connectivity', provider: 'Karoo Digital Academy', date: '2026-08-20', status: 'rejected' },
  { id: 'ER-3305', learner: 'Lindiwe Cele', course: 'Intro to Computer Literacy', provider: 'Ubuntu Learning Collective', date: '2026-08-26', status: 'pending' },
];

export const announcements = [
  { id: 'A-51', title: 'Sprint 2 platform maintenance window', audience: 'All roles', date: '2026-08-29', status: 'published' },
  { id: 'A-52', title: 'New Digital Skills modules now live', audience: 'Learners, Parents', date: '2026-08-27', status: 'published' },
  { id: 'A-53', title: 'Provider onboarding checklist update', audience: 'Training Providers', date: '2026-08-25', status: 'draft' },
  { id: 'A-54', title: 'Term 3 progress reports available', audience: 'Parents', date: '2026-08-18', status: 'published' },
];

export const assignments = [
  { id: 'AS-901', title: 'Email Etiquette Worksheet', module: 'Sending Your First Email', dueDate: '2026-09-05', submissions: '142/214', status: 'active' },
  { id: 'AS-902', title: 'Household Budget Exercise', module: 'Budgeting Basics', dueDate: '2026-09-08', submissions: '61/156', status: 'active' },
  { id: 'AS-903', title: 'Sight Word Recognition Quiz', module: 'Phonics & Sight Words', dueDate: '2026-08-30', submissions: '178/187', status: 'closing soon' },
  { id: 'AS-904', title: 'Data Saving Habits Reflection', module: 'Understanding Airtime & Data', dueDate: '2026-09-12', submissions: '9/267', status: 'active' },
];

export const dashboardStats = [
  { label: 'Active Learners', value: '1,840', delta: '+6.2% this month' },
  { label: 'Training Providers', value: '5', delta: '1 pending approval' },
  { label: 'Courses Live', value: '4', delta: '1 in draft' },
  { label: 'Pending Enrollments', value: '3', delta: 'Needs review', negative: true },
];

export const recentActivity = [
  { actor: 'Sipho Radebe', action: 'published module', target: 'Understanding Airtime & Data', time: '2h ago' },
  { actor: 'Admin', action: 'approved provider', target: 'Limpopo Trade College', time: '5h ago' },
  { actor: 'Nomvula Dlamini', action: 'created course', target: 'Mental Health First Steps', time: '1d ago' },
  { actor: 'Admin', action: 'rejected enrollment', target: 'Thabo Mahlangu → Mobile Data & Connectivity', time: '1d ago' },
];

export const learnerDashboardStats = [
  { 
    id: 'enrolled-modules',
    label: 'Enrolled Modules', 
    value: '4', 
    type: 'enrolled-modules',
    icon: '📚'
  },
  { 
    id: 'pending-assignments',
    label: 'Pending Assignments', 
    value: '2', 
    type: 'pending-assignments',
    icon: '📋'
  },
  { 
    id: 'upcoming-quizzes',
    label: 'Upcoming Quizzes', 
    value: '1', 
    type: 'upcoming-quizzes',
    icon: '✏️'
  },
  { 
    id: 'overall-progress',
    label: 'Overall Progress', 
    value: '68%', 
    type: 'overall-progress',
    icon: '📈'
  },
];

export const learnerModules = [
  {
    id: 'LM-001',
    slug: 'introduction-to-programming',
    title: 'Introduction to Programming',
    subtitle: 'Diploma in Information Technology',
    status: 'in-progress',
    statusLabel: 'In Progress',
    progress: 65,
    lessons: 12,
    resources: 4,
    icon: '💻',
    buttonText: 'Continue Module',
    buttonStyle: 'primary'
  },
  {
    id: 'LM-002',
    title: 'UI/UX Fundamentals',
    subtitle: 'Certificate in Digital Design',
    status: 'not-started',
    statusLabel: 'Not Started',
    progress: 0,
    lessons: 8,
    resources: 7,
    icon: '✏️',
    buttonText: 'Start Module',
    buttonStyle: 'secondary'
  },
  {
    id: 'LM-003',
    title: 'Database Management Systems',
    subtitle: 'Diploma in Information Technology',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    lessons: 15,
    resources: 10,
    icon: '📊',
    buttonText: 'Review Module',
    buttonStyle: 'secondary'
  },
];

export const users = [
  { id: 'U-001', name: 'Sarah Jenkins', email: 'sarah.j@example.student.com', userId: 'STU-8523-91', role: 'Instructor', department: 'Computer Science', status: 'Active' },
  { id: 'U-002', name: 'Michael Vance', email: 'm.vance@digifikile.co.za', userId: 'ADM-1042-44', role: 'Admin', department: 'System Operations', status: 'Active' },
  { id: 'U-003', name: 'Tshepo Modise', email: 'tshepo.m@learn.ac.za', userId: 'STU-3239-12', role: 'Learner', department: 'Business Administration', status: 'Active' },
  { id: 'U-004', name: 'Amara Okeke', email: 'a.okeke@fac.engineering.com', userId: 'STU-3901-09', role: 'Instructor', department: 'Mechanical Engineering', status: 'Inactive' },
  { id: 'U-005', name: 'David Miller', email: 'david.m@student.lms.com', userId: 'STU-4402-09', role: 'Learner', department: 'Graphic Design', status: 'Active' },
];

export const trainingProviderDashboardMetrics = [
  { id: 'total-learners', label: 'Total Learners', value: '1,284', delta: '+6.8% vs last month', icon: '◌', tone: 'green' },
  { id: 'active-learners', label: 'Active Learners', value: '964', delta: '71% engaged', icon: '◔', tone: 'blue' },
  { id: 'completion-rate', label: 'Training Completion Rate', value: '82%', delta: 'Completed 1,042 • In progress 182 • Not started 60', icon: '◍', tone: 'orange' },
  { id: 'certification-status', label: 'Certification Status', value: '74%', delta: 'Certified 384 • Pending 176 • Expired 41 • Failed 12', icon: '◐', tone: 'purple' },
];

export const trainingProviderQueue = [
  { id: 'AQ-410', name: 'Programming Fundamentals Assessment', module: 'Programming Fundamentals', submissions: '128 / 180', status: 'Needs review', statusClass: 'warning' },
  { id: 'AQ-411', name: 'Web Development Basics Quiz', module: 'Web Development Basics', submissions: '92 / 140', status: 'Approved', statusClass: 'success' },
  { id: 'AQ-412', name: 'Database Systems Final Evaluation', module: 'Database Systems', submissions: '87 / 120', status: 'Completed', statusClass: 'neutral' },
];

export const trainingProviderSupport = [
  { id: 'L-01', initials: 'TM', name: 'Tebogo Mokoena', reason: 'Inactive for 8 days', course: 'Programming Fundamentals', status: 'Intervention', statusClass: 'danger' },
  { id: 'L-02', initials: 'SM', name: 'Sizwe Mokoena', reason: 'Overdue assessment', course: 'Web Development Basics', status: 'Monitor', statusClass: 'warning' },
  { id: 'L-03', initials: 'LC', name: 'Lerato Cebekhulu', reason: 'Low pass rate', course: 'Database Systems', status: 'Review', statusClass: 'info' },
];

export const trainingProviderIntegrity = [
  { label: 'Content protection', subtitle: 'Access policy coverage', value: 92 },
  { label: 'Assignment integrity', subtitle: 'Academic honesty rules', value: 86 },
  { label: 'Completion tracking', subtitle: 'Attendance alignment', value: 78 },
];

export const trainingProviderAnnouncements = [
  { id: 'ANN-01', tag: 'New', title: 'Assessment window reopened', summary: 'The final programming evaluation is open for resubmission until 18:00.', time: 'Today' },
  { id: 'ANN-02', tag: 'Action', title: 'Certification renewal reminder', summary: '27 learners are approaching expiry and need review before Friday.', time: '2 days ago' },
  { id: 'ANN-03', tag: 'Policy', title: 'Compliance review scheduled', summary: 'The monthly content-protection compliance check starts on Thursday.', time: '1 week ago' },
];

export const trainingProviderTrends = [
  { month: 'Jan', activityY: 140, completionY: 132 },
  { month: 'Feb', activityY: 122, completionY: 116 },
  { month: 'Mar', activityY: 108, completionY: 100 },
  { month: 'Apr', activityY: 90, completionY: 96 },
  { month: 'May', activityY: 90, completionY: 82 },
  { month: 'Jun', activityY: 62, completionY: 70 },
];
