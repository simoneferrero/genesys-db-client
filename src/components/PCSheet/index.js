import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { factionType } from 'types/factions'
import { playerCharacterType } from 'types/playersCharacters'

import keyBy from 'lodash/keyBy'

import { Formik } from 'formik'

import InnerForm from './innerForm'

// TODO: extract as separate component?
const PCSheet = ({
  addFavor,
  factions,
  handleSubmit,
  playerCharacter: { favors, skills, ...playerCharacter },
}) => {
  const [editing, setEditing] = useState(false)
  const augmentedHandleSubmit = (values, actions) =>
    handleSubmit(values, { ...actions, setEditing })

  const initialValues = {
    ...playerCharacter,
    favors: keyBy(favors, 'id'),
    skills: keyBy(skills, 'id'),
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={augmentedHandleSubmit}
      render={(props) => (
        <InnerForm
          addFavor={addFavor}
          editing={editing}
          factions={factions}
          setEditing={setEditing}
          {...props}
        />
      )}
      validationSchema={InnerForm.validationSchema}
    />
  )
}

PCSheet.propTypes = {
  /** Invoked when adding a favor */
  addFavor: PropTypes.func.isRequired,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Player character data */
  playerCharacter: playerCharacterType.isRequired,
}

export default PCSheet
