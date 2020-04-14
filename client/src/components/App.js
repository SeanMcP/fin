import React from 'react';
import Router from './Router';
import { APP_ACTIONS, useAppContext } from '../store/AppContext';

function App() {
  const [, dispatch] = useAppContext()
  React.useEffect(() => {
    async function authCheck() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh`, { credentials: 'include' })

      if (response.ok) dispatch({ type: APP_ACTIONS.AUTHENTICATE })
    }

    authCheck()
  }, [])
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
