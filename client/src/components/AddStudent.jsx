import * as React from 'react'
import InputGroup from './InputGroup'
import { useFormik } from 'formik'
import { useAppContext } from '../store/AppContext'
import request from '../utils/request';

function AddStudent({ classId }) {
    const [{ user }] = useAppContext();

    const formik = useFormik({
        initialValues: {
            name: 'Sam W.'
        },
        async onSubmit({ name }) {
            const response = await request('student/class', {
                body: { classId, name, userId: user.id }
            })

            if (response.ok) {
                alert(`${name} was successfully added!`)
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Add a student</h2>
            <InputGroup name="name" onChange={formik.handleChange} value={formik.values.name} />
            <button>Add</button>
        </form>
    )
}

export default AddStudent