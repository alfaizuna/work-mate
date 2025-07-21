import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { askWorkBot } from '../services/workbotService';
import '../index.css';

const WorkBot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Halo! Saya Work Assistant. Ada yang bisa saya bantu?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const location = useLocation();
  const initialQuery = useRef(location.state?.query);

  const handleSend = async (queryOverride) => {
    const query = queryOverride || input;
    if (!query.trim()) return;

    const userMsg = { from: 'user', text: query };
    setMessages(msgs => [...msgs, userMsg]);
    if (!queryOverride) {
      setInput('');
    }
    
    setLoading(true);
    const botReply = await askWorkBot(query);
    setMessages(msgs => [...msgs, { from: 'bot', text: botReply }]);
    setLoading(false);
  };
  
  useEffect(() => {
    if (initialQuery.current) {
      handleSend(initialQuery.current);
      initialQuery.current = null; // Hapus setelah digunakan
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="workbot-container">
      <h2 className="section-title">Work Assistant</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.from}`}>{msg.text}</div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-row">
        <textarea
          className="chat-input"
          rows={2}
          placeholder="Tulis pertanyaan..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button className="summary-btn" onClick={handleSend} disabled={loading || !input.trim()}>
          {loading ? '...' : 'Kirim'}
        </button>
      </div>
    </div>
  );
};

export default WorkBot; 