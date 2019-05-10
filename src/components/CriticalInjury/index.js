import React from 'react'
import PropTypes from 'prop-types'
import { criticalInjuryType } from 'types/criticalInjuries'

import { StyledButton, StyledCriticalInjury } from './styles'

/* eslint-disable no-unused-vars  */
/* eslint-disable react/prop-types  */
const FilteredCriticalInjury = ({
  isNew,
  isComplete,
  editing,
  ...otherProps
}) => <div {...otherProps} />
/* eslint-enable */

const CriticalInjury = ({
  className,
  editing,
  criticalInjury: { dice_value, effects, id, name, persistent, severity },
  isSubmitting,
  setFieldValue,
}) => {
  // TODO: pass status from container taken from deletedCriticalInjuries
  // const statusButton =
  //   status === 'complete' ? (
  //     <StyledButton
  //       data-testid={`undoButton-${id}`}
  //       disabled={isSubmitting}
  //       onClick={() => setFieldValue(`deletedCriticalInjuries.${id}`, false)}
  //       type="button"
  //     >
  //       <h4>Undo</h4>
  //     </StyledButton>
  //   ) : (
  //     <StyledButton
  //       data-testid={`healButton-${id}`}
  //       disabled={isSubmitting}
  //       onClick={() => setFieldValue(`deletedCriticalInjuries.${id}`, true)}
  //       type="button"
  //     >
  //       <h4>Heal</h4>
  //     </StyledButton>
  //   )

  return (
    <StyledCriticalInjury
      as={FilteredCriticalInjury}
      className={className}
      data-testid={`criticalInjury-${id}`}
      editing={editing}
      persistent={persistent}
    >
      <h4 data-testid={`criticalInjury-${id}-dice_value`}>{dice_value}</h4>
      <h4 data-testid={`criticalInjury-${id}-name`}>{name}</h4>
      <h4 data-testid={`criticalInjury-${id}-severity`}>{severity}</h4>
      <div data-testid={`criticalInjury-${id}-effects`}>{effects}</div>
      {/* {editing && <div>{statusButton}</div>} */}
    </StyledCriticalInjury>
  )
}

CriticalInjury.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether to allow editing the criticalInjury */
  editing: PropTypes.bool,
  /** CriticalInjury data */
  criticalInjury: criticalInjuryType.isRequired,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
}

export default CriticalInjury
