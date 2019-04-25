import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { weaponType } from 'types/weapons'

import { StyledButton, StyledDropdownButton, StyledContent } from './styles'

const ExistingWeapon = ({
  deleting,
  editing,
  isSubmitting,
  ranges,
  setFieldValue,
  values: {
    crit,
    damage,
    encumbrance,
    hard_points,
    id,
    name,
    price,
    range,
    rarity,
    restricted,
    skill,
    special,
  },
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedRange = ranges[range].label
  const deleteButton = (
    <StyledButton
      data-testid={`deleteWeaponButton-${id}`}
      disabled={isSubmitting}
      onClick={() => setFieldValue(`deletedWeapons.${id}`, !deleting)}
      type="button"
    >
      <h4>{deleting ? 'Undo' : 'Delete'}</h4>
    </StyledButton>
  )

  return (
    <>
      <StyledDropdownButton
        data-testid={`dropdown-${id}`}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{name}</h3>
      </StyledDropdownButton>
      <StyledContent data-testid={`weapon-${id}-content`} isOpen={isOpen}>
        <div data-testid={`weapon-${id}-skill`}>
          <h4>Skill:</h4>
          <span>{skill}</span>
        </div>
        <div data-testid={`weapon-${id}-range`}>
          <h4>Range:</h4>
          <span>{selectedRange}</span>
        </div>
        <div data-testid={`weapon-${id}-special`}>
          <h4>Special:</h4>
          <span>{special}</span>
        </div>
        <div data-testid={`weapon-${id}-damage`}>
          <h4>Damage:</h4>
          <span>{damage}</span>
        </div>
        <div data-testid={`weapon-${id}-crit`}>
          <h4>Crit:</h4>
          <span>{crit}</span>
        </div>
        <div data-testid={`weapon-${id}-encumbrance`}>
          <h4>Encumbrance:</h4>
          <span>{encumbrance}</span>
        </div>
        <div data-testid={`weapon-${id}-hard_points`}>
          <h4>Hard Points:</h4>
          <span>{hard_points}</span>
        </div>
        <div data-testid={`weapon-${id}-price`}>
          <h4>Price:</h4>
          <span>{price}</span>
        </div>
        <div data-testid={`weapon-${id}-restricted`}>
          <h4>Restricted:</h4>
          <span>{restricted ? 'Yes' : 'No'}</span>
        </div>
        <div data-testid={`weapon-${id}-rarity`}>
          <h4>Rarity:</h4>
          <span>{rarity}</span>
        </div>
        {editing && deleteButton}
      </StyledContent>
    </>
  )
}

ExistingWeapon.propTypes = {
  /** Whether the weapon is being deleted */
  deleting: PropTypes.bool,
  /** Whether to allow editing the weapon */
  editing: PropTypes.bool,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** List of available ranges */
  ranges: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.oneOf(['Engaged', 'Short', 'Medium', 'Long', 'Extreme'])
        .isRequired,
      value: PropTypes.oneOf(['engaged', 'short', 'medium', 'long', 'extreme'])
        .isRequired,
    }),
  ).isRequired,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func,
  /** Weapon data */
  values: weaponType.isRequired,
}

export default ExistingWeapon
