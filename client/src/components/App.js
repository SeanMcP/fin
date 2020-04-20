import React from 'react';
import Router from './Router';
import useAuthCheck from '../hooks/useAuthCheck';

function App() {
  useAuthCheck()

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
