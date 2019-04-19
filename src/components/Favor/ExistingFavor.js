import React from 'react'
import PropTypes from 'prop-types'
import { factionType } from 'types/factions'
import { favorType } from 'types/favors'

import { StyledButton } from './styles'

const ExistingFavor = ({
  editing,
  factions,
  isSubmitting,
  sizes,
  setFieldValue,
  values: { id, description, faction_id, size, status },
}) => {
  const faction = factions[faction_id]
  const statusButton =
    status === 'complete' ? (
      <StyledButton
        data-testid="revertButton"
        disabled={isSubmitting}
        onClick={() => setFieldValue(`favors.${id}.status`, 'incomplete')}
        type="button"
      >
        <h4>Revert</h4>
      </StyledButton>
    ) : (
      <StyledButton
        data-testid="completeButton"
        disabled={isSubmitting}
        onClick={() => setFieldValue(`favors.${id}.status`, 'complete')}
        type="button"
      >
        <h4>Complete</h4>
      </StyledButton>
    )
  return (
    <>
      <h4 data-testid={`favor-${id}-size`}>{sizes[size].label}</h4>
      <h4 data-testid={`favor-${id}-faction_id`}>{faction && faction.name}</h4>
      {editing && <div>{statusButton}</div>}
      <div data-testid={`favor-${id}-description`}>{description}</div>
    </>
  )
}

ExistingFavor.propTypes = {
  /** Whether to allow editing the favor */
  editing: PropTypes.bool,
  /** List of available factions */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
  /** List of available sizes */
  sizes: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.oneOf(['Small favor', 'Normal favor', 'Big favor'])
        .isRequired,
      value: PropTypes.oneOf(['small', 'normal', 'big']).isRequired,
    }),
  ).isRequired,
  /** Favor data */
  values: favorType.isRequired,
}

export default ExistingFavor
