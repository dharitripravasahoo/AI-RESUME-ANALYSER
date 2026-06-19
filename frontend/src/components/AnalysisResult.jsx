export const AnalysisResult = ({ analysis }) => {
  const getMatchColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getMatchBgColor = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const CircularProgress = ({ score }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg width="130" height="130" className="transform -rotate-90">
          <circle
            cx="65"
            cy="65"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx="65"
            cy="65"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${getMatchColor(score)} transition-all duration-500`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getMatchColor(score)}`}>
            {score}%
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400">Match</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Match Score Card */}
      <div
        className={`rounded-lg shadow-lg p-8 transition-colors duration-200 ${getMatchBgColor(
          analysis.matchScore
        )}`}
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Analysis Results
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <CircularProgress score={analysis.matchScore} />
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Overall Summary
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700/30 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Score Interpretation:</strong>
              </p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2 space-y-1">
                <li>• 80-100: Excellent fit</li>
                <li>• 60-79: Good match</li>
                <li>• Below 60: Needs improvement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Matched Skills */}
      {analysis.matchedSkills && analysis.matchedSkills.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-2">✓</span>
            Matched Skills ({analysis.matchedSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.matchedSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium border border-green-300 dark:border-green-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {analysis.missingSkills && analysis.missingSkills.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-2">!</span>
            Missing Skills ({analysis.missingSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium border border-orange-300 dark:border-orange-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {analysis.improvements && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            AI Improvement Suggestions
          </h3>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {analysis.improvements}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
