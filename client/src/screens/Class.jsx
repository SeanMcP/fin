import * as React from 'react'
import { useParams } from 'react-router-dom'
import AddStudent from '../components/AddStudent'
import Query from '../components/Query'
import ScreenLayout from '../components/ScreenLayout'

function Class() {
    const { id } = useParams()
    return (
        <ScreenLayout title="Class">
            <Query id="class" route={`/class/${id}`}>
                {({ data }) => {
                    const { name } = data[0]
                    return (
                        <h1>{name}</h1>
                    )
                }}
            </Query>
            <AddStudent classId={id} />
            <Query id="students-in-this-class" route={`/seats/class/${id}`} />
        </ScreenLayout>
    )
}

export default Class