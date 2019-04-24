import styled from 'styled-components/macro'

import {
  baseSpacing,
  colours,
  fontFamilies,
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
  color: ${({ isOpen }) => (isOpen ? colours.veryLightBlue : colours.teal)};
  transition: ${menuTransition}s linear;
`

export const StyledCover = styled.div`
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? `calc(100vw - ${menuWidth}px)` : '100vw')};
  background-color: ${colours.veryDarkGreen};
  opacity: ${({ isOpen }) => (isOpen ? menuCoverOpacity : 0)};
  pointer-events: ${({ isOpen }) => !isOpen && 'none'};
  position: absolute;
  left: 100%;
  top: 0;
  transition: ${menuTransition}s linear;
`

export const StyledLogoutButton = styled.button`
  width: 100%;
  padding: ${baseSpacing / 2}px ${baseSpacing}px;
  color: ${colours.veryLightBlue};
  font-weight: bold;
  text-decoration: none;
  font-family: "${fontFamilies.Monkirta}", Helvetica, sans-serif;
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  text-align: left;
  font-size: 12px;

  &:hover {
    background-color: ${colours.veryLightBlue};
    color: ${colours.teal};
  }
`
