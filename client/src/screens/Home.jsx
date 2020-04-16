import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import LogIn from '../components/LogIn'
import Register from '../components/Register'

function Home() {
    return (
        <ScreenLayout>
            <h1>Home</h1>
            <hr />
            <Register />
            <hr />
            <LogIn />
        </ScreenLayout>
    )
}

export default Home