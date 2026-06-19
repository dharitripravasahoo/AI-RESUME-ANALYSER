import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeAPI, analysisAPI } from '../services/api';
import { ResumeUpload } from '../components/ResumeUpload';
import { ResumeList } from '../components/ResumeList';
import { AnalysisForm } from '../components/AnalysisForm';
import { AnalysisResult } from '../components/AnalysisResult';
import { AnalysisHistory } from '../components/AnalysisHistory';

export const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      fetchResumes();
      fetchAnalyses();
    }
  }, [user]);

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getAll();
      setResumes(response.data.resumes || []);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const fetchAnalyses = async () => {
    try {
      const response = await analysisAPI.getAll();
      setAnalyses(response.data.analyses || []);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    }
  };

  const handleResumeUpload = (newResume) => {
    setResumes([newResume, ...resumes]);
    setSelectedResume(newResume);
    setActiveTab('analyze');
  };

  const handleAnalysisComplete = (analysis) => {
    setCurrentAnalysis(analysis);
    setAnalyses([analysis, ...analyses]);
    setActiveTab('results');
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      await resumeAPI.delete(resumeId);
      setResumes(resumes.filter((r) => r.id !== resumeId));
      if (selectedResume?.id === resumeId) {
        setSelectedResume(null);
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Upload your resume and analyze it against job descriptions
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'upload'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            Upload Resume
          </button>
          <button
            onClick={() => setActiveTab('analyze')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'analyze'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            Analyze
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            History
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === 'upload' && (
              <ResumeUpload onUpload={handleResumeUpload} />
            )}

            {activeTab === 'analyze' && (
              <AnalysisForm
                selectedResume={selectedResume}
                resumes={resumes}
                onResumeSelect={setSelectedResume}
                onAnalysisComplete={handleAnalysisComplete}
              />
            )}

            {activeTab === 'results' && currentAnalysis && (
              <AnalysisResult analysis={currentAnalysis} />
            )}

            {activeTab === 'history' && (
              <AnalysisHistory analyses={analyses} />
            )}
          </div>

          {/* Sidebar - Resume List */}
          <div>
            <ResumeList
              resumes={resumes}
              selectedResume={selectedResume}
              onSelect={setSelectedResume}
              onDelete={handleDeleteResume}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
