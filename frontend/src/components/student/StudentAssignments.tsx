import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Filter, 
  Search, 
  FileText, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
  Book
} from 'lucide-react';
import studentService, { Assignment } from '../../utils/studentService';

const StudentAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchAssignments();
  }, [filter]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAssignments(filter === 'all' ? undefined : filter);
      setAssignments(data);
    } catch (err) {
      setError('Failed to fetch assignments');
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (assignment: Assignment) => {
    if (assignment.student_grade) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (assignment.is_submitted) {
      return <Clock className="h-5 w-5 text-blue-500" />;
    }
    if (assignment.days_remaining !== null && assignment.days_remaining <= 0) {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
    if (assignment.days_remaining !== null && assignment.days_remaining <= 2) {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const getStatusText = (assignment: Assignment) => {
    if (assignment.student_grade) {
      return `Graded (${assignment.student_grade.percentage}%)`;
    }
    if (assignment.is_submitted) {
      return 'Submitted';
    }
    if (assignment.days_remaining !== null && assignment.days_remaining <= 0) {
      return 'Overdue';
    }
    if (assignment.days_remaining !== null && assignment.days_remaining <= 2) {
      return `Due in ${assignment.days_remaining} day${assignment.days_remaining !== 1 ? 's' : ''}`;
    }
    return 'Pending';
  };

  const getStatusColor = (assignment: Assignment) => {
    if (assignment.student_grade) {
      return 'text-green-600 bg-green-50';
    }
    if (assignment.is_submitted) {
      return 'text-blue-600 bg-blue-50';
    }
    if (assignment.days_remaining !== null && assignment.days_remaining <= 0) {
      return 'text-red-600 bg-red-50';
    }
    if (assignment.days_remaining !== null && assignment.days_remaining <= 2) {
      return 'text-yellow-600 bg-yellow-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchAssignments}
          className="mt-2 text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">My Assignments</h2>
          
          <div className="flex space-x-2">
            {['all', 'pending', 'overdue', 'graded'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {assignments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You don't have any assignments yet."
                : `No ${filter} assignments found.`
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(assignment)}
                      <h3 className="text-lg font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment)}`}>
                        {getStatusText(assignment)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Book className="h-4 w-4" />
                        <span>{assignment.subject_name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{assignment.teacher_name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {formatDate(assignment.due_date)}</span>
                      </div>
                    </div>

                    {assignment.description && (
                      <p className="text-gray-700 mb-3">{assignment.description}</p>
                    )}

                    {assignment.student_grade && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-800">Grade:</span>
                          <span className="text-green-600 font-bold">
                            {assignment.student_grade.score}/{assignment.max_score} ({assignment.student_grade.percentage}%)
                          </span>
                        </div>
                        {assignment.student_grade.feedback && (
                          <p className="text-green-700 text-sm mt-2">{assignment.student_grade.feedback}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col space-y-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {assignment.assignment_type}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {assignment.max_score} pts
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Created: {formatDate(assignment.created_at)}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/dashboard/assignments/${assignment.id}`}
                      className="inline-flex items-center space-x-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </Link>
                    {!assignment.is_submitted && assignment.days_remaining !== null && assignment.days_remaining >= 0 && (
                      <Link
                        to={`/dashboard/assignments/${assignment.id}`}
                        className="inline-flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Submit Work</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignments;
