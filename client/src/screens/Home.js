import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import Query from '../components/Query'
import Login from '../components/Login'
import Register from '../components/Register'

function Home() {
    return (
        <ScreenLayout>
            Hello from <code>/home</code>
            <Query id="users" route="/users" />
            <hr />
            <Register />
            <hr />
            <Login />
        </ScreenLayout>
    )
}

export default Home