import React, { useState, useEffect } from 'react';
import { 
  Download, 
  ExternalLink, 
  FileText, 
  Video, 
  Image, 
  Headphones, 
  Link, 
  BookOpen,
  User,
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import studentService, { LearningResource } from '../../utils/studentService';

const StudentResources: React.FC = () => {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<number | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    fetchResources();
  }, [selectedSubject, selectedType]);

  useEffect(() => {
    // Extract unique subjects from resources
    const uniqueSubjects = resources.reduce((acc: any[], resource) => {
      if (!acc.find(s => s.name === resource.subject_name)) {
        acc.push({ name: resource.subject_name });
      }
      return acc;
    }, []);
    setSubjects(uniqueSubjects);
  }, [resources]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await studentService.getResources(selectedSubject, selectedType);
      setResources(data);
    } catch (err) {
      setError('Failed to fetch resources');
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-6 w-6 text-red-500" />;
      case 'image':
        return <Image className="h-6 w-6 text-green-500" />;
      case 'audio':
        return <Headphones className="h-6 w-6 text-purple-500" />;
      case 'link':
        return <Link className="h-6 w-6 text-blue-500" />;
      case 'document':
      case 'file':
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'image':
        return 'bg-green-100 text-green-800';
      case 'audio':
        return 'bg-purple-100 text-purple-800';
      case 'link':
        return 'bg-blue-100 text-blue-800';
      case 'document':
        return 'bg-yellow-100 text-yellow-800';
      case 'file':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleResourceClick = (resource: LearningResource) => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else if (resource.file) {
      window.open(resource.file, '_blank');
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resourceTypes = [
    { value: 'file', label: 'Files' },
    { value: 'document', label: 'Documents' },
    { value: 'video', label: 'Videos' },
    { value: 'image', label: 'Images' },
    { value: 'audio', label: 'Audio' },
    { value: 'link', label: 'Links' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchResources}
          className="mt-2 text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:mb-0">Learning Resources</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Subject Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="inline h-4 w-4 mr-1" />
              Filter by Subject
            </label>
            <select
              value={selectedSubject || ''}
              onChange={(e) => setSelectedSubject(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject, index) => (
                <option key={index} value={index}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Type
            </label>
            <select
              value={selectedType || ''}
              onChange={(e) => setSelectedType(e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {resourceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="bg-white p-6 rounded-lg shadow">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? `No resources found matching "${searchTerm}".`
                : "No learning resources are available at the moment."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleResourceClick(resource)}
              >
                <div className="flex items-start space-x-3 mb-3">
                  {getResourceIcon(resource.resource_type)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{resource.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResourceTypeColor(resource.resource_type)}`}>
                        {resource.resource_type}
                      </span>
                      {resource.is_public && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Public
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {resource.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
                )}

                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{resource.subject_name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>By {resource.uploaded_by_name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Added {formatDate(resource.created_at)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <div className="flex space-x-2">
                    {resource.file && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(resource.file!, '_blank');
                        }}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-xs"
                      >
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </button>
                    )}
                    {resource.url && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(resource.url, '_blank');
                        }}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-xs"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Open</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResources;
