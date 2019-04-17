import React from 'react'
import PropTypes from 'prop-types'
import { favorType } from 'types/favors'

import { Formik } from 'formik'

import InnerForm from './innerForm'

const Favor = ({ editing, favor, handleSubmit, setEditing }) => {
  // TODO: These must be passed down from parent
  // const [editing, setEditing] = useState(false)
  // const augmentedHandleSubmit = (values, actions) =>
  //   handleSubmit(values, { ...actions, setEditing })

  return (
    <Formik
      enableReinitialize
      initialValues={favor}
      onSubmit={handleSubmit}
      render={(props) => (
        <InnerForm editing={editing} setEditing={setEditing} {...props} />
      )}
      validationSchema={InnerForm.validationSchema}
    />
  )
}

Favor.propTypes = {
  /** Whether to show the editing buttons */
  editing: PropTypes.bool,
  /** Favor data */
  favor: favorType.isRequired,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Changes the mode between editing and static */
  setEditing: PropTypes.func.isRequired,
}

export default Favor
