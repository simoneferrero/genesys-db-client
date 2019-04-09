import React from 'react'
import PropTypes from 'prop-types'
import { playerCharacterType } from 'types/playersCharacters'

import * as yup from 'yup'

import { Form } from 'formik'

import FormButtons from 'components/FormButtons'
import PCSummary from 'components/PCSummary'

import { StyledForm, StyledSectionWrapper } from './styles'

const InnerForm = ({
  editing,
  handleSubmit,
  isSubmitting,
  setEditing,
  setFieldValue,
  values,
}) => (
  <StyledForm as={Form} data-testid="pc-sheet" onSubmit={handleSubmit}>
    <FormButtons
      disabled={isSubmitting}
      editing={editing}
      setEditing={setEditing}
    />
    <StyledSectionWrapper
      as={PCSummary}
      editing={editing}
      hideLink
      isSubmitting={isSubmitting}
      sectionTitle="General"
      setFieldValue={setFieldValue}
      {...values}
    />
  </StyledForm>
)

InnerForm.validationSchema = yup.object({
  // TODO: add other fields
  name: yup.string().required('required'),
})

InnerForm.propTypes = {
  /** Whether the buttons are in editing or static mode */
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
  values: playerCharacterType.isRequired,
}

export default InnerForm
