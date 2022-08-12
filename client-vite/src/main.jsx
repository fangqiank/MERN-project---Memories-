import React from 'react' 
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {store} from './store'
// import reducers from './reducers'

const initialsState = {}

// redux store
// const store = createStore(
//   reducers, 
//   initialsState, 
//   compose(applyMiddleware(thunk))
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
