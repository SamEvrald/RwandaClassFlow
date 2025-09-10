import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Component</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-green-600 font-semibold">✅ Routing is working!</p>
        <p className="text-gray-600 mt-2">This test component loaded successfully.</p>
        <p className="text-sm text-gray-500 mt-2">Current URL: {window.location.pathname}</p>
      </div>
    </div>
  );
};

export default TestComponent;
