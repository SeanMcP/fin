import * as React from 'react'
import InputGroup from './InputGroup'
import { useFormik } from 'formik'
import { useAppContext } from '../store/AppContext'
import request from '../utils/request';

function AddClass() {
    const [{ user }] = useAppContext();

    const formik = useFormik({
        initialValues: {
            name: 'Biology'
        },
        async onSubmit({ name }) {
            const response = await request('class', {
                body: { name, user_id: user.id }
            })

            if (response.ok) {
                alert('Yeah!')
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Add a class</h2>
            <InputGroup name="name" onChange={formik.handleChange} value={formik.values.name} />
            <button>Add</button>
        </form>
    )
}

export default AddClass