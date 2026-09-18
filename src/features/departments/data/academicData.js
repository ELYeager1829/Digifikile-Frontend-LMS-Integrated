export const initialFaculties = [
  { id: 'FAC-001', name: 'Faculty of Engineering', description: 'Technology, computing, and applied engineering programmes.', status: 'Active' },
  { id: 'FAC-002', name: 'Faculty of Business', description: 'Business, management, and entrepreneurship programmes.', status: 'Active' },
  { id: 'FAC-003', name: 'Faculty of Arts', description: 'Creative practice, communication, and digital media programmes.', status: 'Active' },
]

export const initialDepartments = [
  { id: 'DEP-001', name: 'Computer Science', faculty: 'Faculty of Engineering', description: 'Software engineering, algorithms, and computing foundations.', status: 'Active', courses: 24 },
  { id: 'DEP-002', name: 'Information Technology', faculty: 'Faculty of Engineering', description: 'Network administration, cybersecurity, and systems.', status: 'Active', courses: 18 },
  { id: 'DEP-003', name: 'Business Administration', faculty: 'Faculty of Business', description: 'Management principles, finance, marketing, and strategy.', status: 'Pending Review', courses: 32 },
  { id: 'DEP-004', name: 'Graphic Design', faculty: 'Faculty of Arts', description: 'Visual communication, typography, and digital media.', status: 'Inactive', courses: 12 },
]

export const initialAcademicCourses = [
  { id: 'CRS-001', code: 'CS101', name: 'Introduction to Programming', department: 'Computer Science', description: 'Programming concepts for new developers.', status: 'Active' },
  { id: 'CRS-002', code: 'CS202', name: 'Data Structures', department: 'Computer Science', description: 'Core data structures and algorithmic thinking.', status: 'Active' },
  { id: 'CRS-003', code: 'IT210', name: 'Web Development', department: 'Information Technology', description: 'Modern web application foundations.', status: 'Active' },
  { id: 'CRS-004', code: 'BA110', name: 'Business Management', department: 'Business Administration', description: 'Principles of effective business management.', status: 'Inactive' },
]