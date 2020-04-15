import React from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { useAppContext, APP_ACTIONS } from '../store/AppContext'
import request from '../utils/request'

function LogIn() {
    const [, dispatch] = useAppContext()
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            email: 'chuck@testa.com',
            password: 'nope'
        },
        async onSubmit({ email, password }) {
            const response = await request('login', {
                body: { email, password }
            })

            if (response.ok) {
                const { user } = await response.json()
                dispatch({ type: APP_ACTIONS.LOG_IN, payload: { user } })
                history.push('/dashboard')
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Log In</h2>
            <div>
                <label>Email<br /><input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} /></label>
            </div>
            <div>
                <label>Password<br /><input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} /></label>
            </div>
            <button>Log In</button>
        </form>
    )
}

export default LogIn