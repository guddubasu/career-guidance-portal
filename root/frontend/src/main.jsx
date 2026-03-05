import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
=======
import { AppcontextProvider } from './context/AppContext'
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
import App from './App'
import './styles.css'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <App />
=======
    <AppcontextProvider>
      <App />
      </AppcontextProvider>
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
    </BrowserRouter>
  </React.StrictMode>
)