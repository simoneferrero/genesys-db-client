import React from 'react'
import PropTypes from 'prop-types'
import { playerCharacterData } from 'types/playersCharacters'
import { skillType } from 'types/skills'
import { factionType } from 'types/factions'
import { favorType } from 'types/favors'

import * as yup from 'yup'

import { Form } from 'formik'

import FormButtons from 'components/FormButtons'
import PCSummary from 'components/PCSummary'
import Skills from 'components/Skills'
import Favors from 'components/Favors'

import { StyledForm, StyledFormButtons, StyledSectionWrapper } from './styles'

const InnerForm = ({
  addFavor,
  editing,
  factions,
  handleSubmit,
  initialValues,
  isSubmitting,
  setEditing,
  setFieldValue,
  values,
}) => (
  <StyledForm as={Form} data-testid="pc-sheet" onSubmit={handleSubmit}>
    <StyledFormButtons
      as={FormButtons}
      disabled={isSubmitting}
      name="pc-sheet"
      showButtons={editing}
      setShowButtons={setEditing}
    />
    <StyledSectionWrapper
      as={PCSummary}
      editing={editing}
      hideLink
      isSubmitting={isSubmitting}
      sectionTitle="General"
      setFieldValue={setFieldValue}
      {...(editing ? values : initialValues)}
    />
    <StyledSectionWrapper
      as={Skills}
      editing={editing}
      initialSkills={initialValues.skills}
      isSubmitting={isSubmitting}
      onChange={setFieldValue}
      sectionTitle="Skills"
      skills={values.skills}
    />
    <StyledSectionWrapper
      as={Favors}
      editing={editing}
      factions={factions}
      favors={editing ? values.favors : initialValues.favors}
      handleSubmit={addFavor}
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      sectionTitle="Favors"
    />
  </StyledForm>
)

InnerForm.validationSchema = yup.object({
  // TODO: add other fields
  name: yup.string().required('required'),
})

InnerForm.propTypes = {
  /** Invoked when adding a favor */
  addFavor: PropTypes.func.isRequired,
  /** Whether the buttons are in editing or static mode */
  editing: PropTypes.bool,
  /** Errors within the form */
  errors: PropTypes.object.isRequired,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Form initial values */
  initialValues: PropTypes.object.isRequired,
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
  values: PropTypes.shape({
    ...playerCharacterData,
    favors: PropTypes.objectOf(favorType).isRequired,
    skills: PropTypes.objectOf(skillType).isRequired,
  }).isRequired,
}

export default InnerForm
