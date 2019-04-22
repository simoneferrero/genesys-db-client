import React from 'react'
import PropTypes from 'prop-types'

import { MdAdd, MdRemove } from 'react-icons/md'

import styled from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'

const StyledBadgeModifiers = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const StyledButton = styled.button`
  background: transparent;
  border: none;
  color: ${colours.lightOrange};
  padding: ${baseSpacing / 4}px;
  font-size: 15px;
  cursor: pointer;

  &:disabled {
    color: ${colours.veryLightOrange};
    cursor: not-allowed;
  }
`

const BadgeModifiers = ({
  decrease,
  decreaseDisabled,
  increase,
  increaseDisabled,
  name,
}) => (
  <StyledBadgeModifiers data-testid={`badge-modifiers-${name}`}>
    <StyledButton
      data-testid={`decrease-${name}`}
      disabled={decreaseDisabled}
      onClick={decrease}
      type="button"
    >
      <MdRemove />
    </StyledButton>
    <StyledButton
      data-testid={`increase-${name}`}
      disabled={increaseDisabled}
      onClick={increase}
      type="button"
    >
      <MdAdd />
    </StyledButton>
  </StyledBadgeModifiers>
)

BadgeModifiers.propTypes = {
  /** Invoked upon clicking on decrease button */
  decrease: PropTypes.func.isRequired,
  /** Whether decrease button should be disabled */
  decreaseDisabled: PropTypes.bool,
  /** Invoked upon clicking on increase button */
  increase: PropTypes.func.isRequired,
  /** Whether increase button should be disabled */
  increaseDisabled: PropTypes.bool,
  /** Name of the value to increase/decrease */
  name: PropTypes.string.isRequired,
}

export default BadgeModifiers
