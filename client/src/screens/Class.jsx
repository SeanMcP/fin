import * as React from 'react'
import { useParams } from 'react-router-dom'
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

function Class() {
  const { id } = useParams()
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
    </ScreenLayout>
  )
}

export default Class
