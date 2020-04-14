import React from 'react';
import Router from './Router';
import { APP_ACTIONS, useAppContext } from '../store/AppContext';
import request from '../utils/request';

function App() {
  const [, dispatch] = useAppContext()
  React.useEffect(() => {
    async function authCheck() {
      const response = await request('refresh')

      if (response.ok) dispatch({ type: APP_ACTIONS.AUTHENTICATE })
    }

    authCheck()
  }, [dispatch])
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
