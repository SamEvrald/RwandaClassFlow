# RwandaClassFlow - AI-Powered Educational Management Platform

RwandaClassFlow is a comprehensive, AI-powered Software-as-a-Service (SaaS) platform designed specifically for Rwandan schools. It streamlines educational management, enhances teacher productivity, and improves parent-student engagement through intelligent automation.

## 🚀 Features

### For Teachers
- **AI-Assisted Grading**: Upload photos of assignments for automatic OCR and intelligent grading
- **Voice Feedback**: Record voice notes that are automatically transcribed
- **Student Management**: Comprehensive grade, attendance, and behavior tracking
- **Multi-language Support**: English, French, and Kinyarwanda

### For Students
- **Personalized Dashboard**: View grades, feedback, and progress
- **AI-Powered Recommendations**: Get customized learning resources based on performance
- **Goal Tracking**: Set and monitor academic goals

### For Parents
- **Real-time Notifications**: Instant updates via SMS or app notifications
- **AI-Suggested Remedial Programs**: Personalized catch-up recommendations
- **Direct Communication**: Secure messaging with teachers and school administration

### For School Administrators
- **School Profile Management**: Configure curriculum, grading scales, and school information
- **User Management**: Bulk import and manage teachers, students, and parents
- **Analytics Dashboard**: Comprehensive performance and operational insights

## 🏗️ Architecture

The platform consists of four main services:

1. **Backend API** (Django REST Framework)
2. **Frontend** (React with TypeScript)
3. **AI Service** (Flask with OCR and NLP capabilities)
4. **Database** (PostgreSQL with Redis for caching)

## 📋 Prerequisites

- Docker and Docker Compose
- Git

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd classflow
   ```

2. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

3. **Build and run with Docker**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - AI Service: http://localhost:8001
   - API Documentation: http://localhost:8000/api/docs/

## 🛠️ Development Setup

### Backend Development

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Development

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

### AI Service Development

1. **Navigate to ai_service directory**
   ```bash
   cd ai_service
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the service**
   ```bash
   python app.py
   ```

## 📊 Database Schema

The platform uses a multi-tenant architecture with the following key models:

- **School**: Central entity for multi-tenancy
- **User**: Custom user model with role-based access
- **Teacher/Student/Parent**: Extended user profiles
- **Class/Subject**: Academic structure management
- **Assignment/Grade**: Academic performance tracking
- **Attendance/BehaviorNote**: Student monitoring

## 🔧 Configuration

### School Setup Flow

1. Developer creates initial school admin account
2. School admin completes school profile setup
3. Admin uploads user data via CSV
4. System generates login credentials
5. Users complete first-time login and password change

### Multi-language Support

The platform supports three languages:
- English (en)
- French (fr) 
- Kinyarwanda (rw)

### AI Configuration

The AI service provides:
- OCR for handwritten assignments
- Automated grading suggestions
- Personalized feedback generation
- Voice transcription capabilities

## 🔐 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Data encryption at rest and in transit
- Input validation and sanitization
- CORS protection

## 📱 Mobile Responsiveness

The frontend is fully responsive and optimized for:
- Desktop browsers
- Tablets
- Mobile devices
- SMS integration for feature phones

## 🚀 Production Deployment

### Environment Variables

Set the following environment variables for production:

```bash
DEBUG=False
SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=your-domain.com
DB_HOST=your-database-host
REDIS_URL=your-redis-url
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 API Documentation

Interactive API documentation is available at:
- Development: http://localhost:8000/api/docs/
- Swagger UI with full endpoint documentation
- Authentication examples and schemas

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🌍 About Rwanda

This platform is designed specifically for the Rwandan educational context, supporting the local curriculum (CBC), languages, and educational practices. It aims to contribute to Rwanda's vision of becoming a knowledge-based economy through improved educational outcomes.

---

**RwandaClassFlow** - Empowering Educators, Engaging Students, and Enlightening Parents
