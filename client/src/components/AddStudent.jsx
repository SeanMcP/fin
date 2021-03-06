import * as React from 'react'
import InputGroup from './InputGroup'
import { useFormik } from 'formik'
import { useAppContext } from '../store/AppContext'
import request from '../utils/request'

function AddStudent({ sectionId }) {
  const [{ user }] = useAppContext()

  const formik = useFormik({
    initialValues: {
      name: 'Sam W.',
    },
    async onSubmit({ name }) {
      let route = 'student',
        body = { name, userId: user.id }
      if (sectionId) {
        route += '/section'
        body.sectionId = sectionId
      }
      const response = await request(route, { body })

      if (response.ok) {
        alert(`${name} was successfully added!`)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Add a student</h2>
      <InputGroup
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <button>Add</button>
    </form>
  )
}

export default AddStudent
