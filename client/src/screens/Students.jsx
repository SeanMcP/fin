import * as React from 'react'
import { useParams } from 'react-router-dom'
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
                    return (
                        <ul>
                            {students.map(({ id, name }) => (
                                <li key={id}>{name}</li>
                            ))}
                        </ul>
                    )
                }}
            </Query>
            <AddStudent classId={id} />
        </ScreenLayout>
    )
}

export default Students