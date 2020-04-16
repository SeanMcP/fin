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
        <div>
            <header>
                <Link to="/">Fin</Link>
                {isAuthenticated && <nav aria-label="main navigation"><Link to="/dashboard">Dashboard</Link><LogOut /></nav>}
            </header>
            <main>{props.children}</main>
        </div>
    )
}

export default ScreenLayout