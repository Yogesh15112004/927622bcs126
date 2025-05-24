
import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
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

  const [stocks, setStocks] = useState({});
  const [selectedTicker, setSelectedTicker] = useState('');
  const [stockData, setStockData] = useState([]);
  const [minutes, setMinutes] = useState(15);

   ✅ Full Bearer Token
  const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY2MDA0LCJpYXQiOjE3NDgwNjU3MDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY0MDU0N2ViLTE0YTctNGI3NC1hZjRlLWVmM2VlMWFiZWExMCIsInN1YiI6InlvZ2VzaG5lZWxhbWVnYW0xNUBnbWFpbC5jb20ifSwiZW1haWwiOiJ5b2dlc2huZWVsYW1lZ2FtMTVAZ21haWwuY29tIiwibmFtZSI6InlvZ2VzaCBuIiwicm9sbE5vIjoiOTI3NjIyYmNzMTI2IiwiYWNjZXNzQ29kZSI6IndoZVFVeSIsImNsaWVudElEIjoiNjQwNTQ3ZWItMTRhNy00Yjc0LWFmNGUtZWYzZWUxYWJlYTEwIiwiY2xpZW50U2VjcmV0IjoiblhieXprd2Vmd2pwTlJZUSJ9.o4KFE5pLJV3nCezqKybhV-gj7PFTzoRERbwHATvw8Hg"

   ✅ CORS proxy prefix
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const baseURL = "http://20.244.56.144/evaluation-service";

  useEffect(() => {
  axios.get(`${proxy}${baseURL}/companies`, {
    headers: {
      Authorization: accessToken
    }
  })
  .then(res => {
    console.log("✅ COMPANIES FETCHED:", res.data);
    const stockMap = {};
    res.data.forEach(company => {
      stockMap[company.name] = company.ticker;
    });
    setStocks(stockMap);
  })
  .catch(err => {
    console.error("❌ ERROR FETCHING COMPANIES:", err);
    alert("Failed to fetch company list. Possible CORS or token error.");
  });
}, []);

  // 🔁 Fetch stocks list
  useEffect(() => {
  axios.get(`${proxy}${baseURL}/stocks/${selectedTicker}?minutes=${minutes}`, {
  headers: {
    Authorization: accessToken
  }
})

    .then(res => {
      console.log("✅ STOCKS FETCHED:", res.data);
      setStocks(res.data.stocks);
    })
    .catch(err => {
      console.error("❌ ERROR FETCHING STOCKS:", err);
      alert("CORS issue or token expired. Try again.");
    });
  }, []);

  // 🔁 Fetch stock prices
useEffect(() => {
  if (selectedTicker && minutes) {
    axios.get(`${proxy}${baseURL}/stocks/${selectedTicker}?minutes=${minutes}`, {
      headers: {
        Authorization: accessToken
      }
    })
    .then(res => {
      console.log("✅ STOCK DATA:", res.data);
      setStockData(res.data);
    })
    .catch(err => {
      console.error("❌ ERROR FETCHING STOCK DATA:", err);
      alert("Failed to fetch stock data.");
    });
  }
}, [selectedTicker, minutes]);

// 🔁 Fetch available stocks (companies + tickers)
useEffect(() => {
  axios.get(`${proxy}${baseURL}/companies`, {
    headers: {
      Authorization: accessToken
    }
  })
  .then(res => {
    console.log("✅ COMPANIES FETCHED:", res.data);
    const stockMap = {};
    res.data.forEach(company => {
      stockMap[company.name] = company.ticker;
    });
    setStocks(stockMap);
  })
  .catch(err => {
    console.error("❌ ERROR FETCHING COMPANIES:", err);
    alert("Failed to fetch company list. Possible CORS or token error.");
  });
}, []);



  return (
    <div className="App">
      <h1>📈 Affordmed Stock Price Viewer</h1>

      {/* Dropdowns */}
      <label>Select Company: </label>
      <select value={selectedTicker} onChange={(e) => setSelectedTicker(e.target.value)}>
        <option value="">-- Choose --</option>
        {Object.entries(stocks).map(([name, ticker]) => (
          <option key={ticker} value={ticker}>{name} ({ticker})</option>
        ))}
      </select>

      <label style={{ marginLeft: "20px" }}>Time Interval: </label>
      <select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
        <option value={15}>15 min</option>
        <option value={30}>30 min</option>
        <option value={60}>60 min</option>
      </select>

      <hr />

      {/* Output */}
      <h2>Stock Data</h2>
      {stockData.length > 0 ? (
        <ul>
          {stockData.map((entry, index) => (
            <li key={index}>
              ₹ {entry.price} — {new Date(entry.lastUpdatedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No stock data to display yet.</p>
      )}

    </div>
  );
}
