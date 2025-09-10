import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { UserCheck, Calendar, Search, Filter, Download } from 'lucide-react';

interface AttendanceData {
  today_attendance: number;
  weekly_average: number;
  monthly_average: number;
  absent_today: number;
  class_attendance: { class_name: string; present: number; total: number }[];
}

const AdminAttendance: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/attendance/dashboard/');
      setAttendanceData(response.data);
    } catch (err: any) {
      setError('Failed to load attendance data');
      console.error('Error fetching attendance data:', err);
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
              <UserCheck className="h-6 w-6 mr-2" />
              Attendance Management
            </h1>
            <p className="text-gray-600">Monitor and manage student and teacher attendance</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Today's Attendance</div>
          <div className="text-2xl font-bold text-green-600">
            {loading ? '...' : `${attendanceData?.today_attendance || 0}%`}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Present Students</div>
          <div className="text-2xl font-bold text-blue-600">394</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Absent Students</div>
          <div className="text-2xl font-bold text-red-600">56</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Late Arrivals</div>
          <div className="text-2xl font-bold text-yellow-600">12</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by student name or class..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Classes</option>
              <option>Primary 1</option>
              <option>Primary 2</option>
              <option>Secondary 1</option>
            </select>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Attendance Overview</h3>
          <div className="text-center py-20 text-gray-500">
            <UserCheck className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h4 className="text-lg font-medium mb-2">Attendance Tracking System</h4>
            <p>This feature will show detailed attendance records, class-wise statistics, and individual student attendance patterns.</p>
            <p className="mt-2 text-sm">Coming soon with full functionality and real-time data integration.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
