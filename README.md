
# Affordmed Average Calculator

A React app that retrieves various types of numbers (primes, Fibonacci, even, random) from a remote API, keeps a sliding window of the most recent numbers, and computes the average of the current window.

## Features

- Choose type of number: primes, Fibonacci, even, or random.
- Retrieve new numbers from the API with authentication.
- Keeps a window of the last N numbers (default 10).
- Shows previous state, current state, newly retrieved numbers, and computed average.
- Graciously handles token expiration and CORS errors.

## Demo

![Demo Screenshot]("C:\Users\yogi\Pictures\Screenshots\q2.png")


## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- Internet access to retrieve data from the API.
=======
 Affordmed Stock Price Viewer

A basic React web app that shows live stock prices from the Affordmed API. Users can choose a company and time interval (15, 30, or 60 minutes) to see stock price updates.

---

 Features

- Retrieves and displays a list of companies and their stock tickers.
- Enables users to choose a stock and time interval.
- Shows the most recent stock price information utilizing the given evaluation API.
- Utilizes a Bearer token for secure access to APIs.
- CORS support through proxy.

---

 Tech Stack

- React.js (Frontend)
- Axios (API request)
- JavaScript (ES6+)
- CORS Anywhere Proxy (for development purpose)
