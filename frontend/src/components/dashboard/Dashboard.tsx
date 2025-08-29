import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import TeacherDashboard from '../teacher/TeacherDashboard';
import StudentDashboard from '../student/StudentDashboard';
import ParentDashboard from '../parent/ParentDashboard';
import AdminDashboard from '../admin/AdminDashboard';

const Dashboard: React.FC = () => {
  const { state } = useAuth();

  const renderDashboardByRole = () => {
    switch (state.user?.role) {
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'school_admin':
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Unauthorized access</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={renderDashboardByRole()} />
              <Route path="/dashboard" element={renderDashboardByRole()} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
