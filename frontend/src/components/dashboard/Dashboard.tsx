import React from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import TeacherDashboard from '../teacher/TeacherDashboard';
import StudentDashboard from '../student/StudentDashboard';
import ParentDashboard from '../parent/ParentDashboard';
import AdminDashboard from '../admin/AdminDashboard';
import { StudentAssignments, StudentGrades, StudentResources, AssignmentDetail } from '../student';

const AssignmentDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/dashboard/assignments');
  };
  
  return (
    <AssignmentDetail 
      assignmentId={parseInt(id || '0')} 
      onBack={handleBack} 
    />
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboardByRole = () => {
    switch (user?.role) {
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
              
              {/* Student Routes */}
              {user?.role === 'student' && (
                <>
                  <Route path="/assignments" element={<StudentAssignments />} />
                  <Route path="/assignments/:id" element={<AssignmentDetailWrapper />} />
                  <Route path="/grades" element={<StudentGrades />} />
                  <Route path="/resources" element={<StudentResources />} />
                </>
              )}
              
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
