import React from 'react'

import logo from 'logo.svg'

import styled from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'

const StyledHeader = styled.div`
  width: 100%;
  padding: ${baseSpacing / 4}px 0;
  background-color: ${colours.blue};
  color: ${colours.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 50px;
    width: auto;
  }

  h2 {
    margin: ${baseSpacing / 4}px 0 0 0;
  }
`

/** The application's header */
const Header = () => (
  <StyledHeader data-testid="header">
    <img alt="logo" data-testid="logo" src={logo} />
    <h2>TFL TUBE STATUS</h2>
  </StyledHeader>
)

export default Header
