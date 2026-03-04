import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppcontextProvider } from './context/AppContext'
import App from './App'
import './styles.css'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppcontextProvider>
      <App />
      </AppcontextProvider>
    </BrowserRouter>
  </React.StrictMode>
)