import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import './assets/styles/index.scss'
import ToastContainerComponent from './components/ToastContainer'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainerComponent />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
