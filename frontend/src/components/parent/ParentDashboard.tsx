import React from 'react';

const ParentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Parent Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900">John's Performance</h3>
            <p className="text-2xl font-bold text-blue-600">87%</p>
            <p className="text-sm text-blue-700">Overall average</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-900">Attendance Rate</h3>
            <p className="text-2xl font-bold text-green-600">94%</p>
            <p className="text-sm text-green-700">This term</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-400 pl-4">
              <p className="font-medium">New Math grade: 92%</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <p className="font-medium">Attendance alert</p>
              <p className="text-sm text-gray-600">Yesterday</p>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <p className="font-medium">Positive behavior note</p>
              <p className="text-sm text-gray-600">3 days ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded">
              <p className="font-medium text-yellow-900">Mathematics Support</p>
              <p className="text-sm text-yellow-700">Your child might benefit from extra practice in fractions</p>
              <button className="mt-2 text-xs bg-yellow-600 text-white px-2 py-1 rounded">
                View Resources
              </button>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <p className="font-medium text-blue-900">Reading Program</p>
              <p className="text-sm text-blue-700">Recommended books for improvement</p>
              <button className="mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">
                View List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
