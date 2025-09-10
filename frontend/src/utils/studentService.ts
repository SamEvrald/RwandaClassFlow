import api from './api';

export interface Assignment {
  id: number;
  title: string;
  description: string;
  assignment_type: string;
  max_score: number;
  due_date: string;
  submission_deadline: string;
  instructions: string;
  subject_name: string;
  class_name: string;
  teacher_name: string;
  is_submitted: boolean;
  student_grade: {
    score: number;
    percentage: number;
    letter_grade: string;
    feedback: string;
  } | null;
  days_remaining: number | null;
  created_at: string;
}

export interface Grade {
  id: number;
  assignment_title: string;
  subject_name: string;
  assignment_type: string;
  score: number;
  percentage: number;
  letter_grade: string;
  feedback: string;
  ai_feedback: string;
  max_score: number;
  graded_at: string;
}

export interface LearningResource {
  id: number;
  title: string;
  description: string;
  resource_type: string;
  file: string | null;
  url: string;
  subject_name: string;
  uploaded_by_name: string;
  is_public: boolean;
  created_at: string;
}

export interface AssignmentSubmission {
  id: number;
  assignment_title: string;
  assignment_type: string;
  subject_name: string;
  submission_text: string;
  submission_file: File | null;
  submission_url: string;
  status: string;
  submitted_at: string | null;
  is_late: boolean;
  late_reason: string;
  submission_notes: string;
  max_score: number;
  due_date: string;
  submission_deadline: string;
  can_edit: boolean;
  grade_info: {
    score: number;
    percentage: number;
    letter_grade: string;
    feedback: string;
    graded_at: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardData {
  recent_assignments: Assignment[];
  pending_assignments_count: number;
  recent_grades: Grade[];
  grade_statistics: {
    average_score: number;
    total_assignments: number;
  };
  attendance_statistics: {
    percentage: number;
    total_days: number;
    present_days: number;
    late_days: number;
    absent_days: number;
  };
}

class StudentService {
  // Dashboard
  async getDashboard(): Promise<DashboardData> {
    const response = await api.get('/academics/student/dashboard/');
    return response.data;
  }

  // Assignments
  async getAssignments(status?: string): Promise<Assignment[]> {
    const params = status ? { status } : {};
    const response = await api.get('/academics/student/assignments/', { params });
    return response.data.results || response.data;
  }

  async getAssignment(id: number): Promise<Assignment> {
    const response = await api.get(`/academics/assignments/${id}/`);
    return response.data;
  }

  // Grades
  async getGrades(subjectId?: number): Promise<Grade[]> {
    const params = subjectId ? { subject: subjectId } : {};
    const response = await api.get('/academics/student/grades/', { params });
    return response.data.results || response.data;
  }

  async getGradeSummary(): Promise<any> {
    const response = await api.get('/academics/student/grade-summary/');
    return response.data;
  }

  // Resources
  async getResources(subjectId?: number, type?: string): Promise<LearningResource[]> {
    const params: any = {};
    if (subjectId) params.subject = subjectId;
    if (type) params.type = type;
    
    const response = await api.get('/academics/student/resources/', { params });
    return response.data.results || response.data;
  }

  // Submissions
  async getSubmissions(): Promise<AssignmentSubmission[]> {
    const response = await api.get('/academics/student/submissions/');
    return response.data.results || response.data;
  }

  async getSubmission(id: number): Promise<AssignmentSubmission> {
    const response = await api.get(`/academics/student/submissions/${id}/`);
    return response.data;
  }

  async submitAssignment(assignmentId: number, data: {
    submission_text?: string;
    submission_file?: File;
    submission_url?: string;
    submission_notes?: string;
  }): Promise<AssignmentSubmission> {
    const formData = new FormData();
    
    if (data.submission_text) {
      formData.append('submission_text', data.submission_text);
    }
    if (data.submission_file) {
      formData.append('submission_file', data.submission_file);
    }
    if (data.submission_url) {
      formData.append('submission_url', data.submission_url);
    }
    if (data.submission_notes) {
      formData.append('submission_notes', data.submission_notes);
    }

    const response = await api.post(
      `/academics/student/assignments/${assignmentId}/submit/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async saveDraft(assignmentId: number, data: {
    submission_text?: string;
    submission_file?: File;
    submission_url?: string;
    submission_notes?: string;
  }): Promise<AssignmentSubmission> {
    const formData = new FormData();
    
    if (data.submission_text) {
      formData.append('submission_text', data.submission_text);
    }
    if (data.submission_file) {
      formData.append('submission_file', data.submission_file);
    }
    if (data.submission_url) {
      formData.append('submission_url', data.submission_url);
    }
    if (data.submission_notes) {
      formData.append('submission_notes', data.submission_notes);
    }

    const response = await api.post(
      `/academics/student/assignments/${assignmentId}/draft/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async updateSubmission(id: number, data: Partial<AssignmentSubmission>): Promise<AssignmentSubmission> {
    const response = await api.patch(`/academics/student/submissions/${id}/`, data);
    return response.data;
  }
}

export default new StudentService();
