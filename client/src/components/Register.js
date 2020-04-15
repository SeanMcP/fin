import React from 'react'
import { useFormik } from 'formik'
import request from '../utils/request'

function Register() {
    const formik = useFormik({
        initialValues: {
            email: `chuck+${String(Math.random()).slice(-5)}@testa.com`,
            password: 'nope'
        },
        async onSubmit({ email, password }) {
            const response = await request('register', {
                body: { email, password }
            })

            if (response.ok) {
                alert('You have successfully regsitered an account. Welcome aboard!')
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Register</h2>
            <div>
                <label>Email<br /><input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} /></label>
            </div>
            <div>
                <label>Password<br /><input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} /></label>
            </div>
            <button>Register</button>
        </form>
    )
}

export default Register