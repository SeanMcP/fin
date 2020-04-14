import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppContext, APP_ACTIONS } from '../store/AppContext'
import request from '../utils/request'

function LogIn() {
    const [email, setEmail] = React.useState('chuck@testa.com')
    const [password, setPassword] = React.useState('nope')
    const [, dispatch] = useAppContext()
    const history = useHistory()

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await request('login', {
            body: { email, password }
        })

        if (response.ok) {
            const res = await response.json()
            dispatch({ type: APP_ACTIONS.LOG_IN, payload: { user: res.user } })
            history.push('/dashboard')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <div>
                <label>Email<br /><input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
            </div>
            <div>
                <label>Password<br /><input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
            </div>
            <button>Log In</button>
        </form>
    )
}

export default LogIn