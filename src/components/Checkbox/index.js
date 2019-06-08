import React from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'
import rgbToRgba from 'utils/rgbToRgba'

const checkedStyles = css`
  color: ${colours.veryLightBlue};
  background-color: ${colours.teal};
  border-color: ${colours.teal};
`
const uncheckedStyles = css`
  color: ${rgbToRgba(colours.veryDarkGrey, 0.4)};
  border-color: ${rgbToRgba(colours.veryDarkGrey, 0.4)};
`
const StyledCheckbox = styled.label`
  height: fit-content;
  width: fit-content;
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: 6px;
  user-select: none;
  display: flex;
  border: 1px solid;
  padding: ${baseSpacing / 6}px;
  padding-top: ${baseSpacing / 4}px;
  border-radius: 3px;
  font-weight: 700;
  text-transform: uppercase;
  ${({ checked }) => (checked ? checkedStyles : uncheckedStyles)};

  & > input {
    position: absolute !important;
    opacity: 0 !important;
    height: 0 !important;
    width: 0 !important;
  }
`

const Checkbox = ({ checked, disabled, id, label, name, onChange }) => (
  <StyledCheckbox
    checked={checked}
    data-testid={id}
    disabled={disabled}
    name={name}
    onChange={() => onChange(name, !checked)}
  >
    <input disabled={disabled} name={name} type="checkbox" />
    <span>{label}</span>
  </StyledCheckbox>
)

Checkbox.propTypes = {
  /** Whether the input is checked or not */
  checked: PropTypes.bool.isRequired,
  /** Whether the input is disabled or not */
  disabled: PropTypes.bool,
  /** Unique identifier */
  id: PropTypes.string.isRequired,
  /** The text to display */
  label: PropTypes.string.isRequired,
  /** The input's name in the form */
  name: PropTypes.string.isRequired,
  /** Invoked to change the input's value */
  onChange: PropTypes.func,
}

Checkbox.defaultProps = {
  onChange: () => {},
}

export default Checkbox
