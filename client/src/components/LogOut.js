import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext, APP_ACTIONS } from '../store/AppContext'

function LogOut() {
    const [, dispatch] = useAppContext()
    async function handleLogOut() {
        await fetch(`${process.env.REACT_APP_API_URL}/clear`, { credentials: 'include' })
        dispatch({ type: APP_ACTIONS.LOG_OUT })
    }
    return <Link onClick={handleLogOut} to="/">Log Out</Link>
}

export default LogOut