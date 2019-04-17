import React from 'react'
import PropTypes from 'prop-types'

import { MdCheck, MdClose, MdEdit } from 'react-icons/md'

import styled from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'

export const StyledFormButtons = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
`

export const StyledButton = styled.button`
  padding: ${baseSpacing / 2}px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${colours.teal};
  font-size: 30px;

  &:disabled {
    color: ${colours.lightTeal};
    cursor: not-allowed;
  }
`

const FormButtons = ({ className, disabled, editing, setEditing }) => (
  <StyledFormButtons className={className} data-testid="form-buttons">
    {editing === false ? (
      <StyledButton
        data-testid="edit"
        disabled={disabled}
        onClick={() => setEditing(true)}
        type="button"
      >
        <MdEdit />
      </StyledButton>
    ) : (
      <>
        <StyledButton
          data-testid="cancel"
          disabled={disabled}
          onClick={() => setEditing(false)}
          type="button"
        >
          <MdClose />
        </StyledButton>
        <StyledButton data-testid="submit" disabled={disabled} type="submit">
          <MdCheck />
        </StyledButton>
      </>
    )}
  </StyledFormButtons>
)

FormButtons.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether the buttons are disabled */
  disabled: PropTypes.bool,
  /** Whether the buttons are in editing or static mode */
  editing: PropTypes.bool,
  /** Changes the mode between editing and static */
  setEditing: PropTypes.func.isRequired,
}

export default FormButtons
