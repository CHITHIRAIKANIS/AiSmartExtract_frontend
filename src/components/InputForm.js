import React, { useState } from 'react';
import axios from 'axios';

function InputForm({ onResult }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; 

    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:5000/api/extract', {
        url,
      });

     
      const [summaryPart, keyPointsPart] = response.data.result.split('Key Points:');
      const keyPoints = keyPointsPart
        .split('\n')
        .filter(point => point.trim().startsWith('-'))
        .map(point => point.replace('-', '').trim());

      onResult({
        url,
        summary: summaryPart.replace('Summary:', '').trim(),
        keyPoints,
      });

      setUrl('');
    } catch (error) {
      if (error.response && error.response.status === 429) {
        alert('Rate limit exceeded. Please wait and try again later.');
      } else {
        alert('Something went wrong. Please try again.');
      }
      console.error('Error:', error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter public URL"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Extracting...' : 'Extract'}
      </button>
    </form>
  );
}

export default InputForm;
