import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reducers from './reducers'

const initialsState = {}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialsState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
