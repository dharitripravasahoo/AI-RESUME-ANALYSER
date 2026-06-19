const Analysis = require('../models/Analysis');
const Resume = require('../models/Resume');
const { analyzeResumeWithJob } = require('../utils/aiAnalyzer');

// Analyze resume
exports.analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide resumeId and jobDescription',
      });
    }

    // Verify resume belongs to user
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Perform AI analysis
    const analysisResult = await analyzeResumeWithJob(resume.content, jobDescription);

    // Save analysis to database
    const analysis = await Analysis.create({
      userId: req.userId,
      resumeId,
      jobDescription,
      matchScore: analysisResult.matchScore,
      matchedSkills: analysisResult.matchedSkills,
      missingSkills: analysisResult.missingSkills,
      improvements: analysisResult.improvements,
      summary: analysisResult.summary,
    });

    res.status(201).json({
      success: true,
      message: 'Resume analyzed successfully',
      analysis,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get analysis history for user
exports.getUserAnalysis = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.userId })
      .populate('resumeId', 'fileName')
      .sort({ analyzedAt: -1 });

    res.status(200).json({
      success: true,
      count: analyses.length,
      analyses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get analysis by ID
exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).populate('resumeId', 'fileName');

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found',
      });
    }

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete analysis
exports.deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
