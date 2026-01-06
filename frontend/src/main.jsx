import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')).render( //toaster for notification
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster /> 
    </BrowserRouter>
  </StrictMode>,
)
