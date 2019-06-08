import React from 'react'
import PropTypes from 'prop-types'
import { talentType } from 'types/talents'

import NewTalent from './NewTalent'
import ExistingTalent from './ExistingTalent'

import { StyledTalent } from './styles'

const Talent = ({
  className,
  decreaseDisabled,
  editing,
  increaseDisabled,
  isCharacter,
  isNew,
  isSubmitting,
  setFieldValue,
  talent,
}) => {
  const activations = [
    'Passive',
    'Active (Incidental)',
    'Active (Incidental, Out of Turn)',
    'Active (Maneuver)',
    'Active (Action)',
  ]

  return (
    <StyledTalent
      className={className}
      data-testid={isNew ? 'new-talent' : `talent-${talent.id}`}
      editing={editing}
    >
      {isNew ? (
        <NewTalent
          isSubmitting={isSubmitting}
          activations={activations}
          setFieldValue={setFieldValue}
          values={talent}
        />
      ) : (
        <ExistingTalent
          decreaseDisabled={decreaseDisabled}
          editing={editing}
          increaseDisabled={increaseDisabled}
          isCharacter={isCharacter}
          isSubmitting={isSubmitting}
          setFieldValue={setFieldValue}
          values={talent}
        />
      )}
    </StyledTalent>
  )
}

Talent.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether decrease button should be disabled */
  decreaseDisabled: PropTypes.bool,
  /** Whether the talent is being modified */
  editing: PropTypes.bool,
  /** Whether increase button should be disabled */
  increaseDisabled: PropTypes.bool,
  /** Whether to show character-related fields */
  isCharacter: PropTypes.bool,
  /** Whether to show NewTalent or ExistingTalent */
  isNew: PropTypes.bool,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func,
  /** Talent data */
  talent: talentType.isRequired,
}

export default Talent
