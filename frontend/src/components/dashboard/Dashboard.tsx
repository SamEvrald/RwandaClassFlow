import React from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import TeacherDashboard from '../teacher/TeacherDashboard';
import StudentDashboard from '../student/StudentDashboard';
import ParentDashboard from '../parent/ParentDashboard';
import AdminDashboard from '../admin/AdminDashboard';
import SchoolProfile from '../admin/SchoolProfile';
import UserManagement from '../admin/UserManagement';
import Teachers from '../admin/Teachers';
import Students from '../admin/Students';
import Parents from '../admin/Parents';
import ClassesSubjects from '../admin/ClassesSubjects';
import AdminAssignments from '../admin/AdminAssignments';
import AdminGrading from '../admin/AdminGrading';
import AdminAttendance from '../admin/AdminAttendance';
import AdminCommunications from '../admin/AdminCommunications';
import AdminReports from '../admin/AdminReports';
import AdminSettings from '../admin/AdminSettings';
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
              <Route index element={renderDashboardByRole()} />
              
              {/* Student Routes */}
              {user?.role === 'student' && (
                <>
                  <Route path="assignments" element={<StudentAssignments />} />
                  <Route path="assignments/:id" element={<AssignmentDetailWrapper />} />
                  <Route path="grades" element={<StudentGrades />} />
                  <Route path="resources" element={<StudentResources />} />
                </>
              )}

              {/* Admin Routes */}
              {(user?.role === 'school_admin' || user?.role === 'admin') && (
                <>
                  <Route path="school-profile" element={<SchoolProfile />} />
                  <Route path="user-management" element={<UserManagement />} />
                  <Route path="teachers" element={<Teachers />} />
                  <Route path="students" element={<Students />} />
                  <Route path="parents" element={<Parents />} />
                  <Route path="classes-subjects" element={<ClassesSubjects />} />
                  <Route path="assignments" element={<AdminAssignments />} />
                  <Route path="grading" element={<AdminGrading />} />
                  <Route path="attendance" element={<AdminAttendance />} />
                  <Route path="communications" element={<AdminCommunications />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="settings" element={<AdminSettings />} />
                </>
              )}

              {/* Fallback route for debugging */}
              <Route path="*" element={<div className="p-6 text-red-500">Route not found: {window.location.pathname}</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
