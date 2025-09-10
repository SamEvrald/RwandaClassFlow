import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  BarChart3, 
  Download, 
  Calendar,
  Users,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Target
} from 'lucide-react';

interface ReportData {
  totalStudents: number;
  totalTeachers: number;
  averageAttendance: number;
  averageGrade: number;
  subjectPerformance: { subject: string; average: number }[];
  monthlyEnrollment: { month: string; students: number }[];
}

const AdminReports: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('current_term');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReportData();
  }, [selectedPeriod]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      // Fetch report data from API
      const response = await api.get(`/reports/dashboard/?period=${selectedPeriod}`);
      setReportData(response.data);
    } catch (err: any) {
      setError('Failed to load report data');
      console.error('Error fetching report data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!reportData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              Reports & Analytics
            </h1>
            <p className="text-gray-600">School performance insights and data analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="current_term">Current Term</option>
              <option value="last_term">Last Term</option>
              <option value="academic_year">Academic Year</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Total Students</h3>
              <p className="text-2xl font-bold text-blue-600">{reportData.totalStudents}</p>
              <p className="text-sm text-gray-600">Enrolled this term</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Teachers</h3>
              <p className="text-2xl font-bold text-green-600">{reportData.totalTeachers}</p>
              <p className="text-sm text-gray-600">Active staff</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Attendance</h3>
              <p className="text-2xl font-bold text-yellow-600">{reportData.averageAttendance}%</p>
              <p className="text-sm text-gray-600">Average rate</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Performance</h3>
              <p className="text-2xl font-bold text-purple-600">{reportData.averageGrade}%</p>
              <p className="text-sm text-gray-600">Average grade</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Subject Performance
          </h3>
          <div className="space-y-4">
            {reportData.subjectPerformance.map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  <span className="text-sm text-gray-500">{subject.average}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{width: `${subject.average}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Enrollment Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Enrollment Trend
          </h3>
          <div className="space-y-4">
            {reportData.monthlyEnrollment.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{month.month}</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{width: `${(month.students / 500) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{month.students}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Academic Performance</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Users className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-green-600 font-medium">Attendance Report</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Calendar className="h-6 w-6 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Monthly Summary</span>
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Report Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <p className="font-medium">Term report generated</p>
              <p className="text-sm text-gray-600">Q1 2024 academic performance summary</p>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <p className="font-medium">Attendance report exported</p>
              <p className="text-sm text-gray-600">Monthly attendance data for January</p>
            </div>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Performance analytics updated</p>
              <p className="text-sm text-gray-600">Subject-wise performance trends</p>
            </div>
            <span className="text-xs text-gray-500">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
