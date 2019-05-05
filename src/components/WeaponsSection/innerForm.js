import React from 'react'
import PropTypes from 'prop-types'
import { skillType } from 'types/skills'
import { weaponType } from 'types/weapons'

import * as yup from 'yup'

import Weapon from 'components/Weapon'
import FormButtons from 'components/FormButtons'
import { MdAdd, MdCheck, MdClose } from 'react-icons/md'
import Select from 'components/Select'

import { StyledContainer, StyledForm, StyledSubHeader } from './styles'

const InnerForm = ({
  characterWeapons,
  className,
  deletedWeapons,
  editing,
  handleSubmit,
  isCharacter,
  isNew,
  isPCSubmitting,
  isSubmitting,
  onWeaponChange,
  resetForm,
  setFieldValue,
  setIsNew,
  showAdd,
  skills,
  values,
  weapons,
}) => {
  const buttonsIcons = {
    cancel: <MdClose />,
    edit: <MdAdd />,
    submit: <MdCheck />,
  }
  const WEAPON_ID = 'id'
  const weaponIdOptions = Object.values(weapons).map(({ id, name }) => ({
    label: name,
    value: id,
  }))
  const newWeapon = isCharacter ? (
    <label data-testid="weaponId" htmlFor={WEAPON_ID}>
      <Select
        currentValue={values[WEAPON_ID]}
        disabled={isSubmitting}
        id={WEAPON_ID}
        name={WEAPON_ID}
        onChange={setFieldValue}
        options={weaponIdOptions}
      />
    </label>
  ) : (
    <Weapon
      isNew
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      skills={skills}
      weapon={values}
    />
  )
  const mappedWeapons = Object.values(isCharacter ? characterWeapons : weapons)
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((weapon) => (
      <Weapon
        deleting={deletedWeapons[weapon.id]}
        editing={editing}
        isSubmitting={isPCSubmitting}
        key={weapon.id}
        setFieldValue={onWeaponChange}
        skills={skills}
        weapon={weapon}
      />
    ))

  return (
    <StyledForm className={className} data-testid="weapons-section">
      {showAdd && (
        <StyledSubHeader>
          <FormButtons
            disabled={isSubmitting}
            handleCancel={resetForm}
            handleSubmit={handleSubmit}
            icons={buttonsIcons}
            name="weapon"
            setShowButtons={setIsNew}
            showButtons={isNew}
          />
        </StyledSubHeader>
      )}
      <StyledContainer>
        {isNew && newWeapon}
        {mappedWeapons}
      </StyledContainer>
    </StyledForm>
  )
}

InnerForm.validationSchema = yup.object({
  isCharacter: yup.bool(),
  crit: yup.number().when('isCharacter', {
    is: (val) => !val,
    then: yup.number().required('required'),
  }),
  damage: yup.number().when('isCharacter', {
    is: (val) => !val,
    then: yup.number().required('required'),
  }),
  encumbrance: yup.number().when('isCharacter', {
    is: (val) => !val,
    then: yup.number().required('required'),
  }),
  hard_points: yup.number().when('isCharacter', {
    is: (val) => !val,
    then: yup.number().required('required'),
  }),
  id: yup.number().when('isCharacter', {
    is: (val) => val,
    then: yup.number().required('required'),
  }),
  name: yup.string().when('isCharacter', {
    is: (val) => !val,
    then: yup.string().required('required'),
  }),
  price: yup.number().when('isCharacter', {
    is: (val) => !val,
    then: yup.number().required('required'),
  }),
  range: yup.string().when('isCharacter', {
    is: (val) => !val,
    then: yup.string().required('required'),
  }),
  rarity: yup.number().when('isCharacter', {
    is: (val) => !val,
    then: yup.number().required('required'),
  }),
  restricted: yup.bool().when('isCharacter', {
    is: (val) => !val,
    then: yup.bool().required('required'),
  }),
  skill_id: yup.string().when('isCharacter', {
    is: (val) => !val,
    then: yup.string().required('required'),
  }),
  special: yup.string().when('isCharacter', {
    is: (val) => !val,
    then: yup.string(),
  }),
})

InnerForm.propTypes = {
  /** Weapons belonging to a specific character */
  characterWeapons: PropTypes.objectOf(weaponType),
  /** Custom styles */
  className: PropTypes.string,
  /** Which weapons will be deleted */
  deletedWeapons: PropTypes.objectOf(PropTypes.bool),
  /** Whether weapons can be edited */
  editing: PropTypes.bool,
  /** New weapon errors */
  errors: PropTypes.object.isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the form is in a character sheet */
  isCharacter: PropTypes.bool,
  /** Whether to show the new weapon form */
  isNew: PropTypes.bool,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Whether the new weapon is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing weapon data */
  onWeaponChange: PropTypes.func,
  /** Resets the form to initial values */
  resetForm: PropTypes.func.isRequired,
  /** Shows or hides the new weapon form */
  setIsNew: PropTypes.func.isRequired,
  /** Changes the specified new weapon field value */
  setFieldValue: PropTypes.func.isRequired,
  /** Whether to show the Add Weapon button */
  showAdd: PropTypes.bool,
  /** Skills data */
  skills: PropTypes.objectOf(skillType).isRequired,
  /** New weapon values */
  values: PropTypes.object.isRequired,
  /** Weapons data */
  weapons: PropTypes.objectOf(weaponType).isRequired,
}

export default InnerForm
