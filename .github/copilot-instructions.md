<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# RwandaClassFlow Development Instructions

## Project Overview
RwandaClassFlow is an AI-powered educational management SaaS platform designed for Rwandan schools. The platform serves teachers, students, parents, and school administrators with features including automated grading, multilingual support, and intelligent recommendations.

## Architecture Guidelines

### Backend (Django)
- Use Django REST Framework for API development
- Implement multi-tenant architecture for school isolation
- Follow Django best practices for models, views, and serializers
- Use PostgreSQL for relational data and Redis for caching
- Implement proper authentication and authorization
- Support for multiple languages (English, French, Kinyarwanda)

### Frontend (React)
- Use TypeScript for type safety
- Implement responsive design for mobile and desktop
- Create separate portals for Teachers, Students, Parents, and Administrators
- Use React Router for navigation
- Implement proper state management with Context API or Redux
- Follow accessibility guidelines

### AI Service
- Separate microservice for AI/ML operations
- OCR capabilities for handwritten assignment processing
- NLP for automated grading and feedback generation
- Voice transcription services
- Recommendation engine for educational resources

### Database Design
- Multi-tenant schema design
- Proper indexing for performance
- Data privacy and security compliance
- Support for curriculum-specific data structures

## Development Standards
- Write clean, readable, and well-documented code
- Follow PEP 8 for Python code
- Use ESLint and Prettier for JavaScript/TypeScript
- Implement comprehensive error handling
- Write unit and integration tests
- Use environment variables for configuration
- Implement proper logging

## Security Requirements
- Implement role-based access control (RBAC)
- Encrypt sensitive data at rest and in transit
- Follow OWASP security guidelines
- Implement proper input validation and sanitization
- Use secure authentication mechanisms

## Performance Guidelines
- Optimize database queries
- Implement caching strategies
- Use pagination for large datasets
- Optimize image processing for assignment uploads
- Implement rate limiting for APIs

## Localization
- Support for Kinyarwanda, English, and French
- Use Django's internationalization framework
- Implement RTL support where needed
- Consider cultural context in UI/UX design
