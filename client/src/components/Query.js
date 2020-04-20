import React from 'react'
import { useQuery } from 'react-query'

function Query({ route, ...props }) {
    const { status, data, error } = useQuery(props.id, () =>
        fetch(`${process.env.REACT_APP_API_URL}/${route[0] === '/' ? route.slice(1) : route}`, { credentials: 'include' }).then(response => response.json())
    )

    if (status === 'loading') {
        return typeof props.onLoading === 'function' ? props.onLoading() : <span>Loading...</span>
    }

    if (status === 'error') {
        return typeof props.onError === 'function' ? props.onError(error) : <span>Uh oh! There was a problem loading.</span>
    }

    if (data) return typeof props.children === 'function' ? props.children(data) : <span>Data: <pre>{JSON.stringify(data, null, 2)}</pre></span>

    return <span>Something went wrong</span>
}

export default Query