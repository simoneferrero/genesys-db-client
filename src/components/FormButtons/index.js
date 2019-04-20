import React from 'react'
import PropTypes from 'prop-types'

import { MdCheck, MdClose, MdEdit } from 'react-icons/md'

import styled from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'

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

const FormButtons = ({
  className,
  disabled,
  handleSubmit,
  icons: { cancel, edit, submit },
  name,
  showButtons,
  setShowButtons,
}) => {
  const submitButtonProps = {
    ...(handleSubmit
      ? { onClick: handleSubmit, type: 'button' }
      : { type: 'submit' }),
  }
  return (
    <div className={className} data-testid={`form-buttons-${name}`}>
      {!showButtons ? (
        <StyledButton
          data-testid={`edit-${name}`}
          disabled={disabled}
          onClick={() => setShowButtons(true)}
          type="button"
        >
          {edit}
        </StyledButton>
      ) : (
        <>
          <StyledButton
            data-testid={`cancel-${name}`}
            disabled={disabled}
            onClick={() => setShowButtons(false)}
            type="button"
          >
            {cancel}
          </StyledButton>
          <StyledButton
            data-testid={`submit-${name}`}
            disabled={disabled}
            {...submitButtonProps}
          >
            {submit}
          </StyledButton>
        </>
      )}
    </div>
  )
}

FormButtons.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether to show submit/cancel buttons or edit button */
  disabled: PropTypes.bool,
  /** Invoked upon submission */
  handleSubmit: PropTypes.func,
  /** The set of icons to display */
  icons: PropTypes.shape({
    /** Icon shown to revert back to initial status and discard changes */
    cancel: PropTypes.node.isRequired,
    /** Initial icon used to change the form status */
    edit: PropTypes.node.isRequired,
    /** Icon shown to submit changes */
    submit: PropTypes.node.isRequired,
  }).isRequired,
  /** The name of the form the buttons refer to */
  name: PropTypes.string.isRequired,
  /** Whether the buttons are in editing or static mode */
  showButtons: PropTypes.bool,
  /** Changes the mode between showing submit/cancel buttons or edit button */
  setShowButtons: PropTypes.func.isRequired,
}

FormButtons.defaultProps = {
  icons: {
    cancel: <MdClose />,
    edit: <MdEdit />,
    submit: <MdCheck />,
  },
}

export default FormButtons
