import React from 'react';
import Router from './Router';
import { AppContextProvider } from '../store/AppContext';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </div>
  );
}

export default App;
