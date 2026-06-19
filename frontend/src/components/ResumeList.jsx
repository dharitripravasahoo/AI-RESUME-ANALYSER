export const ResumeList = ({ resumes, selectedResume, onSelect, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Your Resumes
      </h3>

      {resumes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-400">
            No resumes uploaded yet
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              onClick={() => onSelect(resume)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedResume?.id === resume.id
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 border-l-4 border-indigo-600 dark:border-indigo-400'
                  : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                    {resume.fileName}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {formatDate(resume.uploadedAt || resume.createdAt)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(resume.id);
                  }}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs font-medium ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
