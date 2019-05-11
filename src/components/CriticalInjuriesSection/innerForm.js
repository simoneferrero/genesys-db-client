import React from 'react'
import PropTypes from 'prop-types'
import { criticalInjuryType } from 'types/criticalInjuries'

import * as yup from 'yup'

import CriticalInjury from 'components/CriticalInjury'
import FormButtons from 'components/FormButtons'
import { MdAdd, MdCheck, MdClose } from 'react-icons/md'
import Select from 'components/Select'

import { StyledContainer, StyledForm, StyledSubHeader } from './styles'

const InnerForm = ({
  characterCriticalInjuries,
  className,
  deletedCriticalInjuries,
  editing,
  handleSubmit,
  isCharacter,
  isNew,
  isPCSubmitting,
  isSubmitting,
  onCriticalInjuryChange,
  resetForm,
  setFieldValue,
  setIsNew,
  values,
  criticalInjuries,
}) => {
  const buttonsIcons = {
    cancel: <MdClose />,
    edit: <MdAdd />,
    submit: <MdCheck />,
  }
  const CRITICAL_INJURY_ID = 'id'
  const criticalInjuryIdOptions = Object.values(criticalInjuries).map(
    ({ id, name }) => ({
      label: name,
      value: id,
    }),
  )
  const newCriticalInjury = (
    <label data-testid="criticalInjuryId" htmlFor={CRITICAL_INJURY_ID}>
      <Select
        currentValue={values[CRITICAL_INJURY_ID]}
        disabled={isSubmitting}
        id={CRITICAL_INJURY_ID}
        name={CRITICAL_INJURY_ID}
        onChange={setFieldValue}
        options={criticalInjuryIdOptions}
      />
    </label>
  )
  const mappedCriticalInjuries = (isCharacter
    ? Object.values(characterCriticalInjuries)
    : criticalInjuries
  ).map((criticalInjury) => (
    <CriticalInjury
      deleting={deletedCriticalInjuries[criticalInjury.id]}
      editing={editing}
      isCharacter={isCharacter}
      isSubmitting={isPCSubmitting}
      key={criticalInjury.id}
      setFieldValue={onCriticalInjuryChange}
      criticalInjury={criticalInjury}
    />
  ))

  return (
    <StyledForm className={className} data-testid="criticalInjuries-section">
      {isCharacter && (
        <StyledSubHeader>
          <FormButtons
            disabled={isSubmitting}
            handleCancel={resetForm}
            handleSubmit={handleSubmit}
            icons={buttonsIcons}
            name="criticalInjury"
            setShowButtons={setIsNew}
            showButtons={isNew}
          />
        </StyledSubHeader>
      )}
      <StyledContainer>
        {isNew && newCriticalInjury}
        {mappedCriticalInjuries}
      </StyledContainer>
    </StyledForm>
  )
}

InnerForm.validationSchema = yup.object({
  id: yup.string().required('required'),
})

InnerForm.propTypes = {
  /** Critical injuries belonging to a specific character */
  characterCriticalInjuries: PropTypes.objectOf(criticalInjuryType),
  /** Custom styles */
  className: PropTypes.string,
  /** Critical injuries data */
  criticalInjuries: PropTypes.arrayOf(criticalInjuryType).isRequired,
  /** Which critical injuries will be deleted */
  deletedCriticalInjuries: PropTypes.objectOf(PropTypes.bool),
  /** Whether critical injuries can be edited */
  editing: PropTypes.bool,
  /** New critical injury errors */
  errors: PropTypes.object.isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the form is in a character sheet */
  isCharacter: PropTypes.bool,
  /** Whether to show the new critical injury form */
  isNew: PropTypes.bool,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Whether the new critical injury is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing critical injury data */
  onCriticalInjuryChange: PropTypes.func,
  /** Resets the form to initial values */
  resetForm: PropTypes.func.isRequired,
  /** Shows or hides the new critical injury form */
  setIsNew: PropTypes.func.isRequired,
  /** Changes the specified new critical injury field value */
  setFieldValue: PropTypes.func.isRequired,
  /** New critical injury values */
  values: PropTypes.object.isRequired,
}

export default InnerForm
