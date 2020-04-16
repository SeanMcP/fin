import * as React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import Query from '../components/Query'
import { useParams } from 'react-router-dom'

function Class(props) {
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
        </ScreenLayout>
    )
}

export default Class