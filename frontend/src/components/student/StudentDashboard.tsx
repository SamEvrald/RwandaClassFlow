import React from 'react';

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Student Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900">Overall Grade</h3>
            <p className="text-2xl font-bold text-blue-600">85%</p>
            <p className="text-sm text-blue-700">Current average</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-900">Attendance</h3>
            <p className="text-2xl font-bold text-green-600">95%</p>
            <p className="text-sm text-green-700">This term</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-900">Assignments</h3>
            <p className="text-2xl font-bold text-yellow-600">3</p>
            <p className="text-sm text-yellow-700">Due this week</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Grades</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Mathematics Quiz</span>
              <span className="font-bold text-green-600">92%</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>English Essay</span>
              <span className="font-bold text-blue-600">78%</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Science Lab Report</span>
              <span className="font-bold text-green-600">88%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded">
              <p className="font-medium text-blue-900">Mathematics Practice</p>
              <p className="text-sm text-blue-700">Focus on algebra problems</p>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="font-medium text-green-900">Reading Comprehension</p>
              <p className="text-sm text-green-700">Recommended articles available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
