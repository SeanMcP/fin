import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import Query from '../components/Query'

function Home() {
    return (
        <ScreenLayout>
            Hello from <code>/home</code>
            <Query id="users" route="http://localhost:3001/users" />
        </ScreenLayout>
    )
}

export default Home