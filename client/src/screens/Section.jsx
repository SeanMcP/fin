import * as React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import AddStudent from '../components/AddStudent'
import Query from '../components/Query'
import ScreenLayout from '../components/ScreenLayout'
import request from '../utils/request'

async function removeFromSection(studentId, sectionId) {
  const response = await request(
    `seats/student/${studentId}/section/${sectionId}`,
    { method: `DELETE` },
  )

  if (response.ok) {
    alert('Student removed from section!')
  } else {
    alert('Uh oh! Something went wrong.')
  }
}

async function deleteSection(sectionId, next) {
  if (window.confirm('Are you sure that you want to delete this section?')) {
    const response = await request(`section/${sectionId}`, { method: 'DELETE' })

    const { success } = await response.json()

    if (success) {
      alert('Section deleted')
      next()
    } else {
      alert('Uh oh! Something went wrong.')
    }
  }
}

function Section() {
  const { id } = useParams()
  const [doRedirect, setDoRedirect] = React.useState(false)

  if (doRedirect) return <Redirect to="/dashboard" />

  return (
    <ScreenLayout title="Section">
      <Query id={['section', id]} route={`/section/${id}`}>
        {({ section }) => {
          if (!section) return null
          const { name } = section[0]
          return <h1>{name}</h1>
        }}
      </Query>
      <AddStudent sectionId={id} />
      <Query
        id={['students not in section', id]}
        route={`/students/not/section/${id}`}
      >
        {({ students }) => {
          return (
            <ul>
              {students.map((student) => (
                <li key={student.id}>
                  {student.name}{' '}
                  <AddExistingStudentToSectionButton
                    sectionId={id}
                    studentId={student.id}
                  />
                </li>
              ))}
            </ul>
          )
        }}
      </Query>
      <h2>Students</h2>
      <Query id={['students in section', id]} route={`/seats/section/${id}`}>
        {({ students }) => {
          return (
            <ul>
              {students.map(({ name, id: studentId }) => (
                <li key={studentId}>
                  {name}
                  <button onClick={() => removeFromSection(studentId, id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )
        }}
      </Query>
      <hr />
      <button onClick={() => deleteSection(id, () => setDoRedirect(true))}>
        Delete section
      </button>
    </ScreenLayout>
  )
}

function AddExistingStudentToSectionButton({ sectionId, studentId }) {
  async function handleClick(e) {
    e.preventDefault()

    const response = await request('seat', { body: { sectionId, studentId } })

    if (response.ok) {
      alert('Yeah')
    } else {
      alert('Boo')
    }
  }

  return <button onClick={handleClick}>Add</button>
}

export default Section
