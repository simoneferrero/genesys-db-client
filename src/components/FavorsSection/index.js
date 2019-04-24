import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { factionType } from 'types/factions'
import { favorType } from 'types/favors'

import { Formik } from 'formik'

import InnerForm from './innerForm'

const FavorsSection = ({
  editing,
  factions,
  favors,
  handleSubmit,
  isPCSubmitting,
  onFavorChange,
  type,
}) => {
  const [isNew, setIsNew] = useState(false)

  const initialFaction = Object.values(factions)[0] || {}
  const augmentedHandleSubmit = (values, actions) =>
    handleSubmit(values, { ...actions, setIsNew })

  const initialValues = {
    description: '',
    faction_id: initialFaction.id,
    size: 'small',
    status: 'incomplete',
    type,
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={augmentedHandleSubmit}
      render={(props) => (
        <InnerForm
          isNew={isNew}
          editing={editing}
          factions={factions}
          favors={favors}
          isPCSubmitting={isPCSubmitting}
          onFavorChange={onFavorChange}
          type={type}
          setIsNew={setIsNew}
          {...props}
        />
      )}
      validationSchema={InnerForm.validationSchema}
    />
  )
}

FavorsSection.propTypes = {
  /** Whether favors can be edited */
  editing: PropTypes.bool,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Favors data */
  favors: PropTypes.arrayOf(favorType).isRequired,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether to show the new favor form */
  isNew: PropTypes.bool,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Function invoked to change existing favor data */
  onFavorChange: PropTypes.func.isRequired,
  /** The type of favors in the section */
  type: PropTypes.oneOf(['owed', 'given']).isRequired,
}

export default FavorsSection
