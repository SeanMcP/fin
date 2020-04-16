import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import Query from '../components/Query'
import { useAppContext } from '../store/AppContext'
import AddClass from '../components/AddClass'
import { Link } from 'react-router-dom'

function Dashboard() {
    const [{ user }] = useAppContext()
    return (
        <ScreenLayout title="Dashboard">
            <h1>Dashboard</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <Query id="classes" route={`/classes/${user.id}`}>
                {({ data }) => (
                    <nav aria-label="classes navigation">
                        <ul>
                            {data.map(({ id, name }) => <li key={id}><Link to={`/class/${id}`}>{name}</Link></li>)}
                        </ul>
                    </nav>
                )}
            </Query>
            <hr />
            <AddClass />
        </ScreenLayout>
    )
}

export default Dashboard