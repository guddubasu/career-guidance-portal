import React, { useState } from "react";

const careerData = {
  1: { title: "BFSI" },
  4: { title: "IT" },
  6: { title: "Design" },
  8: { title: "Engineering" },
  11: { title: "General" },
  12: { title: "Government" },
  14: { title: "Hospitality & Tourism" },
  16: { title: "Legal" },
  17: { title: "Logistics" },
  18: { title: "Management" }
};

export default function AIResumeAnalyser() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCareerId, setSelectedCareerId] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const careerOptions = Object.entries(careerData).map(([id, data]) => ({
    id,
    ...data
  }));

  const selectedCareer = careerOptions.find(c => c.id === selectedCareerId);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setStatus(`✅ PDF selected: ${file.name}`);
      setAnalysisResult(null);
    } else {
      setStatus("❌ Please select a valid PDF file.");
      setSelectedFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !selectedCareerId) {
      setStatus("❌ Please upload a PDF and select a career.");
      return;
    }
    
    setIsSubmitting(true);
    setStatus(`🔄 Analyzing resume for ${selectedCareer.title} role...`);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('career', selectedCareer.title);

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setAnalysisResult({
        matchScore: result.match_score,
        detectedSkills: result.detected_skills,
        matchedKeywordsCount: result.matched_keywords_count,
        totalCareerKeywords: result.total_career_keywords,
        recommendations: result.recommendations,
        missingEssential: result.missing_essential
      });
      
      setStatus(`✅ Analysis complete for ${selectedCareer.title}! ${result.match_score}% skill match detected.`);
    } catch (error) {
      console.error('Analysis failed:', error);
      setStatus(`❌ Analysis failed. Is backend running on localhost:8000? Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      padding: "40px", 
      maxWidth: "700px", 
      margin: "0 auto", 
      textAlign: "left",
      background: "#f8fafc",
      minHeight: "100vh"
    }}>
      <h1 style={{ 
        textAlign: "center", 
        color: "#1e293b",
        fontSize: "2.5rem",
        marginBottom: "2rem"
      }}>AI Resume Analyzer</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#334155", fontSize: "1.1rem" }}>
          📄 Upload Resume (PDF):
        </label>
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
          style={{ 
            width: "100%", 
            padding: "12px", 
            border: "2px dashed #cbd5e1", 
            borderRadius: "8px",
            backgroundColor: "white",
            fontSize: "16px"
          }}
        />
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#334155", fontSize: "1.1rem" }}>
          🎯 Target Career:
        </label>
        <select 
          value={selectedCareerId} 
          onChange={(e) => {
            setSelectedCareerId(e.target.value);
            setStatus("");
            setAnalysisResult(null);
          }}
          style={{ 
            width: "100%", 
            padding: "12px", 
            border: "2px solid #e2e8f0", 
            borderRadius: "8px",
            backgroundColor: "white",
            fontSize: "16px"
          }}
        >
          <option value="">Select a career path</option>
          {careerOptions.map((career) => (
            <option key={career.id} value={career.id}>
              {career.title}
            </option>
          ))}
        </select>
      </div>
      
      <button 
        onClick={handleSubmit}
        disabled={isSubmitting || !selectedFile || !selectedCareerId}
        style={{
          width: "100%", 
          padding: "15px", 
          backgroundColor: "#3b82f6", 
          color: "white", 
          border: "none", 
          borderRadius: "8px", 
          fontSize: "18px",
          fontWeight: "bold",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
        }}
      >
        {isSubmitting ? "🔄 Analyzing..." : "🚀 Analyze Resume"}
      </button>
      
      {status && (
        <div style={{ 
          marginTop: "20px", 
          padding: "20px", 
          backgroundColor: "#f0fdf4", 
          borderRadius: "12px", 
          borderLeft: "5px solid #10b981",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          {status}
        </div>
      )}
      
      {analysisResult && (
        <div style={{ 
          marginTop: "20px", 
          padding: "20px", 
          backgroundColor: "#f8fafc", 
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{marginBottom: "15px", color: "#1e293b"}}>📊 Analysis Results</h3>
          
          <div style={{ 
            fontSize: "28px", 
            fontWeight: "bold", 
            marginBottom: "15px",
            color: analysisResult.matchScore > 70 ? "#059669" : analysisResult.matchScore > 40 ? "#d97706" : "#dc2626"
          }}>
            {analysisResult.matchScore}% Match
          </div>
          
          <p style={{marginBottom: "10px"}}><strong>✅ Detected Skills:</strong> {analysisResult.detectedSkills?.join(", ") || "None"}</p>
          <p style={{marginBottom: "20px"}}><strong>Keywords Matched:</strong> {analysisResult.matchedKeywordsCount}/{analysisResult.totalCareerKeywords}</p>
          
          {analysisResult.recommendations && (
            <>
              <h4 style={{margin: "20px 0 15px 0", color: "#1e293b", fontSize: "1.2rem"}}>🚀 Boost Your Score</h4>
              
              {analysisResult.missingEssential?.length > 0 && (
                <div style={{
                  background: "#fef3c7", 
                  padding: "15px", 
                  borderRadius: "8px", 
                  marginBottom: "15px",
                  borderLeft: "4px solid #f59e0b"
                }}>
                  <strong style={{color: "#92400e"}}>🔥 Essential Skills Missing:</strong>
                  <div style={{marginTop: "8px"}}>
                    {analysisResult.missingEssential.map((skill, idx) => (
                      <span 
                        key={idx} 
                        style={{
                          background: "#fde047", 
                          padding: "6px 12px", 
                          borderRadius: "20px", 
                          margin: "4px 4px 4px 0", 
                          fontSize: "14px",
                          fontWeight: "500",
                          display: "inline-block"
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div style={{marginBottom: "8px"}}>
                <strong>📚 High-Impact Skills:</strong> {analysisResult.recommendations.high_impact?.slice(0,5).join(", ") || "N/A"}
              </div>
              <div>
                <strong>🏆 Recommended Certifications:</strong> {analysisResult.recommendations.certifications?.slice(0,3).join(", ") || "N/A"}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
