import { useState } from 'react';
import { analysisAPI } from '../services/api';
import { AnalysisResult } from './AnalysisResult';

export const AnalysisHistory = ({ analyses: initialAnalyses }) => {
  const [analyses, setAnalyses] = useState(initialAnalyses);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMatchColor = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
    return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
  };

  const handleDelete = async (analysisId) => {
    if (!window.confirm('Are you sure you want to delete this analysis?')) {
      return;
    }

    try {
      await analysisAPI.delete(analysisId);
      setAnalyses(analyses.filter((a) => a._id !== analysisId));
      if (selectedAnalysis?._id === analysisId) {
        setSelectedAnalysis(null);
      }
    } catch (error) {
      console.error('Error deleting analysis:', error);
    }
  };

  if (selectedAnalysis) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedAnalysis(null)}
          className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          ← Back to History
        </button>
        <AnalysisResult analysis={selectedAnalysis} />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Analysis History
      </h2>

      {analyses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No analyses yet. Start by analyzing a resume!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis._id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md dark:hover:shadow-slate-700/50 transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 cursor-pointer" onClick={() => setSelectedAnalysis(analysis)}>
                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-lg font-bold text-sm ${getMatchColor(analysis.matchScore)}`}>
                      {analysis.matchScore}%
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {analysis.resumeId?.fileName || 'Resume'}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {analysis.jobDescription?.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(analysis.analyzedAt)}
                  </span>
                  <button
                    onClick={() => setSelectedAnalysis(analysis)}
                    className="px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors font-medium text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(analysis._id)}
                    className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
