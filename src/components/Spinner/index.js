import React from 'react'
import PropTypes from 'prop-types'

import { CircleSpinner } from 'react-spinners-kit'

import styled, { css } from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'

const defaultStyles = css`
  bottom: 0;
  right: 0;
  padding: ${baseSpacing / 2}px;
`
const coverStyles = css`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  top: 0;
`

const StyledSpinner = styled.div`
  position: fixed;
  z-index: 1000;

  ${({ cover }) => (cover ? coverStyles : defaultStyles)}
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
  size: 30,
}

export default Spinner
