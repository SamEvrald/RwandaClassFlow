import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Award, BookOpen, Calendar, MessageSquare } from 'lucide-react';
import studentService, { Grade } from '../../utils/studentService';

const StudentGrades: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [gradeSummary, setGradeSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<number | undefined>();

  useEffect(() => {
    fetchGrades();
    fetchGradeSummary();
  }, [selectedSubject]);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const data = await studentService.getGrades(selectedSubject);
      setGrades(data);
    } catch (err) {
      setError('Failed to fetch grades');
      console.error('Error fetching grades:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGradeSummary = async () => {
    try {
      const data = await studentService.getGradeSummary();
      setGradeSummary(data);
    } catch (err) {
      console.error('Error fetching grade summary:', err);
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600 bg-green-50';
    if (percentage >= 70) return 'text-blue-600 bg-blue-50';
    if (percentage >= 55) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateOverallAverage = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade.percentage, 0);
    return Math.round(total / grades.length);
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
          onClick={fetchGrades}
          className="mt-2 text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grade Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overall Average</p>
              <p className="text-2xl font-bold text-gray-900">{calculateOverallAverage()}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{grades.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Highest Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {grades.length > 0 ? Math.max(...grades.map(g => g.percentage)) : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Subjects</p>
              <p className="text-2xl font-bold text-gray-900">
                {gradeSummary?.subjects?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Filter */}
      {gradeSummary?.subjects && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Subject</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubject(undefined)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSubject === undefined
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Subjects
            </button>
            {gradeSummary.subjects.map((subjectData: any) => (
              <button
                key={subjectData.subject.id}
                onClick={() => setSelectedSubject(subjectData.subject.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSubject === subjectData.subject.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {subjectData.subject.subject_name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subject Statistics */}
      {gradeSummary?.subjects && selectedSubject && (
        <div className="bg-white p-6 rounded-lg shadow">
          {gradeSummary.subjects
            .filter((s: any) => s.subject.id === selectedSubject)
            .map((subjectData: any) => (
              <div key={subjectData.subject.id}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {subjectData.subject.subject_name} Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-600">Average</p>
                    <p className="text-xl font-bold text-blue-800">
                      {Math.round(subjectData.statistics.average_score)}%
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-600">Highest</p>
                    <p className="text-xl font-bold text-green-800">
                      {Math.round(subjectData.statistics.highest_score)}%
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-yellow-600">Lowest</p>
                    <p className="text-xl font-bold text-yellow-800">
                      {Math.round(subjectData.statistics.lowest_score)}%
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-purple-600">Total</p>
                    <p className="text-xl font-bold text-purple-800">
                      {subjectData.statistics.total_assignments}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Grades List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Grades</h3>
        
        {grades.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No grades found</h3>
            <p className="text-gray-600">
              {selectedSubject 
                ? "No grades found for the selected subject."
                : "You don't have any grades yet."
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {grades.map((grade) => (
              <div
                key={grade.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{grade.assignment_title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade.percentage)}`}>
                        {grade.letter_grade}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{grade.subject_name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Graded: {formatDate(grade.graded_at)}</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {grade.assignment_type}
                      </span>
                    </div>

                    {grade.feedback && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-800 mb-1">Teacher Feedback:</p>
                            <p className="text-blue-700 text-sm">{grade.feedback}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {grade.ai_feedback && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <BarChart3 className="h-4 w-4 text-purple-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-purple-800 mb-1">AI Analysis:</p>
                            <p className="text-purple-700 text-sm">{grade.ai_feedback}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="ml-4 text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {grade.score}/{grade.max_score}
                    </div>
                    <div className={`text-lg font-semibold ${getGradeColor(grade.percentage).split(' ')[0]}`}>
                      {grade.percentage}%
                    </div>
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

export default StudentGrades;
