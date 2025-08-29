import React from 'react';

const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Teacher Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900">My Classes</h3>
            <p className="text-2xl font-bold text-blue-600">5</p>
            <p className="text-sm text-blue-700">Active classes</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-900">Assignments</h3>
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-sm text-green-700">Pending grading</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-900">Students</h3>
            <p className="text-2xl font-bold text-yellow-600">150</p>
            <p className="text-sm text-yellow-700">Total students</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-400 pl-4">
              <p className="font-medium">Math Quiz - Grade 5A</p>
              <p className="text-sm text-gray-600">Submitted 2 hours ago</p>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <p className="font-medium">Science Assignment - Grade 4B</p>
              <p className="text-sm text-gray-600">Graded 1 day ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Create Assignment
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Mark Attendance
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
              AI Grading Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
