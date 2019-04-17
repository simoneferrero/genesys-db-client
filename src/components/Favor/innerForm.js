import React from 'react'
import PropTypes from 'prop-types'
import { favorType } from 'types/favors'

import * as yup from 'yup'

import { Form, Field } from 'formik'
import FormButtons from 'components/FormButtons'

import { StyledButtons, StyledForm } from './styles'

/* eslint-disable no-unused-vars  */
/* eslint-disable react/prop-types  */
const FilteredForm = ({ completed, editing, ...otherProps }) => (
  <Form {...otherProps} />
)
/* eslint-enable */

const InnerForm = ({
  editing,
  handleSubmit,
  values: { description, faction, completed, type },
}) => (
  <StyledForm
    as={FilteredForm}
    completed={completed}
    data-testid="favor"
    editing={editing}
    onSubmit={handleSubmit}
  >
    {editing ? (
      <>
        <label htmlFor="type">
          <Field name="type" />
        </label>
        <label htmlFor="faction">
          <Field name="faction" />
        </label>
        <label htmlFor="description">
          <Field component="textarea" name="description" rows={4} />
        </label>
        <StyledButtons as={FormButtons} />
      </>
    ) : (
      <>
        <h4>{type}</h4>
        <h4>{faction}</h4>
        <div>{description}</div>
      </>
    )}
  </StyledForm>
)

InnerForm.validationSchema = yup.object({
  description: yup.string().required('required'),
  faction: yup.string().required('required'),
  type: yup.string().required('required'),
})

InnerForm.propTypes = {
  /** Whether to show the editing buttons */
  editing: PropTypes.bool,
  /** Errors within the form */
  errors: PropTypes.object.isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the mode between editing and static */
  setEditing: PropTypes.func.isRequired,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
  /** Touched fields */
  touched: PropTypes.object.isRequired,
  /** Form values */
  values: favorType.isRequired,
}

export default InnerForm
