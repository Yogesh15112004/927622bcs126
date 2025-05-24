import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberType, setNumberType] = useState('');
  const [windowSize, setWindowSize] = useState(10);
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [fetchedNumbers, setFetchedNumbers] = useState([]);
  const [average, setAverage] = useState(0);

  const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY3NjY0LCJpYXQiOjE3NDgwNjczNjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQzMmM4Njk2LTZlMzQtNGRjZC1iNDU4LTE0ZjgwMmNjMWVjNCIsInN1YiI6InZpZ25lc2hrYW5yYUBnbWFpbC5jb20ifSwiZW1haWwiOiJ2aWduZXNoa2FucmFAZ21haWwuY29tIiwibmFtZSI6InZpZ25lc2h3YXJhbiBuIGsiLCJyb2xsTm8iOiI5Mjc2MjJiY3MxMTgiLCJhY2Nlc3NDb2RlIjoid2hlUVV5IiwiY2xpZW50SUQiOiJkMzJjODY5Ni02ZTM0LTRkY2QtYjQ1OC0xNGY4MDJjYzFlYzQiLCJjbGllbnRTZWNyZXQiOiJHZXlhRFNyVmNzSlJoVnREIn0.NkqPCHER_bdzZVcUFlHfabDWKoQLaTODLQhtQnlPzPQ";

  const corsProxy = "https://cors-anywhere.herokuapp.com/";

  const fetchNumbers = async () => {
    if (!numberType) {
      alert("Please select a number type (p, f, e, r)");
      return;
    }

    try {
      const prevWindow = [...windowCurrState];

      const response = await axios.get(
        `${corsProxy}http://20.244.56.144/evaluation-service/${numberType}`,
        {
          headers: {
            Authorization: accessToken,
          },
          timeout: 1500, // max 500ms allowed
        }
      );

      const newNumbers = response.data.numbers || [];

      // Combine previous and new numbers keeping only unique values
      let updatedWindow = [...prevWindow, ...newNumbers];
      updatedWindow = [...new Set(updatedWindow)];

      // Keep only the last `windowSize` numbers
      if (updatedWindow.length > windowSize) {
        updatedWindow = updatedWindow.slice(updatedWindow.length - windowSize);
      }

      setWindowPrevState(prevWindow);
      setWindowCurrState(updatedWindow);
      setFetchedNumbers(newNumbers);

      const avg = updatedWindow.reduce((sum, n) => sum + n, 0) / updatedWindow.length;
      setAverage(avg.toFixed(2));
    } catch (error) {
      console.error("❌ Error fetching numbers:", error);
      if (error.response?.status === 401) {
        alert("Access token expired or invalid.");
      } else {
        alert("CORS error or server timeout.");
      }
    }
  };

  return (
    <div className="App">
      <h1>🧮 Affordmed Average Calculator</h1>

      <label>Select Number Type: </label>
      <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
        <option value="">-- Choose --</option>
        <option value="primes">Prime (p)</option>
        <option value="fibo">Fibonacci (f)</option>
        <option value="even">Even (e)</option>
        <option value="rand">Random (r)</option>
      </select>

      <button onClick={fetchNumbers} style={{ marginLeft: "20px" }}>
        Fetch Numbers
      </button>

      <hr />

      <h3>📊 Result</h3>
      <p><strong>Previous State:</strong> [{windowPrevState.join(", ")}]</p>
      <p><strong>Current State:</strong> [{windowCurrState.join(", ")}]</p>
      <p><strong>Newly Fetched:</strong> [{fetchedNumbers.join(", ")}]</p>
      <p><strong>Average:</strong> {average}</p>
    </div>
  );
}

export default App;
