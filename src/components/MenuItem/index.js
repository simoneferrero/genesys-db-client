import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

import styled, { css } from 'styled-components/macro'

import { baseSpacing, colours } from 'styles/constants'

const activeStyles = css`
  &.active,
  &:hover,
  &:focus,
  &:active {
    background-color: ${colours.veryLightBlue};
    color: ${colours.teal};
  }
`

// We don't want to pass showActive to the dom element
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars  */
const FilteredStyledNavLink = ({ showActive, ...otherProps }) => (
  <NavLink {...otherProps} />
)
/* eslint-enable */
const StyledNavLink = styled(FilteredStyledNavLink)`
  width: 100%;
  padding: ${baseSpacing / 2}px ${baseSpacing}px;
  color: ${colours.veryLightBlue};
  font-weight: 700;
  text-decoration: none;

  ${({ showActive }) => showActive && activeStyles}
`

/** Menu item extending react-router's link */
const MenuItem = ({
  children,
  className,
  exact,
  id,
  location,
  onClick,
  showActive,
  to,
}) => (
  <StyledNavLink
    className={className}
    data-testid={`menu-item-${id}`}
    exact={exact}
    location={location}
    onClick={onClick}
    showActive={showActive}
    to={to}
  >
    {children}
  </StyledNavLink>
)

MenuItem.propTypes = {
  /** Title, icon, or any valid element */
  children: PropTypes.node.isRequired,
  /** Custom styles */
  className: PropTypes.string,
  /** Whether it should match the exact route when active */
  exact: PropTypes.bool,
  /** Unique identifier */
  id: PropTypes.string.isRequired,
  /** Information about the current route */
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  /** A callback executed on item's click */
  onClick: PropTypes.func,
  /** Whether to show the active styles */
  showActive: PropTypes.bool,
  /** The location to link to */
  to: PropTypes.string.isRequired,
}

MenuItem.defaultProps = {
  onClick: () => {},
  showActive: true,
}

export default MenuItem
