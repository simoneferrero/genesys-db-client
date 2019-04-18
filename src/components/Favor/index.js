import React from 'react'
import PropTypes from 'prop-types'
import { favorType } from 'types/favors'

import { Formik } from 'formik'

import InnerForm from './innerForm'

const Favor = ({
  adding,
  editing,
  favor,
  handleSubmit,
  onFavorChange,
  setAdding,
}) => {
  // TODO: These must be passed down from parent
  // const [adding, setAdding] = useState(false)
  // const augmentedHandleSubmit = (values, actions) =>
  //   handleSubmit(values, { ...actions, setAdding })

  return (
    <Formik
      enableReinitialize
      initialValues={favor}
      onSubmit={handleSubmit}
      render={(props) => (
        <InnerForm
          adding={adding}
          editing={editing}
          onFavorChange={onFavorChange}
          setAdding={setAdding}
          {...props}
        />
      )}
      validationSchema={InnerForm.validationSchema}
    />
  )
}

Favor.propTypes = {
  /** Whether to show the adding buttons */
  adding: PropTypes.bool,
  /** Whether to allow editing the favor */
  editing: PropTypes.bool,
  /** Favor data */
  favor: favorType,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Function invoked to change the favor data */
  onFavorChange: PropTypes.func.isRequired,
  /** Changes the mode between adding and static */
  setAdding: PropTypes.func.isRequired,
}

Favor.defaultProps = {
  favor: {
    type: 'small',
    faction: 'jinteki',
    description: '',
  },
}

export default Favor
