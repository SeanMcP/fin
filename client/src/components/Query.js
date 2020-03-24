import React from 'react'
import { useQuery } from 'react-query'

function Query(props) {
    const { status, data, error } = useQuery(props.id, () =>
        fetch(props.route).then(response => response.json())
    )

    if (status === 'loading') {
        return typeof props.onLoading === 'function' ? props.onLoading() : <span>Loading...</span>
    }

    if (status === 'error') {
        return typeof props.onError === 'function' ? props.onError(error) : <span>Uh oh! There was a problem loading.</span>
    }

    return typeof props.children === 'function' ? props.children(data) : <span>Data: <pre>{JSON.stringify(data, null, 2)}</pre></span>
}

export default Query