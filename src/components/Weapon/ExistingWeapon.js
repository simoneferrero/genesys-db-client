import React from 'react'
import PropTypes from 'prop-types'
import { weaponType } from 'types/weapons'

import {
  StyledButton,
  StyledNumberProperty,
  StyledSection,
  StyledTextProperty,
} from './styles'

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
  const selectedRange = ranges[range].label
  const deleteButton = (
    <StyledButton
      data-testid={`deleteWeaponButton-${id}`}
      disabled={isSubmitting}
      onClick={() => setFieldValue(`weapons.${id}`, !deleting)}
      type="button"
    >
      <h4>{deleting ? 'Undo' : 'Delete'}</h4>
    </StyledButton>
  )
  return (
    <>
      <StyledSection>
        <StyledTextProperty data-testid={`weapon-${id}-name`}>
          <h4>Name:</h4>
          <span>{name}</span>
        </StyledTextProperty>
        <StyledTextProperty data-testid={`weapon-${id}-skill`}>
          <h4>Skill:</h4>
          <span>{skill}</span>
        </StyledTextProperty>
        <StyledTextProperty data-testid={`weapon-${id}-range`}>
          <h4>Range:</h4>
          <span>{selectedRange}</span>
        </StyledTextProperty>
        <StyledTextProperty data-testid={`weapon-${id}-special`}>
          <h4>Special:</h4>
          <span>{special}</span>
        </StyledTextProperty>
      </StyledSection>
      <StyledSection>
        <StyledNumberProperty data-testid={`weapon-${id}-damage`}>
          <h4>Damage:</h4>
          <span>{damage}</span>
        </StyledNumberProperty>
        <StyledNumberProperty data-testid={`weapon-${id}-crit`}>
          <h4>Crit:</h4>
          <span>{crit}</span>
        </StyledNumberProperty>
        <StyledNumberProperty data-testid={`weapon-${id}-encumbrance`}>
          <h4>Encumbrance:</h4>
          <span>{encumbrance}</span>
        </StyledNumberProperty>
        <StyledNumberProperty data-testid={`weapon-${id}-hard_points`}>
          <h4>Hard Points:</h4>
          <span>{hard_points}</span>
        </StyledNumberProperty>
      </StyledSection>
      <StyledSection>
        <StyledNumberProperty data-testid={`weapon-${id}-price`}>
          <h4>Price:</h4>
          <span>{price}</span>
        </StyledNumberProperty>
        <StyledNumberProperty data-testid={`weapon-${id}-restricted`}>
          <h4>Restricted:</h4>
          <span>{restricted ? 'Yes' : 'No'}</span>
        </StyledNumberProperty>
        <StyledNumberProperty data-testid={`weapon-${id}-rarity`}>
          <h4>Rarity:</h4>
          <span>{rarity}</span>
        </StyledNumberProperty>
        {editing && deleteButton}
      </StyledSection>
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
  setFieldValue: PropTypes.func.isRequired,
  /** Weapon data */
  values: weaponType.isRequired,
}

export default ExistingWeapon
