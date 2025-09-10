import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  attendanceRate: number;
}

interface RecentActivity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  user?: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    attendanceRate: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch students, teachers, and other stats
      const [studentsRes, teachersRes] = await Promise.all([
        api.get('/users/students/'),
        api.get('/users/teachers/')
      ]);

      setStats({
        totalStudents: studentsRes.data.count || studentsRes.data.length || 0,
        totalTeachers: teachersRes.data.count || teachersRes.data.length || 0,
        totalClasses: 0, // Will be updated when we have classes API
        attendanceRate: 85 // Placeholder until we have attendance data
      });

      // Mock recent activities for now - will be replaced with real API
      setRecentActivities([
        {
          id: 1,
          type: 'user_registration',
          description: `Welcome ${user?.first_name} ${user?.last_name}! School admin account created successfully.`,
          timestamp: new Date().toISOString(),
          user: user?.username
        }
      ]);

    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.detail || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
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

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button 
                onClick={fetchDashboardData}
                className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.first_name} {user?.last_name}!
        </h1>
        <p className="text-blue-100">
            {user?.school_info?.school_name || 'School Administration Dashboard'}
        </p>
        <p className="text-sm text-blue-200 mt-1">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Total Students</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.totalStudents.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Enrolled this year</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Teachers</h3>
              <p className="text-2xl font-bold text-green-600">{stats.totalTeachers}</p>
              <p className="text-sm text-gray-600">Active staff</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Classes</h3>
              <p className="text-2xl font-bold text-yellow-600">{stats.totalClasses}</p>
              <p className="text-sm text-gray-600">Total classes</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Attendance</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.attendanceRate}%</p>
              <p className="text-sm text-gray-600">School average</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">School Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Mathematics</span>
                <span className="text-sm text-gray-500">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">English</span>
                <span className="text-sm text-gray-500">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Science</span>
                <span className="text-sm text-gray-500">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 text-sm">
              Manage Users
            </button>
            <button className="bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 text-sm">
              School Settings
            </button>
            <button className="bg-purple-600 text-white py-3 px-4 rounded hover:bg-purple-700 text-sm">
              Generate Reports
            </button>
            <button className="bg-yellow-600 text-white py-3 px-4 rounded hover:bg-yellow-700 text-sm">
              View Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <p className="font-medium">New teacher registered: Mary Johnson</p>
              <p className="text-sm text-gray-600">Mathematics Department</p>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <p className="font-medium">Student data import completed</p>
              <p className="text-sm text-gray-600">45 new students added</p>
            </div>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Term report generated</p>
              <p className="text-sm text-gray-600">Q1 2025 performance report</p>
            </div>
            <span className="text-xs text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
