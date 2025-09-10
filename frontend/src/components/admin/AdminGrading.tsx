import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { GraduationCap, TrendingUp, Search, Filter, Award } from 'lucide-react';

interface GradingData {
  average_grade: number;
  assignments_graded: number;
  pending_grades: number;
  grade_distribution: { grade: string; count: number }[];
}

const AdminGrading: React.FC = () => {
  const [gradingData, setGradingData] = useState<GradingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGradingData();
  }, []);

  const fetchGradingData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/grading/dashboard/');
      setGradingData(response.data);
    } catch (err: any) {
      setError('Failed to load grading data');
      console.error('Error fetching grading data:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2" />
              Grading System
            </h1>
            <p className="text-gray-600">Manage grading scales, rubrics, and academic standards</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <Award className="h-4 w-4 mr-2" />
            Grade Configuration
          </button>
        </div>
      </div>

      {/* Grading Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Average Grade</div>
          <div className="text-2xl font-bold text-blue-600">78.2%</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Assignments Graded</div>
          <div className="text-2xl font-bold text-green-600">156</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Pending Reviews</div>
          <div className="text-2xl font-bold text-yellow-600">24</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Top Performers</div>
          <div className="text-2xl font-bold text-purple-600">89</div>
        </div>
      </div>

      {/* Grading Scale */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Current Grading Scale</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Primary School Scale</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-medium">A (90-100%)</span>
                <span className="text-green-600">Excellent</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="font-medium">B (80-89%)</span>
                <span className="text-blue-600">Very Good</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="font-medium">C (70-79%)</span>
                <span className="text-yellow-600">Good</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                <span className="font-medium">D (60-69%)</span>
                <span className="text-orange-600">Satisfactory</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="font-medium">F (Below 60%)</span>
                <span className="text-red-600">Needs Improvement</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">Secondary School Scale</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-medium">A (85-100%)</span>
                <span className="text-green-600">Distinction</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="font-medium">B (75-84%)</span>
                <span className="text-blue-600">Credit</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="font-medium">C (65-74%)</span>
                <span className="text-yellow-600">Pass</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                <span className="font-medium">D (50-64%)</span>
                <span className="text-orange-600">Weak Pass</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="font-medium">F (Below 50%)</span>
                <span className="text-red-600">Fail</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Performance Analytics
        </h3>
        <div className="text-center py-20 text-gray-500">
          <GraduationCap className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h4 className="text-lg font-medium mb-2">Advanced Grading Analytics</h4>
          <p>This section will provide detailed analytics on student performance, grade distributions, and trends over time.</p>
          <p className="mt-2 text-sm">Features include AI-powered insights, predictive analytics, and automated grading recommendations.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Award className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Configure Rubrics</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-green-600 font-medium">View Analytics</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <GraduationCap className="h-6 w-6 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Grade Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminGrading;
