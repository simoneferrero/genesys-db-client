import React from 'react'
import PropTypes from 'prop-types'
import { skillType } from 'types/skills'
import { weaponType } from 'types/weapons'

import * as yup from 'yup'

import Weapon from 'components/Weapon'
import FormButtons from 'components/FormButtons'
import { MdAdd, MdCheck, MdClose } from 'react-icons/md'

import { StyledContainer, StyledForm, StyledSubHeader } from './styles'

const InnerForm = ({
  deletedWeapons,
  editing,
  handleSubmit,
  isNew,
  isPCSubmitting,
  isSubmitting,
  onWeaponChange,
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
  const newWeapon = (
    <Weapon
      isNew
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      skills={skills}
      weapon={values}
    />
  )
  const mappedWeapons = weapons
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
    <StyledForm data-testid="weapons">
      {showAdd && (
        <StyledSubHeader>
          <FormButtons
            disabled={isSubmitting}
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
  crit: yup.number().required('required'),
  damage: yup.number().required('required'),
  encumbrance: yup.number().required('required'),
  hard_points: yup.number().required('required'),
  name: yup.string().required('required'),
  price: yup.number().required('required'),
  range: yup.string().required('required'),
  rarity: yup.number().required('required'),
  restricted: yup.boolean().required('required'),
  skill_id: yup.string().required('required'),
  special: yup.string().required('required'),
})

InnerForm.propTypes = {
  /** Which weapons will be deleted */
  deletedWeapons: PropTypes.objectOf(PropTypes.bool),
  /** Whether weapons can be edited */
  editing: PropTypes.bool,
  /** New weapon errors */
  errors: PropTypes.object.isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether to show the new weapon form */
  isNew: PropTypes.bool,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Whether the new weapon is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing weapon data */
  onWeaponChange: PropTypes.func.isRequired,
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
  weapons: PropTypes.arrayOf(weaponType).isRequired,
}

export default InnerForm
