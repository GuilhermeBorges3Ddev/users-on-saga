import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import rootSaga from './sagas/index.js'
import reducers from './reducers/index.js'
import createSagaMiddleware from 'redux-saga'

import "bootstrap/dist/css/bootstrap.min.css";

import App from './components/App.jsx'

axios.defaults.baseURL = 'http://localhost:3004/'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
)
