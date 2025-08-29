import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { state } = useAuth();

  const getMenuItems = () => {
    const role = state.user?.role;
    
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
          { name: 'My Grades', href: '/grades' },
          { name: 'Assignments', href: '/assignments' },
          { name: 'Resources', href: '/resources' },
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
        {getMenuItems().map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block px-6 py-3 text-sm hover:bg-gray-700 transition-colors"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
