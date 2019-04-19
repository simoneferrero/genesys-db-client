import React from 'react'
import PropTypes from 'prop-types'
import { factionType } from 'types/factions'
import { favorType } from 'types/favors'

import * as yup from 'yup'

import Favor from 'components/Favor'
import { Form } from 'formik'
import FormButtons from 'components/FormButtons'
import { MdAdd, MdCheck, MdClose } from 'react-icons/md'

import {
  StyledContainer,
  StyledForm,
  StyledNewFavor,
  StyledSubHeader,
} from './styles'

const InnerForm = ({
  editing,
  factions,
  favors,
  handleSubmit,
  isNew,
  isPCSubmitting,
  isSubmitting,
  onFavorChange,
  setIsNew,
  setFieldValue,
  type,
  values,
}) => {
  const buttonsIcons = {
    cancel: <MdClose />,
    edit: <MdAdd />,
    submit: <MdCheck />,
  }
  const newFavor = (
    <StyledNewFavor
      as={Favor}
      factions={factions}
      favor={values}
      isNew
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
    />
  )
  const mappedFavors = favors.map((favor) => (
    <Favor
      editing={editing}
      factions={factions}
      favor={favor}
      isSubmitting={isPCSubmitting}
      key={favor.id}
      setFieldValue={onFavorChange}
    />
  ))

  return (
    <StyledForm
      as={Form}
      data-testid={`favors-${type}`}
      onSubmit={handleSubmit}
    >
      <StyledSubHeader>
        <h3>{type}</h3>
        <FormButtons
          disabled={isSubmitting}
          icons={buttonsIcons}
          setShowButtons={setIsNew}
          showButtons={isNew}
        />
      </StyledSubHeader>
      <StyledContainer>
        {isNew && newFavor}
        {mappedFavors}
      </StyledContainer>
    </StyledForm>
  )
}

InnerForm.validationSchema = yup.object({
  description: yup.string().required('required'),
  faction_id: yup.string().required('required'),
  size: yup.string().required('required'),
  status: yup.string().required('required'),
  type: yup.string().required('required'),
})

InnerForm.propTypes = {
  /** Whether favors can be edited */
  editing: PropTypes.bool,
  /** New favor errors */
  errors: PropTypes.object.isRequired,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Favors data */
  favors: PropTypes.arrayOf(favorType).isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether to show the new favor form */
  isNew: PropTypes.bool,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Whether the new favor is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing favor data */
  onFavorChange: PropTypes.func.isRequired,
  /** Shows or hides the new favor form */
  setIsNew: PropTypes.func.isRequired,
  /** Changes the specified new favor field value */
  setFieldValue: PropTypes.func.isRequired,
  /** The type of favors in the section */
  type: PropTypes.oneOf(['owed', 'given']).isRequired,
  /** New favor values */
  values: PropTypes.object.isRequired,
}

export default InnerForm
