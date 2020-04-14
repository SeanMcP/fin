function request(endpoint, { body, ...customConfig } = {}) {
    const headers = { 'Content-Type': 'application/json' }
    const config = {
        credentials: 'include',
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        }
    }

    if (body) config.body = JSON.stringify(body)

    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
}

export default request