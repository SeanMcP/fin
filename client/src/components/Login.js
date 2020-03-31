import React from 'react'

function Login() {
    const [email, setEmail] = React.useState('chuck@testa.com')
    const [password, setPassword] = React.useState('nope')

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:3001/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email, password })
        })

        // TODO: Navigate based on response status.
        console.log('response', response)
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