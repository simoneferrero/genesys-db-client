import React from 'react'
import PropTypes from 'prop-types'
import { playerCharacterType } from 'types/playersCharacters'

import { Formik } from 'formik'

import InnerForm from './innerForm'

// TODO: extract as separate component?
const PCSheet = ({ handleSubmit, playerCharacter }) => (
  <Formik
    enableReinitialize
    initialValues={playerCharacter}
    onSubmit={handleSubmit}
    render={(props) => <InnerForm {...props} />}
    validationSchema={InnerForm.validationSchema}
  />
)

PCSheet.propTypes = {
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Player character data */
  playerCharacter: playerCharacterType.isRequired,
}

export default PCSheet
