import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext, APP_ACTIONS } from '../store/AppContext'
import request from '../utils/request'

function LogOut() {
    const [, dispatch] = useAppContext()
    async function handleLogOut() {
        await request('clear')
        dispatch({ type: APP_ACTIONS.LOG_OUT })
    }
    return <Link onClick={handleLogOut} to="/">Log Out</Link>
}

export default LogOut