import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  GraduationCap, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Eye,
  Mail, 
  Phone,
  Calendar,
  BookOpen,
  Users,
  Award,
  Clock
} from 'lucide-react';

interface Teacher {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    is_active: boolean;
    created_at: string;
  };
  employee_id: string;
  department?: string;
  specialization?: string;
  qualification?: string;
  hire_date?: string;
  salary?: number;
  subjects?: any[];
  classes?: any[];
}

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    filterTeachers();
  }, [teachers, searchTerm, departmentFilter, statusFilter]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/teachers/');
      setTeachers(response.data);
    } catch (err: any) {
      setError('Failed to load teachers');
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterTeachers = () => {
    if (!Array.isArray(teachers)) {
      setFilteredTeachers([]);
      return;
    }
    
    let filtered = teachers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.department && teacher.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (teacher.specialization && teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(teacher => teacher.department === departmentFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(teacher => 
        statusFilter === 'active' ? teacher.user.is_active : !teacher.user.is_active
      );
    }

    setFilteredTeachers(filtered);
  };

  const getDepartments = () => {
    if (!Array.isArray(teachers)) return [];
    const departments = new Set(teachers.map(t => t.department).filter(Boolean));
    return Array.from(departments);
  };

  const getDepartmentColor = (department?: string) => {
    if (!department) return 'bg-gray-100 text-gray-800';
    
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'Science': 'bg-green-100 text-green-800',
      'Languages': 'bg-purple-100 text-purple-800',
      'Social Studies': 'bg-orange-100 text-orange-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Physical Education': 'bg-red-100 text-red-800',
      'Technology': 'bg-indigo-100 text-indigo-800'
    };
    
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2" />
              Teachers
            </h1>
            <p className="text-gray-600">Manage teaching staff and their assignments</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Teacher
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search teachers by name, ID, department, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              {getDepartments().map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teacher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Teachers</div>
          <div className="text-2xl font-bold text-gray-900">{Array.isArray(teachers) ? teachers.length : 0}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Active</div>
          <div className="text-2xl font-bold text-green-600">
            {Array.isArray(teachers) ? teachers.filter(t => t.user.is_active).length : 0}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Departments</div>
          <div className="text-2xl font-bold text-blue-600">
            {getDepartments().length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">New This Month</div>
          <div className="text-2xl font-bold text-purple-600">
            {Array.isArray(teachers) ? teachers.filter(t => {
              const hireDate = new Date(t.hire_date || t.user.created_at);
              const now = new Date();
              return hireDate.getMonth() === now.getMonth() && hireDate.getFullYear() === now.getFullYear();
            }).length : 0}
          </div>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {teacher.user.first_name} {teacher.user.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {teacher.employee_id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setSelectedTeacher(teacher)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedTeacher(teacher)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {teacher.department && (
                <div className="mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDepartmentColor(teacher.department)}`}>
                    {teacher.department}
                  </span>
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {teacher.user.email}
                </div>
                {teacher.user.phone_number && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {teacher.user.phone_number}
                  </div>
                )}
                {teacher.specialization && (
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {teacher.specialization}
                  </div>
                )}
                {teacher.qualification && (
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    {teacher.qualification}
                  </div>
                )}
                {teacher.hire_date && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Hired: {new Date(teacher.hire_date).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {teacher.classes?.length || 0} Classes
                  </div>
                  <div className="flex items-center text-gray-500">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {teacher.subjects?.length || 0} Subjects
                  </div>
                  <div className={`flex items-center ${teacher.user.is_active ? 'text-green-600' : 'text-red-600'}`}>
                    <div className={`w-2 h-2 rounded-full mr-1 ${teacher.user.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {teacher.user.is_active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No teachers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || departmentFilter !== 'all' || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first teacher'}
          </p>
          {!searchTerm && departmentFilter === 'all' && statusFilter === 'all' && (
            <div className="mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Teacher
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Teachers;
