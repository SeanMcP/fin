import * as React from 'react'
import { useParams, Link } from 'react-router-dom'
import AddStudent from '../components/AddStudent'
import Query from '../components/Query'
import ScreenLayout from '../components/ScreenLayout'
// import request from '../utils/request'
import { useAppContext } from '../store/AppContext'

// async function removeFromSection(studentId, sectionId) {
//     const response = await request(`seats/student/${studentId}/section/${sectionId}`, { method: `DELETE` })

//     if (response.ok) {
//         alert('Student removed from section!')
//     } else {
//         alert('Uh oh! Something went wrong.')
//     }
// }

function Students() {
  const [{ user }] = useAppContext()
  const { id } = useParams()
  return (
    <ScreenLayout title="Students">
      <h1>Students</h1>
      <Query id="section" route={`/students/${user.id}`}>
        {({ students }) => {
          if (!students) return null
          return (
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Sections</th>
                </tr>
                {students.map(({ sections, id, name }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>
                      {sections &&
                        sections.map(({ id, name }) => (
                          <Link key={id} to={`section/${id}`}>
                            {name}
                          </Link>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }}
      </Query>
      <AddStudent sectionId={id} />
    </ScreenLayout>
  )
}

export default Students
