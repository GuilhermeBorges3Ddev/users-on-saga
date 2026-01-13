import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider} from 'react-redux'
import reducers from './reducers/index.js'

import App from './components/App.jsx'

axios.defaults.baseURL = 'http://localhost:3004/'

const store = createStore(reducers)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
