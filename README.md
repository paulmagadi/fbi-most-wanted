# FBI Most Wanted Viewer 🔍

A simple React application that fetches and displays data from the FBI Most Wanted API.

> Note: This app uses a CORS proxy to bypass cross-origin restrictions when fetching data from the FBI API.

---

## Demo

[Live Demo](https://paulmagadi.github.io/fbi-most-wanted/)

---

## 🚀 Features

- Fetches and displays a list of FBI most wanted individuals.
- Responsive UI built with React.
- Handles loading and error states.
- Uses a public CORS proxy to access the API.

---

## ⚙️ Technologies Used

- React
- Axios
- Tailwind CSS

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/paulmagadi/fbi-most-wanted.git
cd fbi-most-wanted
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will run on http://localhost:5173 (or the default port Vite provides).

---

## 🌐 API and CORS Proxy
This app fetches data from the FBI Most Wanted API using the corsproxy.io proxy service:

`https://corsproxy.io/?https://api.fbi.gov/wanted/v1/list?page=1&pageSize=100`

This is used to bypass the browser's Same-Origin Policy (CORS) restrictions. For production or reliability, it’s recommended to set up your own proxy server.

---

## 📸 Screenshots

---

### ⚠️ Disclaimer
This project is for educational/demo purposes. It is not affiliated with the FBI or any official law enforcement agency. Data is sourced from the public FBI Wanted API.

---

## 📄 License
MIT