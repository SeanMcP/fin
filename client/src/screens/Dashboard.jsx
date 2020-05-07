import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import Query from '../components/Query'
import { useAppContext } from '../store/AppContext'
import AddSection from '../components/AddSection'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [{ user }] = useAppContext()
  return (
    <ScreenLayout title="Dashboard">
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Query id="sections" route={`/sections/${user.id}`}>
        {({ sections }) => (
          <nav aria-label="sections navigation">
            <h2>Sections</h2>
            <ul>
              {sections.map(({ id, name }) => (
                <li key={id}>
                  <Link to={`/section/${id}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Query>
      <hr />
      <AddSection />
    </ScreenLayout>
  )
}

export default Dashboard
