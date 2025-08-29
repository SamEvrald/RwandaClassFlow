import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  SparklesIcon,
  GlobeAltIcon,
  UsersIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  CameraIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: "AI-Powered Grading",
      description: "Automated assignment grading with intelligent feedback generation and plagiarism detection.",
      details: [
        "Handwritten text recognition (OCR)",
        "Intelligent scoring algorithms",
        "Personalized feedback generation",
        "Multi-language support for grading"
      ]
    },
    {
      icon: GlobeAltIcon,
      title: "Multilingual Platform",
      description: "Complete platform support in English, French, and Kinyarwanda languages.",
      details: [
        "Dynamic language switching",
        "Localized content and interfaces",
        "Cultural context awareness",
        "Language-specific educational resources"
      ]
    },
    {
      icon: UsersIcon,
      title: "Role-Based Dashboards",
      description: "Customized experiences for teachers, students, parents, and administrators.",
      details: [
        "Teacher: Class management and grading tools",
        "Student: Assignment tracking and progress monitoring",
        "Parent: Real-time progress updates and communication",
        "Admin: School-wide analytics and management"
      ]
    },
    {
      icon: AcademicCapIcon,
      title: "Curriculum Management",
      description: "Comprehensive tools aligned with Rwandan educational standards and curriculum.",
      details: [
        "National curriculum alignment",
        "Subject-specific content organization",
        "Learning objective tracking",
        "Competency-based assessment"
      ]
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics",
      description: "Data-driven insights for improved educational outcomes and decision making.",
      details: [
        "Student performance analytics",
        "Class and school-wide reports",
        "Predictive learning insights",
        "Custom report generation"
      ]
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Communication Hub",
      description: "Enhanced communication between teachers, students, and parents.",
      details: [
        "Real-time messaging system",
        "Announcement broadcasts",
        "Parent-teacher conference scheduling",
        "Multi-language communication support"
      ]
    },
    {
      icon: DocumentTextIcon,
      title: "Assignment Management",
      description: "Streamlined assignment creation, distribution, and collection processes.",
      details: [
        "Digital assignment distribution",
        "Multiple submission formats",
        "Deadline tracking and reminders",
        "Collaborative assignment features"
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "Security & Privacy",
      description: "Enterprise-grade security with comprehensive data protection compliance.",
      details: [
        "End-to-end encryption",
        "Role-based access control",
        "Data privacy compliance",
        "Regular security audits"
      ]
    },
    {
      icon: ClockIcon,
      title: "Attendance Tracking",
      description: "Automated attendance management with real-time notifications.",
      details: [
        "Digital attendance recording",
        "Absence pattern analysis",
        "Parent notifications",
        "Attendance report generation"
      ]
    },
    {
      icon: CameraIcon,
      title: "Document Processing",
      description: "Advanced OCR technology for processing handwritten assignments and documents.",
      details: [
        "Handwriting recognition",
        "Document digitization",
        "Image enhancement",
        "Batch processing capabilities"
      ]
    },
    {
      icon: SpeakerWaveIcon,
      title: "Voice Transcription",
      description: "Voice-to-text capabilities for accessibility and enhanced learning experiences.",
      details: [
        "Multi-language voice recognition",
        "Audio assignment submissions",
        "Accessibility features",
        "Voice feedback options"
      ]
    },
    {
      icon: AcademicCapIcon,
      title: "Recommendation Engine",
      description: "AI-powered recommendations for educational resources and learning paths.",
      details: [
        "Personalized learning recommendations",
        "Resource suggestions",
        "Study plan optimization",
        "Performance improvement insights"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-700">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                <span className="text-2xl font-bold">RwandaClassFlow</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/about"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Powerful Features for Modern Education</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Discover how RwandaClassFlow's comprehensive suite of AI-powered tools can 
            transform your educational experience and improve learning outcomes.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <feature.icon className="h-8 w-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-sm text-gray-500 flex items-start">
                    <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join schools across Rwanda in revolutionizing education with our comprehensive platform.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
