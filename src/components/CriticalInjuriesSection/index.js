import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { criticalInjuryType } from 'types/criticalInjuries'

import isEmpty from 'lodash/isEmpty'

import { Formik } from 'formik'

import InnerForm from './innerForm'

const CriticalInjuriesSection = ({
  characterCriticalInjuries,
  className,
  deletedCriticalInjuries,
  editing,
  handleSubmit,
  isCharacter,
  isPCSubmitting,
  onCriticalInjuryChange,
  criticalInjuries,
}) => {
  const [isNew, setIsNew] = useState(false)

  const augmentedHandleSubmit = (values, actions) =>
    handleSubmit(values, { ...actions, setIsNew })

  const initialValues = {
    id: isEmpty(criticalInjuries)
      ? null
      : Object.values(criticalInjuries)[0].id,
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={augmentedHandleSubmit}
      render={(props) => (
        <InnerForm
          characterCriticalInjuries={characterCriticalInjuries}
          className={className}
          deletedCriticalInjuries={deletedCriticalInjuries}
          editing={editing}
          isCharacter={isCharacter}
          isNew={isNew}
          isPCSubmitting={isPCSubmitting}
          onCriticalInjuryChange={onCriticalInjuryChange}
          setIsNew={setIsNew}
          criticalInjuries={criticalInjuries}
          {...props}
        />
      )}
      validationSchema={InnerForm.validationSchema}
    />
  )
}

CriticalInjuriesSection.propTypes = {
  /** Critical injuries belonging to a specific character */
  characterCriticalInjuries: PropTypes.objectOf(criticalInjuryType),
  /** Custom styles */
  className: PropTypes.string,
  /** Critical injuries data */
  criticalInjuries: PropTypes.arrayOf(criticalInjuryType).isRequired,
  /** Which critical injuries will be deleted */
  deletedCriticalInjuries: PropTypes.objectOf(PropTypes.bool),
  /** Whether critical injuries are being edited */
  editing: PropTypes.bool,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the form is in a character sheet */
  isCharacter: PropTypes.bool,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Function invoked to change critical injury data */
  onCriticalInjuryChange: PropTypes.func,
}

CriticalInjuriesSection.defaultProps = {
  characterCriticalInjuries: {},
  deletedCriticalInjuries: {},
}

export default CriticalInjuriesSection
