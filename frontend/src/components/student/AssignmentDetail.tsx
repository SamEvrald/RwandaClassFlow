import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Upload, 
  Save, 
  Send, 
  FileText, 
  AlertCircle,
  CheckCircle,
  XCircle,
  PaperclipIcon,
  ArrowLeft
} from 'lucide-react';
import studentService, { Assignment, AssignmentSubmission } from '../../utils/studentService';

interface AssignmentDetailProps {
  assignmentId: number;
  onBack: () => void;
}

const AssignmentDetail: React.FC<AssignmentDetailProps> = ({ assignmentId, onBack }) => {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submission, setSubmission] = useState<AssignmentSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'draft' | 'submitted'>('draft');

  useEffect(() => {
    fetchAssignmentDetails();
  }, [assignmentId]);

  const fetchAssignmentDetails = async () => {
    try {
      setLoading(true);
      const assignmentData = await studentService.getAssignment(assignmentId);
      setAssignment(assignmentData);
      
      // Try to fetch existing submission
      try {
        const submissionData = await studentService.getSubmission(assignmentId);
        setSubmission(submissionData);
        setSubmissionText(submissionData.submission_text || '');
        setSubmissionStatus(submissionData.status as 'draft' | 'submitted');
      } catch (submissionError) {
        // No existing submission, that's fine
        console.log('No existing submission found');
      }
    } catch (err) {
      setError('Failed to fetch assignment details');
      console.error('Error fetching assignment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const saveDraft = async () => {
    if (!assignment) return;

    try {
      setIsSubmitting(true);
      
      const submissionData = {
        submission_text: submissionText,
        submission_file: selectedFiles?.[0] || undefined,
        submission_notes: ''
      };

      const newSubmission = await studentService.saveDraft(assignment.id, submissionData);
      setSubmission(newSubmission);
      setSubmissionStatus('draft');
      alert('Draft saved successfully!');
    } catch (err) {
      console.error('Error saving draft:', err);
      alert('Failed to save draft');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitAssignment = async () => {
    if (!assignment) return;

    try {
      setIsSubmitting(true);
      
      const submissionData = {
        submission_text: submissionText,
        submission_file: selectedFiles?.[0] || undefined,
        submission_notes: ''
      };

      const newSubmission = await studentService.submitAssignment(assignment.id, submissionData);
      setSubmission(newSubmission);
      setSubmissionStatus('submitted');
      alert('Assignment submitted successfully!');
    } catch (err) {
      console.error('Error submitting assignment:', err);
      alert('Failed to submit assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'graded':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'late':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'draft':
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'graded':
        return 'bg-blue-100 text-blue-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      case 'draft':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const isOverdue = assignment && new Date(assignment.due_date) < new Date();
  const canSubmit = submissionText.trim() !== '' && submissionStatus !== 'submitted';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error || 'Assignment not found'}</p>
        <button
          onClick={onBack}
          className="mt-2 text-red-700 hover:text-red-900 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Assignments</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{assignment.title}</h1>
            <p className="text-gray-600 mb-4">{assignment.description}</p>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{assignment.subject_name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Due: {formatDate(assignment.due_date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Points: {assignment.max_score}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 lg:mt-0">
            {submission && (
              <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                {getStatusIcon(submission.status)}
                <span className="capitalize">{submission.status}</span>
              </div>
            )}
            {isOverdue && !submission && (
              <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <span>Overdue</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Assignment Instructions */}
      {assignment.instructions && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">{assignment.instructions}</p>
          </div>
        </div>
      )}

      {/* Submission Area */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Submission</h2>
        
        {submissionStatus === 'submitted' ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-900">Assignment Submitted</span>
              </div>
              <p className="text-green-700 mt-1">
                Submitted on {submission && formatDate(submission.submitted_at!)}
              </p>
            </div>
            
            {submissionText && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Your Response:</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="whitespace-pre-wrap text-gray-700">{submissionText}</p>
                </div>
              </div>
            )}

            {submission?.grade_info && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Grade: {submission.grade_info.score}/{assignment.max_score}</h3>
                {submission.grade_info.feedback && (
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Feedback:</h4>
                    <p className="text-blue-800">{submission.grade_info.feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label htmlFor="submission-text" className="block text-sm font-medium text-gray-700 mb-2">
                Your Response
              </label>
              <textarea
                id="submission-text"
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your response here..."
              />
            </div>

            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Attach Files (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <PaperclipIcon className="h-4 w-4" />
                  <span>Choose Files</span>
                </label>
                {selectedFiles && selectedFiles.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {selectedFiles.length} file(s) selected
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={saveDraft}
                disabled={isSubmitting || submissionText.trim() === ''}
                className="flex items-center justify-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                <span>{isSubmitting ? 'Saving...' : 'Save Draft'}</span>
              </button>
              
              <button
                onClick={submitAssignment}
                disabled={!canSubmit || isSubmitting}
                className="flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Assignment'}</span>
              </button>
            </div>

            {isOverdue && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium text-yellow-900">Late Submission</span>
                </div>
                <p className="text-yellow-700 mt-1">
                  This assignment is past its due date. Late submissions may be penalized.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetail;
