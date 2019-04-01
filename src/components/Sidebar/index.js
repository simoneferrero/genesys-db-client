import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { MdClose, MdMenu } from 'react-icons/md'

import styled from 'styled-components/macro'

import {
  baseSpacing,
  colours,
  menuCoverOpacity,
  menuTransition,
  menuWidth,
} from 'styles/constants'

export const StyledWrapper = styled.div`
  height: 100vh;
  width: ${menuWidth}px;
  background: ${colours.teal};
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '0' : `-${menuWidth}px`)};
  top: 0;
  z-index: 900;
  transition: ${menuTransition}s linear left;
  padding: ${baseSpacing}px 0;
  display: flex;
  flex-direction: column;
`

export const StyledIcon = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  z-index: 1000;
  user-select: none;
  cursor: pointer;
  padding: ${baseSpacing / 2}px;
  font-size: 30px;
`

export const StyledCover = styled.div`
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? `calc(100vw - ${menuWidth}px)` : '100vw')};
  background-color: ${colours.teal};
  opacity: ${({ isOpen }) => (isOpen ? menuCoverOpacity : 0)};
  pointer-events: ${({ isOpen }) => !isOpen && 'none'};
  position: absolute;
  left: 100%;
  top: 0;
  transition: ${menuTransition}s linear;
`

/** Retractable component to host the main app menu */
const Sidebar = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Pass onClick function to all children
  const clonedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      onClick: () => setIsOpen(false),
    }),
  )

  return (
    <StyledWrapper className={className} data-testid="wrapper" isOpen={isOpen}>
      <StyledIcon data-testid="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <MdClose data-testid="icon-close" />
        ) : (
          <MdMenu data-testid="icon-menu" />
        )}
      </StyledIcon>
      <StyledCover
        data-testid="cover"
        isOpen={isOpen}
        onClick={() => (isOpen ? setIsOpen(false) : null)}
      />
      {clonedChildren}
    </StyledWrapper>
  )
}

Sidebar.propTypes = {
  /** Menu items, icons, or any valid element */
  children: PropTypes.node.isRequired,
  /** Custom styles */
  className: PropTypes.string,
}

export default Sidebar
