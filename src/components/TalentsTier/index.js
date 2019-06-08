import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { talentType } from 'types/talents'

import isEmpty from 'lodash/isEmpty'

import { Formik } from 'formik'

import InnerForm from './innerForm'

const TalentsTier = ({
  characterTalents,
  className,
  editing,
  handleSubmit,
  isCharacter,
  isPCSubmitting,
  onTalentChange,
  showAdd,
  talents,
  tier,
}) => {
  const [isNew, setIsNew] = useState(false)

  const augmentedHandleSubmit = (values, actions) =>
    handleSubmit(values, { ...actions, setIsNew })

  const initialValues = {
    id: isEmpty(talents) ? null : Object.values(talents)[0].id,
    isCharacter,
    activation: 'Passive',
    description: '',
    name: '',
    ranked: true,
    tier,
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={augmentedHandleSubmit}
      render={(props) => (
        <InnerForm
          characterTalents={characterTalents}
          className={className}
          editing={editing}
          isCharacter={isCharacter}
          isNew={isNew}
          isPCSubmitting={isPCSubmitting}
          onTalentChange={onTalentChange}
          setIsNew={setIsNew}
          showAdd={showAdd}
          talents={talents}
          tier={tier}
          {...props}
        />
      )}
      validationSchema={InnerForm.validationSchema}
    />
  )
}

TalentsTier.propTypes = {
  /** Talents belonging to a specific character */
  characterTalents: PropTypes.objectOf(talentType),
  /** Custom styles */
  className: PropTypes.string,
  /** Whether talents can be edited */
  editing: PropTypes.bool,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the form is in a character sheet */
  isCharacter: PropTypes.bool,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Function invoked to change existing favor data */
  onTalentChange: PropTypes.func,
  /** Whether to show the Add Talent button */
  showAdd: PropTypes.bool,
  /** Talent data */
  talents: PropTypes.objectOf(talentType).isRequired,
  /** Which tier talents belong to */
  tier: PropTypes.number.isRequired,
}

export default TalentsTier
