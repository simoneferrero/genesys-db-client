import React from 'react'
import PropTypes from 'prop-types'
import { skillType } from 'types/skills'
import { weaponType } from 'types/weapons'

import NewWeapon from './NewWeapon'
import ExistingWeapon from './ExistingWeapon'

import { StyledWeapon } from './styles'

const Weapon = ({
  className,
  deleting,
  editing,
  weapon,
  isNew,
  isSubmitting,
  setFieldValue,
  skills,
}) => {
  const ranges = {
    engaged: {
      value: 'engaged',
      label: 'Engaged',
    },
    short: {
      value: 'short',
      label: 'Short',
    },
    medium: {
      value: 'medium',
      label: 'Medium',
    },
    long: {
      value: 'long',
      label: 'Long',
    },
    extreme: {
      value: 'extreme',
      label: 'Extreme',
    },
  }

  return (
    <StyledWeapon
      className={className}
      data-testid={isNew ? 'new-weapon' : `weapon-${weapon.id}`}
      deleting={deleting}
      editing={editing}
      isNew={isNew}
    >
      {isNew ? (
        <NewWeapon
          isSubmitting={isSubmitting}
          ranges={ranges}
          setFieldValue={setFieldValue}
          skills={skills}
          values={weapon}
        />
      ) : (
        <ExistingWeapon
          deleting={deleting}
          editing={editing}
          isSubmitting={isSubmitting}
          ranges={ranges}
          setFieldValue={setFieldValue}
          values={weapon}
        />
      )}
    </StyledWeapon>
  )
}

Weapon.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether the weapon is being deleted */
  deleting: PropTypes.bool,
  /** Whether to allow deleting the weapon */
  editing: PropTypes.bool,
  /** Weapon data */
  weapon: weaponType.isRequired,
  /** Whether to show NewWeapon or ExistingWeapon */
  isNew: PropTypes.bool,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
  /** List of skills */
  skills: PropTypes.objectOf(skillType).isRequired,
}

export default Weapon
