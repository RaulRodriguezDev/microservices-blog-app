import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../public/index.css'
import 'semantic-ui-css/semantic.min.css'
import { AppProvider } from './context/AppContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
