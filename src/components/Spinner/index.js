import React from 'react'
import PropTypes from 'prop-types'

import { CircleSpinner } from 'react-spinners-kit'

import styled, { css } from 'styled-components/macro'
import { colours } from 'styles/constants'

const coverStyles = css`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
`

const StyledSpinner = styled.div`
  z-index: 1000;

  ${({ cover }) => cover && coverStyles}
`

/** Displays the title of a page */
const Spinner = ({ className, colour, cover, size }) => (
  <StyledSpinner className={className} cover={cover} data-testid="spinner">
    <CircleSpinner color={colour} size={size} />
  </StyledSpinner>
)

Spinner.propTypes = {
  /** Custom styles to apply to the spinner */
  className: PropTypes.string,
  /** The spinner's colour */
  colour: PropTypes.string,
  /** Whether it takes the whole page */
  cover: PropTypes.bool,
  /** The spinner's size */
  size: PropTypes.number,
}

Spinner.defaultProps = {
  colour: colours.teal,
  cover: true,
  size: 80,
}

export default Spinner
