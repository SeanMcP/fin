import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import Query from '../components/Query'
import Login from '../components/Login'

function Home() {
    return (
        <ScreenLayout>
            Hello from <code>/home</code>
            <Query id="users" route="http://localhost:3001/users" />
            <form action="http://localhost:3001/register" method="post">
                <h2>Register</h2>
                <div>
                    <label>Email<br /><input type="text" name="email" /></label>
                </div>
                <div>
                    <label>Password<br /><input type="password" name="password" /></label>
                </div>
                <button>Register</button>
            </form>
            <hr />
            <Login />
        </ScreenLayout>
    )
}

export default Home