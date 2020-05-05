import * as React from 'react'
import { history, useParams, Redirect } from 'react-router-dom'
import AddStudent from '../components/AddStudent'
import Query from '../components/Query'
import ScreenLayout from '../components/ScreenLayout'
import request from '../utils/request'

async function removeFromClass(studentId, classId) {
  const response = await request(
    `seats/student/${studentId}/class/${classId}`,
    { method: `DELETE` },
  )

  if (response.ok) {
    alert('Student removed from class!')
  } else {
    alert('Uh oh! Something went wrong.')
  }
}

async function deleteClass(classId, next) {
  if (window.confirm('Are you sure that you want to delete this class?')) {
    const response = await request(`class/${classId}`, { method: 'DELETE' })

    const { success } = await response.json()

    if (success) {
      alert('Class deleted')
      next()
    } else {
      alert('Uh oh! Something went wrong.')
    }
  }
}

function Class() {
  const { id } = useParams()
  const [doRedirect, setDoRedirect] = React.useState(false)

  if (doRedirect) return <Redirect to="/dashboard" />

  return (
    <ScreenLayout title="Class">
      <Query id="class" route={`/class/${id}`}>
        {({ data }) => {
          if (!data) return null
          const { name } = data[0]
          return <h1>{name}</h1>
        }}
      </Query>
      <AddStudent classId={id} />
      <h2>Students</h2>
      <Query id="students-in-this-class" route={`/seats/class/${id}`}>
        {({ students }) => {
          return (
            <ul>
              {students.map(({ name, id: studentId }) => (
                <li key={studentId}>
                  {name}
                  <button onClick={() => removeFromClass(studentId, id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )
        }}
      </Query>
      <hr />
      <button onClick={() => deleteClass(id, () => setDoRedirect(true))}>
        Delete class
      </button>
    </ScreenLayout>
  )
}

export default Class
