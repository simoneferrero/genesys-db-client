import React from 'react'
import PropTypes from 'prop-types'
import { criticalInjuryData } from 'types/criticalInjuries'

import { StyledButton, StyledCriticalInjury } from './styles'

/* eslint-disable no-unused-vars  */
/* eslint-disable react/prop-types  */
const FilteredCriticalInjury = ({
  editing,
  deleting,
  isCharacter,
  persistent,
  ...otherProps
}) => <div {...otherProps} />
/* eslint-enable */

const CriticalInjury = ({
  className,
  editing,
  criticalInjury: { dice_value, effects, id, name, persistent, severity },
  deleting,
  isCharacter,
  isSubmitting,
  setFieldValue,
}) => {
  const statusButton = deleting ? (
    <StyledButton
      data-testid={`undoButton-${id}`}
      disabled={isSubmitting}
      onClick={() => setFieldValue(`deletedCriticalInjuries.${id}`, false)}
      type="button"
    >
      <h4>Undo</h4>
    </StyledButton>
  ) : (
    <StyledButton
      data-testid={`healButton-${id}`}
      disabled={isSubmitting}
      onClick={() => setFieldValue(`deletedCriticalInjuries.${id}`, true)}
      type="button"
    >
      <h4>Heal</h4>
    </StyledButton>
  )
  const severityElements = [...Array(severity)].map(() => 'k').join(' ')

  return (
    <StyledCriticalInjury
      as={FilteredCriticalInjury}
      className={className}
      data-testid={`criticalInjury-${id}`}
      editing={editing}
      deleting={deleting}
      isCharacter={isCharacter}
      persistent={persistent}
    >
      <h4 data-testid={`criticalInjury-${id}-dice_value`}>{dice_value}</h4>
      <h4 data-testid={`criticalInjury-${id}-name`}>{name}</h4>
      <h4 data-testid={`criticalInjury-${id}-severity`}>
        <span>{severityElements}</span>
      </h4>
      <p data-testid={`criticalInjury-${id}-effects`}>{effects}</p>
      {editing && statusButton}
    </StyledCriticalInjury>
  )
}

CriticalInjury.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** CriticalInjury data */
  criticalInjury: PropTypes.shape({
    ...criticalInjuryData,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  /** Whether to allow editing the criticalInjury */
  editing: PropTypes.bool,
  /** Whether the injury is marked to be healed */
  deleting: PropTypes.bool,
  /** Whether it's displayed on a character sheet */
  isCharacter: PropTypes.bool,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
}

export default CriticalInjury
