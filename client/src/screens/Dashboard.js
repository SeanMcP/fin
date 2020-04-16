import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import Query from '../components/Query'
import { Link } from 'react-router-dom'
import { useAppContext } from '../store/AppContext'
import LogOut from '../components/LogOut'
import AddClass from '../components/AddClass'

function Dashboard() {
    const [{ user }] = useAppContext()
    return (
        <ScreenLayout title="Dashboard">
            Hello from <code>/dashboard</code>
            <div>{JSON.stringify(user, null, 2)}</div>
            <Query id="classes" route={`/classes/${user.id}`} />
            <nav>
                <Link to="/">Back to home</Link>
                <LogOut />
            </nav>
            <AddClass />
        </ScreenLayout>
    )
}

export default Dashboard