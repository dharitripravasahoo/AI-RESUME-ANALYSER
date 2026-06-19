const axios = require('axios');

exports.analyzeResumeWithJob = async (resumeContent, jobDescription) => {
  try {
    const prompt = `You are an expert resume analyzer. Analyze the following resume against the job description and provide:

1. A match score (0-100)
2. List of matched skills (as array)
3. List of missing skills (as array)
4. Specific, actionable improvements

Resume Content:
${resumeContent}

Job Description:
${jobDescription}

Please respond in this exact JSON format:
{
  "matchScore": <number>,
  "matchedSkills": [<skills array>],
  "missingSkills": [<skills array>],
  "improvements": "<detailed improvement suggestions>",
  "summary": "<brief summary of match quality>"
}`;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const content = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from response');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return analysis;
  } catch (error) {
    console.error('AI Analysis error:', error.message);
    throw new Error(`AI Analysis failed: ${error.message}`);
  }
};
