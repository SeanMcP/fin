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
            const response = await request('student', {
                body: { name, user_id: user.id }
            })

            if (response.ok) {
                const { student } = await response.json()

                const response2 = await request('seat', {
                    body: { class_id: classId, student_id: student.id }
                })

                if (response2.ok) {
                    alert('Yeah!')
                }
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