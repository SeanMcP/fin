import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'styles/index.css'
import App from './components/App'
import { AppContextProvider } from './store/AppContext'
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// serviceWorker.unregister();
