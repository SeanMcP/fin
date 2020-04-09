import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import Query from '../components/Query'
import { Link } from 'react-router-dom'
import { useAppContext } from '../store/AppContext'

function Dashboard() {
    const [state] = useAppContext()
    return (
        <ScreenLayout title="Dashboard">
            Hello from <code>/dashboard</code>
            <div>{JSON.stringify(state.user, null, 2)}</div>
            <Query id="users" route="/users" />
            <Link to="/">Back to home</Link>
        </ScreenLayout>
    )
}

export default Dashboard