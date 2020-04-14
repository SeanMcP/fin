import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
// import Query from '../components/Query's
import LogIn from '../components/LogIn'
import Register from '../components/Register'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <ScreenLayout>
            Hello from <code>/home</code>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
            </nav>
            {/* <Query id="users" route="/users" /> */}
            <hr />
            <Register />
            <hr />
            <LogIn />
        </ScreenLayout>
    )
}

export default Home