import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UsersIcon, 
  ChartBarIcon, 
  GlobeAltIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600">RwandaClassFlow</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/about"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/features"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Features
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Transforming Education in{' '}
            <span className="text-indigo-600">Rwanda</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered educational management platform designed for Rwandan schools. 
            Supporting teachers, students, parents, and administrators with intelligent 
            features and multilingual support.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Language Support */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Available in:</p>
          <div className="flex justify-center space-x-6">
            <span className="text-gray-700 font-medium">English</span>
            <span className="text-gray-700 font-medium">Français</span>
            <span className="text-gray-700 font-medium">Kinyarwanda</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-gray-900">
              Empowering Educational Excellence
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive tools for modern education management
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <SparklesIcon className="h-12 w-12 text-indigo-600" />
              </div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">AI-Powered Grading</h4>
              <p className="mt-2 text-gray-600">
                Automated assignment grading with intelligent feedback generation
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <GlobeAltIcon className="h-12 w-12 text-indigo-600" />
              </div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">Multilingual Support</h4>
              <p className="mt-2 text-gray-600">
                Full support for English, French, and Kinyarwanda languages
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <UsersIcon className="h-12 w-12 text-indigo-600" />
              </div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">Multi-Role Access</h4>
              <p className="mt-2 text-gray-600">
                Tailored dashboards for teachers, students, parents, and administrators
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <AcademicCapIcon className="h-12 w-12 text-indigo-600" />
              </div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">Curriculum Management</h4>
              <p className="mt-2 text-gray-600">
                Comprehensive tools for managing Rwandan curriculum requirements
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <ChartBarIcon className="h-12 w-12 text-indigo-600" />
              </div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">Analytics & Reports</h4>
              <p className="mt-2 text-gray-600">
                Detailed performance analytics and progress tracking
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <ShieldCheckIcon className="h-12 w-12 text-indigo-600" />
              </div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">Secure & Compliant</h4>
              <p className="mt-2 text-gray-600">
                Enterprise-grade security with data privacy compliance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-white">
              Ready to Transform Your School?
            </h3>
            <p className="mt-4 text-lg text-indigo-100">
              Join schools across Rwanda in revolutionizing education with AI-powered tools
            </p>
            <div className="mt-8">
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 RwandaClassFlow. Transforming education across Rwanda.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
