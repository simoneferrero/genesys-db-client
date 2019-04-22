import React from 'react'
import PropTypes from 'prop-types'

import { MdAdd, MdRemove } from 'react-icons/md'

import { StyledWrapper, StyledRank, StyledButton } from './styles'

const SkillRank = ({
  decreaseDisabled,
  editing,
  id,
  increaseDisabled,
  onChange,
  rank,
}) => (
  <StyledWrapper data-testid={`skill-rank-${id}`}>
    {editing && (
      <StyledButton
        data-testid={`decrease-${id}-rank`}
        disabled={decreaseDisabled}
        onClick={() => onChange(rank - 1)}
        type="button"
      >
        <MdRemove />
      </StyledButton>
    )}
    <div>
      {[...Array(5)].map((value, i) => {
        const index = i + 1
        return (
          <StyledRank
            data-testid={`${id}-${index}`}
            key={index}
            fill={index <= rank}
          />
        )
      })}
    </div>
    {editing && (
      <StyledButton
        data-testid={`increase-${id}-rank`}
        disabled={increaseDisabled}
        onClick={() => onChange(rank + 1)}
        type="button"
      >
        <MdAdd />
      </StyledButton>
    )}
  </StyledWrapper>
)

SkillRank.propTypes = {
  /** Whether decrease button should be disabled */
  decreaseDisabled: PropTypes.bool,
  /** Whether to show the editing buttons */
  editing: PropTypes.bool,
  /** The unique ID of the skill the rank refers to */
  id: PropTypes.string.isRequired,
  /** Whether increase button should be disabled */
  increaseDisabled: PropTypes.bool,
  /** Invoked upon clicking on decrease or increase buttons */
  onChange: PropTypes.func.isRequired,
  /** The rank of the skill */
  rank: PropTypes.number,
}

SkillRank.defaultProps = {
  rank: 0,
}

export default SkillRank
