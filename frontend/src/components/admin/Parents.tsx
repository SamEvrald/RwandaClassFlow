import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  Heart, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Eye,
  Mail, 
  Phone,
  Calendar,
  Users,
  MapPin,
  Briefcase,
  User,
  MessageCircle
} from 'lucide-react';

interface Parent {
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
  parent_id: string;
  relationship_to_student?: string;
  occupation?: string;
  workplace?: string;
  emergency_contact?: string;
  address?: string;
  preferred_contact_method?: string;
  secondary_phone?: string;
  children?: any[];
  communication_preferences?: string;
}

const Parents: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [filteredParents, setFilteredParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [relationshipFilter, setRelationshipFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchParents();
  }, []);

  useEffect(() => {
    filterParents();
  }, [parents, searchTerm, relationshipFilter, statusFilter]);

  const fetchParents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/parents/');
      setParents(response.data);
    } catch (err: any) {
      setError('Failed to load parents');
      console.error('Error fetching parents:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterParents = () => {
    if (!Array.isArray(parents)) {
      setFilteredParents([]);
      return;
    }
    
    let filtered = parents;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(parent =>
        parent.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.parent_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (parent.occupation && parent.occupation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (parent.workplace && parent.workplace.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Relationship filter
    if (relationshipFilter !== 'all') {
      filtered = filtered.filter(parent => parent.relationship_to_student === relationshipFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(parent => 
        statusFilter === 'active' ? parent.user.is_active : !parent.user.is_active
      );
    }

    setFilteredParents(filtered);
  };

  const getRelationships = () => {
    if (!Array.isArray(parents)) return [];
    const relationships = new Set(parents.map(p => p.relationship_to_student).filter(Boolean));
    return Array.from(relationships);
  };

  const getRelationshipColor = (relationship?: string) => {
    if (!relationship) return 'bg-gray-100 text-gray-800';
    
    const colors = {
      'Father': 'bg-blue-100 text-blue-800',
      'Mother': 'bg-pink-100 text-pink-800',
      'Guardian': 'bg-purple-100 text-purple-800',
      'Grandfather': 'bg-indigo-100 text-indigo-800',
      'Grandmother': 'bg-rose-100 text-rose-800',
      'Uncle': 'bg-green-100 text-green-800',
      'Aunt': 'bg-yellow-100 text-yellow-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    
    return colors[relationship as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getContactMethodIcon = (method?: string) => {
    switch (method?.toLowerCase()) {
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
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
              <Heart className="h-6 w-6 mr-2" />
              Parents & Guardians
            </h1>
            <p className="text-gray-600">Manage parent information and communication preferences</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Parent
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
                placeholder="Search parents by name, ID, occupation, or workplace..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={relationshipFilter}
              onChange={(e) => setRelationshipFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Relationships</option>
              {getRelationships().map(rel => (
                <option key={rel} value={rel}>{rel}</option>
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

      {/* Parent Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Parents</div>
          <div className="text-2xl font-bold text-gray-900">{Array.isArray(parents) ? parents.length : 0}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Active</div>
          <div className="text-2xl font-bold text-green-600">
            {Array.isArray(parents) ? parents.filter(p => p.user.is_active).length : 0}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Fathers</div>
          <div className="text-2xl font-bold text-blue-600">
            {Array.isArray(parents) ? parents.filter(p => p.relationship_to_student === 'Father').length : 0}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Mothers</div>
          <div className="text-2xl font-bold text-pink-600">
            {Array.isArray(parents) ? parents.filter(p => p.relationship_to_student === 'Mother').length : 0}
          </div>
        </div>
      </div>

      {/* Parents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParents.map((parent) => (
          <div key={parent.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {parent.user.first_name} {parent.user.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {parent.parent_id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setSelectedParent(parent)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedParent(parent)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                {parent.relationship_to_student && (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRelationshipColor(parent.relationship_to_student)}`}>
                    {parent.relationship_to_student}
                  </span>
                )}
                <div className={`flex items-center text-sm ${parent.user.is_active ? 'text-green-600' : 'text-red-600'}`}>
                  <div className={`w-2 h-2 rounded-full mr-1 ${parent.user.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {parent.user.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {parent.user.email}
                </div>
                {parent.user.phone_number && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {parent.user.phone_number}
                  </div>
                )}
                {parent.secondary_phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Alt: {parent.secondary_phone}
                  </div>
                )}
                {parent.occupation && (
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {parent.occupation}
                  </div>
                )}
                {parent.workplace && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {parent.workplace}
                  </div>
                )}
                {parent.address && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {parent.address.length > 30 ? `${parent.address.substring(0, 30)}...` : parent.address}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {parent.children?.length || 0} Children
                  </div>
                  <div className="flex items-center text-gray-500">
                    {getContactMethodIcon(parent.preferred_contact_method)}
                    <span className="ml-1 capitalize">
                      {parent.preferred_contact_method || 'Phone'}
                    </span>
                  </div>
                </div>
                {parent.emergency_contact && (
                  <div className="mt-2 text-xs text-red-600">
                    Emergency: {parent.emergency_contact}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredParents.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No parents found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || relationshipFilter !== 'all' || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first parent/guardian'}
          </p>
          {!searchTerm && relationshipFilter === 'all' && statusFilter === 'all' && (
            <div className="mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Parent
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Parents;
