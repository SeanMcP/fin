import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../store/AppContext'
import LogOut from './LogOut'

function ScreenLayout(props) {
  const [{ isAuthenticated }] = useAppContext()
  useEffect(() => {
    let title = 'Fin'
    if (props.title) {
      title = props.title + ' - ' + title
    }
    document.title = title
  }, [props.title])

  return (
    <div className="ScreenLayout">
      <header>
        <div className="content">
          <Link to="/">Fin</Link>
          {isAuthenticated && (
            <React.Fragment>
              <nav aria-label="main navigation">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/students">Students</Link>
              </nav>
              <div className="account">
                <LogOut />
              </div>
            </React.Fragment>
          )}
        </div>
      </header>
      <main id="main">
        <div className="content">{props.children}</div>
      </main>
    </div>
  )
}

export default ScreenLayout
