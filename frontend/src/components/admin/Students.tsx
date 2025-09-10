import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Eye,
  Mail, 
  Phone,
  Calendar,
  BookOpen,
  GraduationCap,
  Award,
  MapPin,
  User
} from 'lucide-react';

interface Student {
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
  student_id: string;
  class_level?: string;
  section?: string;
  admission_date?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  guardian_name?: string;
  guardian_phone?: string;
  emergency_contact?: string;
  medical_info?: string;
  enrollment_status?: string;
  academic_year?: string;
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, classFilter, statusFilter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/students/');
      setStudents(response.data);
    } catch (err: any) {
      setError('Failed to load students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterStudents = () => {
    if (!Array.isArray(students)) {
      setFilteredStudents([]);
      return;
    }
    
    let filtered = students;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.class_level && student.class_level.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.guardian_name && student.guardian_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Class filter
    if (classFilter !== 'all') {
      filtered = filtered.filter(student => student.class_level === classFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'active') {
        filtered = filtered.filter(student => student.user.is_active && student.enrollment_status === 'enrolled');
      } else if (statusFilter === 'inactive') {
        filtered = filtered.filter(student => !student.user.is_active || student.enrollment_status !== 'enrolled');
      }
    }

    setFilteredStudents(filtered);
  };

  const getClassLevels = () => {
    if (!Array.isArray(students)) return [];
    const classes = new Set(students.map(s => s.class_level).filter(Boolean));
    return Array.from(classes).sort();
  };

  const getClassColor = (classLevel?: string) => {
    if (!classLevel) return 'bg-gray-100 text-gray-800';
    
    const colors = {
      'Primary 1': 'bg-green-100 text-green-800',
      'Primary 2': 'bg-green-100 text-green-800',
      'Primary 3': 'bg-green-100 text-green-800',
      'Primary 4': 'bg-blue-100 text-blue-800',
      'Primary 5': 'bg-blue-100 text-blue-800',
      'Primary 6': 'bg-blue-100 text-blue-800',
      'Secondary 1': 'bg-purple-100 text-purple-800',
      'Secondary 2': 'bg-purple-100 text-purple-800',
      'Secondary 3': 'bg-purple-100 text-purple-800',
      'Secondary 4': 'bg-orange-100 text-orange-800',
      'Secondary 5': 'bg-orange-100 text-orange-800',
      'Secondary 6': 'bg-orange-100 text-orange-800'
    };
    
    return colors[classLevel as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getGenderIcon = (gender?: string) => {
    if (!gender) return <User className="h-4 w-4" />;
    return gender.toLowerCase() === 'female' ? 
      <User className="h-4 w-4 text-pink-500" /> : 
      <User className="h-4 w-4 text-blue-500" />;
  };

  const calculateAge = (dateOfBirth?: string) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birth = new Date(dateOfBirth);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
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
              <Users className="h-6 w-6 mr-2" />
              Students
            </h1>
            <p className="text-gray-600">Manage student enrollment and academic information</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
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
                placeholder="Search students by name, ID, class, or guardian..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Classes</option>
              {getClassLevels().map(level => (
                <option key={level} value={level}>{level}</option>
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

      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Students</div>
          <div className="text-2xl font-bold text-gray-900">{Array.isArray(students) ? students.length : 0}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Active</div>
          <div className="text-2xl font-bold text-green-600">
            {Array.isArray(students) ? students.filter(s => s.user.is_active && s.enrollment_status === 'enrolled').length : 0}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Classes</div>
          <div className="text-2xl font-bold text-blue-600">
            {getClassLevels().length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">New This Month</div>
          <div className="text-2xl font-bold text-purple-600">
            {Array.isArray(students) ? students.filter(s => {
              const admissionDate = new Date(s.admission_date || s.user.created_at);
              const now = new Date();
              return admissionDate.getMonth() === now.getMonth() && admissionDate.getFullYear() === now.getFullYear();
            }).length : 0}
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {getGenderIcon(student.gender)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {student.user.first_name} {student.user.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {student.student_id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                {student.class_level && (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getClassColor(student.class_level)}`}>
                    {student.class_level}{student.section && ` - ${student.section}`}
                  </span>
                )}
                <div className={`flex items-center text-sm ${student.user.is_active && student.enrollment_status === 'enrolled' ? 'text-green-600' : 'text-red-600'}`}>
                  <div className={`w-2 h-2 rounded-full mr-1 ${student.user.is_active && student.enrollment_status === 'enrolled' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {student.enrollment_status || 'Unknown'}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {student.user.email}
                </div>
                {student.date_of_birth && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Age: {calculateAge(student.date_of_birth)} years
                  </div>
                )}
                {student.guardian_name && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Guardian: {student.guardian_name}
                  </div>
                )}
                {student.guardian_phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {student.guardian_phone}
                  </div>
                )}
                {student.address && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {student.address.length > 30 ? `${student.address.substring(0, 30)}...` : student.address}
                  </div>
                )}
                {student.admission_date && (
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Admitted: {new Date(student.admission_date).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-500">
                    Academic Year: {student.academic_year || 'Current'}
                  </div>
                  {student.emergency_contact && (
                    <div className="text-red-600 text-xs">
                      Emergency: {student.emergency_contact}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || classFilter !== 'all' || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by enrolling your first student'}
          </p>
          {!searchTerm && classFilter === 'all' && statusFilter === 'all' && (
            <div className="mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Students;
