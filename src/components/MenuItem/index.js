import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

import styled from 'styled-components/macro'

import { baseSpacing, colours } from 'styles/constants'

const StyledNavLink = styled(NavLink)`
  width: 100%;
  padding: ${baseSpacing / 2}px ${baseSpacing}px;
  color: ${colours.veryLightBlue};
  font-weight: 700;
  text-decoration: none;

  &.active,
  &:hover,
  &:focus,
  &:active {
    background-color: ${colours.veryLightBlue};
    color: ${colours.teal};
  }
`

/** Menu item extending react-router's link */
const MenuItem = ({ children, className, location, onClick, to }) => {
  return (
    <StyledNavLink
      className={className}
      location={location}
      onClick={onClick}
      to={to}
    >
      {children}
    </StyledNavLink>
  )
}

MenuItem.propTypes = {
  /** Title, icon, or any valid element */
  children: PropTypes.node.isRequired,
  /** Custom styles */
  className: PropTypes.string,
  /** Information about the current route */
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  /** A callback executed on item's click */
  onClick: PropTypes.func,
  /** The location to link to */
  to: PropTypes.string.isRequired,
}

MenuItem.defaultProps = {
  onClick: () => {},
}

export default MenuItem
