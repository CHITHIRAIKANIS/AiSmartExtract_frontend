import React, { useState } from 'react';

function ResultsTable({ results }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = results.filter(item =>
    item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search by URL or Summary"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
      />

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'sans-serif'
      }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>URL</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Summary</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Key Points</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '8px', border: '1px solid #eee' }}>{item.url}</td>
              <td style={{ padding: '8px', border: '1px solid #eee' }}>{item.summary}</td>
              <td style={{ padding: '8px', border: '1px solid #eee' }}>
                <ul>
                  {item.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;
