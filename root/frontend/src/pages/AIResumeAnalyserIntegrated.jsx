import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  LogOut,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";
import { Appcontext } from "../context/AppContext";
import "./AIResumeAnalyserIntegrated.css";

const TOKEN_KEY = "ai_resume_token";
const USER_KEY = "ai_resume_user";

const getErrorMessage = async (response) => {
  try {
    const data = await response.json();
    return data.error || data.message || "Request failed";
  } catch {
    return "Request failed";
  }
};

const formatDate = (date) => {
  if (!date) return "Not available";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const formatSize = (bytes = 0) => {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

export default function AIResumeAnalyserIntegrated() {
  const { backendUrl, userData } = useContext(Appcontext);
  const apiBase = `${backendUrl}/api/ai-resume`;

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [resumeUser, setResumeUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || "null");
    } catch {
      return null;
    }
  });
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    password: "",
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [documents, setDocuments] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [analyzingId, setAnalyzingId] = useState("");
  const [notice, setNotice] = useState({ type: "", text: "" });

  useEffect(() => {
    setAuthForm((current) => ({
      ...current,
      name: current.name || userData?.name || "",
      email: current.email || userData?.email || "",
    }));
  }, [userData]);

  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  const saveSession = (data) => {
    setToken(data.token);
    setResumeUser(data.user);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  };

  const logout = () => {
    setToken("");
    setResumeUser(null);
    setDocuments([]);
    setActiveDoc(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const request = useCallback(
    async (path, options = {}) => {
      const response = await fetch(`${apiBase}${path}`, {
        ...options,
        headers: {
          ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
          ...authHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        if (response.status === 401) logout();
        throw new Error(await getErrorMessage(response));
      }

      return response.json();
    },
    [apiBase, authHeaders]
  );

  const fetchDocuments = useCallback(async () => {
    if (!token) return;
    setLoadingDocs(true);
    try {
      const data = await request("/docs?limit=20");
      setDocuments(data.docs || []);
      if (!activeDoc && data.docs?.length) {
        setActiveDoc(data.docs[0]);
      }
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setLoadingDocs(false);
    }
  }, [activeDoc, request, token]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    if (!activeDoc?.analysis || activeDoc.analysis.status !== "processing") return;

    const interval = window.setInterval(async () => {
      try {
        const preview = await request(`/docs/${activeDoc._id}/preview`);
        setActiveDoc(preview);
        fetchDocuments();
        if (preview.analysis?.status === "done") {
          setNotice({ type: "success", text: "Resume analysis is ready." });
          window.clearInterval(interval);
        }
      } catch (error) {
        setNotice({ type: "error", text: error.message });
      }
    }, 3000);

    return () => window.clearInterval(interval);
  }, [activeDoc, fetchDocuments, request]);

  const handleAuth = async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    setNotice({ type: "", text: "" });

    try {
      const payload =
        authMode === "register"
          ? authForm
          : { email: authForm.email, password: authForm.password };
      const data = await request(`/auth/${authMode}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {},
      });
      saveSession(data);
      setAuthForm((current) => ({ ...current, password: "" }));
      setNotice({ type: "success", text: "Connected to the resume analyzer." });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "text/plain", "text/markdown"];
    const allowedExtension = /\.(pdf|txt|md)$/i.test(file.name);
    if (!allowedTypes.includes(file.type) && !allowedExtension) {
      setSelectedFile(null);
      setNotice({ type: "error", text: "Upload a PDF, TXT, or MD resume file." });
      return;
    }

    setSelectedFile(file);
    setNotice({ type: "success", text: `${file.name} selected.` });
  };

  const uploadAndAnalyze = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setNotice({ type: "error", text: "Choose a resume file first." });
      return;
    }

    setSubmitting(true);
    setNotice({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("jobDescription", jobDescription.trim());

      const uploadData = await request("/docs/upload", {
        method: "POST",
        body: formData,
      });

      const doc = uploadData.doc;
      setActiveDoc(doc);
      setAnalyzingId(doc._id);
      await request(`/docs/${doc._id}/analyze`, { method: "POST" });
      const preview = await request(`/docs/${doc._id}/preview`);
      setActiveDoc(preview);
      setSelectedFile(null);
      setJobDescription("");
      fetchDocuments();
      setNotice({ type: "success", text: "Upload complete. Analysis is running." });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setSubmitting(false);
      setAnalyzingId("");
    }
  };

  const analyzeExisting = async (doc) => {
    setAnalyzingId(doc._id);
    setNotice({ type: "", text: "" });
    try {
      await request(`/docs/${doc._id}/analyze`, { method: "POST" });
      const preview = await request(`/docs/${doc._id}/preview`);
      setActiveDoc(preview);
      fetchDocuments();
      setNotice({ type: "success", text: "Analysis started." });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setAnalyzingId("");
    }
  };

  const openDocument = async (doc) => {
    try {
      const preview = await request(`/docs/${doc._id}/preview`);
      setActiveDoc(preview);
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    }
  };

  const deleteDocument = async (doc) => {
    try {
      await request(`/docs/${doc._id}`, { method: "DELETE" });
      setDocuments((current) => current.filter((item) => item._id !== doc._id));
      if (activeDoc?._id === doc._id) setActiveDoc(null);
      setNotice({ type: "success", text: "Resume removed." });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    }
  };

  const analysis = activeDoc?.analysis;
  const hasAnalysis = analysis?.status === "done";
  const score = typeof analysis?.resumeScore === "number" ? analysis.resumeScore : null;

  return (
    <main className="resume-analyser-page">
      <section className="resume-analyser-header">
        <div>
          <p className="resume-eyebrow">AI Resume Analyzer</p>
          <h1>Match your resume against a role, then close the gaps.</h1>
          <p>
            Upload a resume with an optional job description. The analyzer extracts resume text,
            scores role fit, and returns matching skills, gaps, and improvement actions.
          </p>
        </div>
        {token && (
          <div className="resume-session">
            <span>{resumeUser?.name || resumeUser?.email || "Resume account"}</span>
            <button type="button" onClick={logout} className="resume-icon-button" title="Sign out">
              <LogOut size={18} />
            </button>
          </div>
        )}
      </section>

      {notice.text && (
        <div className={`resume-notice ${notice.type === "error" ? "error" : "success"}`}>
          {notice.type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notice.text}</span>
        </div>
      )}

      {!token ? (
        <section className="resume-auth-card">
          <div>
            <h2>{authMode === "login" ? "Connect analyzer account" : "Create analyzer account"}</h2>
            <p>
              The integrated resume backend uses its own secure token, so sign in here once before
              uploading resumes.
            </p>
          </div>
          <form onSubmit={handleAuth} className="resume-form">
            {authMode === "register" && (
              <label>
                Name
                <input
                  value={authForm.name}
                  onChange={(event) =>
                    setAuthForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Your name"
                  required
                />
              </label>
            )}
            <label>
              Email
              <input
                type="email"
                value={authForm.email}
                onChange={(event) =>
                  setAuthForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={authForm.password}
                onChange={(event) =>
                  setAuthForm((current) => ({ ...current, password: event.target.value }))
                }
                placeholder="Minimum 6 characters"
                minLength={authMode === "register" ? 6 : undefined}
                required
              />
            </label>
            <button type="submit" className="resume-primary-button" disabled={authLoading}>
              {authLoading && <Loader2 size={18} className="resume-spin" />}
              {authMode === "login" ? "Sign in" : "Create account"}
            </button>
            <button
              type="button"
              className="resume-link-button"
              onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
            >
              {authMode === "login" ? "Need an analyzer account?" : "Already have an account?"}
            </button>
          </form>
        </section>
      ) : (
        <section className="resume-grid">
          <div className="resume-panel">
            <div className="resume-panel-heading">
              <div>
                <h2>Upload Resume</h2>
                <p>PDF, TXT, and MD files are supported.</p>
              </div>
              <Upload size={22} />
            </div>
            <form onSubmit={uploadAndAnalyze} className="resume-form">
              <label className="resume-dropzone">
                <FileText size={30} />
                <strong>{selectedFile ? selectedFile.name : "Choose resume file"}</strong>
                <span>{selectedFile ? formatSize(selectedFile.size) : "Click to browse"}</span>
                <input type="file" accept=".pdf,.txt,.md" onChange={handleFileChange} />
              </label>
              <label>
                Job description
                <textarea
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the target role description to get a role-fit score."
                  rows={8}
                />
              </label>
              <button
                type="submit"
                className="resume-primary-button"
                disabled={submitting || !selectedFile}
              >
                {submitting && <Loader2 size={18} className="resume-spin" />}
                Upload and analyze
              </button>
            </form>
          </div>

          <div className="resume-panel">
            <div className="resume-panel-heading">
              <div>
                <h2>Recent Resumes</h2>
                <p>{documents.length} document{documents.length === 1 ? "" : "s"} available</p>
              </div>
              <button
                type="button"
                onClick={fetchDocuments}
                className="resume-icon-button"
                title="Refresh"
                disabled={loadingDocs}
              >
                <RefreshCw size={18} className={loadingDocs ? "resume-spin" : ""} />
              </button>
            </div>

            <div className="resume-doc-list">
              {documents.length === 0 && (
                <div className="resume-empty">No resumes uploaded yet.</div>
              )}
              {documents.map((doc) => (
                <article
                  key={doc._id}
                  className={`resume-doc-card ${activeDoc?._id === doc._id ? "active" : ""}`}
                >
                  <button type="button" onClick={() => openDocument(doc)}>
                    <FileText size={20} />
                    <span>
                      <strong>{doc.originalName}</strong>
                      <small>{formatDate(doc.updatedAt || doc.createdAt)}</small>
                    </span>
                  </button>
                  <div className="resume-doc-actions">
                    <button
                      type="button"
                      onClick={() => analyzeExisting(doc)}
                      className="resume-small-button"
                      disabled={analyzingId === doc._id || doc.analysis?.status === "processing"}
                    >
                      {analyzingId === doc._id || doc.analysis?.status === "processing"
                        ? "Running"
                        : doc.analysis?.status === "done"
                        ? "Recheck"
                        : "Analyze"}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteDocument(doc)}
                      className="resume-icon-button danger"
                      title="Delete"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="resume-panel resume-results">
            <div className="resume-panel-heading">
              <div>
                <h2>Analysis Result</h2>
                <p>{activeDoc?.originalName || "Select or upload a resume"}</p>
              </div>
              {analysis?.status === "processing" && <Loader2 size={22} className="resume-spin" />}
            </div>

            {!activeDoc && <div className="resume-empty large">No resume selected.</div>}

            {activeDoc && !analysis && (
              <div className="resume-empty large">
                This resume has not been analyzed yet.
                <button
                  type="button"
                  className="resume-primary-button compact"
                  onClick={() => analyzeExisting(activeDoc)}
                >
                  Analyze now
                </button>
              </div>
            )}

            {analysis?.status === "processing" && (
              <div className="resume-empty large">
                Analysis is running. Results will refresh automatically.
              </div>
            )}

            {hasAnalysis && (
              <div className="resume-analysis">
                <div className="resume-score-row">
                  <div className="resume-score">
                    <span>{score ?? "N/A"}</span>
                    <small>{score === null ? "Score unavailable" : "Resume score"}</small>
                  </div>
                  <div>
                    <h3>Summary</h3>
                    <p>{analysis.summary || "No summary returned."}</p>
                  </div>
                </div>

                <ResultBlock title="Matching Skills" items={analysis.matchingSkills} tone="green" />
                <ResultBlock title="Skill Gaps" items={analysis.skillGaps} tone="amber" />
                <ResultBlock title="Recommendations" items={analysis.recommendations} />
                <ResultBlock title="Key Points" items={analysis.keyPoints} />
                <ResultBlock title="Keywords" items={analysis.keywords} tone="blue" />

                {analysis.questions?.length > 0 && (
                  <div className="resume-question-block">
                    <h3>Interview Questions</h3>
                    {analysis.questions.map((question) => (
                      <p key={question}>{question}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

function ResultBlock({ title, items = [], tone = "neutral" }) {
  if (!items?.length) return null;

  return (
    <div className="resume-result-block">
      <h3>{title}</h3>
      <div className="resume-tags">
        {items.map((item) => (
          <span key={item} className={`resume-tag ${tone}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
