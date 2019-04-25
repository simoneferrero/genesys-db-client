import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { skillType } from 'types/skills'
import { weaponType } from 'types/weapons'

import { Formik } from 'formik'

import InnerForm from './innerForm'

const WeaponsSection = ({
  className,
  deletedWeapons,
  editing,
  handleSubmit,
  isPCSubmitting,
  onWeaponChange,
  showAdd,
  skills,
  weapons,
}) => {
  const [isNew, setIsNew] = useState(false)

  const initialSkill = Object.values(skills)[0] || {}
  const augmentedHandleSubmit = (values, actions) =>
    handleSubmit(values, { ...actions, setIsNew })

  const initialValues = {
    crit: 0,
    damage: 0,
    encumbrance: 0,
    hard_points: 0,
    name: '',
    price: 0,
    range: 'engaged',
    rarity: 0,
    restricted: false,
    skill_id: initialSkill.id,
    special: '',
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={augmentedHandleSubmit}
      render={(props) => (
        <InnerForm
          className={className}
          deletedWeapons={deletedWeapons}
          editing={editing}
          isNew={isNew}
          isPCSubmitting={isPCSubmitting}
          onWeaponChange={onWeaponChange}
          setIsNew={setIsNew}
          showAdd={showAdd}
          skills={skills}
          weapons={weapons}
          {...props}
        />
      )}
      validationSchema={InnerForm.validationSchema}
    />
  )
}

WeaponsSection.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Which weapons will be deleted */
  deletedWeapons: PropTypes.objectOf(PropTypes.bool),
  /** Whether weapons can be edited */
  editing: PropTypes.bool,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Function invoked to change existing favor data */
  onWeaponChange: PropTypes.func,
  /** Whether to show the Add Weapon button */
  showAdd: PropTypes.bool,
  /** Skills data */
  skills: PropTypes.objectOf(skillType).isRequired,
  /** Weapon data */
  weapons: PropTypes.arrayOf(weaponType).isRequired,
}

WeaponsSection.defaultProps = {
  deletedWeapons: {},
}

export default WeaponsSection
