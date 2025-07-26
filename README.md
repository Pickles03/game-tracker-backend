# Game Tracker - Backend

This is the backend server for the **Game Tracker** app. Built with **Node.js** and **Express**, it handles user authentication and serves game data by fetching it from the RAWG Video Games API. It acts as an API proxy and secures user sessions via JWT.

---

## Features

- **User Auth**: Signup and login with JWT-based authentication
- **Game Fetching**: Proxy to [RAWG API](https://rawg.io/apidocs) with pagination, sorting, and genre filters
- **CORS Enabled**: Supports frontend communication (e.g. from Netlify)
- **Environment Config**: Uses `.env` for API key and secrets

---

## Tech Stack

- **Node.js**
- **Express**
- **Axios**
- **dotenv**
- **JWT (jsonwebtoken)**
- **CORS**

## Deployment

The backend is deployed via **Render**