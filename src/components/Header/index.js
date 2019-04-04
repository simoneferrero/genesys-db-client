import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components/macro'
import {
  baseSpacing,
  colours,
  headerHeight,
  trapezoidOffside,
} from 'styles/constants'

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-top: ${headerHeight}px solid ${colours.teal};
  border-left: ${trapezoidOffside}px solid transparent;
  border-right: ${trapezoidOffside}px solid transparent;
  height: 0;
  width: fit-content;
  z-index: 1000;

  h2 {
    position: relative;
    top: -${headerHeight}px;
    padding: ${baseSpacing / 4}px ${baseSpacing / 4}px;
    margin: 0 auto;
    color: ${colours.veryLightBlue};
    white-space: nowrap;
    text-transform: uppercase;
  }
`

/** Displays the title of a page */
const Header = ({ children }) => (
  <StyledHeader data-testid="header">
    <h2>{children}</h2>
  </StyledHeader>
)

Header.propTypes = {
  /** The text to display in the header */
  children: PropTypes.node.isRequired,
}

export default Header
