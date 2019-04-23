import React from 'react'
import PropTypes from 'prop-types'

import { Formik } from 'formik'

import InnerForm from './innerForm'

const Login = ({ handleSubmit }) => (
  <Formik
    initialValues={{
      password: '',
      username: '',
    }}
    onSubmit={handleSubmit}
    render={(props) => <InnerForm {...props} />}
    validationSchema={InnerForm.validationSchema}
  />
)

Login.propTypes = {
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
}

export default Login
