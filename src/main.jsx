import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

import App from './components/App.jsx'

axios.defaults.baseURL = 'http://localhost:3004/'
//axios.get('/users')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
