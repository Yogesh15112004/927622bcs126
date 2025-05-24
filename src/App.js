import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [stocks, setStocks] = useState({});
  const [selectedTicker, setSelectedTicker] = useState('');
  const [stockData, setStockData] = useState([]);
  const [minutes, setMinutes] = useState(15);

  // ✅ Full Bearer Token
  const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY2MDA0LCJpYXQiOjE3NDgwNjU3MDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY0MDU0N2ViLTE0YTctNGI3NC1hZjRlLWVmM2VlMWFiZWExMCIsInN1YiI6InlvZ2VzaG5lZWxhbWVnYW0xNUBnbWFpbC5jb20ifSwiZW1haWwiOiJ5b2dlc2huZWVsYW1lZ2FtMTVAZ21haWwuY29tIiwibmFtZSI6InlvZ2VzaCBuIiwicm9sbE5vIjoiOTI3NjIyYmNzMTI2IiwiYWNjZXNzQ29kZSI6IndoZVFVeSIsImNsaWVudElEIjoiNjQwNTQ3ZWItMTRhNy00Yjc0LWFmNGUtZWYzZWUxYWJlYTEwIiwiY2xpZW50U2VjcmV0IjoiblhieXprd2Vmd2pwTlJZUSJ9.o4KFE5pLJV3nCezqKybhV-gj7PFTzoRERbwHATvw8Hg"

  // ✅ CORS proxy prefix
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

export default App;