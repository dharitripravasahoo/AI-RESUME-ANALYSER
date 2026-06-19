# AI Resume Analyzer - MERN Stack

A modern, responsive web application that analyzes resumes using AI-powered insights. Upload your PDF resume, compare it with job descriptions, and get AI-powered suggestions for improvement.

## Features

- **PDF Resume Upload**: Upload resumes in PDF format with secure file handling
- **AI-Powered Analysis**: Leverage Google Gemini API for intelligent resume analysis
- **Job Matching**: Calculate resume-job description match scores
- **Skill Detection**: Identify matched and missing skills
- **Smart Suggestions**: Get AI-powered improvement recommendations
- **Analysis History**: Save and revisit previous analyses
- **Dark Mode**: Comfortable viewing experience with built-in dark mode
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **User Authentication**: Secure email/password authentication with JWT

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js + Express** - Server
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **PDF-Parse** - PDF text extraction
- **Google Gemini API** - AI analysis

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or cloud)
- Google Gemini API key

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
cp .env.example .env

# Edit .env and add your credentials
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: A secure random string (e.g., openssl rand -base64 32)
# - GEMINI_API_KEY: Your Google Gemini API key
# - PORT: Server port (default: 5000)

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The VITE_API_URL should point to your backend
# Default: http://localhost:5000/api

# Start the frontend development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Getting API Keys

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key
4. Copy and paste into your `.env` file

## Project Structure

### Backend
```
backend/
├── models/          # Database schemas (User, Resume, Analysis)
├── controllers/     # Request handlers
├── routes/          # API routes
├── middleware/      # Auth and other middleware
├── utils/           # Helper functions (PDF parsing, AI analysis)
├── server.js        # Express server setup
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── context/      # React context (Auth)
│   ├── hooks/        # Custom hooks (useTheme)
│   ├── services/     # API service calls
│   ├── App.jsx       # Main app component
│   └── index.css     # Global styles
├── vite.config.js
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Resumes
- `POST /api/resumes/upload` - Upload PDF resume (protected)
- `GET /api/resumes` - Get user's resumes (protected)
- `GET /api/resumes/:id` - Get specific resume (protected)
- `DELETE /api/resumes/:id` - Delete resume (protected)

### Analysis
- `POST /api/analysis/analyze` - Analyze resume (protected)
- `GET /api/analysis` - Get user's analyses (protected)
- `GET /api/analysis/:id` - Get specific analysis (protected)
- `DELETE /api/analysis/:id` - Delete analysis (protected)

## Usage

1. **Sign Up**: Create a new account with email and password
2. **Upload Resume**: Go to Dashboard > Upload Resume and select your PDF file
3. **Select Resume**: Your uploaded resumes appear in the sidebar
4. **Analyze**: Go to Dashboard > Analyze, paste a job description, and click "Analyze Resume"
5. **View Results**: See match score, matched skills, missing skills, and AI suggestions
6. **History**: Access previous analyses in the History tab

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume_analyzer
JWT_SECRET=your_secure_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Database Schema

### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Resumes
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  fileName: String,
  content: String (extracted text),
  uploadedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Analysis
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  resumeId: ObjectId (ref: Resume),
  jobDescription: String,
  matchScore: Number (0-100),
  matchedSkills: [String],
  missingSkills: [String],
  improvements: String,
  summary: String,
  analyzedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Features in Detail

### Resume Upload
- Supports PDF files up to 10MB
- Automatic text extraction from PDF
- Stored securely in MongoDB

### AI Analysis
- Uses Google Gemini Pro API
- Analyzes resume content against job description
- Identifies key skills and experience
- Generates improvement suggestions

### Match Score Calculation
- 80-100%: Excellent fit
- 60-79%: Good match
- Below 60%: Needs improvement

### Dark Mode
- Automatic theme detection based on system preferences
- Manual toggle in navbar
- Persistent theme selection in localStorage

## Development

### Running in Development Mode

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Building for Production

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or provide correct connection string
- Check `MONGODB_URI` in `.env`

### API Key Issues
- Verify Google Gemini API key is valid
- Check API key has necessary permissions
- Ensure API is enabled in Google Cloud Console

### File Upload Issues
- Ensure PDF file is not corrupted
- Check file size (max 10MB)
- Verify `uploads/` directory exists in backend

### Dark Mode Not Working
- Clear browser localStorage
- Hard refresh (Ctrl+F5 or Cmd+Shift+R)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue in the repository or contact the development team.

## Future Enhancements

- [ ] Multiple resume comparison
- [ ] Resume formatting suggestions
- [ ] LinkedIn profile integration
- [ ] Resume templates
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] OAuth authentication (Google, GitHub)
- [ ] Export analysis reports as PDF
