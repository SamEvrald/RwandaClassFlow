import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    const role = user?.role;
    
    const commonItems = [
      { name: 'Dashboard', href: '/dashboard' },
    ];

    switch (role) {
      case 'teacher':
        return [
          ...commonItems,
          { name: 'My Classes', href: '/classes' },
          { name: 'Assignments', href: '/assignments' },
          { name: 'Grading', href: '/grading' },
          { name: 'Attendance', href: '/attendance' },
        ];
      case 'student':
        return [
          ...commonItems,
          { name: 'Assignments', href: '/dashboard/assignments' },
          { name: 'My Grades', href: '/dashboard/grades' },
          { name: 'Resources', href: '/dashboard/resources' },
        ];
      case 'parent':
        return [
          ...commonItems,
          { name: 'My Children', href: '/children' },
          { name: 'Progress Reports', href: '/reports' },
          { name: 'Messages', href: '/messages' },
        ];
      case 'school_admin':
      case 'admin':
        return [
          ...commonItems,
          { name: 'School Profile', href: '/school' },
          { name: 'Users', href: '/users' },
          { name: 'Classes & Subjects', href: '/academic' },
          { name: 'Reports', href: '/reports' },
        ];
      default:
        return commonItems;
    }
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-blue-400">ClassFlow</h2>
      </div>
      <nav className="mt-6">
        {getMenuItems().map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-6 py-3 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                  : 'hover:bg-gray-700'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
