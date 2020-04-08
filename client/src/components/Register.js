import React from 'react'

function Register() {
    const [email, setEmail] = React.useState('chuck@testa.com')
    const [password, setPassword] = React.useState('nope')

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:3031/register', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email, password })
        })

        if (response.ok) {
            alert('You have successfully regsitered an account. Welcome aboard!')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label>Email<br /><input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
            </div>
            <div>
                <label>Password<br /><input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
            </div>
            <button>Register</button>
        </form>
    )
}

export default Register