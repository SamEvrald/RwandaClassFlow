import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">School Administration Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900">Total Students</h3>
            <p className="text-2xl font-bold text-blue-600">1,245</p>
            <p className="text-sm text-blue-700">Enrolled this year</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-900">Teachers</h3>
            <p className="text-2xl font-bold text-green-600">47</p>
            <p className="text-sm text-green-700">Active staff</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-900">Classes</h3>
            <p className="text-2xl font-bold text-yellow-600">28</p>
            <p className="text-sm text-yellow-700">Total classes</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-900">Attendance</h3>
            <p className="text-2xl font-bold text-purple-600">92%</p>
            <p className="text-sm text-purple-700">School average</p>
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
