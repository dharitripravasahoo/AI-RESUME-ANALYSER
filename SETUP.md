# Quick Setup Guide - AI Resume Analyzer

Follow these steps to get the AI Resume Analyzer running on your machine.

## Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB running locally or a MongoDB Atlas connection string
- Google Gemini API key

## Step 1: Get Your API Key

### Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key

## Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume_analyzer
JWT_SECRET=$(openssl rand -base64 32)
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
EOF

# Update GEMINI_API_KEY with your actual key
# Edit .env file and replace 'your_gemini_api_key_here' with your actual key

# Create uploads directory
mkdir -p uploads

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

## Step 3: Setup Frontend (in a new terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Step 4: Open in Browser

Visit `http://localhost:5173` in your web browser.

## Step 5: Create Account & Test

1. Click "Sign Up" or "Get Started Free"
2. Create an account with email and password
3. Upload a resume (PDF format)
4. Copy and paste a job description
5. Click "Analyze Resume"
6. View your results!

## MongoDB Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB Community Edition
# Follow: https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `MONGODB_URI` in `.env` with your connection string

## Troubleshooting

### "Cannot find module 'express'"
```bash
cd backend
npm install
```

### "MongoDB connection refused"
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For MongoDB Atlas, whitelist your IP address

### "API key not found"
- Verify `GEMINI_API_KEY` is set in `.env`
- Check the key is valid at Google AI Studio
- Regenerate the key if needed

### "Port already in use"
- Change `PORT` in backend `.env` to different port (e.g., 5001)
- Update `VITE_API_URL` in frontend `.env` accordingly

### Frontend shows "Cannot connect to API"
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in backend
- Verify `VITE_API_URL` in frontend `.env`

## Features to Try

1. **Upload Multiple Resumes**: Upload different versions of your resume
2. **Compare Jobs**: Analyze your resume against different job descriptions
3. **View History**: Check previous analyses
4. **Dark Mode**: Click the moon icon in the navbar
5. **Delete Data**: Remove old resumes and analyses

## File Upload Limits
- Maximum file size: 10MB
- Supported format: PDF only
- Max resumes per user: Unlimited

## API Testing

You can test the API endpoints using curl or Postman:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Performance Tips

1. **Database Indexing**: MongoDB automatically indexes `_id`, but consider adding indexes for `userId` and `email`
2. **API Rate Limiting**: Consider adding rate limiting for production
3. **File Compression**: PDFs are stored as text, so large files won't significantly impact storage

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in backend `.env`
2. Use strong `JWT_SECRET` (generate with: `openssl rand -base64 32`)
3. Enable HTTPS
4. Use MongoDB Atlas with encryption
5. Set up environment variables on your hosting platform
6. Build frontend: `npm run build`
7. Serve from a static host or deploy as serverless function

## Next Steps

- Customize styling in `frontend/tailwind.config.js`
- Add more AI features to the analysis
- Implement user profile customization
- Add email notifications
- Set up automated backups for MongoDB

## Support

For issues or questions, refer to the main README.md or check the official documentation:
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [MongoDB](https://docs.mongodb.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
