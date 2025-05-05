import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultsTable from './components/ResultsTable';

function App() {
  const [results, setResults] = useState([]);

  const handleNewResult = (result) => {
    setResults(prev => [result, ...prev]);
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>AI Content Extractor</h1>
      <InputForm onResult={handleNewResult} />
      <ResultsTable results={results} />
    </div>
  );
}

export default App;
