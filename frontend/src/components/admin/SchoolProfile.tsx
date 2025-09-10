import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import { Save, Edit, MapPin, Phone, Mail, Globe, Calendar, BookOpen, Settings } from 'lucide-react';

interface SchoolInfo {
  school_id: string;
  school_name: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  street_address: string;
  contact_phone: string;
  contact_email: string;
  school_website?: string;
  vision_mission?: string;
  curriculum_type: string;
  academic_year_start: string;
  academic_year_end: string;
  number_of_terms: number;
  current_term: number;
  grading_scale_type: string;
  default_notification_language: string;
  whatsapp_enabled: boolean;
  sms_enabled: boolean;
}

const SchoolProfile: React.FC = () => {
  const { user } = useAuth();
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<SchoolInfo>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSchoolProfile();
  }, []);

  const fetchSchoolProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/profile/detailed/');
      const schoolData = response.data.school_info;
      setSchoolInfo(schoolData);
      setFormData(schoolData);
    } catch (err: any) {
      setError('Failed to load school profile');
      console.error('Error fetching school profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put(`/schools/${schoolInfo?.school_id}/`, formData);
      setSchoolInfo({ ...schoolInfo, ...formData } as SchoolInfo);
      setIsEditing(false);
      setError(null);
    } catch (err: any) {
      setError('Failed to update school profile');
      console.error('Error saving school profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!schoolInfo) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">Failed to load school profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">School Profile</h1>
            <p className="text-gray-600">Manage your school information and settings</p>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(schoolInfo);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <Settings className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-semibold">Basic Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
            {isEditing ? (
              <input
                type="text"
                name="school_name"
                value={formData.school_name || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{schoolInfo.school_name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School ID</label>
            <p className="text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">{schoolInfo.school_id}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {schoolInfo.contact_phone}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            {isEditing ? (
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {schoolInfo.contact_email}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            {isEditing ? (
              <input
                type="url"
                name="school_website"
                value={formData.school_website || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                {schoolInfo.school_website || 'Not provided'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-semibold">Location</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
            <p className="text-gray-900">{schoolInfo.province}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <p className="text-gray-900">{schoolInfo.district}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
            <p className="text-gray-900">{schoolInfo.sector}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cell</label>
            <p className="text-gray-900">{schoolInfo.cell}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Village</label>
            <p className="text-gray-900">{schoolInfo.village}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            {isEditing ? (
              <input
                type="text"
                name="street_address"
                value={formData.street_address || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{schoolInfo.street_address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Academic Configuration */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-semibold">Academic Configuration</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Curriculum Type</label>
            <p className="text-gray-900">{schoolInfo.curriculum_type?.toUpperCase()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grading Scale</label>
            <p className="text-gray-900">{schoolInfo.grading_scale_type?.replace('_', ' ').toUpperCase()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
            <p className="text-gray-900 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              {schoolInfo.academic_year_start} - {schoolInfo.academic_year_end}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Terms</label>
            <p className="text-gray-900">{schoolInfo.number_of_terms} terms (Currently Term {schoolInfo.current_term})</p>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Vision & Mission</h2>
        {isEditing ? (
          <textarea
            name="vision_mission"
            value={formData.vision_mission || ''}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your school's vision and mission statement..."
          />
        ) : (
          <p className="text-gray-900 whitespace-pre-wrap">
            {schoolInfo.vision_mission || 'No vision and mission statement provided.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default SchoolProfile;
