import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  School, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Settings,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import api from '../../utils/api';
import { 
  rwandaLocations, 
  getDistricts, 
  getSectors, 
  getCells, 
  getVillages,
  generateSchoolId 
} from '../../utils/rwandaLocations';

interface FormData {
  // School information
  school_id: string;
  school_name: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  street_address: string;
  curriculum_type: string;
  other_curriculum_details: string;
  contact_phone: string;
  contact_email: string;
  
  // Academic settings
  academic_year_start: string;
  academic_year_end: string;
  number_of_terms: number;
  current_term: number;
  grading_scale_type: string;
  grading_scale_details: any;
  default_notification_language: string;
  whatsapp_enabled: boolean;
  sms_enabled: boolean;
  school_website: string;
  vision_mission: string;
  
  // Admin information
  admin_first_name: string;
  admin_last_name: string;
  admin_email: string;
  admin_phone: string;
  admin_username: string;
  admin_password: string;
  admin_confirm_password: string;
}

const SchoolRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [availability, setAvailability] = useState<any>({});
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableSectors, setAvailableSectors] = useState<string[]>([]);
  const [availableCells, setAvailableCells] = useState<string[]>([]);
  const [availableVillages, setAvailableVillages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    // School information
    school_id: '',
    school_name: '',
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
    street_address: '',
    curriculum_type: 'cbc',
    other_curriculum_details: '',
    contact_phone: '',
    contact_email: '',
    
    // Academic settings
    academic_year_start: '2024-01-01',
    academic_year_end: '2024-12-31',
    number_of_terms: 3,
    current_term: 1,
    grading_scale_type: 'percentage',
    grading_scale_details: {},
    default_notification_language: 'en',
    whatsapp_enabled: false,
    sms_enabled: true,
    school_website: '',
    vision_mission: '',
    
    // Admin information
    admin_first_name: '',
    admin_last_name: '',
    admin_email: '',
    admin_phone: '',
    admin_username: '',
    admin_password: '',
    admin_confirm_password: ''
  });

  // Auto-generate school ID when school name changes
  useEffect(() => {
    if (formData.school_name.trim()) {
      const newSchoolId = generateSchoolId(formData.school_name);
      setFormData(prev => ({
        ...prev,
        school_id: newSchoolId
      }));
      
      // Check availability of the generated school ID
      if (newSchoolId) {
        checkAvailability('school_id', newSchoolId);
      }
    }
  }, [formData.school_name]);

  // Update districts when province changes
  useEffect(() => {
    if (formData.province) {
      const districts = getDistricts(formData.province);
      setAvailableDistricts(districts);
      setFormData(prev => ({
        ...prev,
        district: '',
        sector: '',
        cell: '',
        village: ''
      }));
      setAvailableSectors([]);
      setAvailableCells([]);
      setAvailableVillages([]);
    }
  }, [formData.province]);

  // Update sectors when district changes
  useEffect(() => {
    if (formData.province && formData.district) {
      const sectors = getSectors(formData.province, formData.district);
      setAvailableSectors(sectors);
      setFormData(prev => ({
        ...prev,
        sector: '',
        cell: '',
        village: ''
      }));
      setAvailableCells([]);
      setAvailableVillages([]);
    }
  }, [formData.province, formData.district]);

  // Update cells when sector changes
  useEffect(() => {
    if (formData.province && formData.district && formData.sector) {
      const cells = getCells(formData.province, formData.district, formData.sector);
      setAvailableCells(cells);
      setFormData(prev => ({
        ...prev,
        cell: '',
        village: ''
      }));
      setAvailableVillages([]);
    }
  }, [formData.province, formData.district, formData.sector]);

  // Update villages when cell changes
  useEffect(() => {
    if (formData.province && formData.district && formData.sector && formData.cell) {
      const villages = getVillages(formData.province, formData.district, formData.sector, formData.cell);
      setAvailableVillages(villages);
      setFormData(prev => ({
        ...prev,
        village: ''
      }));
    }
  }, [formData.province, formData.district, formData.sector, formData.cell]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const checkAvailability = async (field: string, value: string) => {
    if (!value) return;
    
    try {
      const endpoints: any = {
        school_id: '/users/check-school-id/',
        admin_username: '/users/check-username/',
        admin_email: '/users/check-email/'
      };
      
      const response = await api.get(endpoints[field], {
        params: { [field === 'admin_username' ? 'username' : field === 'admin_email' ? 'email' : 'school_id']: value }
      });
      
      setAvailability((prev: any) => ({
        ...prev,
        [field]: response.data.available
      }));
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await api.post('/users/register-school/', formData);
      
      // Show success message and redirect to login
      alert('School registered successfully! You can now login with your admin credentials.');
      navigate('/login', { 
        state: { 
          message: 'School registration successful! Please login with your admin credentials.',
          username: formData.admin_username 
        }
      });
      
    } catch (error: any) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const provinces = rwandaLocations.map(location => location.name);

  const curriculumTypes = [
    { value: 'cbc', label: 'CBC (Rwanda)' },
    { value: 'cambridge_igcse', label: 'Cambridge (IGCSE)' },
    { value: 'cambridge_a_level', label: 'Cambridge (A Level)' },
    { value: 'montessori', label: 'Montessori' },
    { value: 'other', label: 'Other - Specify' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'rw', label: 'Kinyarwanda' }
  ];

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
            </div>
            {step < 3 && (
              <div className={`w-12 h-1 mx-2 ${
                step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className={currentStep === 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          School Information
        </span>
        <span className={currentStep === 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          Academic Settings
        </span>
        <span className={currentStep === 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          Admin Account
        </span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School ID * <span className="text-sm text-gray-500">(Auto-generated)</span>
          </label>
          <input
            type="text"
            name="school_id"
            value={formData.school_id}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            placeholder="Will be generated from school name"
          />
          <p className="text-gray-500 text-xs mt-1">School ID will be automatically generated based on your school name</p>
          {availability.school_id === false && (
            <p className="text-red-600 text-sm mt-1">School ID already exists</p>
          )}
          {availability.school_id === true && (
            <p className="text-green-600 text-sm mt-1">School ID available</p>
          )}
          {errors.school_id && <p className="text-red-600 text-sm mt-1">{errors.school_id}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Name *
          </label>
          <input
            type="text"
            name="school_name"
            value={formData.school_name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Rwanda Excellence Academy"
            required
          />
          {errors.school_name && <p className="text-red-600 text-sm mt-1">{errors.school_name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Province *
          </label>
          <select
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          {errors.province && <p className="text-red-600 text-sm mt-1">{errors.province}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District *
          </label>
          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={!formData.province}
          >
            <option value="">
              {formData.province ? 'Select District' : 'First select a province'}
            </option>
            {availableDistricts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          {errors.district && <p className="text-red-600 text-sm mt-1">{errors.district}</p>}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Location Information</h3>
            <p className="text-sm text-blue-700 mt-1">
              Select your location step by step. Each selection will populate the next dropdown.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sector *
          </label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={!formData.district}
          >
            <option value="">
              {formData.district ? 'Select Sector' : 'First select a district'}
            </option>
            {availableSectors.map((sector) => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          {errors.sector && <p className="text-red-600 text-sm mt-1">{errors.sector}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cell *
          </label>
          <select
            name="cell"
            value={formData.cell}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={!formData.sector}
          >
            <option value="">
              {formData.sector ? 'Select Cell' : 'First select a sector'}
            </option>
            {availableCells.map((cell) => (
              <option key={cell} value={cell}>{cell}</option>
            ))}
          </select>
          {errors.cell && <p className="text-red-600 text-sm mt-1">{errors.cell}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Village *
          </label>
          <select
            name="village"
            value={formData.village}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={!formData.cell}
          >
            <option value="">
              {formData.cell ? 'Select Village' : 'First select a cell'}
            </option>
            {availableVillages.map((village) => (
              <option key={village} value={village}>{village}</option>
            ))}
          </select>
          {errors.village && <p className="text-red-600 text-sm mt-1">{errors.village}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address
        </label>
        <input
          type="text"
          name="street_address"
          value={formData.street_address}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., KG 15 Ave, Building No. 123"
        />
        {errors.street_address && <p className="text-red-600 text-sm mt-1">{errors.street_address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone *
          </label>
          <input
            type="tel"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+250 788 123 456"
            required
          />
          {errors.contact_phone && <p className="text-red-600 text-sm mt-1">{errors.contact_phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="info@school.rw"
            required
          />
          {errors.contact_email && <p className="text-red-600 text-sm mt-1">{errors.contact_email}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Curriculum Type *
          </label>
          <select
            name="curriculum_type"
            value={formData.curriculum_type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {curriculumTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.curriculum_type && <p className="text-red-600 text-sm mt-1">{errors.curriculum_type}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Language *
          </label>
          <select
            name="default_notification_language"
            value={formData.default_notification_language}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>
      </div>

      {formData.curriculum_type === 'other' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Other Curriculum Details
          </label>
          <textarea
            name="other_curriculum_details"
            value={formData.other_curriculum_details}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Please specify your curriculum type..."
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Year Start *
          </label>
          <input
            type="date"
            name="academic_year_start"
            value={formData.academic_year_start}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Year End *
          </label>
          <input
            type="date"
            name="academic_year_end"
            value={formData.academic_year_end}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Terms *
          </label>
          <select
            name="number_of_terms"
            value={formData.number_of_terms}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value={2}>2 Terms</option>
            <option value={3}>3 Terms</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Term *
          </label>
          <select
            name="current_term"
            value={formData.current_term}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value={1}>Term 1</option>
            <option value={2}>Term 2</option>
            <option value={3}>Term 3</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grading Scale Type *
        </label>
        <select
          name="grading_scale_type"
          value={formData.grading_scale_type}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="percentage">Percentage</option>
          <option value="letter_grades">Letter Grades</option>
          <option value="competency_based">Competency-Based</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          School Website
        </label>
        <input
          type="url"
          name="school_website"
          value={formData.school_website}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://www.yourschool.rw"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vision & Mission
        </label>
        <textarea
          name="vision_mission"
          value={formData.vision_mission}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your school's vision and mission statement..."
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Communication Settings</h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="sms_enabled"
              checked={formData.sms_enabled}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Enable SMS notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="whatsapp_enabled"
              checked={formData.whatsapp_enabled}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Enable WhatsApp notifications</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <User className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Administrator Account</h3>
            <p className="text-sm text-blue-700 mt-1">
              This account will have full access to manage your school. You can create additional admin accounts later.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="admin_first_name"
            value={formData.admin_first_name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {errors.admin_first_name && <p className="text-red-600 text-sm mt-1">{errors.admin_first_name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="admin_last_name"
            value={formData.admin_last_name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {errors.admin_last_name && <p className="text-red-600 text-sm mt-1">{errors.admin_last_name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="admin_email"
            value={formData.admin_email}
            onChange={handleInputChange}
            onBlur={(e) => checkAvailability('admin_email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {availability.admin_email === false && (
            <p className="text-red-600 text-sm mt-1">Email already exists</p>
          )}
          {availability.admin_email === true && (
            <p className="text-green-600 text-sm mt-1">Email available</p>
          )}
          {errors.admin_email && <p className="text-red-600 text-sm mt-1">{errors.admin_email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="admin_phone"
            value={formData.admin_phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+250 788 123 456"
            required
          />
          {errors.admin_phone && <p className="text-red-600 text-sm mt-1">{errors.admin_phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Username *
        </label>
        <input
          type="text"
          name="admin_username"
          value={formData.admin_username}
          onChange={handleInputChange}
          onBlur={(e) => checkAvailability('admin_username', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        {availability.admin_username === false && (
          <p className="text-red-600 text-sm mt-1">Username already exists</p>
        )}
        {availability.admin_username === true && (
          <p className="text-green-600 text-sm mt-1">Username available</p>
        )}
        {errors.admin_username && <p className="text-red-600 text-sm mt-1">{errors.admin_username}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="admin_password"
              value={formData.admin_password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.admin_password && <p className="text-red-600 text-sm mt-1">{errors.admin_password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="admin_confirm_password"
              value={formData.admin_confirm_password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {formData.admin_password !== formData.admin_confirm_password && formData.admin_confirm_password && (
            <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
          )}
          {errors.admin_confirm_password && <p className="text-red-600 text-sm mt-1">{errors.admin_confirm_password}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <School className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">ClassFlow</h2>
          </div>
        </div>
        <h3 className="mt-4 text-center text-lg text-gray-600">
          Register Your School
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {renderStepIndicator()}

          <form onSubmit={handleSubmit} className="space-y-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    Previous
                  </button>
                )}
              </div>

              <div className="flex space-x-4">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Registering...
                      </>
                    ) : (
                      'Register School'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolRegistration;
