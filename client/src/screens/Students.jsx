import * as React from 'react'
import { useParams, Link } from 'react-router-dom'
import AddStudent from '../components/AddStudent'
import Query from '../components/Query'
import ScreenLayout from '../components/ScreenLayout'
// import request from '../utils/request'
import { useAppContext } from '../store/AppContext'

// async function removeFromClass(studentId, classId) {
//     const response = await request(`seats/student/${studentId}/class/${classId}`, { method: `DELETE` })

//     if (response.ok) {
//         alert('Student removed from class!')
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
            <Query id="class" route={`/students/${user.id}`}>
                {({ students }) => {
                    if (!students) return null
                    return (
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Classes</th>
                                </tr>
                                {students.map(({ classes, id, name }) => (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>
                                            {classes && classes.map(
                                                ({ id, name }) => <Link key={id} to={`class/${id}`}>{name}</Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }}
            </Query>
            <AddStudent classId={id} />
        </ScreenLayout>
    )
}

export default Students