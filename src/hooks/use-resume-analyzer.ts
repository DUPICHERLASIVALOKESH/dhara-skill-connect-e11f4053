
import { useState } from 'react';

interface ResumeAnalysisResult {
  overallScore: number;
  keywordOptimization: {
    score: number;
    missingKeywords: string[];
    suggestions: string[];
  };
  formatting: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  missingSkills: string[];
  improvements: string[];
}

export function useResumeAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = async (file: File): Promise<void> => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // In a real implementation, you would send the file to your backend service
      // For demonstration, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate analysis result
      const mockResult: ResumeAnalysisResult = {
        overallScore: Math.floor(Math.random() * 30) + 60, // 60-90%
        keywordOptimization: {
          score: Math.floor(Math.random() * 40) + 55,
          missingKeywords: ['leadership', 'project management', 'agile'],
          suggestions: [
            'Include more industry-specific keywords',
            'Add keywords from the job description',
            'Highlight technical skills more prominently'
          ]
        },
        formatting: {
          score: Math.floor(Math.random() * 30) + 70,
          issues: [
            'Inconsistent spacing between sections',
            'Too many bullet points',
            'Header formatting could be improved'
          ],
          suggestions: [
            'Use a cleaner, ATS-friendly format',
            'Ensure consistent spacing throughout',
            'Limit to 5-6 bullet points per role'
          ]
        },
        missingSkills: [
          'Data analysis',
          'Team leadership',
          'Strategic planning',
          'Budget management'
        ],
        improvements: [
          'Quantify achievements with specific metrics',
          'Add a stronger professional summary',
          'Include relevant certifications',
          'Tailor your resume for each job application'
        ]
      };
      
      setResult(mockResult);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Resume analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return {
    analyzeResume,
    resetAnalysis,
    isAnalyzing,
    result,
    error
  };
}
