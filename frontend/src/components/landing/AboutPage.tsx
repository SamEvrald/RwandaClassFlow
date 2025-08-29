import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About RwandaClassFlow</h1>
          
          <div className="prose prose-lg text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p>
                RwandaClassFlow is dedicated to transforming education across Rwanda through 
                innovative AI-powered technology. We believe that every student deserves access 
                to quality education, and every teacher should have the tools they need to 
                inspire and educate effectively.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Built for Rwanda</h2>
              <p>
                Our platform is specifically designed to meet the unique needs of the Rwandan 
                education system. From supporting the national curriculum to providing 
                multilingual capabilities in English, French, and Kinyarwanda, every feature 
                is crafted with Rwandan schools in mind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>AI-Powered Grading:</strong> Intelligent assessment and feedback generation</li>
                <li><strong>Multilingual Support:</strong> Full platform availability in three languages</li>
                <li><strong>Role-Based Access:</strong> Customized experiences for all stakeholders</li>
                <li><strong>Curriculum Alignment:</strong> Aligned with Rwandan educational standards</li>
                <li><strong>Analytics & Insights:</strong> Data-driven decision making tools</li>
                <li><strong>Communication Hub:</strong> Enhanced parent-teacher-student communication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who We Serve</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Teachers</h3>
                  <p className="text-blue-700 mt-2">
                    Streamlined assignment management, automated grading, and intelligent 
                    insights to enhance teaching effectiveness.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900">Students</h3>
                  <p className="text-green-700 mt-2">
                    Interactive learning experiences, instant feedback, and personalized 
                    learning paths to maximize academic success.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900">Parents</h3>
                  <p className="text-purple-700 mt-2">
                    Real-time visibility into student progress, easy communication with 
                    teachers, and comprehensive performance reports.
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900">Administrators</h3>
                  <p className="text-orange-700 mt-2">
                    School-wide analytics, resource management, and comprehensive 
                    oversight tools for effective leadership.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
              <p>
                We are committed to supporting Rwanda's Vision 2050 by providing world-class 
                educational technology that enhances learning outcomes, reduces teacher workload, 
                and empowers students to reach their full potential. Our platform grows with 
                your school's needs, ensuring sustainable educational excellence.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
