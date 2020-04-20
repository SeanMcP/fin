import * as React from 'react'
import { useAppContext, APP_ACTIONS } from '../store/AppContext'
import request from '../utils/request'

function useAuthCheck(includeUser = true) {
    const [{ isAuthenticated }, dispatch] = useAppContext()

    React.useEffect(() => {
        async function onLoad() {
            const response = await request('refresh', { body: { includeUser } })

            if (response.ok) {
                dispatch({ type: APP_ACTIONS.LOG_IN, payload: await response.json() })
            } else {
                dispatch({ type: APP_ACTIONS.DEAUTHENTICATE })
            }
        }
        onLoad()
    }, [dispatch, includeUser])

    return isAuthenticated
}

export default useAuthCheck