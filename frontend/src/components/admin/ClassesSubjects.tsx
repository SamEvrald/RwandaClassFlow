import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye,
  Users,
  Clock,
  Calendar,
  GraduationCap,
  User,
  ChevronRight,
  Building
} from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
  description?: string;
  teacher?: {
    id: number;
    user: {
      first_name: string;
      last_name: string;
    };
  };
  class_level?: string;
  hours_per_week?: number;
  is_core_subject?: boolean;
}

interface Class {
  id: number;
  name: string;
  level: string;
  section?: string;
  academic_year: string;
  class_teacher?: {
    id: number;
    user: {
      first_name: string;
      last_name: string;
    };
  };
  students_count?: number;
  subjects?: Subject[];
  room_number?: string;
  capacity?: number;
}

const ClassesSubjects: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'classes' | 'subjects'>('classes');
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<Class | Subject | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === 'classes') {
      filterClasses();
    } else {
      filterSubjects();
    }
  }, [classes, subjects, searchTerm, levelFilter, yearFilter, activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch real data from API
      const [classesResponse, subjectsResponse] = await Promise.all([
        api.get('/academic/classes/'),
        api.get('/academic/subjects/')
      ]);
      
      setClasses(classesResponse.data);
      setSubjects(subjectsResponse.data);
    } catch (err: any) {
      setError('Failed to load data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterClasses = () => {
    let filtered = classes;

    if (searchTerm) {
      filtered = filtered.filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cls.class_teacher && 
          `${cls.class_teacher.user.first_name} ${cls.class_teacher.user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(cls => cls.level === levelFilter);
    }

    if (yearFilter !== 'all') {
      filtered = filtered.filter(cls => cls.academic_year === yearFilter);
    }

    setFilteredClasses(filtered);
  };

  const filterSubjects = () => {
    let filtered = subjects;

    if (searchTerm) {
      filtered = filtered.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (subject.teacher && 
          `${subject.teacher.user.first_name} ${subject.teacher.user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(subject => subject.class_level === levelFilter);
    }

    setFilteredSubjects(filtered);
  };

  const getLevels = () => {
    const levels = new Set([
      ...classes.map(c => c.level),
      ...subjects.map(s => s.class_level).filter(Boolean)
    ]);
    return Array.from(levels).sort();
  };

  const getAcademicYears = () => {
    const years = new Set(classes.map(c => c.academic_year));
    return Array.from(years).sort();
  };

  const getLevelColor = (level: string) => {
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
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
              <BookOpen className="h-6 w-6 mr-2" />
              Classes & Subjects
            </h1>
            <p className="text-gray-600">Manage academic classes and subject assignments</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {activeTab === 'classes' ? 'Class' : 'Subject'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('classes')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'classes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Classes ({classes.length})
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'subjects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Subjects ({subjects.length})
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                {getLevels().map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              {activeTab === 'classes' && (
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Years</option>
                  {getAcademicYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'classes' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((cls) => (
                <div key={cls.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(cls.level)}`}>
                          {cls.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    {cls.class_teacher && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Teacher: {cls.class_teacher.user.first_name} {cls.class_teacher.user.last_name}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Students: {cls.students_count || 0}
                    </div>
                    {cls.room_number && (
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        Room: {cls.room_number}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Academic Year: {cls.academic_year}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Capacity: {cls.students_count || 0}/{cls.capacity || 0}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                        View Details <ChevronRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map((subject) => (
                <div key={subject.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {subject.is_core_subject && (
                    <div className="mb-3">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Core Subject
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 text-sm text-gray-600">
                    {subject.teacher && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Teacher: {subject.teacher.user.first_name} {subject.teacher.user.last_name}
                      </div>
                    )}
                    {subject.class_level && (
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Level: {subject.class_level}
                      </div>
                    )}
                    {subject.hours_per_week && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {subject.hours_per_week} hours/week
                      </div>
                    )}
                  </div>

                  {subject.description && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">{subject.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'classes' ? filteredClasses : filteredSubjects).length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No {activeTab} found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || levelFilter !== 'all' || yearFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : `Get started by adding your first ${activeTab.slice(0, -1)}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassesSubjects;
