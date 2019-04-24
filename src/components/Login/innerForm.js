import React from 'react'
import PropTypes from 'prop-types'

import * as yup from 'yup'

import { Field, Form } from 'formik'

import { StyledForm, StyledField, StyledButton } from './styles'

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars  */
const FilteredStyledField = ({ hasError, ...otherProps }) => (
  <Field {...otherProps} />
)
/* eslint-enable */

const InnerForm = ({ errors, handleSubmit, isSubmitting, touched }) => {
  const USERNAME = 'username'
  const usernameError = errors[USERNAME] && touched[USERNAME]

  const PASSWORD = 'password'
  const passwordError = errors[PASSWORD] && touched[PASSWORD]

  return (
    <StyledForm as={Form} data-testid="login" onSubmit={handleSubmit}>
      <label htmlFor={USERNAME}>
        <StyledField
          as={FilteredStyledField}
          data-testid={USERNAME}
          hasError={usernameError}
          id={USERNAME}
          name={USERNAME}
          placeholder="Username"
        />
      </label>
      <label htmlFor={PASSWORD}>
        <StyledField
          as={FilteredStyledField}
          data-testid={PASSWORD}
          hasError={passwordError}
          id={PASSWORD}
          name={PASSWORD}
          placeholder="Password"
          type="password"
        />
      </label>
      <StyledButton
        data-testid="login-button"
        disabled={isSubmitting}
        type="submit"
      >
        <h4>Login</h4>
      </StyledButton>
      {errors.mainError && <p data-testid="login-error">{errors.mainError}</p>}
    </StyledForm>
  )
}

InnerForm.validationSchema = yup.object({
  password: yup.string().required('required'),
  username: yup.string().required('required'),
})

InnerForm.propTypes = {
  /** Login field errors */
  errors: PropTypes.object.isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Which fields have been touched */
  touched: PropTypes.object.isRequired,
}

export default InnerForm
