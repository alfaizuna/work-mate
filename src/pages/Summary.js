import React, { useState } from 'react';
import { getSummary } from '../services/aiService';
import '../index.css';

const Summary = () => {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSummary = async () => {
    if (!transcript.trim()) {
      alert('Silakan masukkan transkrip rapat terlebih dahulu.');
      return;
    }
    setLoading(true);
    const result = await getSummary(transcript);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="summary-container">
      <h2 className="section-title">AI Rapat Summary Generator</h2>
      <div className="card">
        <h3 className="sub-title">Transkrip Rapat</h3>
        <textarea
          className="transcript-input"
          rows="10"
          placeholder="Tempelkan transkrip rapat dari Zoom atau Teams di sini..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          disabled={loading}
        />
        <button
          className="summary-btn"
          onClick={handleGenerateSummary}
          disabled={loading}
        >
          {loading ? 'Membuat Ringkasan...' : 'Buat Ringkasan'}
        </button>
      </div>

      {summary && (
        <div className="card summary-result">
          <h3 className="sub-title">Hasil Ringkasan</h3>
          <h4>Poin-Poin Penting:</h4>
          <ul>
            {summary.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <h4>Tindak Lanjut (Action Items):</h4>
          <ul>
            {summary.actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
          <h4>Keputusan:</h4>
          <ul>
            {summary.decisions.map((decision, index) => (
              <li key={index}>{decision}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Summary; 