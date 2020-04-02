import React from 'react'
import { useHistory } from 'react-router-dom'

function Login() {
    const [email, setEmail] = React.useState('chuck@testa.com')
    const [password, setPassword] = React.useState('nope')
    const history = useHistory()

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:3001/login', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email, password })
        })

        if (response.ok) {
            history.push('/dashboard')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label>Email<br /><input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
            </div>
            <div>
                <label>Password<br /><input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
            </div>
            <button>Login</button>
        </form>
    )
}

export default Login