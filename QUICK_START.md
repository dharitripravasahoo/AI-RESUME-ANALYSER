# AI Resume Analyzer - Quick Start Guide

Get your AI Resume Analyzer running in minutes!

## One-Time Setup

### 1. Get Google Gemini API Key 
- Visit: https://makersuite.google.com/app/apikey
- Click "Create API Key"
- Copy the key

### 2. Setup Backend

```bash
cd backend
npm install

# Create and configure .env
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume_analyzer
JWT_SECRET=my_super_secret_key_$(date +%s)
GEMINI_API_KEY=PASTE_YOUR_GOOGLE_KEY_HERE
NODE_ENV=development
EOF

mkdir -p uploads
npm run dev
```

**Backend will run on**: http://localhost:5000

### 3. Setup Frontend (new terminal)

```bash
cd frontend
npm install

# Create .env
echo "VITE_API_URL=http://localhost:5000/api" > .env

npm run dev
```

**Frontend will run on**: http://localhost:5173

## Daily Usage

### To Start Working
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev
```

### Access Application
Open browser: http://localhost:5173

## Key URLs

| Component | URL |
|-----------|-----|
| Web App | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |

## Common Tasks

### Upload & Analyze Resume

1. **Create Account**
   - Click "Get Started Free" or "Sign Up"
   - Enter name, email, password
   - Click "Create Account"

2. **Upload Resume**
   - Go to Dashboard → Upload Resume
   - Drag & drop or click to select PDF
   - Max 10MB, PDF only

3. **Analyze**
   - Go to Dashboard → Analyze
   - Select your resume
   - Paste job description
   - Click "Analyze Resume"

4. **View Results**
   - Match score (0-100%)
   - Matched skills (green)
   - Missing skills (orange)
   - AI suggestions

### View History
- Dashboard → History
- Click "View" on any analysis
- Click "Delete" to remove

### Switch Theme
- Click moon/sun icon in top-right
- Preference saved automatically

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is free
lsof -i :5000

# If in use, change PORT in .env to 5001
# Then update VITE_API_URL in frontend/.env
```

### MongoDB connection error
```bash
# Ensure MongoDB is running
mongod

# Or use MongoDB Atlas connection string in MONGODB_URI
```

### API key errors
```bash
# Verify key in backend/.env
cat backend/.env | grep GEMINI_API_KEY

# Make sure it's valid at: https://makersuite.google.com/app/apikey
```

### Frontend can't connect to API
```bash
# Ensure backend is running on http://localhost:5000
# Ensure VITE_API_URL is correct in frontend/.env
# Check browser console for exact error
```

### File upload fails
```bash
# Ensure uploads directory exists
mkdir -p backend/uploads

# Check file is valid PDF, under 10MB
```

## API Testing

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"password123"
  }'
```

### Get Current User (replace TOKEN)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## File Structure Quick Reference

```
project/
├── backend/              # Node.js + Express
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── utils/           # Helpers (PDF, AI)
│   ├── server.js        # Main server
│   └── .env             # Config
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Full pages
│   │   ├── context/     # Auth state
│   │   ├── services/    # API calls
│   │   └── App.jsx      # Main app
│   ├── vite.config.js   # Build config
│   ├── tailwind.config.js
│   └── .env             # Frontend config
├── README.md            # Full documentation
├── SETUP.md             # Detailed setup
└── PROJECT_SUMMARY.md   # Architecture & details
```

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000                                           # Server port
MONGODB_URI=mongodb://localhost:27017/resume_analyzer  # DB connection
JWT_SECRET=your_secret_key_here                   # Token secret
GEMINI_API_KEY=your_google_key_here               # AI API key
NODE_ENV=development                               # Environment
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api            # Backend URL
```

## Feature Overview

| Feature | Status | Location |
|---------|--------|----------|
| User Auth | ✅ | Login/Register Pages |
| Resume Upload | ✅ | Dashboard → Upload |
| PDF Parsing | ✅ | Backend → pdf-parse |
| AI Analysis | ✅ | Dashboard → Analyze |
| Results Display | ✅ | Dashboard → Results |
| History | ✅ | Dashboard → History |
| Dark Mode | ✅ | Navbar Toggle |
| Mobile Ready | ✅ | Tailwind CSS |

## Performance Tips

1. **Clear Browser Cache**: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
2. **Hard Refresh**: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
3. **Check Network**: Open DevTools → Network tab
4. **Monitor Backend**: Check backend console for errors

## What to Do Next

- [ ] Create test account
- [ ] Upload sample resume
- [ ] Try AI analysis
- [ ] View results and history
- [ ] Explore dark mode
- [ ] Read full documentation

## External Resources

- [Express.js Docs](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Guide](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Axios Docs](https://axios-http.com/)

## Need Help?

1. Check `/backend/.env` exists and configured
2. Verify MongoDB is running
3. Confirm Google API key is valid
4. Look in browser console for errors
5. Check backend terminal for logs
6. See full docs in README.md or PROJECT_SUMMARY.md

## Production Ready?

See PROJECT_SUMMARY.md → "Deployment Considerations" section

---

**Version**: 1.0.0  
**Status**: Ready to Use  
**Last Updated**: June 2026
