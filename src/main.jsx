import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs';



ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter> 
  <StyleProvider>
  <App />
  </StyleProvider>
  </BrowserRouter>,

)
