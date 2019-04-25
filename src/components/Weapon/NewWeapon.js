import React from 'react'
import PropTypes from 'prop-types'
import { skillType } from 'types/skills'
import { weaponType } from 'types/weapons'

import { Field } from 'formik'
import Select from 'components/Select'

import {
  StyledCheckbox,
  StyledNumberProperty,
  StyledSection,
  StyledTextProperty,
} from './styles'

const NewWeapon = ({
  isSubmitting,
  ranges,
  setFieldValue,
  skills,
  values: { range, restricted, skill_id },
}) => {
  const NAME = 'name'
  const SKILL_ID = 'skill_id'
  const skillOptions = Object.values(skills).map(({ id, name }) => ({
    label: name,
    value: id,
  }))
  const DAMAGE = 'damage'
  const CRIT = 'crit'
  const RANGE = 'range'
  const rangeOptions = Object.values(ranges)
  const ENCUMBRANCE = 'encumbrance'
  const HARD_POINTS = 'hard_points'
  const PRICE = 'price'
  const RESTRICTED = 'restricted'
  const RARITY = 'rarity'
  const SPECIAL = 'special'

  return (
    <>
      <StyledSection>
        <StyledTextProperty as="label" htmlFor={NAME}>
          <h4>Name</h4>
          <Field
            data-testid={NAME}
            disabled={isSubmitting}
            id={NAME}
            name={NAME}
            placeholder="Weapon's name"
          />
        </StyledTextProperty>
        <StyledTextProperty as="label" htmlFor={SKILL_ID}>
          <h4>Skill</h4>
          <Select
            currentValue={skill_id}
            data-testid={SKILL_ID}
            disabled={isSubmitting}
            id={SKILL_ID}
            name={SKILL_ID}
            onChange={setFieldValue}
            options={skillOptions}
          />
        </StyledTextProperty>
        <StyledTextProperty as="label" htmlFor={RANGE}>
          <h4>Range</h4>
          <Select
            currentValue={range}
            data-testid={RANGE}
            disabled={isSubmitting}
            id={RANGE}
            name={RANGE}
            onChange={setFieldValue}
            options={rangeOptions}
          />
        </StyledTextProperty>
        <StyledTextProperty as="label" htmlFor={SPECIAL}>
          <h4>Special</h4>
          <Field
            data-testid={SPECIAL}
            disabled={isSubmitting}
            id={SPECIAL}
            name={SPECIAL}
            placeholder="Special features"
          />
        </StyledTextProperty>
      </StyledSection>
      <StyledSection>
        <StyledNumberProperty as="label" htmlFor={DAMAGE}>
          <h4>Damage</h4>
          <Field
            data-testid={DAMAGE}
            disabled={isSubmitting}
            id={DAMAGE}
            min={0}
            name={DAMAGE}
            type="number"
          />
        </StyledNumberProperty>
        <StyledNumberProperty as="label" htmlFor={CRIT}>
          <h4>Crit</h4>
          <Field
            data-testid={CRIT}
            disabled={isSubmitting}
            id={CRIT}
            min={0}
            name={CRIT}
            type="number"
          />
        </StyledNumberProperty>
        <StyledNumberProperty as="label" htmlFor={ENCUMBRANCE}>
          <h4>Encumbrance</h4>
          <Field
            data-testid={ENCUMBRANCE}
            disabled={isSubmitting}
            id={ENCUMBRANCE}
            min={0}
            name={ENCUMBRANCE}
            type="number"
          />
        </StyledNumberProperty>
        <StyledNumberProperty as="label" htmlFor={HARD_POINTS}>
          <h4>Hard Points</h4>
          <Field
            data-testid={HARD_POINTS}
            disabled={isSubmitting}
            id={HARD_POINTS}
            min={0}
            name={HARD_POINTS}
            type="number"
          />
        </StyledNumberProperty>
      </StyledSection>
      <StyledSection>
        <StyledNumberProperty as="label" htmlFor={PRICE}>
          <h4>Price</h4>
          <Field
            data-testid={PRICE}
            disabled={isSubmitting}
            id={PRICE}
            min={0}
            name={PRICE}
            type="number"
          />
        </StyledNumberProperty>
        <StyledNumberProperty
          as="label"
          data-testid={RESTRICTED}
          editing={!isSubmitting}
          htmlFor={RESTRICTED}
          name={RESTRICTED}
        >
          <h4>Restricted</h4>
          <StyledCheckbox
            checked={restricted}
            disabled={isSubmitting}
            id={RESTRICTED}
            name={RESTRICTED}
            onChange={() => setFieldValue(RESTRICTED, !restricted)}
            type="checkbox"
          />
          <span>{restricted ? 'Yes' : 'No'}</span>
        </StyledNumberProperty>
        <StyledNumberProperty as="label" htmlFor={RARITY}>
          <h4>Rarity</h4>
          <Field
            data-testid={RARITY}
            disabled={isSubmitting}
            id={RARITY}
            min={0}
            name={RARITY}
            type="number"
          />
        </StyledNumberProperty>
      </StyledSection>
    </>
  )
}

NewWeapon.propTypes = {
  /** Whether form values are being submitted */
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
  /** Invoked when changing a field value */
  setFieldValue: PropTypes.func.isRequired,
  /** List of available skills */
  skills: PropTypes.objectOf(skillType).isRequired,
  /** Weapon data */
  values: weaponType.isRequired,
}

export default NewWeapon
