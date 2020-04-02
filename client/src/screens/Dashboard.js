import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import Query from '../components/Query'
import { Link } from 'react-router-dom'

function Dashboard() {
    return (
        <ScreenLayout title="Dashboard">
            Hello from <code>/dashboard</code>
            <Query id="users" route="http://localhost:3001/users" />
            <Link to="/">Back to home</Link>
        </ScreenLayout>
    )
}

export default Dashboard