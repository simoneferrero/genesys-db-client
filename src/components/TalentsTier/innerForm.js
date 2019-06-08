import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { talentType } from 'types/talents'

import * as yup from 'yup'

import Talent from 'components/Talent'
import FormButtons from 'components/FormButtons'
import { MdAdd, MdCheck, MdClose } from 'react-icons/md'
import Select from 'components/Select'

import { StyledContainer, StyledForm, StyledSubHeader } from './styles'

const InnerForm = ({
  characterTalents,
  className,
  editing,
  handleSubmit,
  isCharacter,
  isNew,
  isPCSubmitting,
  isSubmitting,
  onTalentChange,
  resetForm,
  setFieldValue,
  setIsNew,
  showAdd,
  values,
  talents,
  tier,
}) => {
  const buttonsIcons = {
    cancel: <MdClose />,
    edit: <MdAdd />,
    submit: <MdCheck />,
  }
  const TALENT_ID = 'id'
  const talentIdOptions = Object.values(talents).map(({ id, name }) => ({
    label: name,
    value: id,
  }))

  const newTalent = isCharacter ? (
    <label data-testid="talentId" htmlFor={TALENT_ID}>
      <Select
        currentValue={values[TALENT_ID]}
        disabled={isSubmitting}
        id={TALENT_ID}
        name={TALENT_ID}
        onChange={setFieldValue}
        options={talentIdOptions}
      />
    </label>
  ) : (
    <Talent
      isNew
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      talent={values}
    />
  )
  const mappedTalents = useMemo(
    () =>
      (isCharacter ? characterTalents : talents).map((talent) => (
        <Talent
          editing={editing}
          decreaseDisabled={talent.rank === 1} // TODO: add logic to prevent decrease
          increaseDisabled={talent.rank === 5}
          isCharacter={isCharacter}
          isSubmitting={isPCSubmitting}
          key={talent.id}
          setFieldValue={onTalentChange}
          talent={talent}
        />
      )),
    [
      characterTalents,
      editing,
      isCharacter,
      isPCSubmitting,
      onTalentChange,
      talents,
    ],
  )

  return (
    <StyledForm className={className} data-testid={`talents-tier-${tier}`}>
      <StyledSubHeader>
        <h3>Tier {tier}</h3>
        {showAdd && (
          <FormButtons
            disabled={isSubmitting}
            handleCancel={resetForm}
            handleSubmit={handleSubmit}
            icons={buttonsIcons}
            name={`tier-${tier}-talents`}
            setShowButtons={setIsNew}
            showButtons={isNew}
          />
        )}
      </StyledSubHeader>
      <StyledContainer>
        {isNew && newTalent}
        {mappedTalents}
      </StyledContainer>
    </StyledForm>
  )
}

InnerForm.validationSchema = yup.object({
  activation: yup.string().when('isCharacter', {
    is: (val) => !val,
    then: yup.string().required('required'),
  }),
  description: yup.string().when('isCharacter', {
    is: (val) => !val,
    then: yup.string().required('required'),
  }),
  id: yup
    .string()
    .nullable()
    .when('isCharacter', {
      is: (val) => !!val,
      then: yup.number().required('required'),
    }),
  isCharacter: yup.bool(),
  name: yup.string().when('isCharacter', {
    is: (val) => !val,
    then: yup.string().required('required'),
  }),
  ranked: yup.bool().when('isCharacter', {
    is: (val) => !val,
    then: yup.bool().required('required'),
  }),
  tier: yup.number().when('isCharacter', {
    is: (val) => !val,
    then: yup.number().required('required'),
  }),
})

InnerForm.propTypes = {
  /** Talents belonging to a specific character */
  characterTalents: PropTypes.arrayOf(talentType),
  /** Custom styles */
  className: PropTypes.string,
  /** Whether talents can be edited */
  editing: PropTypes.bool,
  /** New talent errors */
  errors: PropTypes.object.isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the form is in a character sheet */
  isCharacter: PropTypes.bool,
  /** Whether to show the new talent form */
  isNew: PropTypes.bool,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Whether the new talent is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing talent data */
  onTalentChange: PropTypes.func,
  /** Resets the form to initial values */
  resetForm: PropTypes.func.isRequired,
  /** Shows or hides the new talent form */
  setIsNew: PropTypes.func.isRequired,
  /** Changes the specified new talent field value */
  setFieldValue: PropTypes.func.isRequired,
  /** Whether to show the Add Talent button */
  showAdd: PropTypes.bool,
  /** New talent values */
  values: PropTypes.object.isRequired,
  /** Talents data */
  talents: PropTypes.arrayOf(talentType).isRequired,
  /** Which tier talents belong to */
  tier: PropTypes.number.isRequired,
}

export default InnerForm
