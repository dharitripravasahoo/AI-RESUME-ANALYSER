# AI Resume Analyzer - Complete File Manifest

## Project Structure Overview

```
resume-analyzer/
├── backend/                          # Express.js Backend
│   ├── controllers/
│   │   ├── authController.js         # User authentication logic (register, login, getCurrentUser)
│   │   ├── resumeController.js       # Resume management (upload, get, delete)
│   │   └── analysisController.js     # Analysis operations (analyze, history, delete)
│   ├── middleware/
│   │   └── auth.js                   # JWT verification middleware
│   ├── models/
│   │   ├── User.js                   # User schema with password hashing
│   │   ├── Resume.js                 # Resume document schema
│   │   └── Analysis.js               # Analysis results schema
│   ├── routes/
│   │   ├── auth.js                   # Auth endpoints (register, login, me)
│   │   ├── resume.js                 # Resume endpoints with multer config
│   │   └── analysis.js               # Analysis endpoints
│   ├── utils/
│   │   ├── pdfParser.js              # PDF text extraction utility
│   │   └── aiAnalyzer.js             # Google Gemini API integration
│   ├── server.js                     # Express app initialization
│   ├── package.json                  # Backend dependencies
│   ├── package-lock.json             # Locked dependency versions
│   ├── .env                          # Environment variables (local)
│   └── .env.example                  # Environment template
│
├── frontend/                         # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Top navigation with theme toggle
│   │   │   ├── ResumeUpload.jsx      # Drag-drop PDF upload
│   │   │   ├── ResumeList.jsx        # Sidebar resume list
│   │   │   ├── AnalysisForm.jsx      # Job description form
│   │   │   ├── AnalysisResult.jsx    # Results display with progress
│   │   │   ├── AnalysisHistory.jsx   # Historical analyses view
│   │   │   └── ProtectedRoute.jsx    # Protected route wrapper
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Authentication context & provider
│   │   ├── hooks/
│   │   │   └── useTheme.js           # Dark mode theme hook
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   └── Dashboard.jsx         # Main dashboard
│   │   ├── services/
│   │   │   └── api.js                # Axios instance & API endpoints
│   │   ├── App.jsx                   # Main app with routing
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global Tailwind CSS styles
│   ├── public/                       # Static assets
│   ├── vite.config.js                # Vite build config with proxy
│   ├── tailwind.config.js            # Tailwind CSS theme config
│   ├── postcss.config.js             # PostCSS config
│   ├── eslint.config.js              # ESLint configuration
│   ├── package.json                  # Frontend dependencies
│   ├── package-lock.json             # Locked dependency versions
│   ├── .env                          # Frontend environment variables
│   └── index.html                    # HTML template
│
├── Documentation/
│   ├── README.md                     # Main project documentation
│   ├── QUICK_START.md                # Quick setup guide
│   ├── SETUP.md                      # Detailed setup instructions
│   ├── PROJECT_SUMMARY.md            # Architecture & technical details
│   ├── FILE_MANIFEST.md              # This file
│   └── .env.example files            # Environment templates
│
└── Configuration Files/
    ├── .gitignore                    # Git ignore rules
    ├── package.json (root)           # Root package metadata
    └── tsconfig.json                 # TypeScript config
```

## Backend Files Detail

### Server & Configuration
| File | Purpose |
|------|---------|
| `server.js` | Express app setup, middleware configuration, routes mounting |
| `package.json` | Dependencies, scripts, project metadata |
| `.env` | Environment variables (MongoDB, JWT, API keys) |

### Models (Database Schemas)
| File | Collections | Fields |
|------|-------------|--------|
| `models/User.js` | users | _id, name, email, password, timestamps |
| `models/Resume.js` | resumes | _id, userId, fileName, content, timestamps |
| `models/Analysis.js` | analysis | _id, userId, resumeId, jobDescription, matchScore, skills, improvements, timestamps |

