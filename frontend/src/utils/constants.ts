// API endpoint constants
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/users/login/',
  LOGOUT: '/users/logout/',
  CHANGE_PASSWORD: '/users/change-password/',
  USER_PROFILE: '/users/profile/',

  // School management
  SCHOOL_PROFILE: '/schools/profile/',
  SCHOOL_HOLIDAYS: '/schools/holidays/',

  // Academic management
  CLASSES: '/academics/classes/',
  SUBJECTS: '/academics/subjects/',
  ASSIGNMENTS: '/academics/assignments/',
  GRADES: '/academics/grades/',
  ATTENDANCE: '/academics/attendance/',
  BEHAVIOR_NOTES: '/academics/behavior-notes/',

  // Users
  TEACHERS: '/users/teachers/',
  STUDENTS: '/users/students/',
  PARENTS: '/users/parents/',
};

// AI Service endpoints
export const AI_ENDPOINTS = {
  OCR_EXTRACT: '/ocr/extract',
  GRADING_ANALYZE: '/grading/analyze',
  FEEDBACK_GENERATE: '/feedback/generate',
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  SCHOOL_ADMIN: 'school_admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent',
};

// App configuration
export const APP_CONFIG = {
  APP_NAME: process.env.REACT_APP_APP_NAME || 'RwandaClassFlow',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  AI_SERVICE_URL: process.env.REACT_APP_AI_SERVICE_URL || 'http://localhost:8001',
};

// Supported languages
export const LANGUAGES = {
  EN: { code: 'en', name: 'English' },
  FR: { code: 'fr', name: 'Français' },
  RW: { code: 'rw', name: 'Kinyarwanda' },
};
