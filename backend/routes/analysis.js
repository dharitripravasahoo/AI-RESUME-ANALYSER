const express = require('express');
const router = express.Router();
const {
  analyzeResume,
  getUserAnalysis,
  getAnalysisById,
  deleteAnalysis,
} = require('../controllers/analysisController');
const { protect } = require('../middleware/auth');

router.post('/analyze', protect, analyzeResume);
router.get('/', protect, getUserAnalysis);
router.get('/:id', protect, getAnalysisById);
router.delete('/:id', protect, deleteAnalysis);

module.exports = router;
