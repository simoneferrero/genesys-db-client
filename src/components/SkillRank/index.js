import React from 'react'
import PropTypes from 'prop-types'

import { MdAdd, MdRemove } from 'react-icons/md'

import { StyledWrapper, StyledRank, StyledButton } from './styles'

const SkillRank = ({
  decrease,
  decreaseDisabled,
  editing,
  id,
  increase,
  increaseDisabled,
  rank,
}) => (
  <StyledWrapper data-testid={`skill-rank-${id}`}>
    {editing && (
      <StyledButton
        data-testid={`decrease-${id}-rank`}
        disabled={decreaseDisabled}
        onClick={decrease}
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
        onClick={increase}
        type="button"
      >
        <MdAdd />
      </StyledButton>
    )}
  </StyledWrapper>
)

SkillRank.propTypes = {
  /** Invoked upon clicking on decrease button */
  decrease: PropTypes.func.isRequired,
  /** Whether decrease button should be disabled */
  decreaseDisabled: PropTypes.bool,
  /** Whether to show the editing buttons */
  editing: PropTypes.bool,
  /** The unique ID of the skill the rank refers to */
  id: PropTypes.string.isRequired,
  /** Invoked upon clicking on increase button */
  increase: PropTypes.func.isRequired,
  /** Whether increase button should be disabled */
  increaseDisabled: PropTypes.bool,
  /** The rank of the skill */
  rank: PropTypes.number.isRequired,
}

export default SkillRank
