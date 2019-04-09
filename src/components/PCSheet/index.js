import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { playerCharacterType } from 'types/playersCharacters'

import { Formik } from 'formik'

import InnerForm from './innerForm'

// TODO: extract as separate component?
const PCSheet = ({ handleSubmit, playerCharacter }) => {
  const [editing, setEditing] = useState(false)
  const augmentedHandleSubmit = (values, actions) =>
    handleSubmit(values, { ...actions, setEditing })

  return (
    <Formik
      enableReinitialize
      initialValues={playerCharacter}
      onSubmit={augmentedHandleSubmit}
      render={(props) => (
        <InnerForm editing={editing} setEditing={setEditing} {...props} />
      )}
      validationSchema={InnerForm.validationSchema}
    />
  )
}

PCSheet.propTypes = {
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Player character data */
  playerCharacter: playerCharacterType.isRequired,
}

export default PCSheet