### Controllers (Business Logic)
| File | Endpoints | Functions |
|------|-----------|-----------|
| `controllers/authController.js` | /api/auth/* | register, login, getCurrentUser |
| `controllers/resumeController.js` | /api/resumes/* | uploadResume, getUserResumes, getResumeById, deleteResume |
| `controllers/analysisController.js` | /api/analysis/* | analyzeResume, getUserAnalysis, getAnalysisById, deleteAnalysis |

### Routes
| File | Base Path | Verbs |
|------|-----------|-------|
| `routes/auth.js` | /api/auth | POST register, login; GET me |
| `routes/resume.js` | /api/resumes | POST upload; GET all, by id; DELETE |
| `routes/analysis.js` | /api/analysis | POST analyze; GET all, by id; DELETE |

### Utilities
| File | Purpose |
|------|---------|
| `utils/pdfParser.js` | Extract text from PDF files |
| `utils/aiAnalyzer.js` | Call Google Gemini API for analysis |

### Middleware
| File | Purpose |
|------|---------|
| `middleware/auth.js` | JWT token verification for protected routes |

## Frontend Files Detail

### Pages (Full Page Components)
| File | Route | Purpose |
|------|-------|---------|
| `pages/Home.jsx` | / | Landing page with features overview |
| `pages/Login.jsx` | /login | User login form |
| `pages/Register.jsx` | /register | User registration form |
| `pages/Dashboard.jsx` | /dashboard | Main application interface |

### Components (Reusable)
| File | Purpose | Props |
|------|---------|-------|
| `components/Navbar.jsx` | Top navigation bar | None (uses context) |
| `components/ResumeUpload.jsx` | File upload interface | onUpload callback |
| `components/ResumeList.jsx` | Resume sidebar | resumes, selectedResume, callbacks |
| `components/AnalysisForm.jsx` | Job description form | selectedResume, resumes, callbacks |
| `components/AnalysisResult.jsx` | Results display | analysis object |
| `components/AnalysisHistory.jsx` | History view | analyses array |
| `components/ProtectedRoute.jsx` | Route protection | children component |

### State Management
| File | Purpose |
|------|---------|
| `context/AuthContext.jsx` | Authentication state & methods |
| `hooks/useTheme.js` | Theme toggle state |

### Services
| File | Purpose |
|------|---------|
| `services/api.js` | Axios instance with all API endpoints |

### Configuration
| File | Purpose |
|------|---------|
| `vite.config.js` | Vite build config with API proxy |
| `tailwind.config.js` | Tailwind CSS theme customization |
| `postcss.config.js` | PostCSS processing config |
| `App.jsx` | Main component with routing setup |
| `main.jsx` | React DOM render entry point |
| `index.css` | Global Tailwind CSS import |

## File Count Summary

### Backend
- **Controllers**: 3 files
- **Models**: 3 files
- **Routes**: 3 files
- **Middleware**: 1 file
- **Utils**: 2 files
- **Configuration**: 3 files (server.js, package.json, .env)
- **Total Backend Files**: 15

### Frontend
- **Pages**: 4 files
- **Components**: 7 files
- **Context**: 1 file
- **Hooks**: 1 file
- **Services**: 1 file
- **Configuration**: 5 files
- **Total Frontend Files**: 19

### Documentation
- README.md
- QUICK_START.md
- SETUP.md
- PROJECT_SUMMARY.md
- FILE_MANIFEST.md (this file)
- **Total Documentation Files**: 5

## Dependencies Overview

### Backend Dependencies
```json
{
  "axios": "^1.18.0",           // HTTP client
  "bcryptjs": "^3.0.3",         // Password hashing
  "cors": "^2.8.6",             // Cross-origin support
  "dotenv": "^17.4.2",          // Environment variables
  "express": "^5.2.1",          // Web framework
  "jsonwebtoken": "^9.0.3",     // JWT tokens
  "jwt-decode": "^4.0.0",       // JWT decoding
  "mongoose": "^9.7.1",         // MongoDB ODM
  "multer": "^2.2.0",           // File uploads
  "pdf-parse": "^2.4.5"         // PDF parsing
}
```

### Frontend Dependencies
```json
{
  "axios": "^1.18.0",           // HTTP client
  "react": "^19.2.6",           // UI library
  "react-dom": "^19.2.6",       // DOM rendering
  "react-router-dom": "^7.18.0" // Routing
}
```

### Frontend Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^6.0.1",
  "tailwindcss": "^4.3.1",
  "autoprefixer": "^10.5.0",
  "postcss": "^8.5.15",
  "vite": "^8.0.12",
  "eslint": "^10.3.0"
}
```

## Environment Variables Required

### Backend (.env)
```
PORT                  # Server port (default: 5000)
MONGODB_URI          # MongoDB connection string
JWT_SECRET           # JWT signing secret
GEMINI_API_KEY       # Google Gemini API key
NODE_ENV             # Environment (development/production)
```

### Frontend (.env)
```
VITE_API_URL         # Backend API base URL
```

## API Endpoints Summary

### Authentication (5 endpoints)
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Current user

### Resumes (4 endpoints)
- POST `/api/resumes/upload` - Upload
- GET `/api/resumes` - List all
- GET `/api/resumes/:id` - Get one
- DELETE `/api/resumes/:id` - Delete

### Analysis (4 endpoints)
- POST `/api/analysis/analyze` - Analyze
- GET `/api/analysis` - List all
- GET `/api/analysis/:id` - Get one
- DELETE `/api/analysis/:id` - Delete

**Total API Endpoints**: 13

## Database Collections

| Collection | Purpose | Indexes |
|-----------|---------|---------|
| users | Store user accounts | email (unique) |
| resumes | Store uploaded resumes | userId, uploadedAt |
| analysis | Store analysis results | userId, analyzedAt |

## Build & Deployment Files

### Build Outputs (not in repo)
- `backend/uploads/` - Temporary uploaded PDFs
- `frontend/dist/` - Built frontend assets

### Configuration Files in Root
- `.gitignore` - Git exclusions
- `package.json` - Root metadata
- `tsconfig.json` - TypeScript config

## File Statistics

| Category | Count |
|----------|-------|
| Component Files | 11 |
| API Routes | 3 |
| Models | 3 |
| Controllers | 3 |
| Pages | 4 |
| Config Files | 8 |
| Utility Files | 2 |
| Documentation | 5 |
| **TOTAL** | **39** |

## Important Notes

### Backend Files to Modify
- `.env` - Add your API keys and MongoDB URI
- `server.js` - If you need to add new features
- Controllers - To modify business logic

### Frontend Files to Modify
- `.env` - If backend URL changes
- `tailwind.config.js` - For design changes
- Components - For UI modifications

### Do Not Modify
- `node_modules/` - Auto-generated
- `package-lock.json` - Auto-generated
- Build output files

## File Size Considerations

### Largest Files (Backend)
1. `controllers/analysisController.js` - ~132 lines
2. `controllers/resumeController.js` - ~124 lines
3. `server.js` - ~57 lines

### Largest Files (Frontend)
1. `components/AnalysisResult.jsx` - ~151 lines
2. `pages/Dashboard.jsx` - ~175 lines
3. `pages/Home.jsx` - ~157 lines

## Quick File Lookup

### "How do I...?"

**...add a new API endpoint?**
→ Create in controllers/, then add route

**...change the theme colors?**
→ Edit tailwind.config.js colors section

**...add authentication to a route?**
→ Use middleware/auth.js in routes

**...modify resume upload limit?**
→ Edit controllers/resumeController.js

**...change the landing page?**
→ Edit pages/Home.jsx

**...add a new database field?**
→ Update models/ schema and controller

## Deployment Checklist

### Files to Review Before Deploy
- [ ] backend/.env - Production values
- [ ] frontend/.env - Production API URL
- [ ] package.json - Correct versions
- [ ] README.md - Accurate instructions
- [ ] Security settings - JWT secret, CORS

### Files to Backup
- [ ] All .env files
- [ ] MongoDB database
- [ ] Uploaded resumes (if stored locally)

---

**Generated**: June 2026  
**Version**: 1.0.0  
**Total Files**: 39+
